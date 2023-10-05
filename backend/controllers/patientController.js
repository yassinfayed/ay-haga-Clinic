const handlerFactory = require('./handlerFactory');
const Patient = require('../models/patientModel');
const Prescription = require('../models/prescriptionModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory')
const mongoose = require('mongoose');
const AppError = require('../utils/appError');
const patientModel = require('../models/patientModel');
const Appointment=require('../models/appointmentModel');

exports.getPatient = handlerFactory.getOne(Patient);

const getPatientIdFromUserId = catchAsync(async (userId) => {
    const patient = await Patient.findOne({user: userId});
    // console.log(patient);
    return patient._id;
});

exports.getAllPrescriptions = catchAsync(async (req, res, next) => {
    const patientId = await getPatientIdFromUserId(req.user._id);
    req.query['patientId'] = {"eq": patientId};
    handlerFactory.getAll(Prescription)(req, res, next);
});

exports.getPrescription = catchAsync(handlerFactory.getOne(Prescription));

exports.viewAllPatients =catchAsync(async (req, res, next) => {
    handlerFactory.getAll(patientModel)(req,res,next);
    console.log("all patients are viewed successfully");
});


exports.SearchPatientByName =catchAsync(async (req, res, next) => {
    handlerFactory.getAll(patientModel)(req,res,next);
    console.log("search patient by name is successful");
});

exports.viewAllAppointments=catchAsync(async(req,res,next)=>{
    handlerFactory.getAll(Appointment)(req,res,next);
    console.log("all Appointments");
})
exports.FilterPatientsBasedOnUpcomimgAppointments =catchAsync(async (req, res, next) => {

  try {
    const upcomingAppointments = await Appointment.find({
      status: { $eq:"Upcoming"}, // Find appointments with dates greater than or equal to the current date
    });

    // Extract patient IDs from upcomingAppointments
    const patientIds = upcomingAppointments.map((appointment) => appointment.patientId);

    // Query the Patient collection to fetch patient details for the extracted patient IDs
    const patients = await patientModel.find({ _id: { $in: patientIds } });

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

    // Respond with the list of patients and their appointment details as JSON
    res.json(response);
  } catch (err) {
    // Handle errors, e.g., database errors
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching upcoming appointments' });
  }

});
