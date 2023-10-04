const Patient = require('../models/patientModel')
const handlerFactory = require('./handlerFactory');

exports.createPatient = handlerFactory.createOne(Patient);
