"use strict";
const clientIO = require("socket.io-client");

const deliveryID = "Sarah's Delivery Service";
const deliveryClient = clientIO.connect("http://localhost:3000/caps", {
    query: `CustomId=${deliveryID}`,
});

const roomID = "Kellen's room";

deliveryClient.on("connect", () => {
    logger("DELIVERY CONNECTED");

    joinRoom(roomID);
    checkOrders();

    // Listen
    deliveryClient.on("package-info", (pkg) => {
        console.log("Package Info:", pkg.id);
        if(pkg) deliveryClient.emit("in-transit", pkg, roomID);
    });

    deliveryClient.on("message", (from, message, room) => {
        logger(`MESSAGE IN: ${room} FROM: ${from} MESSAGE: ${message}`);
    });

    deliveryClient.on("pickup", (from, pkg) => {
        logger(`DELIVERY: Pickup Requested From: ${from}`);
        logger(`DELIVERY: Picking Up: order #${pkg.payload.orderID}`);
        setTimeout(() => {
            deliveryClient.emit("in-transit", pkg, roomID);
        }, 2000);
    });
});

//=========================================Helper Functions=========================================

function send(payload, room) {
    deliveryClient.emit("message", payload, room);
}

function checkOrders() {
    deliveryClient.emit("check-orders");
}

function joinRoom(room) {
    deliveryClient.emit("join-room", room);
}

const logger = (message) => {
    console.log(message);
};

module.exports = { log: logger };
