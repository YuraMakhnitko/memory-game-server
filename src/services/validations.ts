import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 8 sumbols").isLength({ min: 8 }),
  body("name", "Enter your name").isLength({ min: 3, max: 20 }),
];

export const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 8 sumbols").isLength({ min: 8 }),
];

export const todoValidation = [
  body("todoText").isLength({ min: 1 }),
  body("completed").isBoolean(),
  body("user").isString(),
];
