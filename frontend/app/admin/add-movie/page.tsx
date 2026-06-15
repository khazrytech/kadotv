'use client';
import React, { useState } from 'react';

export default function AdminAddMovie() {
  const [tmdbInput, setTmdbInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [generatedData, setGeneratedData] = useState<any>(null);

  const TMDB_API_KEY = '7f986e64c22a0567ea19d9718a2a00ef';

  const handleFetchFromTMDB = async () => {
    if (!tmdbInput) return alert('Weka TMDB ID!');
    setLoading(true);
    setMessage({ text: 'Inatafuta...', type: 'success' });
    
    try {
      // Tunatumia URL rasmi ya TMDB
      const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbInput}?api_key=${TMDB_API_KEY}`);
      
      if (!res.ok) {
        throw new Error(`TMDB imekataa (Status: ${res.status})`);
      }
      
      const data = await res.json();
      
      setGeneratedData({
        title: data.title,
        description: data.overview,
        category: data.genres?.map((g: any) => g.name).join(', ') || 'N/A',
        type: 'movie',
        posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        videoUrl: `https://vidsrc.to/embed/movie/${tmdbInput}`,
        rating: data.vote_average ? parseFloat(data.vote_average.toFixed(1)) : 0,
        tags: [...(data.genres?.map((g: any) => g.name.toLowerCase()) || []), 'trending'],
        featured: true,
        live: true
      });
      setMessage({ text: `Data imepatikana: "${data.title}"`, type: 'success' });
    } catch (err: any) {
      setMessage({ text: `KOSA: ${err.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://kadotv.onrender.com/api/admin/add-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'KADOTV_SECRET_2026'
        },
        body: JSON.stringify(generatedData),
      });

      if (!response.ok) {
        const errData = await response.text();
        throw new Error(errData || 'Hujaruhusiwa (Unauthorized)');
      }

      setMessage({ text: '🎉 Muvi imehifadhiwa kwenye database!', type: 'success' });
      setGeneratedData(null);
      setTmdbInput('');
    } catch (err: any) {
      setMessage({ text: `SAVE KOSA: ${err.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-md mx-auto bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <h1 className="text-xl font-bold mb-4">KadoTV Admin</h1>
        <input 
          className="w-full bg-zinc-800 p-3 mb-4 rounded border border-zinc-700" 
          placeholder="Weka TMDB ID (mfano: 931285)..." 
          value={tmdbInput}
          onChange={(e) => setTmdbInput(e.target.value)} 
        />
        
        <button 
          onClick={handleFetchFromTMDB} 
          disabled={loading}
          className="w-full bg-red-600 p-3 rounded mb-4 font-bold hover:bg-red-700 transition"
        >
          {loading ? 'Inafanya kazi...' : 'Vuta Data TMDB'}
        </button>

        {message.text && (
          <div className={`p-3 mb-4 rounded text-sm ${message.type === 'success' ? 'bg-emerald-900/50 text-emerald-200' : 'bg-red-900/50 text-red-200'}`}>
            {message.text}
          </div>
        )}

        {generatedData && (
          <button 
            onClick={handleSaveToDatabase} 
            disabled={loading}
            className="w-full bg-green-600 p-3 rounded font-bold hover:bg-green-700 transition"
          >
            🚀 Save & Push to Database
          </button>
        )}
      </div>
    </div>
  );
}
