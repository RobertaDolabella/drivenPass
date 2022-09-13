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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createCard = exports.encryptCvv = exports.encryptPassword = exports.thereIsOtherCard = exports.isTokenActivate = exports.deleteCard = exports.get = exports.create = void 0;
var cryptr_1 = require("cryptr");
var cardRepository_1 = require("../repositories/cardRepository");
var dayjs_1 = require("dayjs");
function create(authorization, cardData) {
    return __awaiter(this, void 0, void 0, function () {
        var token, user, userId, encryptedPassword, encryptedCvv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
                    console.log(cardData);
                    return [4 /*yield*/, (0, cardRepository_1.checkToken)(token)];
                case 1:
                    user = _a.sent();
                    isTokenActivate(user);
                    userId = user.id;
                    return [4 /*yield*/, thereIsOtherCard(userId, cardData)];
                case 2:
                    _a.sent();
                    encryptedPassword = encryptPassword(cardData.cardPassword);
                    encryptedCvv = encryptCvv(cardData.cvv);
                    checkDateFormat(cardData.expiraationDate);
                    return [4 /*yield*/, createCard(userId, cardData, encryptedPassword, encryptedCvv)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function get(authorization, id) {
    return __awaiter(this, void 0, void 0, function () {
        var idCard, token, user, userId, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idCard = Number(id);
                    token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
                    return [4 /*yield*/, (0, cardRepository_1.checkToken)(token)];
                case 1:
                    user = _a.sent();
                    isTokenActivate(user);
                    userId = user.id;
                    return [4 /*yield*/, (0, cardRepository_1.getCard)(userId, idCard)];
                case 2:
                    card = _a.sent();
                    thereIsACard(card);
                    return [2 /*return*/, card];
            }
        });
    });
}
exports.get = get;
function deleteCard(authorization, id) {
    return __awaiter(this, void 0, void 0, function () {
        var idcard, token, user, userId, card, deletecard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idcard = Number(id);
                    token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
                    return [4 /*yield*/, (0, cardRepository_1.checkToken)(token)];
                case 1:
                    user = _a.sent();
                    isTokenActivate(user);
                    userId = user.id;
                    return [4 /*yield*/, (0, cardRepository_1.getCard)(userId, idcard)];
                case 2:
                    card = _a.sent();
                    thereIsACard(card);
                    return [4 /*yield*/, (0, cardRepository_1.deleteThisCard)(userId, idcard)];
                case 3:
                    deletecard = _a.sent();
                    return [2 /*return*/, card];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, cardRepository_1.checkCard)(userId, cardData)];
                case 1:
                    card = _a.sent();
                    isTheOnlyTitle(card);
                    return [2 /*return*/];
            }
        });
    });
}
exports.thereIsOtherCard = thereIsOtherCard;
function isTheOnlyTitle(card) {
    if (card.length >= 1)
        throw { message: "This title has already been used, please choose a new title", code: 404 };
}
function encryptPassword(password) {
    console.log(password);
    var cryptrcardPassword = new cryptr_1["default"]("passwordCrypt");
    var encryptedcardPassword = cryptrcardPassword.encrypt(password);
    return encryptedcardPassword;
}
exports.encryptPassword = encryptPassword;
function encryptCvv(cvv) {
    var cryptrcardCvv = new cryptr_1["default"]("passwordCrypt");
    var encryptedcardCvv = cryptrcardCvv.encrypt(cvv);
    return encryptedcardCvv;
}
exports.encryptCvv = encryptCvv;
function checkDateFormat(date) {
    var dateMonth = Number((0, dayjs_1["default"])().format("MM"));
    var dateYear = Number((0, dayjs_1["default"])().format("YYYY"));
    console.log(dateMonth, dateYear);
    var month = Number(date.slice(0, 2));
    var year = Number(date.slice(3, 5));
    console.log(month, year);
    if (typeof (month) == null || typeof (year) == null)
        throw { message: "Please, inform a valid date", code: 404 };
    if (year < dateYear - 2000)
        throw { message: "Your card expirated", code: 404 };
    if (year === dateYear - 2000 && month < dateMonth)
        throw { message: "Your card expirated", code: 404 };
}
function createCard(userId, cardData, encryptedPassword, encryptedCvv) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(userId, cardData, encryptedPassword);
                    return [4 /*yield*/, (0, cardRepository_1.createNewCard)(userId, cardData, encryptedPassword, encryptedCvv)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createCard = createCard;
function thereIsACard(card) {
    if (card.length < 1)
        throw { message: "There is no cards matching with this id for your user", code: 404 };
}
var card = {
    create: create,
    get: get,
    deleteCard: deleteCard
};
exports["default"] = card;
