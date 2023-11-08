const handlerFactory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Patient = require("../models/patientModel");
const Prescription = require("../models/prescriptionModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const APIFeatures = require('../utils/apiFeatures');
const AppError = require("../utils/appError");
const multer = require('multer');
const fs = require('fs');

//TODO: Retrieve only my patient
exports.getPatient = handlerFactory.getOne(Patient);

exports.getAllPrescriptions = catchAsync(async (req, res, next) => {
  console.log(req.user._id);
  const patient = await Patient.findOne({ user: req.user._id });
  const patientId = patient._id;
  const name = req.query.name;
  req.query.name = null;

  const features = new APIFeatures(Prescription.find({ patientId: patientId }).populate("doctorId"), req.query).filter();

  let presc = await features.query;
 if(name)
  presc = presc.filter(p => p.doctorId.name.toLowerCase()
  .includes(name.toLowerCase()))

    res.status(200).json({
        status: 'success',
        results: presc.length,
        data: {
            data: presc
        }
    });
});


exports.updatePatient = handlerFactory.updateOne(Patient);

exports.cancelSubscription = catchAsync(async (req, res, next) => {
  const patientId = req.params.id;
  const patient = await Patient.findById(patientId);

  if (patient.subscriptionStatus == 'subscribed') {
    patient.subscriptionStatus = 'cancelled';
    patient.cancellationEndDate = patient.renewalDate;
    patient.renewalDate = null;
    await patient.save();
  }

  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });
});

exports.viewHealthPackageSubscription = catchAsync(async (req, res, next) => {
  //handle generating renewal date after payment for the health package
  const patient = await Patient.findById(req.params.id)
    .populate("package");

  let additionalFields = {};

  if (patient.subscriptionStatus === 'subscribed') {
    additionalFields.renewalDate = patient.renewalDate;
  } else if (patient.subscriptionStatus === 'cancelled') {
    additionalFields.cancellationEndDate = patient.cancellationEndDate;
  }

  const data = {
    package: patient.package,
    subscriptionStatus: patient.subscriptionStatus,
    ...additionalFields
  };

  res.status(200).json({
    status: 'success',
    data: data
  });
});




exports.getPrescription = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user._id });
  const patientId = patient._id;

  const data = await Prescription.findOne({
    patientId: patientId,
    _id: req.params.id,
  });
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
});

exports.viewHealthRecords = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) {
    return res.status(404).json({
      status: 'fail',
      message: 'Patient not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      healthRecords: patient.healthRecords,
    },
  });
});




exports.viewMyPatients = catchAsync(async (req, res, next) => {

  const doctor = await Doctor.findOne({ user: req.user._id });
  let doctorId;
  let appointments;
  let data;

  if (doctor) {
    doctorId = doctor._id;
    const query = { doctorId };
    if (req.query.status) {
      query.status = req.query.status;
      console.log(query.status)
    }
    console.log(req.query._id)
    if(req.query._id){
      query.patientId = req.query._id
    }
    appointments = await Appointment.find(query).populate("patient");
     data = appointments.map((appointment) =>{ 
      appointment.patient.appointmentDate = appointment.date;
      return appointment.patient
    });
    //  data = Array.from(new Set(data));
  }

  if (req.query.name)
    data = data.filter((pat) => `${pat.name?.toLowerCase()}`.includes(req.query.name?.toLowerCase()));
  if(req.user.role === 'patient')
    data = await Patient.find({_id: req.query._id})
  res.status(200).json({
    status: "success",
    results: data?.length,
    data: {
      data: data,
    },
  });
});

exports.getAllPatients = handlerFactory.getAll(Patient);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    console.log(file);
    if (!req.locals) {
      req.locals = {};
    }
    if (!req.locals.docs) {
      req.locals.docs = [];
    }

    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    req.locals.docs.push(`uploads/${uniqueFileName}`);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("kajnq");
  console.log(file);
  console.log(file.mimetype);
  if (file.mimetype === 'application/pdf' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, PNG, JPEG, and JPG files are allowed.'), false);
  }
};

exports.uploadHealthRecords = multer({ storage, fileFilter });

exports.postUploadHealth = catchAsync(async (req,res,next)=> {
  const patient = await Patient.findOne({ _id: req.params.id});
  patient.healthRecords = patient.healthRecords.concat(req.locals.docs);

  await patient.save();

  res.status(200).json({
    message: "successfully uploaded health records",
    data: {
      data: patient.healthRecords
    }
  })
})

exports.downloadHealthRecord = catchAsync(async(req,res,next) => {
  const patient = await Patient.findOne({ _id: req.params.id });
  if(!patient.healthRecords.includes(req.query.name)) return next(new AppError(404,"File not found"));

  const fileData = await fs.readFileSync(`./${req.query.name}`);

  res.setHeader('Content-Disposition', `attachment; filename="${req.query.name}"`);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(fileData);


})

exports.uploadMedicineRecords = multer({ storage, fileFilter });

exports.postUpload = catchAsync(async (req,res,next)=> {
  const patient = await Patient.findOne({ user: req.user._id });
  patient.medicalRecords = patient.medicalRecords.concat(req.locals.docs);

  await patient.save();

  res.status(200).json({
    message: "successfully uploaded medical records",
    data: {
      data: patient.medicalRecords
    }
  })
})

exports.downloadSingleRecord = catchAsync(async(req,res,next) => {
  //Abdullah: to be edited to download all as zip if no query parameter passed
  const patient = await Patient.findOne({ user: req.user._id });
  if(!patient.medicalRecords.includes(req.query.name)) return next(new AppError(404,"File not found"));

  const fileData = await fs.readFileSync(`./${req.query.name}`);

  res.setHeader('Content-Disposition', `attachment; filename="${req.query.name}"`);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(fileData);


})