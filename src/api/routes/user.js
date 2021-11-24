const {Router} = require('express')
const logger = require('../../utils/logger')
const middlewares = require('../middlewares/index')
const {UserService} = require('../../services/user')
const {next} = require("lodash/seq");

const router = Router()

module.exports = (app) => {
    app.use('/users', router)

    // 注册，其实是由管理员添加
    router.post('/register', async (req, res, next) => {
        const username = req.body.username
        const password = req.body.password
        const memo = req.body.memo

        const options = {}
        options.username = username
        options.password = password
        options.memo = memo

        const userServ = new UserService()
        await userServ.register(options)

        return res.json({r: {}, msg: '添加成功', code: 0})
    })

    router.post('/login', async (req, res, next) => {
        const username = req.body.username
        const password = req.body.password

        const userServ = new UserService()
        const token = await userServ.login(username, password)
        return res.json({r: {token: token}, msg: '登录成功', code: 20000})
    })

    router.get('/info', middlewares.isAuth, async (req, res, next) => {
        return res.json({
            r: {
                roles: ['admin'],
                introduction: 'I am an admin',
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                name: 'Normal Editor'
            }, msg: '', code: 0
        })

    })


    router.post('/logout', middlewares.isAuth, async (req, res, next) => {
        return res.json({r: {}, msg: 'logout success', code: 0})
    })

    router.get('', middlewares.isAuth, async (req, res, next) => {
        const page = req.query.page || 1
        const pageSize = req.query.pageSize || 50

        const options = {}

        const userServ = new UserService()
        const users = await userServ.search(page, pageSize, options)
        return res.json({r: {users: users},})
    })
}
