const handlerFactory = require("./handlerFactory");
const Doctor = require("../models/doctorModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const Patient = require("../models/patientModel");
const mongoose = require("mongoose");

exports.getDoctor = handlerFactory.getOne(Doctor);

exports.getAllDoctors = handlerFactory.getAll(Doctor);

exports.getallDoctorsForPatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user._id }).populate(
    "package"
  );
  const features = new APIFeatures(Doctor.find({}), req.query).filter();
  const results = await features.query;

  const doctorsWithSessionPrice = results.map((doctor) => {
    const hourlyRate = doctor.HourlyRate;
    const clinicMarkup = 0.1;
    const sessionPrice = patient.package?.doctorDiscount
      ? hourlyRate + clinicMarkup - patient.package.doctorDiscount
      : hourlyRate + clinicMarkup;

    return {
      ...doctor.toObject(),
      sessionPrice: sessionPrice,
    };
  });

  res.status(200).json({
    status: "success",
    results: doctorsWithSessionPrice.length,
    data: {
      data: doctorsWithSessionPrice,
    },
  });
});

exports.updateDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({ user: req.user._id });
  const doctorID = doctor._id;
  //Exclude other fields IMPROVMENT

  req.params.id = doctorID;
  console.log("hellooooooooooo", doctorID);
  handlerFactory.updateOne(Doctor)(req, res, next);
});
