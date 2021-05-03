import { createRoomEvent, deleteRoomEvent, joinRoomEvent } from "./events";
import { Socket } from "socket.io";
import logger from "../utils/logger";

const onClientConnection = (socket: Socket) => {
    logger.info('Client connected')
    socket.on('create-room', (msg) => {
        createRoomEvent(msg, socket);
    });
    socket.on('delete-room', (msg) => {
        deleteRoomEvent(msg, socket);
    });
    socket.on('join-room', (msg) => {
        joinRoomEvent(msg, socket);
    });
}

export {
    onClientConnection
}