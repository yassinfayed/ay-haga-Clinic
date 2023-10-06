const handlerFactory = require('./handlerFactory');
const Doctor = require('../models/doctorModel');

exports.getDoctor = handlerFactory.getOne(Doctor);