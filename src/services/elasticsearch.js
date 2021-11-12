const elasticsearch = require('elasticsearch')
const lodash = require('lodash')
const config = require('../config/config')
const logger = require('../utils/logger')

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
        return await this.client.indices.get({index: index})
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
     * @param match 匹配键值对 {k: v}
     * @param page 页数
     * @param perPage 每页显示数
     * @returns {Promise<{perPage: number, page: number, totalCount, results: *}>}
     */
    async paginateSearchByMatch(index, match = {}, page = 1, perPage = 10) {
        const matchKey = lodash.isEmpty(match) ? 'match_all' : 'match'  // 自动转全匹配
        let query = {}
        query[matchKey] = match
        const from = (page - 1) * perPage

        try {
            // 分页查询结果
            const result = await this.client.search({
                index: index,
                body: {query: query},
                from: from,
                size: perPage
            })
            // 符合匹配条件的总数
            const count = await this.client.count({
                index: index,
                body: {query: query},
            })

            return {
                results: result.hits.hits,
                totalCount: count.count,
                page: page,
                perPage: perPage
            }
        } catch (e) {
            if (e.statusCode === 404) {
                logger.info(`Index not found: ${index}`)
                return {results: [], totalCount: 0, page: page, perPage: perPage}
            }
            throw e
        }
    }


}


module.exports = ElasticSearchService
