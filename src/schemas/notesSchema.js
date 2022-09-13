"use strict";
exports.__esModule = true;
exports.noteSchema = void 0;
var joi_1 = require("joi");
exports.noteSchema = joi_1["default"].object({
    title: joi_1["default"].string().max(50).required(),
    note: joi_1["default"].string().max(1000).required()
});
