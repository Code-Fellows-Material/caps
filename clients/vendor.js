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

  //================================ Listen==============================================
  logger("VENDOR CONNECTED");

  joinRoom(roomID);

  setTimeout(() => {
    logger(`VENDOR: Requesting Pickup`)
    requestPickup(orders[0], roomID);
  }, 2000);

    // setTimeout(() => {
    //   send("Hi!", room);
    // }, 500);

  //================================ Listen==============================================

    vendorClient.on("message", (from, message, room) => {
      logger(`MESSAGE IN: ${room} FROM: ${from} MESSAGE: ${message}`);
    });
    vendorClient.on("delivered", (pkg) =>
      logger(`VENDOR: Thank you for delivering order #${JSON.stringify(pkg.pkg.orderID)}`)
    );
  
});


//=========================================Helper Functions=========================================

function send(payload, room){
  vendorClient.emit("message", payload, room);
}

function requestPickup(order, room){
  vendorClient.emit("pickup-requested", order, room);
}

function joinRoom(room){
  vendorClient.emit("join-room", room);
}

const logger = (message) => {
    console.log(message);
};

module.exports = { log: logger };
