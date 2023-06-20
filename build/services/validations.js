"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoValidation = exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)("email", "Invalid email format").isEmail(),
    (0, express_validator_1.body)("password", "Password must be at least 8 sumbols").isLength({ min: 8 }),
    (0, express_validator_1.body)("name", "Enter your name").isLength({ min: 3, max: 20 }),
];
exports.loginValidation = [
    (0, express_validator_1.body)("email", "Invalid email format").isEmail(),
    (0, express_validator_1.body)("password", "Password must be at least 8 sumbols").isLength({ min: 8 }),
];
exports.todoValidation = [
    (0, express_validator_1.body)("todoText").isLength({ min: 1 }),
    (0, express_validator_1.body)("completed").isBoolean(),
    (0, express_validator_1.body)("user").isString(),
];
