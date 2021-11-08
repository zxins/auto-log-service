const jwt = require('jsonwebtoken')
const Config = require('../config/config')

async function signData(payload) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
        payload,
        Config.jwtSecret,
        {algorithm: Config.jwtAlgorithm}
    );
}

module.exports = {
    signData
}