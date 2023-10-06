const handlerFactory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Patient = require('../models/patientModel');
const Appointment=require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');

exports.getAppointment = handlerFactory.getOne(Appointment, { path: 'patient' });

exports.getAllPatientAppointments = catchAsync(async (req, res, next) => {
    const patient = await Patient.findOne({user: req.user._id});
    const patientId = patient._id;
    req.query['patientId'] = {"eq": patientId};
    
    handlerFactory.getAll(Appointment)(req, res, next);
    
});

exports.getAllDoctorAppointments = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findOne({user: req.user._id});
    const doctorId = doctor._id;
    req.query['doctorId'] = {"eq": doctorId};
    
    handlerFactory.getAll(Appointment)(req, res, next);
});

