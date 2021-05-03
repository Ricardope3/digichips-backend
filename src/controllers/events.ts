import { joinRoomEventRequest, Player, Room, roomEventRequest } from '../models/interfaces';
import logger from '../utils/logger';
import { insertOneToCollection, findOneFromCollection, updateOneFromCollection } from '../datasource/mongo';
import { PLAYER_COLLECTION, ROOM_COLLECTION } from '../utils/constants';
import { Socket } from 'socket.io';
const createRoomEvent = async (req: roomEventRequest, socket: Socket) => {
    logger.info(`Incoming create room event with hostId : ${req.playerId}`,);
    const host: Player = {
        _id: req.playerId,
        userName: req.playerUserName ?? 'Host',
        points: []
    }
    const newRoom: Room = {
        hostId: host._id,
        players: [host],
        _id: socket.id,
    }
    if (!(await findOneFromCollection(PLAYER_COLLECTION, host))) {
        logger.info(`New Player Added`, JSON.stringify(host));
        await insertOneToCollection(PLAYER_COLLECTION, host);
    }
    if (!(await findOneFromCollection(ROOM_COLLECTION, newRoom))) {
        logger.info(`New Room Created`, JSON.stringify(newRoom));
        await insertOneToCollection(ROOM_COLLECTION, newRoom);
    }
}
const deleteRoomEvent = async (req: roomEventRequest, socket: Socket) => {
    logger.info(`Incoming delete room event with hostId : ${req.playerId}`,)
}
const joinRoomEvent = async (req: joinRoomEventRequest, socket: Socket) => {
    logger.info(`Incoming join room event to roomId : ${req.roomId}`);
    socket.join(req.roomId);
    const newPlayer: Player = {
        _id: req.playerId,
        userName: req.playerUserName ?? 'guest',
        points: [],
    }
    const roomInDB: Room = await findOneFromCollection(ROOM_COLLECTION, { _id: req.roomId });
    if (!roomInDB) {
        logger.error(`Cant join room with roomId: ${req.roomId}. Room doesnt exists`);
        return;
    }
    roomInDB.players.push(newPlayer);

    if (!(await updateOneFromCollection(ROOM_COLLECTION, { _id: req.roomId }, roomInDB))) {
        logger.error(`Error pusing new player`);
    }
}

export {
    createRoomEvent,
    deleteRoomEvent,
    joinRoomEvent
}