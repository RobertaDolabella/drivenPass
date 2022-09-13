"use strict";
exports.__esModule = true;
exports.wifiSchema = void 0;
var joi_1 = require("joi");
exports.wifiSchema = joi_1["default"].object({
    wifiName: joi_1["default"].string().required(),
    wifiPassword: joi_1["default"].string().required(),
    title: joi_1["default"].string().required()
});
