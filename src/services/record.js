const DispatchRecord = require('../models/dispatchRecord')

class RecordService {

    async info(id) {
        return DispatchRecord.findById(id).exec()
    }

    async count(options) {
        options = options || {};
        return await DispatchRecord.count(options)
    }

    async search(page, pageSize, options) {
        options = options || {};
        return await DispatchRecord.find(options)
            .sort({time: 'desc'})
            .skip((page - 1) * pageSize)
            .limit(pageSize).exec()
    }
}


module.exports = {
    RecordService
}
