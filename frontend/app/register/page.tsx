'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!name || !email || !password) {
      setError('Tafadhali jaza nafasi zote.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://kadotv.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Imeshindwa kusajili akaunti. Jaribu tena.');
      }

      setSuccess('Akaunti imetengenezwa kwa mafanikio! Tunakupeleka Login...');
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err: any) {
      console.error('Kosa la Register:', err);
      setError(err.message || 'Kuna tatizo limetokea. Jaribu tena baadae.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-4 text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-6 bg-surface-2/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-glass">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-400">START STREAMING</p>
          <h1 className="text-3xl font-bold mt-1">Create Account</h1>
          <p className="text-slate-400 text-xs mt-2">Join KadoTV today to access premium movies and live sports.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">⚠️ {error}</div>}
          {success && <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs">✅ {success}</div>}

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-semibold">FULL NAME</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-all"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-semibold">EMAIL</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-all"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-semibold">PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-all"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Already have an account? <Link href="/login" className="text-fuchsia-400 hover:underline">Log in here.</Link>
        </p>
      </div>
    </main>
  );
}
