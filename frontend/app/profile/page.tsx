'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { watchHistory, plans } from '../../lib/data';

const currentPlan = plans.find(p => p.id === 'premium')!;

export default function ProfilePage() {
  return (
    <main className="min-h-screen pt-24 text-white">
      <div className="mx-auto max-w-5xl px-6 md:px-10">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-surface-2 p-10 sm:flex-row"
        >
          <div className="relative shrink-0">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-surface-2 text-4xl font-bold text-white">
                A
              </div>
            </div>
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-surface-2 bg-emerald-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white">Ally Muller</h1>
            <p className="text-slate-400">ally@kadotv.com</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 px-4 py-1.5 text-sm font-semibold text-violet-300">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium Member
            </div>
          </div>
          <Link href="/register" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 hover:bg-white/10 transition">
            Edit Profile
          </Link>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Current Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-violet-500/30 bg-surface-2 p-6"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Your Plan</p>
            <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${currentPlan.color} mb-4`} />
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold text-white">${currentPlan.price}</span>
              <span className="mb-1 text-sm text-slate-400">/ month</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-white">{currentPlan.name} Plan</p>
            <ul className="mt-4 space-y-2">
              {currentPlan.features.slice(0, 4).map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <svg className="h-3.5 w-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-xl border border-white/10 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition">
              Manage Subscription
            </button>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-surface-2 p-6"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Account Settings</p>
            {[
              { label: 'Change Password', icon: '🔒' },
              { label: 'Notification Preferences', icon: '🔔' },
              { label: 'Language & Subtitles', icon: '🌐' },
              { label: 'Parental Controls', icon: '👨‍👩‍👧' },
              { label: 'Connected Devices', icon: '📱' },
              { label: 'Download Settings', icon: '⬇️' },
            ].map(({ label, icon }) => (
              <button key={label} className="flex w-full items-center gap-4 rounded-xl p-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white text-left">
                <span className="text-base">{icon}</span>
                {label}
                <svg className="ml-auto h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Watch History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 mb-16 rounded-3xl border border-white/10 bg-surface-2 p-6"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Watch History</p>
          <div className="space-y-4">
            {watchHistory.map(item => (
              <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="h-14 w-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{item.title}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{item.progress}% watched</p>
                </div>
                <button className="shrink-0 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-400 hover:bg-blue-500/20 transition">
                  Resume
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
