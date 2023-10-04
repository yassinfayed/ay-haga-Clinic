const handlerFactory = require('./handlerFactory');
const doctorModel = require('../models/doctorModel');

exports.getDoctor = handlerFactory.getOne(doctorModel);