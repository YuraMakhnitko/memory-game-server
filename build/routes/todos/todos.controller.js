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
Object.defineProperty(exports, "__esModule", { value: true });
exports.completedToggleTodo = exports.removeOneTodo = exports.getlistsTodos = exports.addOneTodo = void 0;
const models_1 = require("../../models");
const addOneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoText = req.body.todoText;
        const completed = req.body.completed;
        const user = req.body.user;
        const todo = (yield new models_1.TodosModel({
            todoText,
            completed,
            user,
        }).save());
        const _a = todo.toJSON(), { __v } = _a, todoData = __rest(_a, ["__v"]);
        res.json(Object.assign({}, todoData));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can`t create todo!",
        });
    }
});
exports.addOneTodo = addOneTodo;
const getlistsTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idCompleted = req.body.completed;
        const user = req.body.user;
        const listTodos = yield models_1.TodosModel.find({ completed: idCompleted, user }, { __v: 0 });
        const arrayTodos = listTodos.map((todo) => {
            return todo.toJSON();
        });
        res.json(arrayTodos);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Can`t find todos!",
        });
    }
});
exports.getlistsTodos = getlistsTodos;
const removeOneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.todoId;
        yield models_1.TodosModel.findByIdAndDelete({ _id: id }).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Can`t delete todo!",
            });
        });
        res.json({
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "Can`t get todo!",
        });
    }
});
exports.removeOneTodo = removeOneTodo;
const completedToggleTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.todoId;
        const isCompleted = req.body.completed;
        yield models_1.TodosModel.findOneAndUpdate({ _id: id }, {
            completed: !isCompleted,
        });
        res.json({
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can`t update todo!",
        });
    }
});
exports.completedToggleTodo = completedToggleTodo;
