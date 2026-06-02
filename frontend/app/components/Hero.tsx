import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { heroData } from '../../lib/data';
import LiveBadge from './LiveBadge';
import StatsGrid from './StatsGrid';
import Link from 'next/link';
import type { ReactNode } from 'react';

const buttonVariants = {
  primary: 'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(91,128,255,0.4)] transition hover:-translate-y-1',
  secondary: 'inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10',
};

interface CTAButtonProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
}

function CTAButton({ href, label, variant = 'primary', icon }: CTAButtonProps) {
  return (
    <Link href={href} className={buttonVariants[variant]}>
      {icon}
      {label}
    </Link>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-surface">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        src="https://cdn.coverr.co/videos/coverr-soccer-drone-on-stadium-3882/1080p.mp4"
      />

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

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-10 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <LiveBadge />
            <span className="text-xs uppercase tracking-[0.4em] text-slate-300">Champions League Final — Live Now</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Unlimited Sports,{' '}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Movies & Series
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300">
            Discover cinematic live sports, blockbuster movies, and premium series — all in one place. 4K HDR. No buffering.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CTAButton
              href="/browse"
              label="Start Watching"
              variant="primary"
              icon={
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              }
            />
            <CTAButton href="/sports" label="Live Sports" variant="secondary" />
          </div>
        </motion.div>

        <StatsGrid />
      </div>
    </section>
  );
}
