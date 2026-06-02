'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { heroData, sectionCards, movies, series, plans } from '../lib/data';
import ContentCard from './components/ContentCard';
import PlanCard from './components/PlanCard';
import LiveBadge from './components/LiveBadge';

const stats = [
  { value: '50M+', label: 'Active Users' },
  { value: '10K+', label: 'Titles Available' },
  { value: '200+', label: 'Live Sports Events' },
  { value: '4K', label: 'Ultra HD Quality' },
];

export default function HomePage() {
  const [brunoImg, setBrunoImg] = useState('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80');
  const [mateusImg, setMateusImg] = useState('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80');
  const [mbeumoImg, setMbeumoImg] = useState('https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const intervals: ReturnType<typeof setInterval>[] = [];
    const updateImage = (setter: (url: string) => void, query: string) => {
      const url = `https://source.unsplash.com/800x600/?${query},${Math.random()}`;
      setter(url);
    };

    intervals.push(setInterval(() => updateImage(setBrunoImg, 'bruno-fernandes'), 5000));
    intervals.push(setInterval(() => updateImage(setMateusImg, 'matheus-cunha'), 5000));
    intervals.push(setInterval(() => updateImage(setMbeumoImg, 'mbeumo'), 5000));

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  const featuredMovies = movies.slice(0, 4);
  const featuredSeries = series.slice(0, 4);

  return (
    <main className="min-h-screen overflow-hidden text-white">
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-surface">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src="https://cdn.coverr.co/videos/coverr-soccer-drone-on-stadium-3882/1080p.mp4"
        />

        {/* Swiper carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          speed={1200}
          className="absolute inset-0 h-full w-full"
          pagination={{ clickable: true }}
        >
          {heroData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-full w-full">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-transparent to-surface" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Movie posters in front (overlay) */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {featuredMovies.map((movie, idx) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative inline-block mx-4"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="h-48 w-36 object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Player cards — OUTSIDE Swiper, on top of everything */}
        <div className="absolute bottom-24 right-6 hidden flex-row items-end gap-4 md:right-10 md:flex" style={{ zIndex: 30 }}>
          <div className="relative h-32 w-24 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl md:h-44 md:w-32">
            <img src={brunoImg} alt="Bruno Fernandes" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white">Bruno Fernandes</p>
            </div>
          </div>
          <div className="relative h-32 w-24 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl md:h-44 md:w-32">
            <img src={mateusImg} alt="Mateus Cunha" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white">Mateus Cunha</p>
            </div>
          </div>
          <div className="relative h-32 w-24 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl md:h-44 md:w-32">
            <img src={mbeumoImg} alt="Mbeumo" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white">Mbeumo</p>
            </div>
          </div>
        </div>

        {/* Hero text content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-10 md:px-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <LiveBadge />
              <span className="text-xs uppercase tracking-[0.4em] text-slate-300">Champions League Final — Live Now</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Unlimited Sports,{' '}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Movies & Series
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300">
              Discover cinematic live sports, blockbuster movies, and premium series — all in one place. 4K HDR. No buffering.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(91,128,255,0.4)] transition hover:-translate-y-1"
                id="hero-browse"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Start Watching
              </Link>
              <Link
                href="/sports"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm text-white backdrop-blur-sm transition hover:bg-white/10"
                id="hero-sports"
              >
                Live Sports →
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-16 left-6 right-6 md:left-10 md:right-auto"
          >
            <div className="flex flex-wrap gap-8">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Images (Eight) */}
      {mounted && (
        <section className="relative mb-16">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative overflow-hidden rounded-xl bg-surface-2 shadow-glass"
                >
                  <img
                    src={`https://source.unsplash.com/800x600/?movie,${Math.random() + i}`}
                    alt={`Welcome ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-sm font-medium text-white">
                    Welcome {i + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Carousel */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Featured Collections</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Trending Now & Live Sports</h2>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1.1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1280: { slidesPerView: 3.2 },
          }}
        >
          {heroData.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/watch/${item.id}`} className="block">
                <motion.div whileHover={{ scale: 1.02 }} className="group relative overflow-hidden rounded-[28px] bg-surface-2 shadow-glass cursor-pointer">
                  <img src={item.image} alt={item.title} className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mb-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200 backdrop-blur-sm">
                      {item.tag}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-300 line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Movies Row */}
      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Watch Now</p>
            <h2 className="text-3xl font-bold text-white">Top Movies</h2>
          </div>
          <Link href="/movies" className="text-sm text-blue-400 hover:text-blue-300 transition">See all →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {featuredMovies.map((movie, i) => (
            <motion.div key={movie.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <ContentCard id={movie.id} title={movie.title} image={movie.image} genre={movie.genre} rating={movie.rating} year={movie.year} duration={movie.duration} type="movie" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Series Row */}
      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Binge Watch</p>
            <h2 className="text-3xl font-bold text-white">Popular Series</h2>
          </div>
          <Link href="/series" className="text-sm text-blue-400 hover:text-blue-300 transition">See all →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {featuredSeries.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <ContentCard id={s.id} title={s.title} image={s.image} genre={s.genre} rating={s.rating} seasons={s.seasons} type="series" newEpisode={s.newEpisode} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why KadoTV */}
      <section className="bg-surface-2 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-fuchsia-300">Why KadoTV</p>
            <h2 className="mt-2 text-4xl font-bold text-white">Everything you need, in one place</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {sectionCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-surface px-6 py-8 shadow-glass transition duration-200"
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-blue-200">
                  {card.category}
                </div>
                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.copy}</p>
                <div className="mt-6 flex flex-wrap gap-2 text-[0.78rem]">
                  {card.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-slate-300">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Pricing</p>
          <h2 className="mt-2 text-4xl font-bold text-white">Simple, transparent pricing</h2>
          <p className="mt-3 text-slate-400">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(91,128,255,0.15),_transparent_60%)] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-bold text-white leading-tight">
              Ready to watch?
            </h2>
            <p className="mt-4 text-slate-300 text-lg">
              Join 50 million+ streamers. Start for free — no credit card required.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                id="cta-register"
                className="rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 px-10 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(91,128,255,0.35)] transition hover:-translate-y-1"
              >
                Get Started Free
              </Link>
              <Link
                href="/browse"
                className="rounded-full border border-white/20 bg-white/5 px-10 py-4 text-base text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Browse Content
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
