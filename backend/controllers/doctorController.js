const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const doctorModel = require('../models/doctorModel');

exports.getDoctor = catchAsync(async (req, res, next) => {

    const doctor = await doctorModel.findById(req.params.id);

    if (!doctor) {
        return next(new AppError('No doctor found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {

            data: doctor

        }
    });
});