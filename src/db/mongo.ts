import { Collection } from 'mongodb';
import Mongo from '../models/MongoClient';
import { MONGO_DB } from '../utils/constants';
import logger from '../utils/logger';

const getMongoDB = async () => {
  return (await Mongo.getClient()).db(MONGO_DB);
};

const getCollection = async (collectionName: string): Promise<Collection> => {
  return (await getMongoDB()).collection(collectionName);
};

const insertOneToCollection = async (collectionName: string, docs: any): Promise<void> => {
  const collection = await getCollection(collectionName);
  collection.insertOne(docs, (err, res) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(`Inserted ${res.insertedCount} elements to ${collectionName} collection`);
    }
  });
};

const findAllFromCollection = async (collectionName: string, document: any): Promise<any[]> => {
  const collection = await getCollection(collectionName);
  return await collection.find(document).toArray();
};
const findOneFromCollection = async (collectionName: string, document: any): Promise<any> => {
  const collection = await getCollection(collectionName);
  return await collection.findOne(document);
};

export { insertOneToCollection, findAllFromCollection, findOneFromCollection, getCollection };
