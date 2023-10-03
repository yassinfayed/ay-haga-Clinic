const mongoose = require('mongoose');
const validator = require('validator');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    affiliation: {
        type: String,
        required: [true, 'Please tell us your affiliation']
    },
    DateOfbirth: {
        type: Date,
        required: [true, 'Please tell us your date of birth']
    },
    HourlyRate: {
        type: Number,
        required: [true, 'Please tell us your hourly rate']
    },
    educationalbackground:{
        type: String,
        required: [true, 'Please tell us your educational background']
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;