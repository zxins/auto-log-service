const {Router} = require('express')
const auth = require('./routes/auth')
const autoLog = require('./routes/autolog')

module.exports = (app) => {
    const router = Router()
    auth(router)
    autoLog(router)

    return router
}
