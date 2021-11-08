const mongoose = require("mongoose");
const Config = require('../config/config')

module.exports = async () => {
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