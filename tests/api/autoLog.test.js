const axios = require('axios')
const moment = require('moment')
const Config = require('../../src/config/config')

root = `http://127.0.0.1:${Config.port}/api/auto_log`

function testGetInfo(query) {
    const timestamp = query.timestamp
    const date = moment(timestamp).format('yyyy-MM-DD')
    const url = `${root}/${date}/mappings`
    axios.get(url, {
        params: query
    }).then((res) => {
        const mappings = res.data['r']
        console.log('%o', mappings)
        return mappings
    })
}

function testPaginateHits(query) {
    const timestamp = query.timestamp
    const date = moment(timestamp).format('yyyy-MM-DD')
    const url = `${root}/${date}/hits`

    axios.get(url, {}).then((res) => {
        const items = res.data.r
        console.log('%o', items)
        return items
    })
}

const query = {
    timestamp: '2021-11-13 15:00:00'
}
// testGetInfo(query)
testPaginateHits(query)
