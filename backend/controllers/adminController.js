const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const doctorModel = require('../models/doctorModel');
const patientModel = require('../models/patientModel');

exports.addAdmin = catchAsync(async (req, res, next) => {
    //TODO: Add admin
});
