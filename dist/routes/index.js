"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const credentialsRouter_1 = __importDefault(require("./credentialsRouter"));
const notesRouter_1 = __importDefault(require("./notesRouter"));
const cardRouter_1 = __importDefault(require("./cardRouter"));
const wifiRouter_1 = __importDefault(require("./wifiRouter"));
const router = (0, express_1.Router)();
router.use(userRouter_1.default);
router.use(credentialsRouter_1.default);
router.use(notesRouter_1.default);
router.use(cardRouter_1.default);
router.use(wifiRouter_1.default);
exports.default = router;
