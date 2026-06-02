import { BaseMockModel } from './BaseMockModel';

export interface IUser {
  id?: string;
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  favorites: string[];
  watchHistory: string[];
  premium: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export class UserClass extends BaseMockModel implements IUser {
  static dbName = 'User';

  id: string;
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  favorites: string[];
  watchHistory: string[];
  premium: boolean;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: Partial<IUser>) {
    super();
    this.email = data.email || '';
    this.password = data.password || '';
    this.name = data.name || 'Kado Fan';
    this.role = data.role || 'user';
    this.favorites = data.favorites || [];
    this.watchHistory = data.watchHistory || [];
    this.premium = data.premium || false;
    this.id = data.id || data._id || Math.random().toString(36).substring(2, 15);
    this._id = this.id;
    if (data.createdAt) this.createdAt = data.createdAt;
    if (data.updatedAt) this.updatedAt = data.updatedAt;
  }
}

export const User = UserClass as any;
