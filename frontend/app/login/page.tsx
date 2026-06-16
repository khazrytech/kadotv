'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Tafadhali jaza barua pepe (email) na nywila (password).');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://kadotv.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Barua pepe au Nywila sio sahihi!');
      }

      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      setSuccess('Umeingia kwa mafanikio! Tunakupeleka ukurasa wa mbele...');
      
      setTimeout(() => {
        router.push('/');
      }, 1500);

    } catch (err: any) {
      console.error('Kosa la Login:', err);
      setError(err.message || 'Kuna tatizo limetokea. Jaribu tena baadae.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-4 text-white relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl grid md:grid-cols-12 gap-8 items-center z-10">
        {/* Upande wa Kushoto: Form */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">PREMIUM ACCESS</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-1">
              Login to your elite<br />streaming universe
            </h1>
            <p className="text-slate-400 text-sm mt-3">
              Log in for instant access to live sports, blockbuster movies, series premieres, intelligent recommendations, and exclusive VIP content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                ✅ {success}
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-semibold">EMAIL</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-semibold">PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-white/5 border-white/10 text-blue-500 focus:ring-0"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-slate-400 hover:text-white transition">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 font-semibold text-white shadow-[0_0_30px_rgba(91,128,255,0.3)] hover:shadow-[0_0_40px_rgba(91,128,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Continue'
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-xs font-semibold">
            <button type="button" className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-center text-slate-300">
              Continue with Google
            </button>
            <button type="button" className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-center text-slate-300">
              Continue with Apple
            </button>
            <button type="button" className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-center text-slate-300">
              Continue with Facebook
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 pt-4">
            New to KadoTV? <Link href="/register" className="text-blue-400 hover:underline">Register now to unlock premium content.</Link>
          </p>
        </div>

        {/* Upande wa Kulia: Key Benefits Card */}
        <div className="md:col-span-5 hidden md:block">
          <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-600/10 to-violet-600/10 border border-white/10 backdrop-blur-xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-400">KEY BENEFITS</h3>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>Live match alerts + highlights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400 font-bold">•</span>
                <span>AI-powered recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fuchsia-400 font-bold">•</span>
                <span>Multi-language audio & subtitles</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
