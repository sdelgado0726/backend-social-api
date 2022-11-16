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
exports.updateUser = exports.getUser = exports.loginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newUser = req.body;
    if (newUser.username && newUser.password && newUser.firstName && newUser.lastName && newUser.state) {
        let hashedPassword = yield (0, auth_1.hashPassword)(newUser.password);
        newUser.password = hashedPassword;
        let created = yield user_1.User.create(newUser);
        res.status(200).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let existingUser = yield user_1.User.findOne({
        where: { username: req.body.username }
    });
    if (existingUser) {
        let passwordsMatch = yield (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = yield (0, auth_1.signUserToken)(existingUser);
            let userId = existingUser.userId;
            let firstName = existingUser.firstName;
            res.status(200).json({ token, userId, firstName });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
});
exports.loginUser = loginUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let userId = req.params.userId;
    let userFound = yield user_1.User.findByPk(userId);
    if (userFound) {
        res.status(200).json(userFound);
    }
    else {
        res.status(404).json({});
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let userId = req.params.userId;
    let updateUsers = req.body;
    let userFound = yield user_1.User.findByPk(userId);
    if (userFound && userFound.userId == user.userId && userFound.userId == updateUsers.userId) {
        yield user_1.User.update(updateUsers, {
            where: { userId: userId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
});
exports.updateUser = updateUser;
