import React from 'react';

export default function KadoVideoPlayer({ movie }) {
  // Kama muvi haijapatikana bado kwenye loading au database
  if (!movie || !movie.videoUrl) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', padding: '50px', backgroundColor: '#0b0c10' }}>
        <p>Content not found au inapakia...</p>
      </div>
    );
  }

  // Siri ya ushindi: Mfumo unakagua kama link ni ya embed (VidSrc, 2Embed, YouTube)
  const isEmbedLink = 
    movie.videoUrl.includes('vidsrc') || 
    movie.videoUrl.includes('2embed') || 
    movie.videoUrl.includes('embed');

  return (
    <div style={{ width: '100%', backgroundColor: '#0b0c10', color: '#fff', minHeight: '100vh' }}>
      
      {/* SEHEMU YA VIDEO PLAYER */}
      <div style={{ width: '100%', backgroundColor: '#000', position: 'relative' }}>
        {isEmbedLink ? (
          /* NJIA YA 1: Kama link ni ya VidSrc/2Embed - Tunafungua kupitia Iframe */
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
          /* NJIA YA 2: Kama baadae ukiweka link ya direct (.mp4 au m3u8) - Inatumia player ya kawaida */
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

      {/* SEHEMU YA MAELEZO YA FILAMU */}
      <div style={{ padding: '24px 16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>
          {movie.title}
        </h1>
        
        <div style={{ display: 'flex', gap: '12px', color: '#888', fontSize: '14px', marginBottom: '16px' }}>
          <span>{movie.type ? movie.type.toUpperCase() : 'MOVIE'}</span>
          {movie.rating > 0 && <span>⭐ {movie.rating}</span>}
        </div>

        <p style={{ color: '#ccc', fontSize: '15px', lineHeight: '1.6', maxWidth: '800px' }}>
          {movie.description || 'Haina maelezo kwa sasa.'}
        </p>
      </div>

    </div>
  );
}
