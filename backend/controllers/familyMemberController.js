const { validationResult } = require('express-validator');
const FamilyMember = require('../models/familyMembersModel');
const handlerFactory = require('./handlerFactory');

exports.addFamilyMembers = async (req, res) => {
  const { name, nationalId, age, gender, relationToPatient, patientId } = req.body;

  try {
    // Check for validation errors
    const errors = validationResult(req);

    // If there are validation errors, respond with a 400 Bad Request status and the error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new family member instance using the Mongoose model
    const familyMember = new FamilyMember({
      name,
      nationalId,
      age,
      gender,
      relationToPatient,
      patientId,
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
    handlerFactory.getAll(FamilyMember)(req,res,next);
    console.log("successful");

};
