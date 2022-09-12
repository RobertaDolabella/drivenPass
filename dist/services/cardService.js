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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCard = exports.encryptCvv = exports.encryptPassword = exports.thereIsOtherCard = exports.isTokenActivate = exports.deleteCard = exports.get = exports.create = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const cardRepository_1 = require("../repositories/cardRepository");
const dayjs_1 = __importDefault(require("dayjs"));
function create(authorization, cardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        console.log(cardData);
        const user = yield (0, cardRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        yield thereIsOtherCard(userId, cardData);
        const encryptedPassword = encryptPassword(cardData.cardPassword);
        const encryptedCvv = encryptCvv(cardData.cvv);
        checkDateFormat(cardData.expiraationDate);
        yield createCard(userId, cardData, encryptedPassword, encryptedCvv);
    });
}
exports.create = create;
function get(authorization, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const idCard = Number(id);
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, cardRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const card = yield (0, cardRepository_1.getCard)(userId, idCard);
        thereIsACard(card);
        return card;
    });
}
exports.get = get;
function deleteCard(authorization, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const idcard = Number(id);
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, cardRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const card = yield (0, cardRepository_1.getCard)(userId, idcard);
        thereIsACard(card);
        const deletecard = yield (0, cardRepository_1.deleteThisCard)(userId, idcard);
        return card;
    });
}
exports.deleteCard = deleteCard;
function isTokenActivate(user) {
    console.log(user);
    if (user === null)
        throw { message: "The user may not be logged in or is not available", code: 404 };
}
exports.isTokenActivate = isTokenActivate;
function thereIsOtherCard(userId, cardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield (0, cardRepository_1.checkCard)(userId, cardData);
        isTheOnlyTitle(card);
        return;
    });
}
exports.thereIsOtherCard = thereIsOtherCard;
function isTheOnlyTitle(card) {
    if (card.length >= 1)
        throw { message: "This title has already been used, please choose a new title", code: 404 };
}
function encryptPassword(password) {
    console.log(password);
    const cryptrcardPassword = new cryptr_1.default("passwordCrypt");
    const encryptedcardPassword = cryptrcardPassword.encrypt(password);
    return encryptedcardPassword;
}
exports.encryptPassword = encryptPassword;
function encryptCvv(cvv) {
    const cryptrcardCvv = new cryptr_1.default("passwordCrypt");
    const encryptedcardCvv = cryptrcardCvv.encrypt(cvv);
    return encryptedcardCvv;
}
exports.encryptCvv = encryptCvv;
function checkDateFormat(date) {
    const dateMonth = Number((0, dayjs_1.default)().format("MM"));
    const dateYear = Number((0, dayjs_1.default)().format("YYYY"));
    console.log(dateMonth, dateYear);
    const month = Number(date.slice(0, 2));
    const year = Number(date.slice(3, 5));
    console.log(month, year);
    if (typeof (month) == null || typeof (year) == null)
        throw { message: "Please, inform a valid date", code: 404 };
    if (year < dateYear - 2000)
        throw { message: "Your card expirated", code: 404 };
    if (year === dateYear - 2000 && month < dateMonth)
        throw { message: "Your card expirated", code: 404 };
}
function createCard(userId, cardData, encryptedPassword, encryptedCvv) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(userId, cardData, encryptedPassword);
        yield (0, cardRepository_1.createNewCard)(userId, cardData, encryptedPassword, encryptedCvv);
    });
}
exports.createCard = createCard;
function thereIsACard(card) {
    if (card.length < 1)
        throw { message: "There is no cards matching with this id for your user", code: 404 };
}
const card = {
    create, get, deleteCard
};
exports.default = card;
