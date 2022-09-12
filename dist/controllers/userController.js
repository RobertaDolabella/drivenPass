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
exports.signin = exports.signup = void 0;
const userService_1 = require("../services/userService");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const isAvailable = yield (0, userService_1.isAnExistingEmail)(email);
        (0, userService_1.isEmailAvailable)(isAvailable);
        yield (0, userService_1.registerUsers)({ email, password });
        res.sendStatus(201);
    });
}
exports.signup = signup;
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = req.body;
        const userInfo = yield (0, userService_1.isAnExistingEmail)(userData.email);
        (0, userService_1.isEmailUnavailable)(userInfo);
        (0, userService_1.isPasswordCorrect)(userData, userInfo);
        const token = (0, userService_1.createAToken)(userInfo);
        (0, userService_1.updatingUser)(token, userData.email);
        res.send(token).status(201);
    });
}
exports.signin = signin;
