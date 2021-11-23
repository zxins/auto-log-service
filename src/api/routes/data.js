const {Router} = require('express')

const {parse} = require('csv-parse');
const fs = require('fs');

const router = Router()

module.exports = (app) => {
    app.use('/data', router)

    router.get('/filter_rules', async function (req, res) {
        const records = []
        const parser = fs
            .createReadStream(`./datas//filter_rules.csv`)
            .pipe(parse({
                // CSV options if any
            }));
        for await (const record of parser) {
            // Work with each record
            records.push(record)
        }
        var result = {}
        for (const record of records.slice(1)) {
            result[record[0]] = record
        }
        // res.writeHead(200, {
        //     'Content-Type': 'application/javascript;charset=utf-8'
        // });
        return res.json({r: result, msg: '',  code:0})
    });

}
