"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardSchema_1 = require("../schemas/cardSchema");
const validateSchema_1 = require("../middlewares/validateSchema");
const cardController_1 = require("../controllers/cardController");
const cardRouter = (0, express_1.Router)();
cardRouter.post('/cards', (0, validateSchema_1.validateSchemaMiddleware)(cardSchema_1.cardSchema), cardController_1.createCards);
cardRouter.get('/cards/:id', cardController_1.getCard);
cardRouter.delete('/cards/:id', cardController_1.deleteCards);
exports.default = cardRouter;