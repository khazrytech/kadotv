'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ContentCard from '../components/ContentCard';
import GenreFilter from '../components/GenreFilter';
import { fetchMedia } from '../../lib/api';

const movieGenres = ['All', 'Action', 'Drama', 'Sci-Fi', 'Thriller', 'Comedy', 'Horror', 'Romance'];

interface MediaItem {
  id: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export default function MoviesPage() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia(1, 100, 'movie', activeGenre !== 'All' ? activeGenre : undefined)
      .then(res => setMovies(res.data || []))
      .finally(() => setLoading(false));
  }, [activeGenre]);

  const featured = movies.find(m => m.featured);

  if (loading) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-blue-500 border-t-transparent rounded-full mb-4" />
          <p className="text-slate-400">Loading movies...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white">
      {featured && (
        <section className="relative h-[70vh] overflow-hidden">
          <img src={featured.posterUrl} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-blue-300">
                {featured.category}
              </span>
              <h1 className="mt-3 text-5xl font-bold text-white md:text-6xl">{featured.title}</h1>
              <p className="mt-4 max-w-xl text-slate-300">{featured.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`/watch/${featured.id}`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-surface transition hover:bg-white/90">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  Watch Now
                </a>
                <a href={`/watch/${featured.id}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-sm transition hover:bg-white/20">
                  + My List
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Browse</p>
            <h2 className="text-3xl font-bold text-white">All Movies</h2>
          </div>
          <GenreFilter genres={movieGenres} activeGenre={activeGenre} onChange={setActiveGenre} />
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie, i) => (
            <motion.div key={movie.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <ContentCard
                id={movie.id}
                title={movie.title}
                image={movie.posterUrl}
                genre={movie.category}
                rating={movie.rating}
                type="movie"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}