const { validationResult } = require("express-validator");
const FamilyMember = require("../models/familyMembersModel");
const handlerFactory = require("./handlerFactory");
const patientController = require("./patientController");
const Patient = require("../models/patientModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.addFamilyMembers = catchAsync(async (req, res, next) => {
  const { name, nationalId, age, gender, relationToPatient } = req.body;
  // const patientId = await patientController.getPatientIdFromUserId(req.user._id);
  const patient = await Patient.findOne({ user: req.user._id });
  const patientId = patient._id;

  // Create a new family member instance using the Mongoose model
  const familyMember = new FamilyMember({
    name,
    nationalId,
    age,
    gender,
    relationToPatient,
    patientId: patientId,
  });

  // Save the family member to the database
  await familyMember.save();
  req.body.sendtoken = false;
  req.body.id = familyMember._id;
  // Respond with a success message
  next();
});
exports.linkFamilyMember = catchAsync(async (req, res, next) => {
  const { phone, relationToPatient, email } = req.body;
  const patient = await Patient.findOne({ user: req.user._id });
  let familymemberaspatient;
  if (email) {
    familymemberaspatient = await Patient.findOne({ email: email });
  }
  if (phone) {
    familymemberaspatient = await Patient.findOne({
      mobileNumber: phone,
    });
  }
  if (!familymemberaspatient) {
    return next(
      new AppError(404, "No Patient found with that email or phone number"),
    );
  }
  const patientId = patient._id;
  const familyMemberId = familymemberaspatient._id;

  // Create a new family member instance using the Mongoose model
  //DONT FORGET HANDLING IN GETTTTT!!!! @ABDULLAH AND AMIR
  const familyMember = new FamilyMember({
    name: familymemberaspatient.name,
    age: familymemberaspatient.age,
    gender: familymemberaspatient.gender,
    relationToPatient,
    patientId: patientId,
    linkedPatientId: familyMemberId,
  });

  // Save the family member to the database
  await familyMember.save();

  // Respond with a success message
  res.status(200).json({
    status: "success",
    data: {
      data: familyMember,
    },
  });
});
exports.viewRegisteredFamilyMembers = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user._id });
  const patientId = patient._id;

  const familyMembers = await FamilyMember.find({
    $or: [{ patientId: patientId }, { linkedPatientId: patientId }],
  }).populate("patientId linkedPatientId");

  const gender = patient.gender;

  familyMembers.forEach((member) => {
    if (member.linkedPatientId?._id == patientId.toString()) {
      // Swap patientId and linkedPatientId
      const temp = member.patientId;
      member.patientId = member.linkedPatientId;

      member.linkedPatientId = temp;

      switch (member.relationToPatient) {
        case "wife":
          member.relationToPatient = "husband";
          break;

        case "husband":
          member.relationToPatient = "wife";
          break;

        case "child":
          {
            if (gender === "male") member.relationToPatient = "father";
            else member.relationToPatient = "mother";
          }
          break;
      }
    }
    // member.relationToPatient='amir'
  });

  res.status(200).json({
    status: "success",
    data: {
      data: familyMembers,
    },
  });
});

exports.viewAllFamilyMembersAndPatients = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const patient = await Patient.findOne({ user: userId });

  if (!patient) {
    return res
      .status(404)
      .json({ message: "Patient not found for the logged-in user" });
  }

  const patientId = patient._id;

  const familyMembers = await FamilyMember.find({ patientId });

  const familyMembersWithPatients = [];
  for (const familyMember of familyMembers) {
    if (familyMember.linkedPatientId) {
      const linkedPatient = await Patient.findById(
        familyMember.linkedPatientId,
      ).populate("package");

      if (linkedPatient) {
        familyMembersWithPatients.push({
          familyMember,
          patientDetails: linkedPatient,
        });
      }
    }
  }
  return res.status(200).json({ familyMembersWithPatients });
});
