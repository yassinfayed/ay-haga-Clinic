const handlerFactory = require("./handlerFactory");

const catchAsync = require("../utils/catchAsync");
const Patient = require("../models/patientModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const APIFeatures = require("../utils/apiFeatures");
const FamilyMembers = require("../models/familyMembersModel");

exports.viewAllAppointments = handlerFactory.getAll(Appointment);
exports.getAppointment = handlerFactory.getOne(Appointment, {
  path: "patient",
});

exports.getAllPatientAppointments = catchAsync(async (req, res, next) => {
  console.log(req.user._id);
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

  const features = new APIFeatures(
    Appointment.find({ patientId: id }).populate("doctorId"),
    req.query
  ).filter();
  const appts = await features.query;
  console.log(appts);
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

  const features = new APIFeatures(
    Appointment.find({ doctorId: doctorId }).populate("patientId"),
    req.query
  ).filter();
  const appts = await features.query;

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

    const appointment = await Appointment.findById(req.body.appointmentId);

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
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { date: req.body.date, status: "Rescheduled" },
    {
      new: true,
      runValidators: true,
    }
  );
  //EMAIL LOGIC

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
  );

  //REFUND LOGIC

  res.status(200).json({
    status: "success",
    results: 1,
    data: {
      data: appointment,
    },
  });
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
