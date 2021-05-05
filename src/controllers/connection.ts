import { createRoomEvent, deleteRoomEvent, joinRoomEvent, engageRoom, bet } from "./events";
import { Socket } from "socket.io";
import logger from "../utils/logger";

const onClientConnection = (socket: Socket) => {
    logger.info('Client connected');
    socket.on('create-room', (msg) => {
        createRoomEvent(msg, socket);
    });
    socket.on('delete-room', (msg) => {
        deleteRoomEvent(msg, socket);
    });
    socket.on('join-room', (msg) => {
        joinRoomEvent(msg, socket);
    });
    socket.on('engage-room', (msg) => {
        engageRoom(msg, socket);
    });
    socket.on('say-hello', () => {
        socket.emit('say-hello', { socketId: socket.id })
    });
    socket.on('bet', (msg) => {
        bet(msg, socket);
    });
}

export {
    onClientConnection
}