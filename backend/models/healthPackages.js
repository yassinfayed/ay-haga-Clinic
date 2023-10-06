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
        //TODO: Default
    },
    doctorDiscount: {
        type: Number,
        required: [true, "Please enter the doctor discount"],
    },
    medicineDiscount:{
        type: Number,
        required: [true, "Please enter the medicine discount"],
    },
    familyMemberSubDiscount:{
        type: Number,
        required: [true, "Please enter the family member subsription discount"],
    }
});

const HealthPackage = mongoose.model('HealthPackage',healthPackageSchema);

module.exports = HealthPackage;