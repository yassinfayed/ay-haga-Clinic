const handlerFactory = require('./handlerFactory');
const Appointment = require('../models/appointmentModel');

exports.viewAllAppointments = handlerFactory.getAll(Appointment);
