const mongoose = require('mongoose');
const enums = require('../constants/enums')
const FamilyMembersSchema = new mongoose.Schema({
    name:{
        type:String,
        //required: [true, "Please enter your family member name"]
    },
    nationalId:{
        type:String,
        //required:[true, "Please enter your family member nationalID"],
        min:10,
        max:20
    },
    age:{
        type:Number,
        //required:[true, "Please enter your family member age"],
        min: 0,
        
    },
    gender:{
        type:String,
        enum:[enums.GENDER.MALE,enums.GENDER.FEMALE],
      //  required:[true, "Please enter your family member gender"]
    },
    relationToPatient:{
        type:String,
        enum: ['child', 'wife','husband'],
        required:[true, "Please enter your family member relation to you"]
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required:true
    },linkedPatientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
      //  required:true
    }

});
const FamilyMembers = mongoose.model('FamilyMembers', FamilyMembersSchema);

module.exports = FamilyMembers;
