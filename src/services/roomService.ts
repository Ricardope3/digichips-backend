import { findOneFromCollection, insertOneToCollection } from '../db/mongo';
import { Player, Room } from '../models/interfaces';
import {  ROOM_COLLECTION } from '../utils/constants';
import { getCollection } from '../db/mongo';

export const getRoom = async (pin: number): Promise<Room | null> => {
  return await findOneFromCollection(ROOM_COLLECTION, { pin });
};
export const insertRoom = async (room: Room) => {
  return await insertOneToCollection(ROOM_COLLECTION, room);
};
export const updateRoomPlayers = async (room: Room, players: Player[]) => {
    const collection = await getCollection(ROOM_COLLECTION);
    return (await collection.updateOne(room, { $set: { players } })).matchedCount;
};
