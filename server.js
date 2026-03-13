const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("message", ({room, message}) => {
    io.to(room).emit("message", message);
  });

});

server.listen(3000, () => {
  console.log("Server running");
});
