class ApiException extends Error {
    constructor(code, message, r) {
        super(message);
        this.code = code;
        this.r = r ? r : {};
    }
}

module.exports = {
    ApiException,
}