const {Router} = require('express')
const moment = require('moment')
const logger = require("../../utils/logger")
const ElasticSearchService = require('../../services/elasticsearch')


const indexPrefix = 'auto-logs-'    // 先写死

const router = Router()


module.exports = (app) => {
    app.use('/auto_log', router)


    // get index info
    router.get('/:date/info', async (req, res, next) => {
        const date = req.params.date
        const index = indexPrefix + moment(date).format('YYYY.MM.DD')

        const esServ = new ElasticSearchService()
        const info = await esServ.getIndexInfo(index)
        return res.json({r: info, 'msg': '', code: 0})
    })

    // get index mappings
    router.get('/:date/mappings', async (req, res, next) => {
        const date = req.params.date
        const index = indexPrefix + moment(date).format('YYYY.MM.DD')

        const esServ = new ElasticSearchService()
        const info = await esServ.getIndexInfo(index)
        return res.json({r: info, 'msg': '', code: 0})
    })


    // paginate search hits by match
    router.post('/:date/hits', async (req, res, next) => {
        logger.debug(
            `Calling auto_log_date endpoint with \nbody: %o \nparams: %o \nquery: %o`, req.body, req.params, req.query
        );

        const date = req.params.date
        const index = indexPrefix + moment(date).format('YYYY.MM.DD')
        const match = req.body.must || []
        const range = req.body.range || {}
        const page = req.query.page || 1
        const perPage = req.query.perPage || 10


        const esServ = new ElasticSearchService()
        const pagination = await esServ.paginateSearchByMatch(index, match, range, page, perPage)

        return res.json({r: pagination, msg: '', code: 0})
    })


}
