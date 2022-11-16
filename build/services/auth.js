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
exports.verifyUser = exports.signUserToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const secret = 'My Weapon is a Melody';
const hashPassword = (plainTextPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRound = 12;
    const hash = yield bcrypt_1.default.hash(plainTextPassword, saltRound);
    return hash;
});
exports.hashPassword = hashPassword;
const comparePasswords = (plainTextPassword, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(plainTextPassword, hashPassword);
});
exports.comparePasswords = comparePasswords;
const signUserToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let token = jsonwebtoken_1.default.sign({ userId: user.userId }, secret, { expiresIn: '1hr' });
    return token;
});
exports.signUserToken = signUserToken;
const verifyUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            let decoded = yield jsonwebtoken_1.default.verify(token, secret);
            return user_1.User.findByPk(decoded.userId);
        }
        catch (err) {
            return null;
        }
    }
    else {
        return null;
    }
});
exports.verifyUser = verifyUser;
