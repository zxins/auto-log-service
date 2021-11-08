const {Router} = require('express')
const logger = require('../../utils/logger')
const {AuthService} = require('../../services/auth')
const middlewares = require('../middlewares/index')

const authRouter = Router()

module.exports = (app) => {
    app.use('/auth', authRouter)

    // mock 注册
    authRouter.post('/signup', async (req, res, next) => {
        logger.debug('Calling Sign-Up endpoint with body: %o', req.body);

        try {
            const authService = new AuthService()
            const {user, token} = await authService.mockSignUp()

            return res.json({user, token})
        } catch (e) {
            logger.error('error: %o', e);
            return next(e);
        }
    })

    // mock 登录
    authRouter.post('/signin', async (req, res, next) => {
        const authService = new AuthService()
        const {user, token} = await authService.mockSignIn()
        return res.json({user, token})
    })

    // mock 退出登录
    authRouter.post('/logout', middlewares.isAuth, async (req, res, next) => {
        return res.json({msg: 'logout success'})
    })

    authRouter.get('/scan', async (req, res, next)=>{
        return res.json({code: req.query.code, state: req.query.state})
    })
}
