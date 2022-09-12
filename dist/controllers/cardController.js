"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCards = exports.getCard = exports.createCards = void 0;
const cardService_1 = require("../services/cardService");
function createCards(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardData = req.body;
        const { authorization } = req.headers;
        yield (0, cardService_1.create)(authorization, cardData);
        res.sendStatus(201);
    });
}
exports.createCards = createCards;
function getCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { authorization } = req.headers;
        const card = yield (0, cardService_1.get)(authorization, id);
        res.send(card).status(200);
    });
}
exports.getCard = getCard;
function deleteCards(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { authorization } = req.headers;
        yield (0, cardService_1.deleteCard)(authorization, id);
        res.send("card deleted").status(200);
    });
}
exports.deleteCards = deleteCards;
const Card = {
    createCards, getCard,
    deleteCards
};
exports.default = Card;
