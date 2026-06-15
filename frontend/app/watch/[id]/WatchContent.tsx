'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface MovieData {
  title: string;
  description: string;
  type: string;
  rating: number;
  videoUrl: string;
  poster?: string;
  posterUrl?: string;
}

// ILIVYOKUWA: export default function WatchContent({ movie })
// SUTI MPYA: Haina mabano ya ({ movie }) kwa sababu inafanya fetch yenyewe hapa ndani!
export default function WatchContent() {
  const params = useParams();
  const id = params?.id;

  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // Inasoma kutoka backend yako ya Render
        const response = await fetch(`https://kadotv.onrender.com/api/media/${id}`); 
        const data = await response.json();

        if (data) {
          setMovie(data);
        } else {
          setError('Muvi haijapatikana kwenye database.');
        }
      } catch (err) {
        setError('Imeshindwa kupata data za muvi kutoka server.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', padding: '100px', backgroundColor: '#0b0c10', minHeight: '100vh' }}>
        <p>Inapakia video... Subiri kidogo.</p>
      </div>
    );
  }

  if (error || !movie || !movie.videoUrl) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', padding: '100px', backgroundColor: '#0b0c10', minHeight: '100vh' }}>
        <p>{error || 'Video haijapatikana au kiungo kina shida.'}</p>
      </div>
    );
  }

  // Mfumo unakagua kama link ni ya embed (VidSrc / 2Embed)
  const isEmbedLink = 
    movie.videoUrl.includes('vidsrc') || 
    movie.videoUrl.includes('2embed') || 
    movie.videoUrl.includes('embed');

  return (
    <div style={{ width: '100%', backgroundColor: '#0b0c10', color: '#fff', minHeight: '100vh' }}>
      
      {/* SEHEMU YA VIDEO PLAYER */}
      <div style={{ width: '100%', backgroundColor: '#000', position: 'relative' }}>
        {isEmbedLink ? (
          /* NJIA YA 1: VidSrc au Embed yoyote - Tunafungua salama kupitia Iframe wetu */
          <iframe
            src={movie.videoUrl}
            title={movie.title}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              border: 'none',
              display: 'block'
            }}
            allowFullScreen
            scrolling="no"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          /* NJIA YA 2: Direct .mp4 link */
          <video
            src={movie.videoUrl}
            controls
            poster={movie.poster || movie.posterUrl}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: '#000',
              display: 'block'
            }}
          />
        )}
      </div>

      {/* SEHEMU YA MAELEZO */}
      <div style={{ padding: '24px 16px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          {movie.title}
        </h1>
        <div style={{ display: 'flex', gap: '12px', color: '#888', fontSize: '14px', marginBottom: '16px' }}>
          <span>{movie.type ? movie.type.toUpperCase() : 'MOVIE'}</span>
          {movie.rating > 0 && <span>⭐ {movie.rating}</span>}
        </div>
        <p style={{ color: '#ccc', fontSize: '16px', lineHeight: '1.6', maxWidth: '800px' }}>
          {movie.description || 'Haina maelezo kwa sasa.'}
        </p>
      </div>

    </div>
  );
}
