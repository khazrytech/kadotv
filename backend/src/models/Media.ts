import mongoose from 'mongoose';

// Interface ya TypeScript (Inabaki vilevile)
export interface IMedia {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  category: string;
  type: 'movie' | 'series' | 'sport';
  posterUrl: string;
  poster?: string; // Tumeongeza hii ili iunge mkono pande zote
  videoUrl: string;
  rating: number;
  tags: string[];
  featured: boolean;
  live: boolean;
}

// Hapa tumerekebisha schema ili isome 'poster' kutoka DB na itengeneze 'posterUrl' kwenda Frontend
const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  type: { type: String, enum: ['movie', 'series', 'sport'], default: 'movie' },
  // 'poster' ndio field halisi ya MongoDB, 'posterUrl' inakuwa alias kwa ajili ya Frontend yako
  poster: { type: String, alias: 'posterUrl' }, 
  videoUrl: { type: String, required: true },
  rating: { type: Number, default: 0 },
  tags: [String],
  featured: { type: Boolean, default: false },
  live: { type: Boolean, default: false }
}, { 
  collection: 'movies', 
  timestamps: true,
  // Hii inahakikisha alias (posterUrl) inatumwa kwenye JSON kwenda kwenye Website
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true }
});

export const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
