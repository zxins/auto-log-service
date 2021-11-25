const expressLoader = require('./express')
const {db, localDb} = require('./mongoose')

module.exports = async (app) => {
    await expressLoader(app)
    console.log('Express loaded')

    // await db(app)
    await db(app)
    console.log('Mongoose loaded')
}
