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
exports.logInAnUser = exports.registerUser = exports.checkEmail = void 0;
const database_1 = require("../config/database");
function checkEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAvailable = yield database_1.prismadata.users.findUnique({ where: { email } });
        return isAvailable;
    });
}
exports.checkEmail = checkEmail;
function registerUser({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.prismadata.users.create({ data: { email, password } });
    });
}
exports.registerUser = registerUser;
function logInAnUser(token, email) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prismadata.users.update({ where: {
                email
            }, data: { token }
        });
    });
}
exports.logInAnUser = logInAnUser;
