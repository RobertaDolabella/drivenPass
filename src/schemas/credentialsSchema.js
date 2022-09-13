"use strict";
exports.__esModule = true;
exports.credentialsSchema = void 0;
var joi_1 = require("joi");
exports.credentialsSchema = joi_1["default"].object({
    url: joi_1["default"].required(),
    name: joi_1["default"].string().required(),
    credentialPassword: joi_1["default"].string().min(10).required(),
    title: joi_1["default"].string().required().max(50)
});
