const handlerFactory = require("./handlerFactory");
const Doctor = require("../models/doctorModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const Patient = require("../models/patientModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const archiver = require('archiver');
const path = require('path');

exports.getDoctor = handlerFactory.getOne(Doctor);

exports.getAllDoctors = handlerFactory.getAll(Doctor);

exports.getallDoctorsForPatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user._id }).populate(
    "package"
  );
  const features = new APIFeatures(Doctor.find({isApproved : true}), req.query).filter();
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

exports.getDoctorDocs = catchAsync(async (req,res,next) => {
  const doctorId = req.params.id;
  const doctor = await Doctor.findById(doctorId);

  const archive = archiver ('zip' , {
    zlib : {level : 9},
  });

  res.attachment('documents.zip');
  archive.pipe(res);

  doctor.documents.forEach((document) => {
    archive.file(document, { name : path.basename(document)});
  });


  archive.finalize();


})

exports.updateDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({ user: req.user._id });
  const doctorID = doctor._id;
  //Exclude other fields IMPROVMENT

  req.params.id = doctorID;
  console.log("hellooooooooooo", doctorID);
  handlerFactory.updateOne(Doctor)(req, res, next);
});

exports.viewEmploymentContract = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({ user: req.user._id });
  const contract = doctor.employmentContract;


 

  

  res.status(200).json({
    status: 'success',
    data: {
        data: contract
    }
});

  
});
exports.acceptEmploymentContract = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({ user: req.user._id });
  const doctorID = doctor._id;
  //console.log(doctor.availableDates);
  const doctorfound = await Doctor.findByIdAndUpdate(doctorID, {employmentContract:{
    hourlyRate:doctor.HourlyRate,
    status:'accepted'
  }}, 
  {
    new: true,
    runValidators: true
});
 

  

  res.status(200).json({
    status: 'success',
    data: {
        data: doctorfound.employmentContract
    }
});

  
});


exports.addAvailableDate = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({ user: req.user._id });
  const doctorID = doctor._id;
  oldAvailableDates=doctor.availableDates;
  //what if the same date entered twice 
 
  const doctorfound = await Doctor.findByIdAndUpdate(doctorID, {availableDates:[...oldAvailableDates,req.body.availableDate]}, 
  {
    new: true,
    runValidators: true
});
 

  

  res.status(200).json({
    status: 'success',
    data: {
        data: doctorfound.availableDates
    }
});

  
});

exports.acceptDoctor = catchAsync(async (req, res, next) => {
  const doctorfound=await Doctor.findById(req.params.id)
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, {isApproved:true,employmentContract:{hourlyRate:doctorfound.HourlyRate,status:'pending'}}, {
    new: true,
    runValidators: true
});

  
  res.status(200).json({
    status: 'success',
    data: {
        data: doctor
    }
});

  
});
exports.rejectDoctor = catchAsync(async(req,res,next)=>{

  const doctorfound=await Doctor.findById(req.params.id)
  let doctor;
  if(req.user.role==='administrator'){
   doctor = await Doctor.findByIdAndUpdate(req.params.id, {isApproved:true,employmentContract:{hourlyRate:doctorfound.HourlyRate,status:'Admin rejected'}}, {
    new: true,
    runValidators: true
});
}else if(doctorfound.employmentContract.status==='pending') {
   doctor = await Doctor.findByIdAndUpdate(req.params.id, {isApproved:true,employmentContract:{hourlyRate:doctorfound.HourlyRate,status:'Doctor rejected'}}, {
    new: true,
    runValidators: true
});
}
  
  res.status(200).json({
    status: 'success',
    data: {
        data: doctor
    }
});

});


exports.allSpecialities = catchAsync(async(req,res,next)=> {

  const resp = await Doctor.getAllSpecialities();
  res.status(200).json(resp)
});

exports.getMyDetails = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id }).select('+password');
  const doctor = await Doctor.findOne({ user: req.user._id });

  if (!user || !doctor) {
    return next(new AppError('User or patient not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
      doctor,
    },
  });
});
