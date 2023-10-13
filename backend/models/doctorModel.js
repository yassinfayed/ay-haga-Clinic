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
    },
    speciality: {
        type: String,
        required: [true, 'Please specify your speciality']
    },
    availableDates: {
        type: [Date],
        required: true,
        default: []
    }
});
DoctorSchema.statics.getAllSpecialities = async function () {
    try {
        const doctors = await this.find();
        const allSpecialtiesSet = new Set();

        // Extract and add unique medicinal uses to the set
        doctors.forEach(doctor => {
           allSpecialtiesSet.add( doctor.speciality);
        });

        // Convert the set back to an array
        const allSpecialties = Array.from(allSpecialtiesSet);

        return allSpecialties;
    } catch (error) {
        throw new Error('Error fetching unique medicinal uses: ' + error.message);
    }
};

DoctorSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'user',
    //   select: 'username email'  // Specify the fields you want to select from the referenced User model
    });
    next();
  });

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;