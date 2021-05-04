import { MongoClient } from "mongodb";
import { MONGO_PATH } from "../utils/constants";
import logger from "../utils/logger";

const getMongoClient = async () => {
    return (await MongoClient.connect(MONGO_PATH, { useUnifiedTopology: true, forceServerObjectId: true, }));
};

class Mongo {
    static client: Promise<MongoClient>
    constructor() {
        logger.error('Use Mongo.getClient()');
    }
    static getClient() {
        if (!Mongo.client) {
            Mongo.client = getMongoClient();
        }
        return Mongo.client;
    }
}
export default Mongo;