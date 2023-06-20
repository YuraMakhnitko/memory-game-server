import mongoose from 'mongoose';

export interface UsersProps {
  name: string;
  email: string;
  password: string;
  passwordHash: string;
  _id: string;
  points: number;
}
