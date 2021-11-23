const DispatchBatch = require('../models/dispatchBatch')

class BatchService {
    async info(batchId) {
        return await DispatchBatch.findOne({batchId: batchId}).exec()
    }

    async count(options) {
        options = options || {}
        return await DispatchBatch.count(options);
    }

    async search(page, pageSize, options) {
        options = options || {}
        return await DispatchBatch.find(options).skip((page - 1) * pageSize).limit(pageSize).exec()
    }

}


module.exports = {
    BatchService
}
