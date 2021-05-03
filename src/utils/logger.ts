import winston = require('winston')


const myCustomLevels = {
    levels: {
        info: 0,
        error: 1,
        warning: 2,
    },
    colors: {
        info: 'blue',
        warning: 'yellow',
        error: 'red'
    }
};

winston.addColors(myCustomLevels.colors);
const logger = winston.createLogger({
    levels: myCustomLevels.levels,
    format: winston.format.combine(
        winston.format.cli(),
        winston.format.colorize(),
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

export default logger;