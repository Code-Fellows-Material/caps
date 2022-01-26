"use strict";
const clientIO = require("socket.io-client");

const vendorID = "Mya\'s Munchie Shop";
const vendorClient = clientIO.connect("http://localhost:3000/caps", {
  query: `CustomId=${vendorID}`,
});

const roomID = "Kellen\'s room";

const orders = [
    {
        store: "Mya's Munchies",
        orderID: "e3669048-7313-427b-b6cc-74010ca1f8f0",
        customer: "Kellen Linse",
        address: "Seattle, WA",
    },
];

vendorClient.on("connect", () => {
    console.log("VENDOR CONNECTED");

    vendorClient.emit("join-room", roomID);

    vendorClient.on("message", (from, message, room) => {
        console.log(`MESSAGE IN: ${room} FROM: ${from} MESSAGE: ${message}`);
    });

    setTimeout(() => {
      vendorClient.emit("message", "vendor", "hello from delivery", roomID);
  }, 2000);
});
