const ESService = require('../../src/services/elasticsearch')
const logger = require('../../src/utils/logger')
const util = require("util");

const esServ = new ESService()

async function testPing() {
    await esServ.ping()
}

async function testCatIndices(format = 'json') {
    const list = await esServ.catIndices(format)
    console.log(list)
}

async function testIndex() {
    const indexInfo = await esServ.getIndexInfo('auto-logs-2021.11.12')
    console.log(JSON.stringify(indexInfo))
}

async function testSearchByPage() {
    const result = await esServ.paginateSearchByMatch('shopping')
    console.log(JSON.stringify(result))
}


// testPing()
// testCatIndices('yml')
testIndex()
// testSearchByPage()
