const handlerFactory = require('./handlerFactory');
const patientModel = require('../models/patientModel');

exports.getPatient = handlerFactory.getOne(patientModel);