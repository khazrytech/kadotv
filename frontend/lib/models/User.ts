import mongoose, { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  favorites: string[];
  watchHistory: string[];
  premium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  favorites: [{
    type: String,
  }],
  watchHistory: [{
    type: String,
  }],
  premium: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || model<IUser>('User', UserSchema);
