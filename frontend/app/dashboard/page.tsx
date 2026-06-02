'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ContentCard from '../components/ContentCard';
import LiveBadge from '../components/LiveBadge';
import { watchHistory, liveMatches, movies, series } from '../../lib/data';

const stats = [
  { label: 'Hours Watched', value: '142h' },
  { label: 'Titles Saved', value: '24' },
  { label: 'Plan', value: 'Premium' },
  { label: 'Devices', value: '3' },
];

export default function DashboardPage() {
  const recommended = [...movies.filter(m => m.featured), ...series.filter(s => s.featured)].slice(0, 4);

  return (
    <main className="min-h-screen pt-24 text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/30 via-violet-600/20 to-fuchsia-600/20 border border-white/10 p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.15),_transparent_50%)] pointer-events-none" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Welcome back</p>
              <h1 className="mt-1 text-3xl font-bold text-white">Good evening, Ally! 👋</h1>
              <p className="mt-2 text-slate-300">You have 3 titles ready to continue watching.</p>
            </div>
            <Link href="/browse" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Discover Content
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/[0.07] bg-surface-2 p-5"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            </motion.div>
          ))}
        </div>

        {/* Live Right Now */}
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-3">
            <LiveBadge />
            <h2 className="text-xl font-bold text-white">Live Right Now</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveMatches.map(match => (
              <div key={match.id} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-surface-2 p-4 hover:border-white/15 transition cursor-pointer">
                <img src={match.image} alt={match.league} className="h-14 w-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 truncate">{match.league}</p>
                  <p className="font-semibold text-white truncate">{match.teamA} vs {match.teamB}</p>
                  <p className="text-sm font-bold text-red-400">{match.scoreA} – {match.scoreB} · {match.time}</p>
                </div>
                <button className="shrink-0 rounded-xl bg-red-500/20 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/30 transition">
                  Watch
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Watching */}
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-1 w-6 rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500" />
            <h2 className="text-xl font-bold text-white">Continue Watching</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {watchHistory.map(item => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                genre={'genre' in item ? item.genre : undefined}
                rating={'rating' in item ? item.rating : undefined}
                year={'year' in item ? item.year : undefined}
                duration={'duration' in item ? item.duration : undefined}
                seasons={'seasons' in item ? item.seasons : undefined}
                type={'seasons' in item ? 'series' : 'movie'}
                progress={item.progress}
              />
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div className="mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-1 w-6 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
            <h2 className="text-xl font-bold text-white">Recommended for You</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {recommended.map(item => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                genre={item.genre}
                rating={item.rating}
                year={'year' in item ? item.year : undefined}
                duration={'duration' in item ? item.duration : undefined}
                seasons={'seasons' in item ? item.seasons : undefined}
                type={'seasons' in item ? 'series' : 'movie'}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
