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
exports.deleteWifis = exports.getWifis = exports.getWifi = exports.createWifis = void 0;
const wifiService_1 = require("../services/wifiService");
function createWifis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifiData = req.body;
        const { authorization } = req.headers;
        yield (0, wifiService_1.create)(authorization, wifiData);
        res.sendStatus(201);
    });
}
exports.createWifis = createWifis;
function getWifi(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { authorization } = req.headers;
        const wifi = yield (0, wifiService_1.get)(authorization, id);
        res.send(wifi).status(200);
    });
}
exports.getWifi = getWifi;
function getWifis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        const wifi = yield (0, wifiService_1.getAll)(authorization);
        res.send(wifi).status(200);
    });
}
exports.getWifis = getWifis;
function deleteWifis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { authorization } = req.headers;
        const wifi = yield (0, wifiService_1.deleteWifi)(authorization, id);
        res.send("wifi deleted").status(200);
    });
}
exports.deleteWifis = deleteWifis;
const wifis = {
    createWifis, getWifis, deleteWifis, getWifi
};
exports.default = wifis;
