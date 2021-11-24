const bcrypt = require('bcrypt')
const lodash = require('lodash')
const UserModel = require('../models/logUser')
const {ApiException} = require('../utils/exception')
const {signData} = require("../utils/token");
const DispatchRecord = require("../models/dispatchRecord");

class UserService {

    async register(options = {}) {
        try {
            return await UserModel.create(options)
        } catch (e) {
            if (e.code === 11000) {
                throw new ApiException(11000, '用户名已存在')
            }
            throw e
        }
    }

    async checkPassword(password, passwordHash) {
        return await bcrypt.compareSync(password, passwordHash)
    }

    async generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 7);

        const payload = {
            exp: exp.getTime() / 1000,
        }
        Object.assign(payload, user)

        return await signData(payload)
    }

    async login(username, password) {
        const validUser = await UserModel.findOne({username: username}).select('password')
        if (lodash.isEmpty(validUser)) {
            throw new ApiException(10000, '账号或密码错误')
        }
        const isValid = await this.checkPassword(password, validUser.password)
        if (isValid) {
            const user = await UserModel.findOne({username: username}).exec()
            return await this.generateToken(user)
        } else {
            throw new ApiException(10000, '账号或密码错误')
        }
    }

    async count(options) {
        options = options || {};
        return await UserModel.count(options)
    }

    async search(page, pageSize, options) {
        options = options || {};
        return await UserModel.find(options)
            .sort({createAt: 'desc'})
            .skip((page - 1) * pageSize)
            .limit(pageSize).exec();
    }

}

module.exports = {UserService}
