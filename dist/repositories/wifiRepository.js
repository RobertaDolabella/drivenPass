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
exports.deleteThisWifi = exports.getWifis = exports.getWifi = exports.createNewWifi = exports.checkToken = exports.checkWifi = void 0;
const database_1 = require("../config/database");
function checkWifi(userId, wifiData) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield database_1.prismadata.wifis.findMany({ where: { userId, title: wifiData.title } });
        return wifi;
    });
}
exports.checkWifi = checkWifi;
function checkToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.prismadata.users.findFirst({ where: { token } });
        return user;
    });
}
exports.checkToken = checkToken;
function createNewWifi(userId, wifiData, encryptedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prismadata.wifis.create({
            data: {
                wifiName: wifiData.wifiName,
                wifiPassword: encryptedPassword,
                title: wifiData.title,
                userId
            }
        });
    });
}
exports.createNewWifi = createNewWifi;
function getWifi(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield database_1.prismadata.wifis.findMany({ where: { id: id, userId: userId } });
        return wifi;
    });
}
exports.getWifi = getWifi;
function getWifis(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifis = yield database_1.prismadata.wifis.findMany({ where: { userId: userId } });
        return wifis;
    });
}
exports.getWifis = getWifis;
function deleteThisWifi(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield database_1.prismadata.wifis.delete({ where: { id: id } });
        return wifi;
    });
}
exports.deleteThisWifi = deleteThisWifi;
const wifiRepository = {
    checkWifi, checkToken, createNewWifi, getWifi, deleteThisWifi, getWifis
};
exports.default = wifiRepository;
