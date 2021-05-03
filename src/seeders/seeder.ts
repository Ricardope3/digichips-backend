import Mongo from '../db/MongoClient';
import { allPlayers, allRooms } from '../utils/props'
import assert = require('assert')
import { MONGO_DB } from '../utils/constants';
const roomSeeder = async () => {
    const db = (await Mongo.getClient()).db(MONGO_DB);
    const playersCollection = db.collection('players');
    playersCollection.insertMany(allPlayers, (err, result) => {
        assert.strictEqual(err, null);
        assert.strictEqual(allPlayers.length, result.result.n);
    });
    const roomCollection = db.collection('rooms');
    roomCollection.insertMany(allRooms, (err, result) => {
        assert.strictEqual(err, null);
        assert.strictEqual(allRooms.length, result.result.n);
    });
}
export { roomSeeder }