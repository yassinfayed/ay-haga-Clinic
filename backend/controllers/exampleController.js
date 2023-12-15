const Example = require("../models/exampleModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllExamples = factory.getAll(Example);

exports.createExample = factory.createOne(Example);
exports.getExample = factory.getOne(Example);
exports.deleteExample = factory.deleteOne(Example);

exports.updateExample = factory.updateOne(Example);

exports.heavyOperationExample = catchAsync((req, res, next) => {
  res.status(200).json({
    message: "example",
  });
});
