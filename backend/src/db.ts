import mongoose from 'mongoose';
import { MONGO_URI } from './config';

export async function connectDatabase() {
  let uri = MONGO_URI;

  if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('localhost') || process.env.MONGO_URI.includes('127.0.0.1')) {
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log('🧪 Using in-memory MongoDB');
    } catch {
      console.warn('⚠️ No MongoDB available — running in offline mock mode (BaseMockModel uses local JSON files)');
      return;
    }
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'kadotv',
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.warn('⚠️ MongoDB connection failed — running in offline mock mode:', (err as Error).message);
  }
}
