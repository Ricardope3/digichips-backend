import { joinRoomEventRequest, Player, Room, roomEventRequest, interactWithRoomRequest } from '../models/interfaces';
import logger from '../utils/logger';
import { insertOneToCollection, findOneFromCollection, updateOneFromCollection } from '../db/mongo';
import { PLAYER_COLLECTION, ROOM_COLLECTION } from '../utils/constants';
import { Socket } from 'socket.io';
import { existsInArray } from '../utils/existsInArray';
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
        pin: Math.floor(Math.random() * 9000) + 1000,
    }
    if (!(await findOneFromCollection(PLAYER_COLLECTION, host))) {
        logger.info(`New Player Added ${JSON.stringify(host)}`);
        await insertOneToCollection(PLAYER_COLLECTION, host);
    }
    if (!(await findOneFromCollection(ROOM_COLLECTION, newRoom))) {
        logger.info(`New Room Created${JSON.stringify(newRoom)}`);
        await insertOneToCollection(ROOM_COLLECTION, newRoom);
    }
}
const deleteRoomEvent = async (req: roomEventRequest, socket: Socket) => {
    logger.info(`Incoming delete room event with hostId : ${req.playerId}`,)
}
const joinRoomEvent = async (req: joinRoomEventRequest, socket: Socket) => {
    try {
        logger.info(`Incoming join room event to roomPin : ${req.roomPin}`);
        const newPlayer: Player = {
            _id: req.playerId,
            userName: req.playerUserName ?? 'guest' + Math.floor(Math.random() * 900) + 100,
            points: [],
        }
        const p: Player = await findOneFromCollection(PLAYER_COLLECTION, { _id: req.playerId });
        logger.info(`Existent user found id: ${p._id} username: ${p.userName}`);
        if (!(await findOneFromCollection(PLAYER_COLLECTION, { _id: req.playerId }))) {
            logger.warning(`Player with id: ${req.playerId} not found in DB. Creating it`);
            await insertOneToCollection(PLAYER_COLLECTION, newPlayer);
        }

        const roomInDB: Room = await findOneFromCollection(ROOM_COLLECTION, { pin: req.roomPin });
        logger.info(`Existent room found with roomPin ${roomInDB.pin}`);
        if (!roomInDB) {
            logger.error(`Cant join room with roomPin: ${req.roomPin}. Room doesnt exists`);
            // TODO:
            // Create emit room-not-exists
            return;
        }
        if (!existsInArray(newPlayer._id, roomInDB.players)) {
            roomInDB.players.push(newPlayer);
        }

        if (!(await updateOneFromCollection(ROOM_COLLECTION, { pin: req.roomPin }, roomInDB.players))) {
            logger.error(`Error pusing new player`);
            // TODO:
            // Create emit cant-join-room
            return
        }
        socket.join(roomInDB._id);
        logger.info(`Joined Room with Id: ${roomInDB._id}`);
    } catch (error) {
        logger.error(error);
    }
}

const engageRoom = async (req: interactWithRoomRequest, socket: Socket) => {
    const roomInDB: Room = await findOneFromCollection(ROOM_COLLECTION, { pin: req.roomPin });
    logger.info(`Existent room found with pin ${roomInDB.pin}`);
    socket.to(roomInDB._id).emit('say-hello', { pin: roomInDB.pin });
}

export {
    createRoomEvent,
    deleteRoomEvent,
    joinRoomEvent,
    engageRoom
}