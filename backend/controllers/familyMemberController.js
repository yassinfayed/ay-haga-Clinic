const { validationResult } = require('express-validator');
const FamilyMember = require('../models/familyMembersModel');
const handlerFactory = require('./handlerFactory');
const patientController = require('./patientController');
const Patient = require('../models/patientModel');

exports.addFamilyMembers = async (req, res) => {
  const { name, nationalId, age, gender, relationToPatient} = req.body;

    // Check for validation errors
    const errors = validationResult(req);

    // If there are validation errors, respond with a 400 Bad Request status and the error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const patientId = await patientController.getPatientIdFromUserId(req.user._id);
    const patient = await Patient.findOne({user: req.user._id});
    const patientId = patient._id

    // Create a new family member instance using the Mongoose model
    const familyMember = new FamilyMember({
      name,
      nationalId,
      age,
      gender,
      relationToPatient,
      patientId : patientId
    });

    // Save the family member to the database
    await familyMember.save();

    // Respond with a success message
    res.status(200).json({
        status: "success",
        data: {
          data:familyMember
        }
      })
     
};

exports.viewRegisteredFamilyMembers = async (req, res,next) => {
    const patient = await Patient.findOne({user: req.user._id});
    const patientId = patient._id
    req.query["patientId"] = { "eq": patientId };
    handlerFactory.getAll(FamilyMember)(req,res,next);
};
