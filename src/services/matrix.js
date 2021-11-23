const DispatchMatrix = require('../models/dispatchMatrix')

class MatrixService {
    async info(batchId, excludeMatrix) {
        let fields = {}
        if (excludeMatrix) {
            fields['matrix'] = 0
        }
        return await  DispatchMatrix.findOne({batchId: batchId}, fields).exec()
    }

    async count(options) {
        options = options || {}
        return await DispatchMatrix.count(options);
    }

    async search(page, pageSize, options) {
        options = options || {}
        return  DispatchMatrix.aggregate([
            {$match: options},
            {$sort: {time: -1}},
            {$skip: (page - 1) * pageSize},
            {$limit: pageSize},
            {
                $lookup: {
                    from: "dispatch_records",
                    localField: "batchId",
                    foreignField: "batchId",
                    as: "records"
                }
            },
            {
                $project: {
                    env: '$env',
                    cityId: '$cityId',
                    batchId: '$batchId',
                    time: '$time',
                    driver_count: '$driver_count',
                    order_count: '$order_count',
                    filter_ok_count: '$filter_ok_count',
                    dispatch_count: '$dispatch_count',
                    fail_count: {
                        $function: {
                            body: 'function(records){var count = 0; for(var i in records){var record = records[i];if(!record.success) count ++;}return count}',
                            args: ['$records'],
                            lang: 'js'
                        }
                    }
                }
            }
        ]).exec()
    }

}


module.exports = {
    MatrixService
}
