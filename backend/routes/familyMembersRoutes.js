const express = require('express');
const familyMemberController = require('../controllers/familyMemberController');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  "/add-family-member",
  [
    // Validate name (it should not be empty)
    body('name').notEmpty().withMessage('Name is required'),

    // Validate nationalID (it should be a valid format)
    body('nationalId').isLength({ min: 10, max:40 }).withMessage('National ID must be 10 characters long'),

    // Validate age (it should be a number)
    body('age').isNumeric().withMessage('Age must be a number'),

    // Validate gender (it should be either 'male' or 'female')
    body('gender').isIn(['Male', 'Female']).withMessage('Invalid gender'),

    // Validate relation (it should not be empty)
    body('relationToPatient').notEmpty().withMessage('Relation is required'),

     // Validate patientId as a number
     body('patientId').notEmpty().withMessage('Patient ID is required'),
  ],
  familyMemberController.addFamilyMembers
);
router.route("/view-registered-familyMembers").get(familyMemberController.viewRegisteredFamilyMembers);

module.exports = router;
