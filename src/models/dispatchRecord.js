const mongoose = require('mongoose')

const schema = mongoose.Schema({
    env: String,
    cityId: Number,
    version: String,
    batchId: String,
    info: Object,
    time: Number,
    success: Boolean
}).index({env: 1, cityId: 1, batchId: 1, time: 1, success: 1}).index({batchId: 1}, {unique: true})

const DispatchRecord = mongoose.model('dispathc_records', schema)

module.exports = DispatchRecord