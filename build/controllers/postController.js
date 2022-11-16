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
exports.deletePost = exports.updatePost = exports.getAllUserPosts = exports.getPost = exports.createPost = exports.getAllPost = void 0;
const post_1 = require("../models/post");
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let posts = yield post_1.Post.findAll({
        include: [{
                model: user_1.User,
                required: true
            }],
        order: [
            ['updatedAt', 'DESC']
        ]
    });
    res.status(200).json(posts);
});
exports.getAllPost = getAllPost;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newPosts = req.body;
    newPosts.userId = user.userId;
    if (newPosts.post && newPosts.userId) {
        let created = yield post_1.Post.create(newPosts);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
});
exports.createPost = createPost;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let postId = req.params.postId;
    let posts = yield post_1.Post.findByPk(postId);
    if (posts) {
        res.status(200).json(posts);
    }
    else {
        res.status(404).json({});
    }
});
exports.getPost = getPost;
const getAllUserPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let postFound = yield post_1.Post.findAll({ where: { userId: user.userId } });
    res.status(200).json(postFound);
});
exports.getAllUserPosts = getAllUserPosts;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let postId = req.params.postId;
    let newPosts = req.body;
    let postFound = yield post_1.Post.findByPk(postId);
    if (postFound && postFound.userId == user.userId
        && postFound.postId == newPosts.postId && newPosts.post) {
        yield post_1.Post.update(newPosts, {
            where: { postId: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let postId = req.params.postId;
    let postFound = yield post_1.Post.findByPk(postId);
    if (postFound && postFound.userId == user.userId) {
        yield post_1.Post.destroy({
            where: { postId: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
});
exports.deletePost = deletePost;
