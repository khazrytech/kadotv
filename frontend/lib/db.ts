import mongoose, { Connection } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('Please define MONGO_URI in your environment');
}

// Interface ya caching
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Extends global interface ili kuzuia type errors
declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: 'kadotv',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    };

    // Tunahakikisha tuna-return connection object pekee
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
