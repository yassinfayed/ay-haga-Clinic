const handlerFactory = require("./handlerFactory");

const catchAsync = require("../utils/catchAsync");
const Patient = require("../models/patientModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const APIFeatures = require("../utils/apiFeatures");
const FamilyMembers = require("../models/familyMembersModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Email = require("../utils/email");

exports.viewAllAppointments = handlerFactory.getAll(Appointment);
exports.getAppointment = handlerFactory.getOne(Appointment, {
  path: "patient",
});

exports.getAllPatientAppointments = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user._id });
  const patientId = patient._id;
  let id = patient._id.toString();
  if (req.query.fm) {
    const familyMember = await FamilyMembers.findOne({ _id: req.query.fm });

    id =
      familyMember.patientId.toString() == patient._id.toString()
        ? familyMember.linkedPatientId
        : familyMember.patientId;
  }

  const query = {
    patientId: id,
  };

  if (req.query.date) {
    query.date = {
      $gte: new Date(req.query.date),
      $lt: new Date(
        new Date(req.query.date).setDate(new Date(req.query.date).getDate() + 1)
      ),
    };
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  const appts = await Appointment.find(query).populate("doctorId");

  res.status(200).json({
    status: "success",
    results: appts.length,
    data: {
      data: appts,
    },
  });
});

exports.getAllDoctorAppointments = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({ user: req.user._id });
  const doctorId = doctor._id;

  const query = { doctorId: doctorId };
  if (req.query.date) {
    query.date = {
      $gte: new Date(req.query.date),
      $lt: new Date(
        new Date(req.query.date).setDate(new Date(req.query.date).getDate() + 1)
      ),
    };
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  const appts = await Appointment.find(query)
    .populate("doctorId")
    .populate("patientId");

  res.status(200).json({
    status: "success",
    results: appts.length,
    data: {
      data: appts,
    },
  });
});

exports.followUpAppointment = catchAsync(async (req, res, next) => {
  let appt;
  if (req.user.role === "doctor") {
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    const doctorId = doctor._id;
    const appointment = await Appointment.findByIdAndUpdate(
      req.body.appointmentId,
      {
        followUp: "Accepted",
      },
      {
        new: true,
        //runValidators: true,
      }
    );
    appt = new Appointment({
      date: req.body.date,
      patientId: appointment.patientId,
      doctorId: doctorId,
      status: "Upcoming",
    });

    await appt.save();
  } else {
    appt = await Appointment.findByIdAndUpdate(
      req.body.appointmentId,
      { followUp: "FollowUpRequest" },
      {
        new: true,
        // runValidators: true
      }
    );
  }

  res.status(200).json({
    status: "success",
    results: 1,
    data: {
      data: appt,
    },
  });
});

exports.rescheduleAppointment = catchAsync(async (req, res, next) => {
  const oldApp = await Appointment.findById(req.params.id);
  console.log(oldApp);
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { date: req.body.date, status: "Rescheduled" },
    {
      new: true,
      runValidators: true,
    }
  );
  //EMAIL LOGIC
  const patient = await Patient.findById(appointment.patientId);
  const userP = await User.findById(patient.user);
  const doctor = await Doctor.findById(appointment.doctorId);
  const userD = await User.findById(doctor.user);
  await new Email(patient, 0).R(appointment.date);
  await new Email(doctor, 0).R(appointment.date);

  const newNotification = new Notification({
    title: "Appointment Rescheduled",
    text:
      "Your appointment with dr." +
      doctor?.name +
      " has been rescheduled to: " +
      appointment.date,
    user: userP._id,
  });

  const newNotification2 = new Notification({
    title: "Appointment Rescheduled",
    text:
      "Your appointment with PATIENT" +
      patient?.name +
      "has been rescheduled to: " +
      appointment.date,
    user: userD._id,
  });

  await newNotification.save();
  await newNotification2.save();

  const indexToRemove = doctor.availableDates.findIndex(
    (availableDate) =>
      availableDate.getTime() === new Date(req.body.date).getTime()
  );

  if (indexToRemove !== -1) {
    doctor.availableDates.splice(indexToRemove, 1);
  }

  doctor.availableDates.push(oldApp.date);
  await doctor.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    results: 1,
    data: {
      data: appointment,
    },
  });
});

exports.cancelAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: "Cancelled" },
    {
      new: true,
      // runValidators: true
    }
  )
    .populate("doctorId")
    .exec();
  const currentDate = new Date();
  const timeDifference = appointment.date.getTime() - currentDate.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  const patient = await Patient.findById(appointment.patientId);
  const userP = await User.findById(patient.user);
  const { doctorId } = await Appointment.findByIdAndUpdate(req.params.id);
  const doctor = await Doctor.findById(doctorId);
  const userD = await User.findById(appointment.doctorId.user);
  if (hoursDifference > 24 || req.user.role == "doctor") {
    userP.wallet += appointment.doctorId?.HourlyRate;
    await userP.save({ validateBeforeSave: false });

    userD.wallet -= appointment.doctorId?.HourlyRate;
    await userD.save({ validateBeforeSave: false });
  }

  doctor.availableDates.push(appointment.date);
  await doctor.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    results: 1,
    data: {
      data: appointment,
    },
  });

  await new Email(patient).cancel(appointment.date, "Cancelled");
  await new Email(doctor).cancel(appointment.date, "Cancelled");

  const newNotification = new Notification({
    title: "Appointment Cancelled",
    text: "Your appointment with dr." + doctor?.name + " has been cancelled",
    user: userP?._id,
  });

  const newNotification2 = new Notification({
    title: "Appointment Cancelled",
    text:
      "Your appointment with patient" + patient?.name + " has been cancelled",
    user: userD?._id,
  });

  await newNotification.save();
  await newNotification2.save();
});

exports.evaluateFollowUp = catchAsync(async (req, res, next) => {
  let appt;
  if (req.body.evaluation === "Accepted") {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { followUp: "Accepted" },
      {
        new: true,
        // runValidators: true
      }
    );

    appt = new Appointment({
      date: req.body.date,
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      status: "Upcoming",
    });

    await appt.save();
  } else {
    appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { followUp: "Revoked" },
      {
        new: true,
        // runValidators: true
      }
    );
  }

  res.status(200).json({
    status: "success",
    results: 1,
    data: {
      data: appt,
    },
  });
});
exports.createAppointment = handlerFactory.createOne(Appointment);
exports.updateAppointment = handlerFactory.updateOne(Appointment);
exports.deleteAppointment = handlerFactory.deleteOne(Appointment);

// RESERVE AN APPOINTMENT:
