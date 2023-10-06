const handlerFactory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Patient = require('../models/patientModel');
const Prescription = require('../models/prescriptionModel');
const Appointment=require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');

exports.getPatient = handlerFactory.getOne(Patient);

exports.getAllPrescriptions = catchAsync(async (req, res, next) => {
    const patient = await Patient.findOne({user: req.user._id});
    const patientId = patient._id;
    req.query['patientId'] = {"eq": patientId};
    
    handlerFactory.getAll(Prescription)(req, res, next);
});

exports.getPrescription = catchAsync(handlerFactory.getOne(Prescription));

exports.viewAllPatients =catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findOne({user: req.user._id});
    const doctorId = doctor._id;
      let appointments = await Appointment.find({doctorId}).populate("patient");
    res.status(200).json({
      status: "success",
      results: appointments?.length,
      data: {
        data: appointments.map(appointment => appointment.patient)
      }
    })

 
});


exports.SearchPatientByName =catchAsync(async (req, res, next) => {
    handlerFactory.getAll(Patient)(req,res,next);
});


exports.FilterPatientsBasedOnUpcomimgAppointments =catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findOne({user: req.user._id});
    const doctorId = doctor._id;    
    const upcomingAppointments = await Appointment.find({doctorId: doctorId,
      status: "Upcoming", // Find appointments with dates greater than or equal to the current date
    });

    // Extract patient IDs from upcomingAppointments
    const patientIds = upcomingAppointments.map((appointment) => appointment.patientId);

    // Query the Patient collection to fetch patient details for the extracted patient IDs
    const patients = await Patient.find({ _id: { $in: patientIds } });

    // Create a response object that combines patient details with their appointment details
    const response = patients.map((patient) => {
      const matchingAppointment = upcomingAppointments.find(
        (appointment) => appointment.patientId.toString() === patient._id.toString()
      );
      return {
        patient,
        appointment: matchingAppointment,
      };
    });
    res.status(200).json({
      status: "success",
      results: response?.length,
      data: {
        data: response
      }
    })
});
