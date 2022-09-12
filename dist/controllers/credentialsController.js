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
exports.deleteCredentials = exports.getCredentials = exports.createCredentials = void 0;
const credentialsService_1 = require("../services/credentialsService");
function createCredentials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialData = req.body;
        const { authorization } = req.headers;
        yield (0, credentialsService_1.create)(authorization, credentialData);
        res.send("deu certo");
    });
}
exports.createCredentials = createCredentials;
function getCredentials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { authorization } = req.headers;
        const credential = yield (0, credentialsService_1.get)(authorization, id);
        res.send(credential);
    });
}
exports.getCredentials = getCredentials;
function deleteCredentials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { authorization } = req.headers;
        const credential = yield (0, credentialsService_1.deleteCredential)(authorization, id);
        res.send("credential deleted");
    });
}
exports.deleteCredentials = deleteCredentials;
const credentials = {
    createCredentials, getCredentials, deleteCredentials
};
exports.default = credentials;
