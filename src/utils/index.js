const winston = require('winston');
const { simple, combine, timestamp, colorize } = winston.format;

const logFormat = combine(
    simple(),
    timestamp(),
    colorize()
);

const logger = (() => {
    return winston.createLogger({
        format: logFormat,
        transports: [new winston.transports.Console()]
    });
})();

module.exports = {logFormat, logger}
