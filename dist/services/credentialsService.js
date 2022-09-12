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
exports.createCredential = exports.encryptPassword = exports.thereIsOtherCredential = exports.isTokenActivate = exports.deleteCredential = exports.get = exports.create = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const credentialsRepository_1 = require("../repositories/credentialsRepository");
function create(authorization, credentialData) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        console.log(credentialData);
        const user = yield (0, credentialsRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        yield thereIsOtherCredential(userId, credentialData);
        const encryptedPassword = encryptPassword(credentialData.credentialPassword);
        yield createCredential(userId, credentialData, encryptedPassword);
    });
}
exports.create = create;
function get(authorization, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const idCredential = Number(id);
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, credentialsRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const credential = yield (0, credentialsRepository_1.getCredential)(userId, idCredential);
        thereIsACredential(credential);
        return credential;
    });
}
exports.get = get;
function deleteCredential(authorization, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const idCredential = Number(id);
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, credentialsRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const credential = yield (0, credentialsRepository_1.getCredential)(userId, idCredential);
        thereIsACredential(credential);
        const deletecredential = yield (0, credentialsRepository_1.deleteThisCredential)(userId, idCredential);
        return credential;
    });
}
exports.deleteCredential = deleteCredential;
function isTokenActivate(user) {
    console.log(user);
    if (user === null)
        throw { message: "The user may not be logged in or is not available", code: 404 };
}
exports.isTokenActivate = isTokenActivate;
function thereIsOtherCredential(userId, credentialData) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield (0, credentialsRepository_1.checkCredential)(userId, credentialData);
        isTheOnlyTitle(credential);
        return;
    });
}
exports.thereIsOtherCredential = thereIsOtherCredential;
function isTheOnlyTitle(credential) {
    if (credential.length >= 1)
        throw { message: "This title has already been used, please choose a new title", code: 404 };
}
function encryptPassword(password) {
    console.log(password);
    const cryptrCredentialPassword = new cryptr_1.default("passwordCrypt");
    const encryptedCredentialPassword = cryptrCredentialPassword.encrypt(password);
    return encryptedCredentialPassword;
}
exports.encryptPassword = encryptPassword;
function createCredential(userId, credentialData, encryptedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(userId, credentialData, encryptedPassword);
        yield (0, credentialsRepository_1.createNewCredential)(userId, credentialData, encryptedPassword);
    });
}
exports.createCredential = createCredential;
function thereIsACredential(credential) {
    if (credential.length < 1)
        throw { message: "There is no credentials matching with this id for your user", code: 404 };
}
const credential = {
    create, get, deleteCredential
};
exports.default = credential;
