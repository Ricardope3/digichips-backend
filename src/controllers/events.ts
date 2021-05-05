import {
  joinRoomEventRequest,
  Player,
  Room,
  roomEventRequest,
  interactWithRoomRequest,
  betRequest,
} from '../models/interfaces';
import logger from '../utils/logger';
import { Socket } from 'socket.io';
import { existsInArray } from '../utils/existsInArray';
import { getPlayer, insertPlayer } from '../services/playerService';
import { getRoom, insertRoom, updateRoomPlayers } from '../services/roomService';
export const createRoomEvent = async (req: roomEventRequest, socket: Socket) => {
  try {
    logger.info(`Incoming create room event with hostId : ${req.playerId}`);
    const host: Player = {
      _id: req.playerId,
      userName: req.playerUserName ?? 'Host',
      points: [],
    };
    const room: Room = {
      hostId: host._id,
      players: [host],
      _id: socket.id,
      pin: Math.floor(Math.random() * 9000) + 1000,
    };
    if (!(await getPlayer(host._id))) {
      logger.info(`New Player Added`, host);
      await insertPlayer(host);
    }
    if (!(await getRoom(room.pin))) {
      logger.info(`New Room Created`, room);
      await insertRoom(room);
    }
  } catch (error) {
    logger.error(error);
  }
};
export const deleteRoomEvent = async (req: roomEventRequest, socket: Socket) => {
  logger.info(`Incoming delete room event with hostId: ${req.playerId}`);
};
export const joinRoomEvent = async (req: joinRoomEventRequest, socket: Socket) => {
  try {
    logger.info(`Incoming join room event to roomPin: ${req.roomPin}`);
    const player: Player = {
      _id: req.playerId,
      userName: req.playerUserName ?? 'guest' + (Math.floor(Math.random() * 900) + 100),
      points: [],
    };
    if (!getPlayer(player._id)) {
      logger.warn(`Player with id: ${player._id} not found in DB. Creating it`);
      await insertPlayer(player);
    }

    const roomInDB: Room = await getRoom(req.roomPin);
    logger.info(`Existent room found with roomPin ${roomInDB.pin}`);
    if (!roomInDB) {
      logger.error(`Cant join room with roomPin: ${req.roomPin}. Room doesnt exists`);
      // TODO:
      // Create emit room-not-exists
      return;
    }
    logger.warn("Room",roomInDB);
    if (!existsInArray(player._id, roomInDB.players)) {
      roomInDB.players.push(player);
    }
    logger.warn("Room",roomInDB);
    if (!(await updateRoomPlayers(roomInDB, roomInDB.players))) {
      logger.error(`Error pusing new player`);
      // TODO:
      // Create emit cant-join-room
      return;
    }
    socket.join(roomInDB._id);
    logger.info(`Joined Room with Id: ${roomInDB._id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const engageRoom = async (req: interactWithRoomRequest, socket: Socket) => {
  try {
    const roomInDB: Room = await getRoom(req.roomPin);
    logger.info(`Existent room found with pin ${roomInDB.pin}`);
    socket.to(roomInDB._id).emit('say-hello', { pin: roomInDB.pin });
  } catch (error) {
    logger.error(error);
  }
};

export const bet = async (req: betRequest, socket: Socket) => {
  try {
    const room = getRoom(req.roomPin);
  } catch (error) {
    logger.error(error);
  }
};

