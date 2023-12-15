const catchAsync = require("../utils/catchAsync");
const Message = require("../models/messageModel");
const handlerFactory = require("./handlerFactory");

exports.createMessage = catchAsync(async (req, res) => {
  const newMessage = new Message(req.body);
  const savedMessage = await newMessage.save();
  res.status(200).json(savedMessage);
});

exports.getMessages = catchAsync(async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.id,
  });
  res.status(200).json(messages);
});
