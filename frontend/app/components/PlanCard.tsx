import Link from 'next/link';
import { motion } from 'framer-motion';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  color: string;
  popular?: boolean;
  features: string[];
  missing: string[];
}

export default function PlanCard({ plan, delay = 0 }: { plan: Plan; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl border ${
        plan.popular ? 'border-violet-500/50 shadow-[0_0_50px_rgba(139,92,246,0.2)]' : 'border-white/10'
      } bg-surface-2`}
    >
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <span className="rounded-b-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
            Most Popular
          </span>
        </div>
      )}
      <div className={`h-1.5 w-full bg-gradient-to-r ${plan.color}`} />
      <div className="p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">{plan.name}</p>
        <div className="mt-3 flex items-end gap-1">
          {plan.price === 0 ? (
            <span className="text-5xl font-bold text-white">Free</span>
          ) : (
            <>
              <span className="text-2xl font-medium text-slate-400 self-start mt-2">$</span>
              <span className="text-5xl font-bold text-white">{plan.price.toFixed(2)}</span>
              <span className="mb-1 text-sm text-slate-400">/ {plan.period}</span>
            </>
          )}
        </div>

        <Link
          href="/register"
          id={`plan-${plan.id}`}
          className={`mt-8 block w-full rounded-full bg-gradient-to-r ${plan.color} py-4 text-center text-sm font-semibold text-white transition hover:opacity-90 hover:-translate-y-0.5`}
        >
          {plan.price === 0 ? 'Get Started Free' : `Start ${plan.name} Plan`}
        </Link>

        <ul className="mt-8 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-slate-200">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
          {plan.missing.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-slate-500">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
