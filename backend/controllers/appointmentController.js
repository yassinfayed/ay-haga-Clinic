const handlerFactory = require('./handlerFactory');


const catchAsync = require('../utils/catchAsync');
const Patient = require('../models/patientModel');
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');


exports.viewAllAppointments = handlerFactory.getAll(Appointment);
exports.getAppointment = handlerFactory.getOne(Appointment, { path: 'patient' });

exports.getAllPatientAppointments = catchAsync(async (req, res, next) => {
    const patient = await Patient.findOne({ user: req.user._id });
    const patientId = patient._id;

    const appts = await Appointment.find({ patientId: patientId }).populate("doctorId");

    res.json(appts);
});

exports.getAllDoctorAppointments = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findOne({ user: req.user._id });
    const doctorId = doctor._id;

    const appts = await Appointment.find({ doctorId: doctorId }).populate("patientId");

    res.json(appts);
});

exports.createAppointment = handlerFactory.createOne(Appointment);
exports.updateAppointment = handlerFactory.updateOne(Appointment);
exports.deleteAppointment = handlerFactory.deleteOne(Appointment);


