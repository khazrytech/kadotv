import mongoose from 'mongoose';

// Interface ya TypeScript kwa ajili ya data za Backend
export interface IMedia {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  category: string;
  type: 'movie' | 'series' | 'sport';
  posterUrl: string;
  poster?: string;
  videoUrl: string;
  rating: number;
  tags: string[];
  featured: boolean;
  live: boolean;
}

// Mpangilio wa Database (Schema)
const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  type: { type: String, enum: ['movie', 'series', 'sport'], default: 'movie' },
  poster: { type: String, alias: 'posterUrl' }, 
  videoUrl: { type: String, required: true },
  rating: { type: Number, default: 0 },
  tags: [String],
  featured: { type: Boolean, default: false },
  live: { type: Boolean, default: false }
}, { 
  collection: 'movies', 
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true }
});

export const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
