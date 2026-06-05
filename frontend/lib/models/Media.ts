import mongoose, { Schema, Document, model } from 'mongoose';

interface IMedia extends Document {
  title: string;
  description: string;
  category: string;
  type: 'movie' | 'series' | 'sport';
  posterUrl: string;
  videoUrl: string;
  previewUrl?: string;
  rating: number;
  tags: string[];
  featured: boolean;
  live: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['movie', 'series', 'sport'],
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  previewUrl: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  tags: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  live: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Media || model<IMedia>('Media', MediaSchema);
