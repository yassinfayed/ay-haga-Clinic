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
        required: [true, 'Please tell us your date of birth'],
        validate: {
            validator: function (value) {
              const currentDate = new Date();
              const minDate = new Date(currentDate.getFullYear() - 25, currentDate.getMonth(), currentDate.getDate());
              
              // Check if the date is at least 25 years ago
              return value <= minDate;
            },
            message: 'Date of birth should be at least 25 years ago'
          }
        // validate: {
        //     validator: function (v) {
        //       return (
        //         v && // check that there is a date object
        //         v.getTime() > Date.now() + 24 * 60 * 60 * 1000 &&
        //         v.getTime() < Date.now() + 90 * 24 * 60 * 60 * 1000
        //       );
        //     },
        //     message:
        //       "An event must be at least 1 day from now and not more than 90 days.",
        //   }
    },
    HourlyRate: {
        type: Number,
        required: [true, 'Please tell us your hourly rate'],
        min: 0,
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