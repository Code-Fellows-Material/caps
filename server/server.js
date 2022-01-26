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
    const name = obj.CustomId;
    socket.id = name;
    next(null, true);
});

//================Events================

caps.on("connection", (socket) => {
    console.log("CAPS CONNECTION FROM:", socket.id);

    // Listen
    socket.on("disconnect", (reason) => {
        console.log("CAPS DISCONNECTION FROM:", socket.id, "\nREASON:", reason);
    });

    socket.on("message", (message, room) => {
        console.log(`CAPS: Received message from: ${socket.id} - ${message}`);

        if (!room) {
            socket.broadcast.emit(
                `CAPS: Hear Ye Hear Ye! A Message to all! From: ${socket.id} - ${message}`
            );
        } else {
            socket.to(room).emit("message", socket.id, message, room);
        }
    });

    socket.on("join-room", (room) => {
        console.log(`CAPS: Joining room: ${room}`);
        socket.join(room);
    });

    socket.on("pickup-requested", (payload, room) => {
        console.log(
            `CAPS: A pickup has been requested from: ${socket.id}`
        );
        socket.to(room).emit("pickup", socket.id, payload);
    });

    socket.on("in-transit", (payload, room) => {
      console.log(
          `CAPS: ${socket.id} has picked up order# ${payload.orderID} and is in transit`
      );
      // setTimeout((payload, room) => {
        socket.to(room).emit("delivered", payload);
      // }, 1000);
    });
});
