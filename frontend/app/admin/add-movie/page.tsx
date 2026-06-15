'use client';

import React, { useState } from 'react';

export default function AdminAddMovie() {
  const [tmdbInput, setTmdbInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [generatedData, setGeneratedData] = useState<any>(null);

  const TMDB_API_KEY = '7f986e64c22a0567ea19d9718a2a00ef';

  const handleFetchFromTMDB = async () => {
    if (!tmdbInput) return alert('Tafadhali weka TMDB ID!');
    setLoading(true);
    try {
      const movieId = tmdbInput.split('-')[0].trim();
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`);
      if (!res.ok) throw new Error('Muvi haijapatikana!');
      const data = await res.json();

      setGeneratedData({
        title: data.title,
        description: data.overview,
        category: data.genres.map((g: any) => g.name).join(', '),
        type: 'movie',
        posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        videoUrl: `https://vidsrc.to/embed/movie/${movieId}`,
        rating: data.vote_average ? parseFloat(data.vote_average.toFixed(1)) : 0,
        tags: [...data.genres.map((g: any) => g.name.toLowerCase()), 'trending'],
        featured: true,
        live: true
      });
      setMessage({ text: `Muvi "${data.title}" imevutwa!`, type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDatabase = async () => {
    if (!generatedData) return;
    setLoading(true);

    try {
      // HAPA NDIO TUNA-POINT KWENYE ROUTE MPYA NA KUTUMIA KEY YA SIRI
      const response = await fetch('https://kadotv.onrender.com/api/admin/add-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'KADOTV_SECRET_2026' 
        },
        body: JSON.stringify(generatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Imeferi! Angalia Admin Key.');
      }

      setMessage({ text: `🎉 Imefanikiwa! "${generatedData.title}" ipo LIVE.`, type: 'success' });
      setTmdbInput('');
      setGeneratedData(null);
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl mt-10">
        <h1 className="text-2xl font-bold mb-2 text-red-500">KadoTV Admin Panel</h1>
        <input
          type="text"
          placeholder="TMDB ID..."
          value={tmdbInput}
          onChange={(e) => setTmdbInput(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 mb-4 text-white"
        />
        <button onClick={handleFetchFromTMDB} className="w-full bg-red-600 py-3 rounded-lg font-bold mb-4">
          {loading ? 'Inatafuta...' : 'Vuta Data TMDB'}
        </button>
        {message.text && <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-emerald-900' : 'bg-red-900'}`}>{message.text}</div>}
        {generatedData && (
          <button onClick={handleSaveToDatabase} className="w-full bg-emerald-600 py-3 rounded-lg font-bold">
            🚀 Save & Push to Database
          </button>
        )}
      </div>
    </div>
  );
}
