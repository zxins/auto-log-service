require('express-async-errors')
const routes = require('../api/index')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('../config/config')
const {ApiException} = require('../utils/exception')
const logger = require('../utils/logger')

module.exports = async (app) => {
    // 测试
    app.get('/status', (req, res) => {
        res.status(200).end()
    })

    app.head('/status', (req, res) => {
        res.status(200).end();
    })

    app.get('/error', async (req, res) => {
        throw new ApiException(111111, 'terrible')
    })

    // 开启真实源IP
    app.enable('trust proxy')

    // 跨域资源访问
    app.use(cors())

    // body-parser
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

    // 将req.body原始字符串转换为json
    // app.use(express.json())

    // 加载api路由
    app.use(config.api.prefix, routes())   // Config.api.prefix,

    // 异常处理
    app.use((err, req, res, next) => {
        if (err instanceof ApiException) {
            return res.send({
                "code": err.code,
                "errMsg": err.message,
                "r": err.r,
            })
        }
        if (err.status === 401) {
            return res.status(401).json({
                r: {},
                errMsg: '请先登录',
                code: 401
            })
        }
        process.env.NODE_ENV === 'dev' ? console.log(err) : logger.error(err)

        // 未知异常返回500，不暴露异常内容
        return res.status(500).json({
            "code": 1,
            "errMsg": "服务器内部错误，暂无法提供服务。",
            "r": {}
        })

    })

}
