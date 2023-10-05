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
        enum: ["Finished","Upcoming","Missed","Cancelled"],
        required: [true, 'Please choose a status']
    }
    
});
appointmentSchema.virtual('patient', {
    ref: 'Patient',
    localField: 'patientId',
    foreignField: '_id',
    justOne: true
});

const appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = appointment;