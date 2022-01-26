"use strict";

const { from } = require("form-data");
const io = require("socket.io");

const PORT = process.env.PORT || 3000;

const server = io(PORT);

const vendorID = "Mya's Munchies";

const caps = server.of("/caps");

//=============================================Server=============================================

server.on("connection", (socket) => {
    console.log("CONNECTION FROM:", socket.id);

    socket.on("disconnect", (reason) => {
        console.log("DISCONNECTION FROM:", socket.id, "\nREASON:", reason);
    });
});

//=============================================Caps=============================================


//================middleware================

caps.use((socket, next) => {
  const obj = JSON.parse(JSON.stringify(socket.handshake.query));
  const name = obj.CustomId
  socket.id = name;
  console.log("here")
  next(null, true);
});

//================Events================

caps.on("connection", (socket) => {
    console.log("CAPS CONNECTION FROM:", socket.id);


    socket.on("disconnect", (reason) => {
        console.log("CAPS DISCONNECTION FROM:", socket.id, "\nREASON:", reason);
    });

    socket.on("message", (sender, message, room) => {
        console.log(`CAPS: Received message from: ${sender} - ${message}`);

        if (!room) {
            socket.broadcast.emit(
                `CAPS: Hear Ye Hear Ye! A Message to all! From: ${sender} - ${message}`
            );
        } else {
            socket.to(room).emit("message", sender, message, room);
        }
    });

    socket.on("join-room", (room) => {
        console.log(`CAPS: Joining room: ${room}`);
        socket.join(room);
    });
});




