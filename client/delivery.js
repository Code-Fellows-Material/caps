"use strict";
const clientIO = require("socket.io-client");

const deliveryID = "Sarah\'s Delivery Service";
const deliveryClient = clientIO.connect("http://localhost:3000/caps", {
    query: `CustomId=${deliveryID}`,
});

const roomID = "Kellen\'s room";

deliveryClient.on("connect", () => {
    console.log("DELIVERY CONNECTED");

    deliveryClient.emit("join-room", roomID);

    setTimeout(() => {
        deliveryClient.emit("message", "deliver", "Hello from vendor", roomID);
    }, 2000);

    deliveryClient.on("message", (from, message, room) => {
        console.log(`MESSAGE IN: ${room} FROM: ${from} MESSAGE: ${message}`);
    });
});
