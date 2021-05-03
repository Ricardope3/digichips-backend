import { Collection } from 'mongodb';
import Mongo from '../db/MongoClient';
import { MONGO_DB } from '../utils/constants';
import logger from '../utils/logger';

const getMongoDB = async () => {
    return (await Mongo.getClient()).db(MONGO_DB,);
}

const getCollection = async (collectionName: string) => {
    return (await getMongoDB()).collection(collectionName);
};

const insertOneToCollection = async (collectionName: string, docs: any) => {
    const collection = await getCollection(collectionName);
    collection.insertOne(docs, (err, res) => {
        if (err) {
            logger.error(JSON.stringify(err));
        } else {
            logger.info(`Inserted ${res.insertedCount} elements to Collection ${collectionName}`);
        }
    });
};

const findAllFromCollection = async (collectionName: string, document: any) => {
    const collection = await getCollection(collectionName);
    return await collection.find(document).toArray();
}
const findOneFromCollection = async (collectionName: string, document: any) => {
    const collection = await getCollection(collectionName);
    return await collection.findOne(document);
}

const updateOneFromCollection = async (collectionName: string, filter: any, doc: any) => {
    const collection = await getCollection(collectionName);
    return (await collection.updateOne(filter,doc)).matchedCount;
}
export {
    insertOneToCollection,
    findAllFromCollection,
    findOneFromCollection,
    updateOneFromCollection
};