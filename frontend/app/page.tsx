'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { sectionCards, plans } from '../lib/data';
import ContentCard from './components/ContentCard';
import PlanCard from './components/PlanCard';
import HeroSkeleton from './HeroSkeleton';

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
  category?: string;
}

const stats = [
  { value: '50M+', label: 'Active Users' },
  { value: '10K+', label: 'Titles Available' },
  { value: '200+', label: 'Live Sports' },
  { value: '4K', label: 'Ultra HD' },
];

export default function HomePage() {
  const [liveMovies, setLiveMovies] = useState<LiveMedia[]>([]);
  const [heroMovies, setHeroMovies] = useState<LiveMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveContent = async () => {
      try {
        const response = await fetch('https://kadotv.onrender.com/api/media');
        const resData = await response.json();
        
        const finalData = Array.isArray(resData) ? resData : (resData.data || []);
        
        if (Array.isArray(finalData)) {
          setLiveMovies(finalData);
          setHeroMovies(finalData.slice(0, 5));
        }
      } catch (error) {
        console.error('Imeshindwa kuvuta muvi kwenye Home:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveContent();
  }, []);

  const trendingContent = liveMovies.length > 0 ? liveMovies : [];
  const dynamicMovies = liveMovies.filter((m) => m.type?.toLowerCase() === 'movie').slice(0, 8);
  const dynamicSeries = liveMovies.filter((m) => m.type?.toLowerCase() === 'series').slice(0, 8);

  return (
    <main className="min-h-screen bg-[#0b0f19] overflow-hidden text-white selection:bg-blue-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-[#0b0f19]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
        
        {!loading && heroMovies.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect={'fade'}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={heroMovies.length > 1}
            speed={1200}
            className="absolute inset-0 h-full w-full"
            pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
          >
            {heroMovies.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="relative h-full w-full">
                  <img 
                    src={item.poster || item.posterUrl || item.image || '/placeholder.jpg'} 
                    alt={item.title} 
                    className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-[#0b0f19]/40" />
                  
                  <div className="absolute inset-0 z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-10 md:px-12">
                    <motion.div 
                      initial={{ opacity: 0, y: 40 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="max-w-2xl p-6 md:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-blue-500/30">
                          {item.category || item.type || 'Trending'}
                        </span>
                        {item.rating && (
                          <span className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                            ★ {item.rating}
                          </span>
                        )}
                      </div>

                      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white tracking-tight">
                        {item.title}
                      </h1>
                      
                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 line-clamp-3">
                        {item.description || 'Gundua uhondo kamili wa video hii na maudhui mengine mazuri ndani ya KadoTV kwa ubora wa hali ya juu.'}
                      </p>

                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                          href={`/watch/${item._id}`}
                          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-4 text-sm sm:text-base font-bold text-white shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(79,70,229,0.7)] active:scale-95"
                        >
                          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          Tazama Sasa
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <HeroSkeleton />
        )}

        {/* Stats Section - Fixed for Mobile & Desktop */}
        <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center sm:items-start gap-1 p-3.5 md:p-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-lg"
              >
                <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{value}</p>
                <p className="text-[10px] md:text-xs uppercase tracking-wider text-slate-400 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="swiper-pagination-custom absolute bottom-2 left-1/2 -translate-x-1/2 z-20 hidden md:flex" />
      </section>

      {/* Featured Carousel */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">Featured Collections</span>
            <h2 className="mt-2 text-2xl md:text-4xl font-extrabold text-white tracking-tight">Trending Now & Live Sports</h2>
          </div>
        </div>
        
        {loading ? (
          <div className="text-slate-400 animate-pulse">Inatafuta maudhui mapya...</div>
        ) : trendingContent.length === 0 ? (
          <div className="text-slate-400 p-8 rounded-2xl bg-white/[0.02] border border-white/5 text-center">Hakuna maudhui yoyote kwenye database kwa sasa.</div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1.1}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {trendingContent.map((item) => (
              <SwiperSlide key={item._id}>
                <Link href={`/watch/${item._id}`} className="block group">
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 shadow-xl cursor-pointer">
                    <img 
                      src={item.posterUrl || item.poster || item.image || '/placeholder.jpg'} 
                      alt={item.title} 
                      className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="mb-2 inline-block rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-[10px] uppercase tracking-widest text-blue-300 font-bold backdrop-blur-md">
                        {item.type || 'Movie'}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2">
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

      {/* Movies Grid */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 font-bold">Watch Now</span>
            <h2 className="mt-1 text-2xl md:text-3xl font-extrabold text-white">Top Movies</h2>
          </div>
          <Link href="/movies" className="text-xs md:text-sm font-semibold text-blue-400 hover:text-blue-300 transition flex items-center gap-1">
            See all <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {dynamicMovies.map((movie, i) => (
            <motion.div key={movie._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <ContentCard 
                id={movie._id} 
                title={movie.title} 
                image={movie.posterUrl || movie.poster || '/placeholder.jpg'} 
                genre={movie.genre?.join(', ') || 'Action'} 
                rating={movie.rating || 7.5} 
                year={movie.year || 2026} 
                duration={movie.duration || '2h'} 
                type="movie" 
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Series Grid */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">Binge Watch</span>
            <h2 className="mt-1 text-2xl md:text-3xl font-extrabold text-white">Popular Series</h2>
          </div>
          <Link href="/series" className="text-xs md:text-sm font-semibold text-blue-400 hover:text-blue-300 transition flex items-center gap-1">
            See all <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {dynamicSeries.map((s, i) => (
            <motion.div key={s._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <ContentCard 
                id={s._id} 
                title={s.title} 
                image={s.posterUrl || s.poster || '/placeholder.jpg'} 
                genre={s.genre?.join(', ') || 'Drama'} 
                rating={s.rating || 8.0} 
                type="series" 
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why KadoTV */}
      <section className="bg-slate-900/50 border-y border-white/5 py-24 my-12">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-14 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-400 font-bold">Why KadoTV</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-white">Everything you need, in one place</h2>
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
                className="rounded-3xl border border-white/10 bg-[#0b0f19] p-8 shadow-xl transition-all duration-300 hover:border-blue-500/40"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 text-xs uppercase tracking-widest text-blue-300 font-semibold">
                  {card.category}
                </div>
                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{card.copy}</p>
                <div className="mt-6 flex flex-wrap gap-2 text-xs">
                  {card.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 border border-white/5 px-3 py-1 text-slate-300 font-medium">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-blue-400 font-bold">Pricing Plans</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-white">Simple, transparent pricing</h2>
          <p className="mt-3 text-sm md:text-base text-slate-400">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-28 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.15),_transparent_70%)] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to watch?
            </h2>
            <p className="mt-4 text-slate-300 text-base md:text-lg">
              Join millions of streamers. Start for free — no credit card required.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                id="cta-register"
                className="rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-10 py-4 text-base font-bold text-white shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                Get Started Free
              </Link>
              <Link
                href="/browse"
                className="rounded-full border border-white/20 bg-white/5 px-10 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
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

