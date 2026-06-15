'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Tunabakisha hizi kwa ajili ya Hero na muundo wa kadi
import { heroData, sectionCards, plans } from '../lib/data';
import ContentCard from './components/ContentCard';
import PlanCard from './components/PlanCard';

interface LiveMedia {
  _id: string;
  id?: string;
  title: string;
  description?: string;
  type: string;
  rating?: number;
  genre?: string[];
  year?: number;
  duration?: string;
  posterUrl?: string;
  poster?: string;
  image?: string;
}

const stats = [
  { value: '50M+', label: 'Active Users' },
  { value: '10K+', label: 'Titles Available' },
  { value: '200+', label: 'Live Sports Events' },
  { value: '4K', label: 'Ultra HD Quality' },
  { value: '50K', label: 'More than Downloaded' },
];

export default function HomePage() {
  const [liveMovies, setLiveMovies] = useState<LiveMedia[]>([]);
  const [loading, setLoading] = useState(true);

  // Vuta data laivu kutoka Render pindi ukurasa unapofunguka
  useEffect(() => {
    const fetchLiveContent = async () => {
      try {
        const response = await fetch('https://kadotv.onrender.com/api/media');
        const data = await response.json();
        if (Array.isArray(data)) {
          setLiveMovies(data);
        }
      } catch (error) {
        console.error('Imeshindwa kuvuta muvi kwenye Home:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveContent();
  }, []);

  // Kuchuja makundi tofauti kutoka kwenye database laivu
  const trendingContent = liveMovies.length > 0 ? liveMovies : [];
  const dynamicMovies = liveMovies.filter((m) => m.type?.toLowerCase() === 'movie').slice(0, 4);
  const dynamicSeries = liveMovies.filter((m) => m.type?.toLowerCase() === 'series').slice(0, 4);

  return (
    <main className="min-h-screen overflow-hidden text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-surface">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          speed={1500}
          className="absolute inset-0 h-full w-full"
          pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
        >
          {heroData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-full w-full">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-10 md:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className="max-w-2xl p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 mb-6"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-tight">
              Unlimited Action,{' '}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Movies & Series
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Discover cinematic action, blockbuster movies, and premium series — all in one place. 4K HDR. No buffering.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/browse"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 px-10 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(91,128,255,0.5)] transition hover:-translate-y-1.5 hover:shadow-[0_0_60px_rgba(91,128,255,0.7)]"
                id="hero-browse"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Start Watching
              </Link>
              <Link
                href="/movies"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-10 py-4 text-base text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/30"
                id="hero-movies"
              >
                Browse Movies →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            {stats.map(({ value, label }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + idx * 0.1 }}
                className="flex flex-col items-start gap-1 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{value}</p>
                <p className="text-sm uppercase tracking-wider text-slate-400">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="swiper-pagination-custom absolute bottom-10 left-1/2 -translate-x-1/2 z-20" />
      </section>

      {/* Featured Carousel (Trending Now & Live Sports) */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Featured Collections</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Trending Now & Live Sports</h2>
        </div>
        
        {loading ? (
          <p className="text-slate-400">Inatafuta muvi mpya...</p>
        ) : trendingContent.length === 0 ? (
          <p className="text-slate-400">Hakuna maudhui yoyote kwenye database kwa sasa.</p>
        ) : (
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
            {trendingContent.map((item) => (
              <SwiperSlide key={item._id}>
                <Link href={`/watch/${item._id}`} className="block">
                  <motion.div whileHover={{ scale: 1.02 }} className="group relative overflow-hidden rounded-[28px] bg-surface-2 shadow-glass cursor-pointer">
                    <img 
                      src={item.posterUrl || item.poster || item.image || '/placeholder.jpg'} 
                      alt={item.title} 
                      className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="mb-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200 backdrop-blur-sm">
                        {item.type || 'Movie'}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-300 line-clamp-2">
                        {item.description || 'Gundua uhondo kamili wa video hii kwenye KadoTV.'}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
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
          {dynamicMovies.map((movie, i) => (
            <motion.div key={movie._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <ContentCard 
                id={movie._id} 
                title={movie.title} 
                image={movie.posterUrl || movie.poster || '/placeholder.jpg'} 
                genre={movie.genre || ['Action']} 
                rating={movie.rating || 7.5} 
                year={movie.year || 2026} 
                duration={movie.duration || '2h'} 
                type="movie" 
              />
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
          {dynamicSeries.map((s, i) => (
            <motion.div key={s._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <ContentCard 
                id={s._id} 
                title={s.title} 
                image={s.posterUrl || s.poster || '/placeholder.jpg'} 
                genre={s.genre || ['Drama']} 
                rating={s.rating || 8.0} 
                type="series" 
              />
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

      {/* CTA Section */}
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
