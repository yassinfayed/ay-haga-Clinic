const handlerFactory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Patient = require("../models/patientModel");
const Prescription = require("../models/prescriptionModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const APIFeatures = require('../utils/apiFeatures');
const AppError = require("../utils/appError");

const User = require('../models/userModel');

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
  const patientId = req.params.id;

  if (userRole === 'patient') {
    const patient = await Patient.findOne({ _id : patientId }).select('healthRecords');

    if (!patient) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found or unauthorized to view this patient\'s records',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        healthRecords: patient.healthRecords,
      },
    });
  } else if (userRole === 'doctor') {
    const doctor = await Doctor.findOne({ user: userId });

    if (!doctor) {
      return res.status(404).json({
        status: 'fail',
        message: 'Doctor not found',
      });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id }).populate({
      path: 'patient',
      select: 'name healthRecords',
    });

    const patientData = appointments.map((appointment) => {
      return {
        patientName: appointment.patient.name,
        appointmentDate: appointment.date,
        healthRecords: appointment.patient.healthRecords,
      };
    });

    res.status(200).json({
      status: 'success',
      data: patientData,
    });
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'Unauthorized access',
    });
  }
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


exports.getMyDetails = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id }).select('+password');
  const patient = await Patient.findOne({ user: req.user._id });

  if (!user || !patient) {
    return next(new AppError('User or patient not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
      patient,
    },
  });
});





// exports.FilterPatientsBasedOnUpcomimgAppointments = catchAsync(
//   async (req, res, next) => {
//     const doctor = await Doctor.findOne({ user: req.user._id });
//     const doctorId = doctor._id;
//     const upcomingAppointments = await Appointment.find({
//       doctorId: doctorId,
//       status: "Upcoming", // Find appointments with dates greater than or equal to the current date
//     });

//     // Extract patient IDs from upcomingAppointments
//     const patientIds = upcomingAppointments.map(
//       (appointment) => appointment.patientId
//     );

//     // Query the Patient collection to fetch patient details for the extracted patient IDs
//     const patients = await Patient.find({ _id: { $in: patientIds } });

//     // Create a response object that combines patient details with their appointment details
//     // const response = patients.map((patient) => {
//     //   const matchingAppointment = upcomingAppointments.find(
//     //     (appointment) =>
//     //       appointment.patientId.toString() === patient._id.toString()
//     //   );
//     //   return 
//     //     patient
//     //     // appointment: matchingAppointment,
      
//     // });
//     // console.log()
//     res.status(200).json({
//       status: "success",
//       // results: response?.length,
//       data: {
//         data: patients,
//       },
//     });
//   }
// );


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
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
  if(!patient.medicalRecords.includes(req.query.name)) {
   if(!patient.healthRecords.includes(req.query.name)){
    return next(new AppError(404,"File not found"));
   }
  }

  const fileData = await fs.readFileSync(`./${req.query.name}`);

  res.setHeader('Content-Disposition', `attachment; filename="${req.query.name}"`);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(fileData);


})

exports.removeSingleRecord = catchAsync(async(req,res,next) => {
  //Abdullah: to be edited to download all as zip if no query parameter passed
  const patient = await Patient.findOne({ user: req.user._id });
  if(patient.medicalRecords.includes(req.query.name)) {
    patient.medicalRecords = patient.medicalRecords.filter((record) => record !== req.query.name);
  }
  else if (patient.healthRecords.includes(req.query.name)){
    patient.healthRecords = patient.healthRecords.filter((record) => record !== req.query.name);
  }
  else{
    return next(new AppError(404,"File not found"));
  }

  
  
  
  await patient.save();

  res.status(204).send();


})