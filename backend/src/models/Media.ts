import mongoose from 'mongoose';

// Interface ya TypeScript (Hii haibadiliki)
export interface IMedia {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  category: string;
  type: 'movie' | 'series' | 'sport';
  posterUrl: string;
  videoUrl: string;
  rating: number;
  tags: string[];
  featured: boolean;
  live: boolean;
}

// Hapa ndipo tunaunganisha na MongoDB halisi
const mediaSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: String,
  // Alias inatumika kuhakikisha 'posterUrl' kwenye kodi yako inasoma field ya 'poster' iliyo kule MongoDB
  posterUrl: { type: String, alias: 'poster' }, 
  videoUrl: String,
  rating: { type: Number, default: 0 },
  tags: [String],
  featured: { type: Boolean, default: false },
  live: { type: Boolean, default: false }
}, { 
  collection: 'movies', // Jina la collection yako kule MongoDB
  timestamps: true 
});

// Hapa tunatengeneza Model ya Mongoose
// Tunatumia 'mongoose.models.Media' ili kuzuia error ya "OverwriteModel" wakati wa development
export const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
