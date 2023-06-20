import express from 'express';
import { usersRouter } from './users/users.router';

export const appRoutter = express.Router();
appRoutter.use(usersRouter);
