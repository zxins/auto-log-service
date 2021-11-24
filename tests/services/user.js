const {localDb} = require('../../src/loaders/mongoose')
const {UserService} = require('../../src/services/user')
const mongoose = require('mongoose')
const UserModel = require('../../src/models/logUser')
const {warn} = require("winston");

async function registerTest() {
    await localDb()

    try {
        const option = {
            username: '17701336952',
            password: '123456'
        }
        const us = new UserService()
        return await us.register(option)
    } finally {
        await mongoose.disconnect()
    }
}

async function checkPasswdTest() {
    await localDb()

    try {
        const us = new UserService()
        const user = await UserModel.findOne({username: '17701336952'}).select('password')
        return await us.checkPassword('123456', user.password)
    } finally {
        await mongoose.disconnect()
    }
}

async function loginTest() {
    await localDb()

    try {
        const us = new UserService()
        return await us.login('17701336952', '123456')
    } finally {
        await mongoose.disconnect()
    }
}

async function updateRolesTest() {
    await localDb()

    try {
        return await UserModel.findOne({username: '17701336952'}).select('cities')
        const cities = '123'
        // return await UserModel.findOneAndUpdate({username: '17701336952'}, {'$set': {'cities':  cities}})
    } finally {
        await mongoose.disconnect()
    }
}

// registerTest().then(res => {
//     console.log(res)
// })

// checkPasswdTest().then(res => {
//     console.log(res)
// })

loginTest().then(res => {
    console.log(res)
})

// updateRolesTest().then(res => {
//     console.log(res.roles)
// })
