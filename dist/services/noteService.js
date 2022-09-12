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
exports.createNote = exports.thereIsOtherNote = exports.isTokenActivate = exports.deleteNote = exports.getAll = exports.get = exports.create = void 0;
const noteRepository_1 = require("../repositories/noteRepository");
function create(authorization, noteData) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        console.log(noteData);
        const user = yield (0, noteRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        yield thereIsOtherNote(userId, noteData);
        yield createNote(userId, noteData);
    });
}
exports.create = create;
function get(authorization, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const idNote = Number(id);
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, noteRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const note = yield (0, noteRepository_1.getNote)(userId, idNote);
        thereIsANote(note);
        return note;
    });
}
exports.get = get;
function getAll(authorization, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const idNote = Number(id);
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, noteRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const note = yield (0, noteRepository_1.getNotes)(userId, idNote);
        thereIsANote(note);
        return note;
    });
}
exports.getAll = getAll;
function deleteNote(authorization, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const idNote = Number(id);
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
        const user = yield (0, noteRepository_1.checkToken)(token);
        isTokenActivate(user);
        const userId = user.id;
        const note = yield (0, noteRepository_1.getNotes)(userId, idNote);
        thereIsANote(note);
        yield (0, noteRepository_1.deleteThisNote)(userId, idNote);
        return;
    });
}
exports.deleteNote = deleteNote;
function isTokenActivate(user) {
    console.log(user);
    if (user === null)
        throw { message: "The user may not be logged in or is not available", code: 404 };
}
exports.isTokenActivate = isTokenActivate;
function thereIsOtherNote(userId, noteData) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield (0, noteRepository_1.checkNote)(userId, noteData);
        isTheOnlyTitle(credential);
        return;
    });
}
exports.thereIsOtherNote = thereIsOtherNote;
function isTheOnlyTitle(credential) {
    if (credential.length >= 1)
        throw { message: "This title has already been used, please choose a new title", code: 404 };
}
function createNote(userId, noteData) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(userId, noteData);
        yield (0, noteRepository_1.createNewNote)(userId, noteData);
    });
}
exports.createNote = createNote;
function thereIsANote(credential) {
    if (credential.length < 1)
        throw { message: "There is no credentials matching with this id for your user", code: 404 };
}
const notes = {
    create, get, getAll, deleteNote
};
exports.default = notes;
