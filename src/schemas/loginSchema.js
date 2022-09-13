"use strict";
exports.__esModule = true;
exports.loginSchema = void 0;
var joi_1 = require("joi");
exports.loginSchema = joi_1["default"].object({
    email: joi_1["default"].string().required(),
    password: joi_1["default"].string().min(10).required()
});
