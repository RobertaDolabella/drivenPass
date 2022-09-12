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
exports.updatingUser = exports.createAToken = exports.isPasswordCorrect = exports.isEmailUnavailable = exports.registerUsers = exports.isEmailAvailable = exports.isAnExistingEmail = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const userRepository_1 = require("../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAnExistingEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAvailvable = yield (0, userRepository_1.checkEmail)(email);
        return isAvailvable;
    });
}
exports.isAnExistingEmail = isAnExistingEmail;
function isEmailAvailable(isAvailable) {
    if (isAvailable !== null)
        throw { message: "This user already exist", code: 400 };
}
exports.isEmailAvailable = isEmailAvailable;
function registerUsers(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        let { email, password } = userData;
        if (password.length <= 10)
            throw { message: "This password is not valid", code: 401 };
        const encryptedSecutrityCode = criptPassword(password);
        password = encryptedSecutrityCode;
        (0, userRepository_1.registerUser)({ email, password });
    });
}
exports.registerUsers = registerUsers;
function criptPassword(password) {
    const cryptrPassword = new cryptr_1.default("passwordCrypt");
    const encryptedSecutrityCode = cryptrPassword.encrypt(password);
    return encryptedSecutrityCode;
}
function isEmailUnavailable(isAvailable) {
    if (isAvailable === null)
        throw { message: "This user doens't exist", code: 400 };
}
exports.isEmailUnavailable = isEmailUnavailable;
function isPasswordCorrect(userData, userInfo) {
    const cryptrPassword = new cryptr_1.default("passwordCrypt");
    const decryptepassword = cryptrPassword.decrypt(userInfo.password);
    if (decryptepassword !== userData.password)
        throw { message: "This password is not correct", code: 404 };
}
exports.isPasswordCorrect = isPasswordCorrect;
function createAToken(userInfo) {
    const token = jsonwebtoken_1.default.sign({ id: userInfo.id }, "secretKey");
    return token;
}
exports.createAToken = createAToken;
function updatingUser(token, email) {
    (0, userRepository_1.logInAnUser)(token, email);
}
exports.updatingUser = updatingUser;
const userServie = {
    registerUsers, isEmailAvailable, isAnExistingEmail, isEmailUnavailable, isPasswordCorrect, createAToken
};
exports.default = userServie;
