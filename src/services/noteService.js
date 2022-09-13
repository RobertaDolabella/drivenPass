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
exports.createNote = exports.thereIsOtherNote = exports.isTokenActivate = exports.deleteNote = exports.getAll = exports.get = exports.create = void 0;
var noteRepository_1 = require("../repositories/noteRepository");
function create(authorization, noteData) {
    return __awaiter(this, void 0, void 0, function () {
        var token, user, userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
                    console.log(noteData);
                    return [4 /*yield*/, (0, noteRepository_1.checkToken)(token)];
                case 1:
                    user = _a.sent();
                    isTokenActivate(user);
                    userId = user.id;
                    return [4 /*yield*/, thereIsOtherNote(userId, noteData)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, createNote(userId, noteData)];
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
        var idNote, token, user, userId, note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idNote = Number(id);
                    token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
                    return [4 /*yield*/, (0, noteRepository_1.checkToken)(token)];
                case 1:
                    user = _a.sent();
                    isTokenActivate(user);
                    userId = user.id;
                    return [4 /*yield*/, (0, noteRepository_1.getNote)(userId, idNote)];
                case 2:
                    note = _a.sent();
                    thereIsANote(note);
                    return [2 /*return*/, note];
            }
        });
    });
}
exports.get = get;
function getAll(authorization, id) {
    return __awaiter(this, void 0, void 0, function () {
        var idNote, token, user, userId, note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idNote = Number(id);
                    token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
                    return [4 /*yield*/, (0, noteRepository_1.checkToken)(token)];
                case 1:
                    user = _a.sent();
                    isTokenActivate(user);
                    userId = user.id;
                    return [4 /*yield*/, (0, noteRepository_1.getNotes)(userId, idNote)];
                case 2:
                    note = _a.sent();
                    thereIsANote(note);
                    return [2 /*return*/, note];
            }
        });
    });
}
exports.getAll = getAll;
function deleteNote(authorization, id) {
    return __awaiter(this, void 0, void 0, function () {
        var idNote, token, user, userId, note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idNote = Number(id);
                    token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Baerer ", "");
                    return [4 /*yield*/, (0, noteRepository_1.checkToken)(token)];
                case 1:
                    user = _a.sent();
                    isTokenActivate(user);
                    userId = user.id;
                    return [4 /*yield*/, (0, noteRepository_1.getNotes)(userId, idNote)];
                case 2:
                    note = _a.sent();
                    thereIsANote(note);
                    return [4 /*yield*/, (0, noteRepository_1.deleteThisNote)(userId, idNote)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var credential;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, noteRepository_1.checkNote)(userId, noteData)];
                case 1:
                    credential = _a.sent();
                    isTheOnlyTitle(credential);
                    return [2 /*return*/];
            }
        });
    });
}
exports.thereIsOtherNote = thereIsOtherNote;
function isTheOnlyTitle(credential) {
    if (credential.length >= 1)
        throw { message: "This title has already been used, please choose a new title", code: 404 };
}
function createNote(userId, noteData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(userId, noteData);
                    return [4 /*yield*/, (0, noteRepository_1.createNewNote)(userId, noteData)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createNote = createNote;
function thereIsANote(credential) {
    if (credential.length < 1)
        throw { message: "There is no credentials matching with this id for your user", code: 404 };
}
var notes = {
    create: create,
    get: get,
    getAll: getAll,
    deleteNote: deleteNote
};
exports["default"] = notes;
