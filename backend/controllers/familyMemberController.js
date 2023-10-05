const { validationResult } = require('express-validator');
const FamilyMember = require('../models/familyMembersModel');
const handlerFactory = require('./handlerFactory');
const patientController = require('./patientController');
const Patient = require('../models/patientModel');

exports.addFamilyMembers = async (req, res) => {
  const { name, nationalId, age, gender, relationToPatient} = req.body;

  try {
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
    res.json({ message: 'Family member added successfully' });
  } catch (err) {
    // Handle errors, e.g., database errors
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the family member' });
  }
};

exports.viewRegisteredFamilyMembers = async (req, res,next) => {
    const patient = await Patient.findOne({user: req.user._id});
    const patientId = patient._id
    req.query["patientId"] = { "eq": patientId };
    handlerFactory.getAll(FamilyMember)(req,res,next);
};
