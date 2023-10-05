const handlerFactory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.viewAllAppointments=catchAsync(async(req,res,next)=>{
    handlerFactory.getAll(Appointment)(req,res,next);
})