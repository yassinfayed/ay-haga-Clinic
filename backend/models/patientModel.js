const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = new mongoose.Schema({
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    }
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of Birth is required'],
    max: new Date()
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Gender is required']
  },
  package: {
    type: mongoose.Schema.ObjectId,
    ref: "HealthPackage"
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required']
  },
  emergencyContact: {
    fullName: {
      type: String,
      required: [true, 'Emergency contact full name is required']
    },
    mobileNumber: {
      type: String,
      required: [true, 'Emergency contact mobile number is required']
    }
  },
  subscriptionStatus: {
    type: String,
    enum: ['subscribed', 'unsubscribed', 'cancelled'],
    default: 'unsubscribed'
  },
  renewalDate: {
    type: Date,
    default: null
  },
  cancellationEndDate: {
    type: Date,
    default: null
  },
  appointmentDate: {
    type: Date,
    default: null
  },
  healthRecords: [
    {
      type: String
    }
  ],
  medicalRecords: [String]
});


patientSchema.virtual('helathPackage', {
  ref: 'healthPackage',
  localField: 'package',
  foreignField: '_id',
  justOne: true
});


// Apply the virtual field to the schema

patientSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
  //   select: 'username email'  // Specify the fields you want to select from the referenced User model
  });
  next();
});


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
