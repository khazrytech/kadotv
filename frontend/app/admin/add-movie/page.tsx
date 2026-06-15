'use client';
import React, { useState } from 'react';

export default function AdminAddMovie() {
  const [tmdbInput, setTmdbInput] = useState('');
  const [loading, setLoading] = useState(false); // Sasa inatumika
  const [message, setMessage] = useState({ text: '', type: '' });
  const [generatedData, setGeneratedData] = useState<any>(null);

  const TMDB_API_KEY = '7f986e64c22a0567ea19d9718a2a00ef';

  const handleFetchFromTMDB = async () => {
    if (!tmdbInput) return alert('Weka TMDB ID!');
    setLoading(true); // Inatumika hapa
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbInput}?api_key=${TMDB_API_KEY}`);
      if (!res.ok) throw new Error('Muvi haijapatikana!');
      const data = await res.json();
      
      setGeneratedData({
        title: data.title,
        description: data.overview,
        category: data.genres?.map((g: any) => g.name).join(', '),
        type: 'movie',
        posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        videoUrl: `https://vidsrc.to/embed/movie/${tmdbInput}`,
        rating: data.vote_average || 0,
        tags: ['trending'],
        featured: true,
        live: true
      });
      setMessage({ text: 'Data imepatikana!', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setLoading(false); // Inatumika hapa
    }
  };

  const handleSaveToDatabase = async () => {
    setLoading(true); // Inatumika hapa
    try {
      const response = await fetch('https://kadotv.onrender.com/api/admin/add-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'KADOTV_SECRET_2026'
        },
        body: JSON.stringify(generatedData),
      });

      if (!response.ok) throw new Error('Imefeli! Angalia Admin Key.');
      setMessage({ text: '🎉 Muvi ipo LIVE!', type: 'success' });
      setGeneratedData(null);
      setTmdbInput('');
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setLoading(false); // Inatumika hapa
    }
  };

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-md mx-auto bg-zinc-900 p-6 rounded-xl">
        <input 
          className="w-full bg-zinc-800 p-3 mb-4 rounded" 
          placeholder="TMDB ID..." 
          onChange={(e) => setTmdbInput(e.target.value)} 
        />
        <button 
          onClick={handleFetchFromTMDB} 
          className="w-full bg-red-600 p-3 rounded mb-2 font-bold"
        >
          {loading ? 'Inatafuta...' : 'Vuta Data'} 
        </button>
        {message.text && <p className="mb-4">{message.text}</p>}
        {generatedData && (
          <button 
            onClick={handleSaveToDatabase} 
            className="w-full bg-green-600 p-3 rounded font-bold"
          >
            {loading ? 'Inahifadhi...' : '🚀 Save & Push to Database'}
          </button>
        )}
      </div>
    </div>
  );
}
