'use client';

import React, { useState } from 'react';

export default function AdminAddMovie() {
  const [tmdbInput, setTmdbInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [generatedData, setGeneratedData] = useState<any>(null);

  const TMDB_API_KEY = '7f986e64c22a0567ea19d9718a2a00ef';

  const handleFetchFromTMDB = async () => {
    if (!tmdbInput) return alert('Tafadhali weka TMDB ID au Slug!');
    setLoading(true);
    setMessage({ text: '', type: '' });
    setGeneratedData(null);

    const movieId = tmdbInput.split('-')[0].trim();

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      
      if (!res.ok) throw new Error('Muvi haijapatikana TMDB! Hakiki ID yako.');
      
      const data = await res.json();
      const genres = data.genres ? data.genres.map((g: any) => g.name) : [];
      const categoryString = genres.join(', ');

      const formattedMovie = {
        title: data.title,
        description: data.overview,
        category: categoryString,
        type: 'movie',
        posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        videoUrl: `https://vidsrc.to/embed/movie/${movieId}`,
        rating: data.vote_average ? parseFloat(data.vote_average.toFixed(1)) : 0,
        tags: [...genres.map((g: string) => g.toLowerCase()), 'trending'],
        featured: true,
        live: true
      };

      setGeneratedData(formattedMovie);
      setMessage({ text: `Imefanikiwa kuvuta: "${data.title}"! Hakiki kisha bofya Save.`, type: 'success' });
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
      const response = await fetch('https://kadotv.onrender.com/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedData),
      });

      if (!response.ok) throw new Error('Imefeli kuhifadhi kwenye Database ya Render.');

      setMessage({ text: `🎉 "${generatedData.title}" imewekwa kwenye Database na ipo LIVE KadoTV!`, type: 'success' });
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
        <h1 className="text-2xl font-bold mb-2 text-red-500">KadoTV Auto-Movie Generator</h1>
        <p className="text-zinc-400 text-sm mb-6">Weka ID au Slug kutoka TMDB ili mfumo ujaze kila kitu kiotomatiki.</p>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Mfano: 931285"
            value={tmdbInput}
            onChange={(e) => setTmdbInput(e.target.value)}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
          />
          <button
            onClick={handleFetchFromTMDB}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 px-6 py-3 rounded-lg font-medium transition"
          >
            {loading ? 'Inatafuta...' : 'Generate JSON'}
          </button>
        </div>

        {message.text && (
          <div className={`p-4 rounded-lg mb-6 border text-sm ${
            message.type === 'success' 
              ? 'bg-emerald-950/50 border-emerald-800 text-emerald-400' 
              : 'bg-rose-950/50 border-rose-800 text-rose-400'
          }`}>
            {message.text}
          </div>
        )}

        {generatedData && (
          <div className="mt-4 border border-zinc-800 rounded-lg p-4 bg-zinc-950/50">
            <h3 className="font-semibold text-lg mb-2 text-zinc-200">Muonekano wa Data Itakavyohifadhiwa:</h3>
            <div className="space-y-2 text-sm text-zinc-400">
              <p><strong className="text-zinc-200">Jina:</strong> {generatedData.title}</p>
              <p><strong className="text-zinc-200">Aina:</strong> <span className="bg-zinc-800 px-2 py-0.5 rounded text-red-400 font-medium text-xs">{generatedData.category}</span></p>
              <p><strong className="text-zinc-200">Maelezo:</strong> {generatedData.description}</p>
            </div>

            <button
              onClick={handleSaveToDatabase}
              disabled={loading}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              {loading ? 'Inahifadhi...' : '🚀 Save & Push to KadoTV Live'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
