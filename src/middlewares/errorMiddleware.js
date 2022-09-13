"use strict";
exports.__esModule = true;
exports.errorHandlerMiddleware = void 0;
function errorHandlerMiddleware(err, req, res, next) {
    if (err.message) {
        return res.send(err.message);
    }
    return res.sendStatus(401);
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
function errorTypeToStatusCode(errorType) {
    if (errorType === 'conflict')
        return 409;
    if (errorType === 'not_found')
        return 404;
    if (errorType === 'unauthorized')
        return 401;
    return 400;
}
