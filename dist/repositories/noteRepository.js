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
exports.deleteThisNote = exports.getNotes = exports.getNote = exports.createNewNote = exports.checkToken = exports.checkNote = void 0;
const database_1 = require("../config/database");
function checkNote(userId, noteData) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield database_1.prismadata.notes.findMany({ where: { userId, title: noteData.title } });
        return note;
    });
}
exports.checkNote = checkNote;
function checkToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.prismadata.users.findFirst({ where: { token } });
        return user;
    });
}
exports.checkToken = checkToken;
function createNewNote(userId, noteData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prismadata.notes.create({
            data: {
                title: noteData.title,
                note: noteData.note,
                userId
            }
        });
    });
}
exports.createNewNote = createNewNote;
function getNote(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield database_1.prismadata.notes.findMany({ where: { userId: userId, id: id } });
        return note;
    });
}
exports.getNote = getNote;
function getNotes(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield database_1.prismadata.notes.findMany({ where: { userId: userId } });
        return note;
    });
}
exports.getNotes = getNotes;
function deleteThisNote(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield database_1.prismadata.notes.delete({ where: { id: id } });
        return note;
    });
}
exports.deleteThisNote = deleteThisNote;
const credentiaRepository = {
    checkNote, checkToken, createNewNote, getNotes, getNote, deleteThisNote
};
exports.default = credentiaRepository;
