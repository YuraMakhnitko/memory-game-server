"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutter = void 0;
const express_1 = __importDefault(require("express"));
const users_router_1 = require("./users/users.router");
exports.appRoutter = express_1.default.Router();
exports.appRoutter.use(users_router_1.usersRouter);
