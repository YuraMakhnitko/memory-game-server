import { Schema, model } from 'mongoose';
import { UsersProps } from './types';

const usersSchema = new Schema<UsersProps>(
  {
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
  },
  { timestamps: true }
);

export const UserModel = model<UsersProps>('user', usersSchema);
