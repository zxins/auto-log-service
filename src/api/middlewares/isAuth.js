const jwt = require('express-jwt')
const Config = require('../../config/config')

const getTokenFromHeader = req => {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const isAuth = jwt({
    secret: Config.jwtSecret,
    algorithms: [Config.jwtAlgorithm],
    userProperty: 'token',
    getToken: getTokenFromHeader
})

module.exports = isAuth