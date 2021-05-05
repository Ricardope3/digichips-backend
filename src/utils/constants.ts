export const environment = process.env;
export const PORT = environment.PORT;
export const MONGO_PATH = environment.MONGO_PATH;
export const MONGO_DB = environment.MONGO_DB;

export const ROOM_COLLECTION = 'rooms';
export const PLAYER_COLLECTION = 'players';

export const serverOptions = {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
};
