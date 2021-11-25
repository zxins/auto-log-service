const assert = require("assert")
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: String,   // 手机号
    password: {
        type: String,
        select: false,  // 不查询
        set(val) {
            return bcrypt.hashSync(val, 10) // 加密算法
        }
    },
    name: String,   // 真实姓名
    avatar: String, // 头像
    memo: String,   // 备注
    roles: {
        type: String,
        default: '',
        set(val) {
            // assert(val instanceof Array, '类型错误, roles应是一个Array')
            if (val instanceof Array){
                return val.join(',')
            }else if (val instanceof String){
                return val
            }
        },
        get(val) {
            return val ? val.split(',') : []
        }
    },  // 用户角色
    cities: {
        type: String,
        default: '',
        set(val) {
            // assert(val instanceof Array, '类型错误, cities应是一个Array')
            if (val instanceof Array){
                return val.join(',')
            }else if (val instanceof String){
                return val
            }
        },
        get(val) {
            return val.split(',')
        }
    },   // 用户可查看城市信息
    createAt: {
        type: Number,
        default: Date.now()
    },
    updateAt: {
        type: Number,
        default: Date.now()
    },
}).index({username: 1}, {unique: true})

module.exports = mongoose.model('log_user', schema, 'log_user')
