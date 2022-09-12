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
exports.deleteThisCard = exports.getCard = exports.createNewCard = exports.checkToken = exports.checkCard = void 0;
const database_1 = require("../config/database");
function checkCard(userId, cardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield database_1.prismadata.cards.findMany({ where: { userId, title: cardData.title } });
        return card;
    });
}
exports.checkCard = checkCard;
function checkToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.prismadata.users.findFirst({ where: { token } });
        return user;
    });
}
exports.checkToken = checkToken;
function createNewCard(userId, cardData, encryptedPassword, encryptedCvv) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prismadata.cards.create({
            data: {
                cardholderName: cardData.cardholderName,
                cardNumber: cardData.cardNumber,
                cvv: encryptedCvv,
                expiraationDate: cardData.expiraationDate,
                cardPassword: encryptedPassword,
                isVirual: cardData.isVirual,
                title: cardData.title,
                userId
            }
        });
    });
}
exports.createNewCard = createNewCard;
function getCard(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield database_1.prismadata.cards.findMany({ where: { id: id, userId: userId } });
        return card;
    });
}
exports.getCard = getCard;
function deleteThisCard(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield database_1.prismadata.cards.delete({ where: { id: id } });
        return card;
    });
}
exports.deleteThisCard = deleteThisCard;
const credentiaRepository = {
    checkCard, checkToken, createNewCard, getCard, deleteThisCard
};
exports.default = credentiaRepository;
