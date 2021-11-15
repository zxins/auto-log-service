const elasticsearch = require('elasticsearch')
const lodash = require('lodash')
const config = require('../config/config')
const logger = require('../utils/logger')
const Console = require("console");

class ElasticSearchService {
    constructor(
        protocol = config.esProtocol,
        host = config.esHost,
        port = config.esPort,
        username = config.esUsername,
        password = config.esPassword,
    ) {
        this.client = new elasticsearch.Client({
            host: [
                {
                    host: host,
                    auth: `${username}:${password}`,
                    protocol: protocol,
                    port: port
                }
            ]
        })
    }


    /**
     * 索引列表 -
     * 默认返回json格式, 可选yml
     * @returns {Promise<*>}
     */
    async catIndices(format = 'json') {
        return await this.client.cat.indices({
            format: format
        })
    }

    /**
     * 查询索引信息(mappings, settings)
     * @param index
     * @returns {Promise<*>}
     */
    async getIndexInfo(index) {
        try {
            const info = await this.client.indices.get({index: index})
            return info[index].mappings.properties
        } catch (e) {
            if (e.statusCode === 404) {
                if (e.statusCode === 404) {
                    logger.info(`Index not found: ${index}`)
                    return {}
                }
                throw e
            }
        }
    }

    /**
     * ping
     * @returns {Promise<void>}
     */
    async ping() {
        const pingResult = await this.client.ping({
            // ping usually has a 3000ms timeout
            requestTimeout: 1000
        });
        console.log(pingResult)
        return pingResult
    }

    /**
     * 分页条件查询文档
     * @param index 索引
     * @param must 键值对儿列表 [[ke1, val1], [key2, val2], ...]
     * @param range 查询范围, 需要声明字段 eg: { "timestamp": {"gte": 1636774293, "lte": 1636774353}}
     * @param page 页数
     * @param perPage 每页显示数
     * @returns {Promise<{perPage: number, page: number, totalCount, results: *}>}
     */
    async paginateSearchByMatch(index, must = [], range = {}, page = 1, perPage = 10) {
        // query: { bool: { must: [ { match: { key: val } }, { match: { key: val }, ... } ] } }
        let query = {
            bool: {
                must: [],
                filter: {
                    range: range
                }
            }
        }
        must.forEach((pair) => {
            let matchObj = {
                match: {}
            }
            matchObj.match[pair[0]] = pair[1]
            query.bool.must.push(matchObj)
        })
        console.log(query)

        try {
            // 分页查询结果
            const from = (page - 1) * perPage
            const result = await this.client.search({
                index: index,
                body: {
                    query: query,
                    sort: {
                        "@timestamp": {
                            order: "desc"
                        }
                    }
                },
                from: from,
                size: perPage,

            })
            // 符合匹配条件的总数
            const count = await this.client.count({
                index: index,
                body: {query},
            })

            return {
                items: result.hits.hits,
                totalCount: count.count,
                page: page,
                perPage: perPage
            }
        } catch (e) {
            if (e.statusCode === 404) {
                logger.info(`Index not found: ${index}`)
                return {items: [], totalCount: 0, page: page, perPage: perPage}
            }
            throw e
        }
    }


}


module.exports = ElasticSearchService
