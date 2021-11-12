const axios = require('axios')
const Config = require('../../src/config/config')
const util = require("util");

root = `http://127.0.0.1:${Config.port}/api/auto_log`

function autoTest() {
    const url = `${root}/`
    axios.get(url, {

    }).then((res) => {
        console.log(res.data)
    })
}
autoTest()
