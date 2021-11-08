const db = require('../../src/loaders/mongoose')
const mongoose = require('mongoose')
const {BatchService} = require('../../src/services/batch')

async function t() {
    const d = await db()
    const bs = new BatchService()
    await bs.test()
    await mongoose.disconnect()
}

t().then(()=>{
    console.log('end')
})