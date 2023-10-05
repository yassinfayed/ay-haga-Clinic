const handlerFactory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const HealthPackage = require('../models/healthPackages');

exports.createHealthPackage = handlerFactory.createOne(HealthPackage);

exports.getHealthPackage = handlerFactory.getOne(HealthPackage);

exports.updateHealthPackage = handlerFactory.updateOne(HealthPackage);

exports.deleteHealthPackage = handlerFactory.deleteOne(HealthPackage);

exports.getAllHealthPackage = handlerFactory.getAll(HealthPackage);

