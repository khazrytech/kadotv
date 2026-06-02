'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ContentCard from '../components/ContentCard';
import GenreFilter from '../components/GenreFilter';
import { fetchMedia } from '../../lib/api';

const seriesGenres = ['All', 'Crime', 'Drama', 'Sci-Fi', 'Fantasy', 'Action', 'Comedy', 'Reality'];

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
}

export default function SeriesPage() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [series, setSeries] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia(1, 100, 'series', activeGenre !== 'All' ? activeGenre : undefined)
      .then(res => setSeries(res.data || []))
      .finally(() => setLoading(false));
  }, [activeGenre]);

  const featured = series.find(s => s.featured);
  const newEpisodes = series.filter(s => s.live);

  if (loading) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-blue-500 border-t-transparent rounded-full mb-4" />
          <p className="text-slate-400">Loading series...</p>
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
              <span className="inline-block rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-fuchsia-300">
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
        {newEpisodes.length > 0 && (
          <div className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-1 w-6 rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500" />
              <h2 className="text-xl font-bold text-white">Live Now</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {newEpisodes.map(s => (
                <ContentCard key={s.id} id={s.id} title={s.title} image={s.posterUrl} genre={s.category} rating={s.rating} type="series" isLive={s.live} />
              ))}
            </div>
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Browse</p>
            <h2 className="text-3xl font-bold text-white">All Series</h2>
          </div>
          <GenreFilter genres={seriesGenres} activeGenre={activeGenre} onChange={setActiveGenre} />
        </div>
        <motion.div layout className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {series.map((s, i) => (
            <motion.div key={s.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <ContentCard id={s.id} title={s.title} image={s.posterUrl} genre={s.category} rating={s.rating} type="series" />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}