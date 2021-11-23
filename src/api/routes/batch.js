const {Router} = require('express')
const moment = require('moment')
const logger = require("../../utils/logger")
const {MatrixService} = require('../../services/matrix')
const {BatchService} = require('../../services/batch')


const router = Router()

module.exports = (app) => {
    app.use('/batches', router)
    const matrixServ = new MatrixService()
    const batchServ = new BatchService()

    //  获取批次指派详情 /batches?id=xxx
    router.get('', async (req, res, next) => {
        const id = req.query.id
        let item = await matrixServ.info(id, true)
        item = item.toObject()
        const info = await batchServ.info(id)
        return res.json({r: item, msg: '', code: 0})
    })

    // 指派矩阵二进制数据    /batches/matrix?id=xxx
    router.get('/matrix', async (req, res, next) => {
        const id = req.query.batchId
        matrixServ.info(id, false).then(item => {
            const data = item.matrix
            res.writeHead(200, {
                'Content-Type': 'application/zip',
                'Content-disposition': 'attachment;filename=' + id + '.matrix',
                'Content-Length': data.length
            })
            res.end(Buffer.from(data, 'binary'))
        })
    })

    // 条件查询批次列表 /batches/search?city=xx&orderId=xx&...&page=1&pageSize=100...
    router.get('/search', async (req, res, next) => {
        const page = parseInt(req.query.page || 1)
        const pageSize = parseInt(req.query.rows || 50)
        const options = {}
        const times = []

        // TODO: DO层封装
        const env = req.query.env
        const city = req.query.city
        const orderId = parseInt(req.query.orderId, 0)
        const driverId = parseInt(req.query.driverId, 0)
        const startTime = req.query.startTime
        const endTime = req.query.endTime
        const filter_ok = req.query.filter_ok === 'true'

        if (env) options.env = env
        if (city) options.cityId = parseInt(city)
        if (orderId) options.orders_id = {$elemMatch: {$eq: orderId}}
        if (driverId) options.drivers_id = {$elemMatch: {$eq: driverId}}
        if (startTime) times.push({time: {$gte: moment(startTime, 'YYYY-MM-DD').toDate().getTime()}})
        if (endTime) times.push({time: {$lt: moment(endTime, 'YYYY-MM-DD').add(1, 'day').toDate().getTime()}})
        if (times.length > 0) options.$and = times
        if (filter_ok) options.filter_ok_count = {$gt: 0}

        const count = await matrixServ.count(options)
        const records = await matrixServ.search(page, pageSize, options)
        return res.json({r: {total: count, rows: records}, msg: '', code: 0})
    })
}
