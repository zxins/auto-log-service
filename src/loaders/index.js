const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')

module.exports = async (app) => {
    await expressLoader(app)
    console.log('Express loaded')

    await mongooseLoader(app)
    console.log('Mongoose loaded')
}