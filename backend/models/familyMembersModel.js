const mongoose = require('mongoose');

const FamilyMembersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    nationalId:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:true
    },
    relationToPatient:{
        type:String,
        required:true
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required:true
    }


});
const FamilyMembers = mongoose.model('FamilyMembers', FamilyMembersSchema);

module.exports = FamilyMembers;
