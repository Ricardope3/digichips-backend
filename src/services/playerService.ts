import { findOneFromCollection, insertOneToCollection } from '../db/mongo';
import { Player } from '../models/interfaces';
import { PLAYER_COLLECTION } from '../utils/constants';

export const getPlayer = async (_id: string): Promise<Player | null> => {
  return await findOneFromCollection(PLAYER_COLLECTION, { _id });
};

export const insertPlayer = async (player: Player) => {
  return await insertOneToCollection(PLAYER_COLLECTION, player);
};
