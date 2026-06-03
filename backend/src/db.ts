import mongoose from 'mongoose';
import { MONGO_URI } from './config';

export async function connectDatabase() {
  const uri = MONGO_URI;

  if (!uri || (uri.includes('localhost') || uri.includes('127.0.0.1') || uri.includes('mongodb-memory-server'))) {
    console.warn('⚠️ No MongoDB URI configured — running in offline mock mode');
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'kadotv',
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', (err as Error).message);
    throw err;
  }
}
