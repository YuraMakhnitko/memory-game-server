import { Request, Response } from 'express';
import { Document } from 'mongoose';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import { UserModel, UsersProps } from '../../models';
import { type CheckAuthProps } from '../types';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const password: string = req.body.password;
    const name: string = req.body.name;
    const email: string = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = (await new UserModel({
      name,
      email,
      passwordHash: hash,
    }).save()) as Document;

    const token = jwt.sign({ _id: user._id }, 'secret888', {
      expiresIn: '9999d',
    });

    const { passwordHash, __v, ...userData } = user.toJSON();

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t register properly!',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    // TODO email type of string
    const user = await UserModel.findOne({ email: email }, { __v: 0 });

    if (!user) {
      res.status(404).json({ message: 'User not found!' });
    }

    // Checking valid user password
    if (user) {
      const userPasswordHash = user?.toJSON();
      const isValidPass = bcrypt.compare(
        req.body.password,
        userPasswordHash.passwordHash
      );
      if (!isValidPass) {
        return res.status(400).json({
          message: 'Invalid login or password!',
        });
      }
      const token = jwt.sign({ _id: user._id }, 'secret888', {
        expiresIn: '9999d',
      });

      const { passwordHash, ...userData } = user.toJSON();
      res.json({ ...userData, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t auth properly!',
    });
  }
};

export const getMe = async (req: CheckAuthProps, res: Response) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    const { passwordHash, ...userData } = user?.toJSON() as UsersProps;
    res.json(userData);

    if (!user) {
      res.status(404).json({
        message: 'User not found!',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'No access',
    });
  }
};

export const addPoints = async (req: Request, res: Response) => {
  try {
    const userId: string = req.body._id;
    const gamePoints: number = req.body.points;
    console.log(gamePoints);
    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      res.status(404).json({
        message: 'User not found!',
      });
    }
    if ((user && user.points < gamePoints) || (user && !user.points)) {
      await UserModel.updateOne(
        { _id: userId },
        { points: gamePoints },
        {
          returnDocument: 'after',
        }
      );
      return res.json({
        message: 'success',
      });
    }
    res.json({
      message: 'points not updated',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Can`t update points',
    });
  }
};

export const getPointsList = async (req: Request, res: Response) => {
  try {
    const winners = await UserModel.find(
      {},
      { __v: 0, createdAt: 0, updatedAt: 0, email: 0, passwordHash: 0 }
    ).sort('-points');
    const listWinners = winners
      .filter((winner) => {
        return winner.points;
      })
      .map((winner) => {
        return winner.toJSON();
      });
    console.log(listWinners);
    return res.json(listWinners);
  } catch (error) {
    res.status(500).json({
      message: 'Can`t get winners',
    });
  }
};
