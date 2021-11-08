const {Router} = require('express')
const auth = require('./routes/auth')

module.exports = (app) => {
    const router = Router()
    auth(router)

    return router
}