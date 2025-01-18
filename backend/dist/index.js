"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const uuid_1 = require("uuid");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on('connection', (socket) => {
    const userId = (0, uuid_1.v4)();
    socket.send(JSON.stringify({
        type: 'id',
        id: userId
    }));
    socket.on('message', (message) => {
        var _a;
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type == "chat") {
            const currentUserRoom = (_a = allSockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            //@ts-ignore
            const mess = {
                type: "chat",
                message: parsedMessage.payload.message,
                id: userId
            };
            allSockets.filter((x) => x.room == currentUserRoom).map((y) => y.socket.send(JSON.stringify(mess)));
        }
        if (parsedMessage.type == "leave") {
            allSockets = allSockets.filter((x) => x.socket != socket);
        }
    });
});
