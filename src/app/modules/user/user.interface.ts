import { Model } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'viewer' | 'user';
};

export type UserModel = Model<IUser, Record<string, unknown>>;
