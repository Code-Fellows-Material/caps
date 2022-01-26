"use strict";
const clientIO = require("socket.io-client");

const vendorID = "Mya's Munchie Shop";
const vendorClient = clientIO.connect("http://localhost:3000/caps", {
    query: `CustomId=${vendorID}`,
});

const roomID = "Kellen's room";

const orders = [
    {
        store: "Mya's Munchies",
        orderID: "2",
        customer: "Kellen Linse",
        address: "Seattle, WA",
    },
];

vendorClient.on("connect", () => {
  logger("VENDOR CONNECTED");

    vendorClient.emit("join-room", roomID);

    setTimeout(() => {
      logger(`VENDOR: Requesting Pickup`)
      vendorClient.emit("pickup-requested", orders[0], roomID);
    }, 2000);

    // setTimeout(() => {
    //   vendorClient.emit("message", "hello from delivery", roomID);
    // }, 500);

    // Listen
    vendorClient.on("message", (from, message, room) => {
      logger(`MESSAGE IN: ${room} FROM: ${from} MESSAGE: ${message}`);
    });
    vendorClient.on("delivered", (payload) =>
      logger(`VENDOR: Thank you for delivering order# ${payload.orderID}`)
    );
});


const logger = (message) => {
  console.log(message)
}

module.exports = {log: logger};