const {Router} = require('express')
const middlewares = require('../middlewares/index')
const {UserService} = require('../../services/user')

const router = Router()

module.exports = (app) => {
    app.use('/users', router)

    // 注册，其实是由管理员添加
    router.post('/register', async (req, res, next) => {
        const username = req.body.username
        const password = req.body.password
        const name = req.body.name || ''
        const roles = req.body.roles || []
        const cities = req.body.cities || []
        const avatar = req.body.avatar
        const memo = req.body.memo

        const options = {}
        options.username = username
        options.password = password
        options.name = name
        options.roles = roles
        options.cities = cities
        if (memo) options.memo = memo
        if (avatar) options.avatar = avatar

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
        const userServ = new UserService()
        let info = await userServ.info(req.token.user._id)
        const result = info.toObject()
        result.roles = info.roles || []
        result.cities = info.cities || []

        result.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        return res.json({
            r: result, msg: '', code: 0
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
        return res.json({r: {users: users}, msg: '', code: 0})
    })

    router.put('/:uid', middlewares.isAuth, async (req, res, next) => {
        const roles = req.body.roles
        const cities = req.body.cities
        const avatar = req.body.avatar
        const name = req.body.name
        const memo = req.body.memo
        const password = req.body.password

        const options = {}
        if (roles) options.roles = roles
        if (cities) options.cities = cities
        if (avatar) options.avatar = avatar
        if (name) options.name = name
        if (memo) options.memo = memo
        if (password) options.password = password

        const uid = req.params.uid
        const userServ = new UserService()
        await userServ.update(uid, options)
        return res.json({r: {}, msg: '更新成功', code: 0})

    })
}
