const socketIO = require("socket.io");

const ioChat = socketIO(8900, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

ioChat.on("connection", (socket) => {
  console.log("a user connected.");

  socket.on("addUser", (userId) => {
    console.log("we will add user");
    console.log("USER:", userId, "Socket:", socket.id);
    addUser(userId, socket.id);
    ioChat.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user && user.socketId) {
      ioChat.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    ioChat.emit("getUsers", users);
  });
});
