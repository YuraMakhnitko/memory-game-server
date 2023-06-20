"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const services_1 = require("../../services");
const checkAuth_1 = require("../../services/checkAuth");
const { registerValidation, loginValidation } = services_1.validations;
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
usersRouter.post('/register', registerValidation, services_1.validationErrors, users_controller_1.register);
usersRouter.post('/login', loginValidation, services_1.validationErrors, users_controller_1.login);
usersRouter.post('/addpoints', users_controller_1.addPoints);
usersRouter.get('/authme', checkAuth_1.checkAuth, users_controller_1.getMe);
usersRouter.get('/getwinners', users_controller_1.getPointsList);
