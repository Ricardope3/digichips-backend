const environment = process.env;
const PORT = environment.PORT
const MONGO_PATH = environment.MONGO_PATH;
const MONGO_DB = environment.MONGO_DB;

const ROOM_COLLECTION = 'rooms'
const PLAYER_COLLECTION = 'players'

const serverOptions = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
};
export {
    PORT,
    MONGO_PATH,
    MONGO_DB,
    ROOM_COLLECTION,
    PLAYER_COLLECTION,
    serverOptions
}