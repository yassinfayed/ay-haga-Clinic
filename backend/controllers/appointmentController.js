const handlerFactory = require('./handlerFactory');


const catchAsync = require('../utils/catchAsync');
const Patient = require('../models/patientModel');
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const APIFeatures = require('../utils/apiFeatures');


exports.viewAllAppointments = handlerFactory.getAll(Appointment);
exports.getAppointment = handlerFactory.getOne(Appointment, { path: 'patient' });

exports.getAllPatientAppointments = catchAsync(async (req, res, next) => {
    console.log(req.user._id);
    const patient = await Patient.findOne({ user: req.user._id });
    const patientId = patient._id;

    const features = new APIFeatures(Appointment.find({ patientId: patientId }).populate("doctorId"), req.query).filter();
    const appts = await features.query;

    res.status(200).json({
        status: 'success',
        results: appts.length,
        data: {
            data: appts
        }
    });

});

exports.getAllDoctorAppointments = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findOne({ user: req.user._id });
    const doctorId = doctor._id;

    const features = new APIFeatures(Appointment.find({ doctorId: doctorId }).populate("patientId"), req.query).filter();
    const appts = await features.query;

    res.status(200).json({
        status: 'success',
        results: appts.length,
        data: {
            data: appts
        }
    });
});

exports.followUpAppointment = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findOne({user: req.user._id});
    if(!doctor) {
        throw new Error("Doctor not found");
    }
    const doctorId = doctor._id;

    const appointment = await Appointment.findById(req.body.appointmentId);

    const appt = new Appointment({
        date: req.body.date,
        patientId: appointment.patientId,
        doctorId: doctorId,
        status: "Upcoming"
    });

    await appt.save();

    res.status(200).json({
        status: 'success',
        results: 1,
        data: {
            data: appt
        }
    })
});

exports.createAppointment = handlerFactory.createOne(Appointment);
exports.updateAppointment = handlerFactory.updateOne(Appointment);
exports.deleteAppointment = handlerFactory.deleteOne(Appointment);





// RESERVE AN APPOINTMENT:



