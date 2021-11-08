const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    env: String,
    cityId: Number,
    batchId: String,
    information: Object,
    debug_info: Object,
    dispatch_count: Number,
    failCount: Number
}).index({env: 1, cityId: 1, batchId: 1})

const DispatchBatch = mongoose.model('dispatch_batchs', schema, 'dispatch_batchs')

module.exports = DispatchBatch