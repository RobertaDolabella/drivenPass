"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wifiSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.wifiSchema = joi_1.default.object({
    wifiName: joi_1.default.string().required(),
    wifiPassword: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
});
