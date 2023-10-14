const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required:true,
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true,

    },
    
    medicines :[ {
            medicine:{
                type: String,
                required:true
            },
            dosage:{
                type: String,
                required:true,
            },
            frequency:{
                type: String,
                required:true,
            },
            startDate:{
                type:Date,
                required:true,
            },
            endDate:{
                type:Date,
            },
            
        },
    ],

   
    instructions:{
        type:String,
    },
    prescriptionDate:{
        type:Date,
        default: Date.now(),
    },
    filled_unfilled:{
        type: Boolean,
    },
});

prescriptionSchema.virtual('patient', {
    ref: 'Patient',
    localField: 'patientId',
    foreignField: '_id',
    justOne: true
});
prescriptionSchema.virtual('doctor', {
    ref: 'Doctor',
    localField: 'doctorId',
    foreignField: '_id',
    justOne: true
});
const Prescription = mongoose.model('Prescription',prescriptionSchema);
module.exports=Prescription;