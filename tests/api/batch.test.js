const axios = require('axios')
const moment = require('moment')
const Config = require('../../src/config/config')

root = `http://127.0.0.1:${Config.port}/api/batches`
// root = `http://127.0.0.1:3002/batchs`

function batchInfoApiTest(){
    const query = {
        id: 'dd9def864c0b11ec81840255ac11007d'
    }
    const url = `${root}`
    axios.get(url, {
        params: query
    }).then((res) => {
        console.log('%o', res.data)
    })
}

function batchesMatrixAPiTest(){
    const query = {
        batchId: 'dd9def864c0b11ec81840255ac11007d'
    }
    const url = `${root}/matrix`
    axios.get(url, {
        params: query,
        headers: {}
    }).then((res) => {
        console.log(res)
    })
}

batchInfoApiTest()
