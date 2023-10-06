const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  package: {
    type: mongoose.Schema.ObjectId,
    ref: "HealthPackage"
  },
  mobileNumber: {
    type: String,
    required: true
  },
  emergencyContact: {
    fullName: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String,
      required: true
    }
  },
  healthRecords: [
    {
      type: String
    }
  ]
});

patientSchema.virtual('healthPackage', {
  ref: 'HealthPackage',
  localField: 'package',
  foreignField: '_id',
  justOne: true
});

// Apply the virtual field to the schema
patientSchema.set('toObject', { virtuals: true });
patientSchema.set('toJSON', { virtuals: true });


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
