const handlerFactory = require('./handlerFactory');
const doctorModel = require('../models/doctorModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const Patient = require('../models/patientModel');
const mongoose = require('mongoose');

exports.getDoctor = handlerFactory.getOne(doctorModel);


exports.getalldoctors = catchAsync( async (req,res,next) => {
    const patient = await Patient.findOne({ _id: req.params.id }).populate('package');
    const features = new APIFeatures(doctorModel.find({}), req.query).filter();
    const results = await features.query;

    const doctorsWithSessionPrice = results.map((doctor) => {
        const hourlyRate = doctor.HourlyRate;
        const clinicMarkup = 0.1;
        const sessionPrice = hourlyRate + clinicMarkup - patient.package.doctorDiscount;
    
        return {
          ...doctor.toObject(),
          sessionPrice: sessionPrice,
        };
      });
    
      res.status(200).json({
        status: 'success',
        results: doctorsWithSessionPrice.length,
        data: {
          data: doctorsWithSessionPrice,
        },
      });
})

exports.updateDoctor = handlerFactory.updateOne(doctorModel);