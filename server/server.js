"use strict";
const io = require("socket.io");
const uuid = require("uuid").v4;
const PORT = process.env.PORT || 3000;

const server = io(PORT);

const caps = server.of("/caps");

//=============================================Server=============================================

server.on("connection", (socket) => {
    console.log("CONNECTION FROM:", socket.id);

    socket.on("disconnect", (reason) => {
        console.log("DISCONNECTION FROM:", socket.id, "\nREASON:", reason);
    });
});

//=============================================Caps=============================================

//=======================Queue=======================

const packageQueue = {
    packages: {},
    deliveredPackages: {},
    addPackage: function (pkg) {
        let id = uuid();
        this.packages[id] = pkg;
        console.log("Packages in Queue:", this.packages);
        return {
            id,
            payload: pkg,
        };
    },
    removePackage: function (id) {
        delete packageQueue.packages[id];
        console.log('Removed package.')
    },
    addDelivered: function (pkg) {
        let id = uuid();
        this.deliveredPackages[id] = pkg;
        console.log("deliveredPackages in Queue:", this.deliveredPackages);
        return {
            id,
            payload: pkg,
        };
    },
    removeDelivered: function (id) {
        delete deliveredPackages.packages[id];
        console.log('Removed deliveredPackages.')
    },
};

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

    socket.on("check-orders", () => {
        console.log(`CAPS: Request to check orders from: ${socket.id}`);
        Object.keys(packageQueue.packages).forEach((id) => {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', id)
            socket.emit("package-info", {
                id,
                pkg: packageQueue.packages[id]
            });
        });
    });

    socket.on("pickup-requested", (payload, room) => {
        console.log(`CAPS: A pickup has been requested from: ${socket.id}`);
        let pkg = packageQueue.addPackage(payload);
        socket.to(room).emit("pickup", socket.id, pkg);
    });

    socket.on("in-transit", (pkg, room) => {
        // console.log(
        //     `CAPS: ${socket.id} has picked up order# ${pkg.pkg.payload} and is in transit`
        // );

        console.log("pkg:", pkg);
        packageQueue.removePackage(pkg.id);
        socket.to(room).emit("delivered", pkg);
        console.log("Packages in Queue:", packageQueue.packages);       
    });
});