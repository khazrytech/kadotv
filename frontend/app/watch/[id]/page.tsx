'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ContentCard from '../../components/ContentCard';
import { fetchMediaById, fetchMedia } from '../../../lib/api';

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

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<MediaItem | null>(null);
  const [related, setRelated] = useState<MediaItem[]>([]);

  useEffect(() => {
    fetchMediaById(id).then((data: MediaItem | null) => {
      if (data) {
        setContent(data);
      }
    });
  }, [id]);

  useEffect(() => {
    if (content) {
      fetchMedia(1, 10, undefined, content.category)
        .then((res: { data?: MediaItem[] }) => setRelated(res.data?.filter((m: MediaItem) => m.id !== content.id) || []))
        .catch(() => setRelated([]));
    }
  }, [content]);

  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-blue-500 border-t-transparent rounded-full mb-4" />
          <h1 className="mt-4 text-2xl font-bold">Loading...</h1>
        </div>
      </main>
    );
  }

  const isSeries = content.type === 'series';

  return (
    <main className="min-h-screen pt-20 text-white">
      <section className="relative bg-black">
        <div className="mx-auto max-w-7xl">
          <div className="relative aspect-video w-full bg-surface-2 overflow-hidden">
            <img
              src={content.posterUrl}
              alt={content.title}
              className="h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl"
                id="play-button"
              >
                <svg className="h-8 w-8 translate-x-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="h-1 rounded-full bg-white/20">
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500" />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                <span>32:14</span>
                <div className="flex items-center gap-4">
                  <button className="text-slate-300 hover:text-white">CC</button>
                  <button className="text-slate-300 hover:text-white">HD</button>
                  <button className="text-slate-300 hover:text-white">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
                <span>1:48:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex-1">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-300">{content.category}</p>
                <h1 className="mt-2 text-4xl font-bold text-white">{content.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span>2024</span>
                  {content.rating && (
                    <span className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-0.5 text-yellow-400">
                      ⭐ {content.rating.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="rounded-full border border-white/20 bg-white/5 p-3 hover:bg-white/10 transition" title="Add to My List">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button className="rounded-full border border-white/20 bg-white/5 p-3 hover:bg-white/10 transition" title="Share">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>

            <p className="mt-6 text-slate-300 leading-7">{content.description}</p>

            {isSeries && (
              <div className="mt-8">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Episodes</p>
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <button
                      key={i}
                      id={`season-${i + 1}`}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        i === 0 ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white' : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      Season {i + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  {[1, 2, 3].map(ep => (
                    <div key={ep} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-surface-2 p-4 hover:border-white/15 transition cursor-pointer group">
                      <span className="text-2xl font-bold text-slate-600 w-8">{ep}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white">Episode {ep}</p>
                        <p className="text-xs text-slate-400">45 min</p>
                      </div>
                      <button className="rounded-xl bg-white/5 p-2 text-slate-400 group-hover:bg-white/10 group-hover:text-white transition">
                        <svg className="h-4 w-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">More Like This</p>
            <div className="space-y-4">
              {related.map(item => (
                <ContentCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.posterUrl}
                  genre={item.category}
                  rating={item.rating}
                  type={item.type}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
