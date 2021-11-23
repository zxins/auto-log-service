const db = require('../../src/loaders/mongoose')
const mongoose = require('mongoose')
const {RecordService} = require('../../src/services/record')

async function infoTest() {
    await db()

    const rs = new RecordService()
    const info = await rs.search(1, 50, {'batchId': '7ee6f2da4c0b11ec81840255ac11007d'})
    console.log(info)

    await mongoose.disconnect()
}

async function matrixInfoTest(){
    await db()

    const ms = new MatrixService()
    const info = await ms.info('dd9def864c0b11ec81840255ac11007d')
    console.log(info)

    await mongoose.disconnect()
}


async function searchTest(){
    await db()

    const ms = new MatrixService()
    const page = 1
    const pageSize = 50
    const options = {
    }
    const records = await ms.search(page, pageSize, options)
    console.log(records)
    await mongoose.disconnect()

}

infoTest()
// matrixInfoTest()
// searchTest()
