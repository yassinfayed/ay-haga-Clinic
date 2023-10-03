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
        required: true
        //TODO: Default
    },
    doctorDiscount: {
        type: Number,
        required: true,
    },
    medicineDiscount:{
        type: Number,
        required: true,
    },
    familyMemberSubDiscount:{
        type: Number,
        required: true,
    }
});

const HealthPackage = mongoose.model('HealthPackage',healthPackageSchema);

module.exports = HealthPackage;