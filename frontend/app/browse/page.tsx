'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ContentCard from '../components/ContentCard';
import { fetchMedia } from '../../lib/api';

const types = ['All', 'Movies', 'Series', 'Live Sports'];

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

export default function BrowsePage() {
  const [activeType, setActiveType] = useState('All');
  const [query, setQuery] = useState('');
  const [allContent, setAllContent] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const typeParam = activeType === 'All' || activeType === 'Live Sports' ? undefined : activeType.toLowerCase().slice(0, -1) as any;
    fetchMedia(1, 200, typeParam)
      .then(res => setAllContent(res.data || []))
      .finally(() => setLoading(false));
  }, [activeType]);

  const filtered = allContent.filter(item => {
    const matchType =
      activeType === 'All' ||
      (activeType === 'Movies' && item.type === 'movie') ||
      (activeType === 'Series' && item.type === 'series') ||
      (activeType === 'Live Sports' && (item.type === 'sport' || item.live));
    const matchQuery = query === '' || item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQuery;
  });

  return (
    <main className="min-h-screen pt-24 text-white">
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Explore</p>
          <h1 className="text-4xl font-bold text-white">Browse All Content</h1>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <svg className="h-4 w-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search movies, series, sports..."
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              id="browse-search"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {types.map(type => (
              <button
                key={type}
                id={`type-${type.toLowerCase().replace(' ', '-')}`}
                onClick={() => setActiveType(type)}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  activeType === type
                    ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white'
                    : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-6 text-sm text-slate-400">{loading ? 'Loading...' : `${filtered.length} results`}</p>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <motion.div key={item.id + item.type} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
              <ContentCard
                id={item.id}
                title={item.title}
                image={item.posterUrl}
                genre={item.category}
                rating={item.rating}
                type={item.type}
                isLive={item.live}
              />
            </motion.div>
          ))}
        </motion.div>

        {!loading && filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-6xl">🔍</p>
            <p className="mt-4 text-lg font-semibold text-white">No results found</p>
            <p className="text-slate-400">Try a different search term or category</p>
          </div>
        )}
      </section>
    </main>
  );
}