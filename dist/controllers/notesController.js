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
exports.deleteNotes = exports.getNotes = exports.getNote = exports.createNotes = void 0;
const noteService_1 = require("../services/noteService");
function createNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const noteData = req.body;
        const { authorization } = req.headers;
        yield (0, noteService_1.create)(authorization, noteData);
        res.sendStatus(201);
    });
}
exports.createNotes = createNotes;
function getNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { authorization } = req.headers;
        const note = yield (0, noteService_1.getAll)(authorization, id);
        res.send(note).status(200);
    });
}
exports.getNote = getNote;
function getNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { authorization } = req.headers;
        const note = yield (0, noteService_1.get)(authorization, id);
        res.send(note).status(200);
    });
}
exports.getNotes = getNotes;
function deleteNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { authorization } = req.headers;
        const credential = yield (0, noteService_1.deleteNote)(authorization, id);
        res.send("note deleted").status(200);
    });
}
exports.deleteNotes = deleteNotes;
const notes = {
    createNotes, getNotes, getNote, deleteNotes
};
exports.default = notes;
