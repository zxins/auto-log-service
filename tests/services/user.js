const {db, localDb} = require('../../src/loaders/mongoose')
const {UserService} = require('../../src/services/user')
const mongoose = require('mongoose')
const UserModel = require('../../src/models/logUser')
const {warn} = require("winston");

async function registerTest() {
    await db()

    try {
        const option = {
            username: '17701336953',
            password: 'zx3620382',
            name: '朱鑫',
            memo: '郑州-大数据',
            roles: 'admin',
            cities: 'all'
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
    await db()

    try {
        // return await UserModel.findOne({username: '17701336953'}).select('cities')
        const cities = []
        return await UserModel.findOneAndUpdate({username: '17701336953'}, {'$set': {'cities':  cities, 'roles': ['admin']}})
    } finally {
        await mongoose.disconnect()
    }
}

async function updateTest() {
    await localDb()

    try {
        const options = {
            roles: ['admin'],
            cities: ['all']
        }
        const us = new UserService()
        return await us.update('619eebe7cc1c468b7dd36983', options)
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

// loginTest().then(res => {
//     console.log(res)
// })

updateRolesTest().then(res => {
    console.log(res.roles)
})

// updateTest().then(res=>{
//     console.log(res)
// })
