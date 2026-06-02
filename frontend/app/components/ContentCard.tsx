'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ContentCardProps {
  id: string;
  title: string;
  image: string;
  genre?: string;
  rating?: number;
  year?: number;
  duration?: string;
  seasons?: number;
  type: 'movie' | 'series' | 'sport';
  isLive?: boolean;
  newEpisode?: boolean;
  progress?: number;
}

export default function ContentCard({
  id, title, image, genre, rating, year, duration, seasons, type, isLive, newEpisode, progress,
}: ContentCardProps) {
  const href = type === 'sport' ? `/sports` : `/watch/${id}`;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative overflow-hidden rounded-2xl bg-surface-2 border border-white/[0.07] cursor-pointer"
    >
      <Link href={href} className="block">
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-80" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {isLive && (
              <span className="flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                Live
              </span>
            )}
            {newEpisode && !isLive && (
              <span className="rounded-full bg-blue-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                New Ep.
              </span>
            )}
          </div>

          {/* Rating */}
          {rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
              <svg className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold text-white">{rating.toFixed(1)}</span>
            </div>
          )}

          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
              <svg className="h-6 w-6 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {progress !== undefined && (
          <div className="h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-fuchsia-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Info */}
        <div className="p-4">
          {genre && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-400">{genre}</span>
          )}
          <h3 className="mt-1 font-semibold text-white line-clamp-1">{title}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            {year && <span>{year}</span>}
            {duration && <><span className="text-slate-600">•</span><span>{duration}</span></>}
            {seasons && <><span className="text-slate-600">•</span><span>{seasons} Seasons</span></>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
