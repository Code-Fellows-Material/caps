"use strict";
const clientIO = require("socket.io-client");

const deliveryID = "Sarah's Delivery Service";
const deliveryClient = clientIO.connect("http://localhost:3000/caps", {
    query: `CustomId=${deliveryID}`,
});

const roomID = "Kellen's room";

deliveryClient.on("connect", () => {
    logger("DELIVERY CONNECTED");

    deliveryClient.emit("join-room", roomID);

    // setTimeout(() => {
    //     deliveryClient.emit("message", "Hello from vendor", roomID);
    // }, 500);

    // Listen
    deliveryClient.on("message", (from, message, room) => {
      logger(`MESSAGE IN: ${room} FROM: ${from} MESSAGE: ${message}`);
    });

    deliveryClient.on("pickup", (from, payload) =>{
      logger(`DELIVERY: Pickup Requested From: ${from}`);
      logger(`DELIVERY: Picking Up: order #${payload.orderID}`);
      deliveryClient.emit("in-transit", payload, roomID);
    });
});



const logger = (message) => {
  console.log(message)
}

module.exports = {log: logger};