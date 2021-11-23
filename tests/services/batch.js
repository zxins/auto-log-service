const db = require('../../src/loaders/mongoose')
const mongoose = require('mongoose')
const {BatchService} = require('../../src/services/batch')
await db()

async function infoTest() {

    const bs = new BatchService()
    const info = await bs.info('dd9def864c0b11ec81840255ac11007d')
    console.log(info)

    await mongoose.disconnect()
}



infoTest().then(()=>{})
