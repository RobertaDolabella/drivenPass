"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.credentialsSchema = joi_1.default.object({
    url: joi_1.default.required(),
    name: joi_1.default.string().required(),
    credentialPassword: joi_1.default.string().min(10).required(),
    title: joi_1.default.string().required().max(50),
});
