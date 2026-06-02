import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kadotv';
export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
export const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
