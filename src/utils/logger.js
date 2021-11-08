const winston = require('winston')
const Config = require('../config/config')

const transports = []
if (process.env.NODE_ENV !== 'dev') {
    transports.push(new winston.transports.Console())
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.cli(), winston.format.splat()),
        }),
    )
}

// logger实例
const LoggerInstance = winston.createLogger({
    level: Config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({stack: true}),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports,
})

module.exports = LoggerInstance