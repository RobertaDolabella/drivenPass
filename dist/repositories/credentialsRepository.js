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
exports.deleteThisCredential = exports.getCredential = exports.createNewCredential = exports.checkToken = exports.checkCredential = void 0;
const database_1 = require("../config/database");
function checkCredential(userId, credentialData) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield database_1.prismadata.credentials.findMany({ where: { userId, title: credentialData.title } });
        return credential;
    });
}
exports.checkCredential = checkCredential;
function checkToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.prismadata.users.findFirst({ where: { token } });
        console.log(user);
        return user;
    });
}
exports.checkToken = checkToken;
function createNewCredential(userId, credentialData, encryptedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prismadata.credentials.create({
            data: {
                url: credentialData.url,
                name: credentialData.name,
                credentialPassword: encryptedPassword,
                title: credentialData.title,
                userId
            }
        });
    });
}
exports.createNewCredential = createNewCredential;
function getCredential(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield database_1.prismadata.credentials.findMany({ where: { id: id, userId: userId } });
        return credential;
    });
}
exports.getCredential = getCredential;
function deleteThisCredential(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield database_1.prismadata.credentials.delete({ where: { id: id } });
        return credential;
    });
}
exports.deleteThisCredential = deleteThisCredential;
const credentiaRepository = {
    checkCredential, checkToken, createNewCredential, getCredential, deleteThisCredential
};
exports.default = credentiaRepository;
