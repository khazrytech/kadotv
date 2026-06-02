'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PlanCard from '../components/PlanCard';
import { plans } from '../../lib/data';

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <main className="min-h-screen pt-20 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">

        {/* Steps Indicator */}
        <div className="mb-12 flex items-center justify-center gap-3">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                step >= s
                  ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white'
                  : 'border border-white/20 text-slate-500'
              }`}>
                {s}
              </div>
              {s < 2 && <div className={`h-px w-16 transition-all ${step > s ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Step 1 of 2</p>
              <h1 className="mt-2 text-4xl font-bold text-white">Create your account</h1>
              <p className="mt-3 text-slate-400">Join millions watching premium content</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="space-y-5">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                  { name: 'confirm', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <label className="mb-1.5 block text-xs uppercase tracking-[0.3em] text-slate-400">{label}</label>
                    <input
                      id={`register-${name}`}
                      name={name}
                      type={type}
                      value={form[name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                    />
                  </div>
                ))}
              </div>
              <button
                id="register-next"
                onClick={() => setStep(2)}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 py-4 text-sm font-semibold text-white transition hover:opacity-90 hover:-translate-y-0.5"
              >
                Continue →
              </button>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {['Google', 'Apple', 'Facebook'].map(p => (
                  <button key={p} className="rounded-2xl border border-white/10 bg-surface-2 py-3 text-xs text-slate-300 hover:bg-white/5 transition">
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link>
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Step 2 of 2</p>
              <h1 className="mt-2 text-4xl font-bold text-white">Choose your plan</h1>
              <p className="mt-3 text-slate-400">Unlock the full KadoTV experience</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan, i) => (
                <PlanCard key={plan.id} plan={plan} delay={i * 0.1} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-white transition">
                ← Back to account details
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
