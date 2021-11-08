const dotenv = require('dotenv')
const path = require('path')

// 服务器配置环境变量NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// 加载环境配置文件
const envFound = dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`)
})
if (envFound.error){
    throw new Error("Couldn't find .env file.");
}
// console.log(envFound.parsed)

// 配置项
const Config = {
    // 服务
    port: parseInt(process.env.PORT, 10),

    // mongoDB
    mongoUri: process.env.MONGODB_URI,

    // jwt
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,

    // 日志
    logs: {
        level: 'debug',
    },

    api: {
        prefix: '/api'
    },
}


module.exports = Config