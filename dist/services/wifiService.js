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
exports.createWifi = exports.encryptPassword = exports.thereIsOtherWifi = exports.isTokenActivate = exports.deleteWifi = exports.getAll = exports.get = exports.create = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const wifiRepository_1 = require("../repositories/wifiRepository");
function create(authorization, wifiData) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        console.log(wifiData);
        const user = yield (0, wifiRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        yield thereIsOtherWifi(userId, wifiData);
        const encryptedPassword = encryptPassword(wifiData.wifiPassword);
        yield createWifi(userId, wifiData, encryptedPassword);
    });
}
exports.create = create;
function get(authorization, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const idWifi = Number(id);
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, wifiRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const Wifi = yield (0, wifiRepository_1.getWifi)(userId, idWifi);
        thereIsAWifi(Wifi);
        return Wifi;
    });
}
exports.get = get;
function getAll(authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, wifiRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const wifi = yield (0, wifiRepository_1.getWifis)(userId);
        thereIsAWifi(wifi);
        return wifi;
    });
}
exports.getAll = getAll;
function deleteWifi(authorization, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const idWifi = Number(id);
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, wifiRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const Wifi = yield (0, wifiRepository_1.getWifi)(userId, idWifi);
        thereIsAWifi(Wifi);
        yield (0, wifiRepository_1.deleteThisWifi)(userId, idWifi);
        return;
    });
}
exports.deleteWifi = deleteWifi;
function isTokenActivate(user) {
    console.log(user);
    if (user === null)
        throw { message: "The user may not be logged in or is not available", code: 404 };
}
exports.isTokenActivate = isTokenActivate;
function thereIsOtherWifi(userId, wifiData) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield (0, wifiRepository_1.checkWifi)(userId, wifiData);
        isTheOnlyTitle(wifi);
        return;
    });
}
exports.thereIsOtherWifi = thereIsOtherWifi;
function isTheOnlyTitle(credential) {
    if (credential.length >= 1)
        throw { message: "This title has already been used, please choose a new title", code: 404 };
}
function encryptPassword(password) {
    const cryptrcardPassword = new cryptr_1.default("passwordCrypt");
    const encryptedcardPassword = cryptrcardPassword.encrypt(password);
    return encryptedcardPassword;
}
exports.encryptPassword = encryptPassword;
function createWifi(userId, wifiData, encryptedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(userId, wifiData);
        yield (0, wifiRepository_1.createNewWifi)(userId, wifiData, encryptedPassword);
    });
}
exports.createWifi = createWifi;
function thereIsAWifi(credential) {
    if (credential.length < 1)
        throw { message: "There is no credentials matching with this id for your user", code: 404 };
}
const wifis = {
    create, get, getAll, deleteWifi
};
exports.default = wifis;
