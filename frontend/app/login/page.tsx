'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-surface text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(91,128,255,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(255,47,109,0.2),_transparent_18%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 w-full rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl md:p-12">
          <div className="mb-10 grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Premium access</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">Login to your elite streaming universe</h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">Log in for instant access to live sports, blockbuster movies, series premieres, intelligent recommendations, and exclusive VIP content.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-surface-2 p-5 shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]">
              <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">Key benefits</p>
              <ul className="mt-5 space-y-3 text-slate-300">
                <li>• Live match alerts + highlights</li>
                <li>• AI-powered recommendations</li>
                <li>• Multi-language audio & subtitles</li>
              </ul>
            </div>
          </div>

          <form className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-slate-400">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full border-none bg-transparent text-white outline-none placeholder:text-slate-500 focus:ring-0" />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-slate-400">Password</label>
              <input type="password" placeholder="••••••••" className="w-full border-none bg-transparent text-white outline-none placeholder:text-slate-500 focus:ring-0" />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-400" />
                Remember me
              </label>
              <Link href="#" className="text-sm text-blue-300 hover:text-blue-100">Forgot password?</Link>
            </div>
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              Continue
            </button>
          </form>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {['Google', 'Apple', 'Facebook'].map((provider) => (
              <button key={provider} className="rounded-3xl border border-white/10 bg-surface-2 px-5 py-4 text-sm text-slate-200 transition hover:bg-white/5">
                Continue with {provider}
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            New to KadoTV? <Link href="#" className="text-blue-300">Register now</Link> to unlock premium content.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
