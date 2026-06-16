'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Hakikisha tuko upande wa client kabla ya kusoma localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      // Kama haja-login, mtoe nje arudi Login page
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-white">
        <p className="animate-pulse text-slate-400">Inapakia taarifa za akaunti...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-surface text-white py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">MY ACCOUNT</p>
          <h1 className="text-4xl font-bold mt-1">User Profile</h1>
        </div>

        {/* Kadi ya Taarifa za Mtumiaji */}
        <div className="p-8 rounded-3xl bg-surface-2/60 border border-white/10 backdrop-blur-xl grid gap-6 md:grid-cols-2 items-center">
          <div className="flex items-center gap-4">
            {/* Avatar ya mduara */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-fuchsia-500 flex items-center justify-center font-bold text-3xl shadow-md text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <span className="inline-block mt-1 bg-blue-500/20 text-blue-300 text-xs px-3 py-0.5 rounded-full uppercase font-bold tracking-wider">
                {user.role || 'VIP Premium User'}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm border-t border-white/5 pt-4 md:border-t-0 md:pt-0 text-slate-300">
            <p><span className="text-slate-500 font-semibold">Email:</span> {user.email}</p>
            <p><span className="text-slate-500 font-semibold">Status:</span> <span className="text-green-400">Active</span></p>
          </div>
        </div>

        {/* Sehemu ya usimamizi na usalama */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-sm transition"
          >
            ← Back to Home
          </button>
          
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-full bg-red-600/20 border border-red-500/30 hover:bg-red-600/40 text-red-400 text-sm font-semibold transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </main>
  );
}
