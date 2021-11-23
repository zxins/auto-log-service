const {Router} = require('express')
const {RecordService} = require('../../services/record')


const router = Router()

module.exports = (app) => {
    app.use('/records', router)


    router.get('/search', async (req, res, next) => {
        const page = parseInt(req.query.page || 1)
        const pageSize = parseInt(req.query.rows || 50)

        const options = {}
        const env = req.query.env
        const city = req.query.city
        const batchId = req.query.batchId

        if(env) options.env = env
        if(city) options.cityId = parseInt(city)
        if(batchId) options.batchId = batchId

        const recordServ = new RecordService()
        const count = await recordServ.count(options);
        const records = await recordServ.search(page, pageSize, options);

        return res.json({r: {total: count, rows: records}, msg: '', code: 0})
    })

    router.get('/', async (req, res, next) => {
        const id = req.query.id;

        const recordServ = new RecordService()
        const info = await recordServ.info(id)
        return res.json({r: info, msg: '', code: 0})
    })
}
