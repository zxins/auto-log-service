const mongoose = require('mongoose')

const schema = mongoose.Schema({
    env: String,
    cityId: Number,
    batchId: String,
    orders_id: Array,
    drivers_id: Array,
    matrix: Buffer,
    time: Number
}).index({env: 1, cityId: 1, batchId: 1, time: 1})

const DispatchMatrix = mongoose.model('dispatch-matrixes', schema, 'dispatch-matrixes')

module.exports = DispatchMatrix