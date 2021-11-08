const DispatchBatch = require('../models/dispatchBatch')

class BatchService {
    async test() {
        const bat = await DispatchBatch.count()
        console.log(bat)
    }

}


module.exports = {
    BatchService
}