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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPointsList = exports.addPoints = exports.getMe = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../../models");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const name = req.body.name;
        const email = req.body.email;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = (yield new models_1.UserModel({
            name,
            email,
            passwordHash: hash,
        }).save());
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, 'secret888', {
            expiresIn: '9999d',
        });
        const _a = user.toJSON(), { passwordHash, __v } = _a, userData = __rest(_a, ["passwordHash", "__v"]);
        res.json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Can`t register properly!',
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        // TODO email type of string
        const user = yield models_1.UserModel.findOne({ email: email }, { __v: 0 });
        if (!user) {
            res.status(404).json({ message: 'User not found!' });
        }
        // Checking valid user password
        if (user) {
            const userPasswordHash = user === null || user === void 0 ? void 0 : user.toJSON();
            const isValidPass = bcrypt_1.default.compare(req.body.password, userPasswordHash.passwordHash);
            if (!isValidPass) {
                return res.status(400).json({
                    message: 'Invalid login or password!',
                });
            }
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, 'secret888', {
                expiresIn: '9999d',
            });
            const _b = user.toJSON(), { passwordHash } = _b, userData = __rest(_b, ["passwordHash"]);
            res.json(Object.assign(Object.assign({}, userData), { token }));
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Can`t auth properly!',
        });
    }
});
exports.login = login;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield models_1.UserModel.findById(userId);
        const _c = user === null || user === void 0 ? void 0 : user.toJSON(), { passwordHash } = _c, userData = __rest(_c, ["passwordHash"]);
        res.json(userData);
        if (!user) {
            res.status(404).json({
                message: 'User not found!',
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No access',
        });
    }
});
exports.getMe = getMe;
const addPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body._id;
        const gamePoints = req.body.points;
        console.log(gamePoints);
        const user = yield models_1.UserModel.findById({ _id: userId });
        if (!user) {
            res.status(404).json({
                message: 'User not found!',
            });
        }
        if ((user && user.points < gamePoints) || (user && !user.points)) {
            yield models_1.UserModel.updateOne({ _id: userId }, { points: gamePoints }, {
                returnDocument: 'after',
            });
            return res.json({
                message: 'success',
            });
        }
        res.json({
            message: 'points not updated',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Can`t update points',
        });
    }
});
exports.addPoints = addPoints;
const getPointsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const winners = yield models_1.UserModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0, email: 0, passwordHash: 0 }).sort('-points');
        const listWinners = winners
            .filter((winner) => {
            return winner.points;
        })
            .map((winner) => {
            return winner.toJSON();
        });
        console.log(listWinners);
        return res.json(listWinners);
    }
    catch (error) {
        res.status(500).json({
            message: 'Can`t get winners',
        });
    }
});
exports.getPointsList = getPointsList;
