'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LiveBadge from '../components/LiveBadge';
import { liveMatches, upcomingFixtures, sportsCategories } from '../../lib/data';

export default function SportsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredLive = activeCategory === 'All' ? liveMatches : liveMatches.filter(m => m.sport === activeCategory);
  const filteredUpcoming = activeCategory === 'All' ? upcomingFixtures : upcomingFixtures.filter(m => m.sport === activeCategory);

  return (
    <main className="min-h-screen pt-24 text-white">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pb-6 md:px-10">
        <div className="flex items-center gap-3">
          <LiveBadge />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-300">Sports Arena</p>
            <h1 className="text-4xl font-bold text-white">Live & Upcoming</h1>
          </div>
        </div>

        {/* Sport Category Pills */}
        <div className="mt-8 flex flex-wrap gap-3">
          {[{ label: 'All', icon: '🏆' }, ...sportsCategories].map(({ label, icon }) => {
            const active = activeCategory === label;
            return (
              <button
                key={label}
                id={`sport-${label.toLowerCase()}`}
                onClick={() => setActiveCategory(label)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(91,128,255,0.4)]'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{icon}</span>
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Live Matches */}
      {filteredLive.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-1 w-6 rounded-full bg-red-500" />
            <h2 className="text-2xl font-bold text-white">Live Now</h2>
            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-400">{filteredLive.length} matches</span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredLive.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-surface-2 shadow-[0_0_30px_rgba(239,68,68,0.08)] cursor-pointer hover:border-red-500/40 transition"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={match.image} alt={match.league} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-2 to-transparent" />
                  <div className="absolute top-3 left-3"><LiveBadge /></div>
                  <div className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {match.time}
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">{match.league}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="font-semibold text-white">{match.teamA}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black text-white">{match.scoreA}</span>
                      <span className="text-lg text-slate-500">–</span>
                      <span className="text-3xl font-black text-white">{match.scoreB}</span>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-white">{match.teamB}</p>
                    </div>
                  </div>
                  <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-red-600 to-orange-500 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                    Watch Live
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Fixtures */}
      {filteredUpcoming.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-1 w-6 rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500" />
            <h2 className="text-2xl font-bold text-white">Upcoming Fixtures</h2>
          </div>
          <div className="space-y-3">
            {filteredUpcoming.map((fixture, i) => (
              <motion.div
                key={fixture.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-surface-2 p-5 transition hover:border-white/15 hover:bg-white/[0.04] cursor-pointer"
              >
                <div className="h-14 w-14 overflow-hidden rounded-xl shrink-0">
                  <img src={fixture.image} alt={fixture.league} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{fixture.sport} · {fixture.league}</p>
                  <p className="mt-1 font-semibold text-white truncate">
                    {fixture.teamB ? `${fixture.teamA} vs ${fixture.teamB}` : fixture.teamA}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-white">{fixture.time}</p>
                  <p className="text-xs text-slate-400">{fixture.date}</p>
                </div>
                <button className="shrink-0 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/20 hover:text-blue-300">
                  Remind
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
