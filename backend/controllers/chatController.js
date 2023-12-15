const Chat = require("../models/chatModel");
const catchAsync = require("../utils/catchAsync");

exports.createChat = catchAsync(async (req, res) => {
  const newConversation = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  const savedChat = await newConversation.save();
  res.status(200).json({
    status: "success",
    data: {
      data: savedChat,
    },
  });
});

exports.getChats = catchAsync(async (req, res) => {
  const chat = await Chat.find({
    members: { $in: [req.params.id] },
  });
  res.status(200).json(chat);
});
