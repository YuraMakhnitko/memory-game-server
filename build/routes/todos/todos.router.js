"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const services_1 = require("../../services");
const { todoValidation } = services_1.validations;
const todos_controller_1 = require("./todos.controller");
const todosRouter = express_1.default.Router();
exports.todosRouter = todosRouter;
todosRouter.post("/addtodo", todoValidation, services_1.validationErrors, todos_controller_1.addOneTodo);
todosRouter.post("/gettodos", todos_controller_1.getlistsTodos);
todosRouter.delete("/removetodo/:todoId", todos_controller_1.removeOneTodo);
todosRouter.patch("/updatetodo/:todoId", todos_controller_1.completedToggleTodo);
