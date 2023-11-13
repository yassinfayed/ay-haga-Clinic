const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Please choose a date']
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient',
        required: [true, 'Please enter a patientid']
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor',
        required: [true, 'Please enter a doctorid']
    },
    status: {
        type: String,
        enum: ["Completed","Upcoming","Missed","Cancelled","Rescheduled"],
        required: [true, 'Please choose a status']
    }
    
});
appointmentSchema.virtual('patient', {
    ref: 'Patient',
    localField: 'patientId',
    foreignField: '_id',
    justOne: true
});

appointmentSchema.virtual('doctor', {
    ref: 'Doctor',
    localField: 'doctorId',
    foreignField: '_id',
    justOne: true
});

appointmentSchema.set('toObject', { virtuals: true });
appointmentSchema.set('toJSON', { virtuals: true });

const appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = appointment;