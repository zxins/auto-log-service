const {Router} = require('express')
const auth = require('./routes/auth')
const autoLog = require('./routes/autolog')
const batch = require('./routes/batch')
const record = require('./routes/record')
const data = require('./routes/data')

module.exports = (app) => {
    const router = Router()
    auth(router)
    autoLog(router)
    batch(router)
    record(router)
    data(router)

    return router
}
