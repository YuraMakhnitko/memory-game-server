"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    points: {
        type: Number,
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)('user', usersSchema);
