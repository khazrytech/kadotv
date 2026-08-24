'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomePage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hakikisha hapa panavuta data zako kutoka TMDB API kwa usalama
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies'); // Badili iwe endpoint yako au TMDB fetch route
        const data = await response.json();
        // Tunahakikisha data inayokuja ni array au inachukua results za TMDB
        setMovies(data.results || data || []);
      } catch (err) {
        console.error('Hitilafu katika kupata data za TMDB:', err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">KadoTV - TMDB Movies</h1>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Inapakia maudhui kutoka TMDB...</div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full pb-10"
        >
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
              // Hapa tunatumia movie.id ya TMDB na fallback ya index ili kuepusha error ya Swiper/React
              <SwiperSlide key={movie?.id || index}>
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 p-3">
                  <div className="aspect-[2/3] bg-gray-800 rounded mb-2 relative overflow-hidden">
                    <img 
                      src={
                        movie?.poster_path 
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                          : '/placeholder.jpg'
                      } 
                      alt={movie?.title || movie?.name || 'KadoTV Content'} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-semibold text-sm truncate">
                    {movie?.title || movie?.name || 'Jina halipatikani'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Rating: {movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} ⭐
                  </p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">Hakuna filamu zilizopatikana</div>
          )}
        </Swiper>
      )}
    </main>
  );
}
