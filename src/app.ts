import dotenv = require('dotenv');
dotenv.config()
import { createServer } from "http";
import { PORT, serverOptions } from './utils/constants'
import { Server } from "socket.io";
import { onClientConnection } from './controllers/connection';
import logger from './utils/logger'
import Mongo from './db/MongoClient';
import { MongoClient } from 'mongodb';

const app = require("express")();
const httpServer = createServer(app);
const io = new Server(httpServer, serverOptions);

io.on("connection", onClientConnection);

let client: MongoClient;
const server = httpServer.listen(PORT, async () => {
    logger.info(`Server started on port ${PORT}`);
    client = await Mongo.getClient();
    logger.info(`Connected to mongoDB`)
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            client.close();
            logger.info('MongoClient closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGINT', () => {
    logger.info('SIGINT received');
    exitHandler();
});