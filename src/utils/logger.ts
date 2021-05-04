import winston = require('winston')


const colors = {
    info: 'blue',
    error: 'red',
    warning: 'yellow',
};

winston.addColors(colors);
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf((debug) => {
            const {
                level, message, ...args
            } = debug;
            return `${level} ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

export default logger;