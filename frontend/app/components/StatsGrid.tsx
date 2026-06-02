'use client';

const stats = [
  { value: '50M+', label: 'Active Users' },
  { value: '10K+', label: 'Titles Available' },
  { value: '200+', label: 'Live Sports Events' },
  { value: '4K', label: 'Ultra HD Quality' },
];

export default function StatsGrid() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:gap-6 lg:grid-cols-4">
      {stats.map(({ value, label }) => (
        <div
          key={label}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
        >
          <p className="text-xl font-bold text-white md:text-2xl">{value}</p>
          <p className="text-xs text-slate-300">{label}</p>
        </div>
      ))}
    </div>
  );
}
