"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.cardSchema = joi_1.default.object({
    cardholderName: joi_1.default.string().required(),
    cardNumber: joi_1.default.string().length(19).required(),
    cvv: joi_1.default.string().max(4).required(),
    expiraationDate: joi_1.default.string().length(5).required(),
    cardPassword: joi_1.default.string().length(4).required(),
    isVirual: joi_1.default.boolean().required(),
    title: joi_1.default.string().required(),
});
