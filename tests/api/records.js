8
const axios = require('axios')
const moment = require('moment')
const Config = require('../../src/config/config')

root = `http://127.0.0.1:${Config.port}/api/records`
// root = `http://127.0.0.1:3002/records`

function recordSearchApiTest(){
    const query = {
        batchId: '7ee6f2da4c0b11ec81840255ac11007d'
    }
    const url = `${root}/search`
    axios.get(url, {
        params: query
    }).then((res) => {
        console.log('%o', res.data)
    })
}

recordSearchApiTest()
