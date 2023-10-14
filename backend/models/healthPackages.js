const mongoose = require('mongoose');

const healthPackageSchema = new mongoose.Schema({
    name :{
        type:  String,
        unique: true,
        required: [true, "A name is required"],
        // enum : ['silver','gold','platinum']
    },
    price: {
        type: Number,
        required: [true, "A price is required"],
        min: 0,
        //TODO: Default
    },
    doctorDiscount: {
        type: Number,
        required: [true, "Please enter the doctor discount"],
        min: 0,
    },
    medicineDiscount:{
        type: Number,
        required: [true, "Please enter the medicine discount"],
        min: 0,
    },
    familyMemberSubDiscount:{
        type: Number,
        required: [true, "Please enter the family member subsription discount"],
        min: 0,
    }
});

const HealthPackage = mongoose.model('HealthPackage',healthPackageSchema);

module.exports = HealthPackage;