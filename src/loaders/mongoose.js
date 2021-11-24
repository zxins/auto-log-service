const mongoose = require("mongoose");
const Config = require('../config/config')

async function db() {
    const db = mongoose.connection
    db.on('connected', function (err) {
        if (err) {
            console.log('连接数据库失败：' + err);
        } else {
            console.log('连接数据库成功！');
        }
    });
    db.on('disconnected', function () {
        console.error('数据库连接断开!');
    })
    const connect = await mongoose.connect(Config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return connect.connection.db;
}

// local test
async function localDb() {
    const db = mongoose.connection
    db.on('connected', function (err) {
        if (err) {
            console.log('连接数据库失败：' + err);
        } else {
            console.log('连接数据库成功！');
        }
    });
    db.on('disconnected', function () {
        console.error('数据库连接断开!');
    })
    const connect = await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return connect.connection.db;
}

module.exports = { db, localDb }
