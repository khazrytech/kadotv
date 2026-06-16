'use client';
import { useState } from 'react';

const SIZE_PRESETS: { [key: string]: string } = {
  '1080p': '1.5 GB',
  '720p': '800 MB',
  '480p': '400 MB',
  '360p': '200 MB'
};

const CATEGORIES = ['home', 'movies', 'series', 'trending', 'top-movies', 'popular-series'];

export default function AdminAddMovie() {
  const [tmdbId, setTmdbId] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [movieData, setMovieData] = useState<any>(null);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [url, setUrl] = useState('');
  const [dlQuality, setDlQuality] = useState('1080p');
  const [dlSize, setDlSize] = useState(SIZE_PRESETS['1080p']);

  const fetchMovie = async () => {
    if (!tmdbId) return alert("Ingiza TMDB ID");
    try {
      const res = await fetch(`/api/tmdbfetch?id=${tmdbId}`);
      if (!res.ok) throw new Error("Server imekataa");
      const data = await res.json();
      setMovieData(data);
      setUrl(`https://vidsrc.to/embed/movie/${tmdbId}`);
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Kosa: Hatujaipata hiyo movie.");
    }
  };

  const addDownloadOption = () => {
    if (!url) return alert("Weka URL");
    setDownloads([...downloads, { url, quality: dlQuality, size: dlSize }]);
    setUrl('');
  };

  const handleSave = async () => {
    if (!movieData) return;
    
    const payload = { 
      title: movieData.title,
      poster_path: movieData.poster_path || movieData.backdrop_path,
      overview: movieData.overview,
      category: category,
      downloads: downloads
    };

    try {
      const res = await fetch('https://kadotv.onrender.com/api/admin/add-movie', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-key': 'KADOTV_SECRET_2026' 
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData);
      }
      
      alert(`Muvi imehifadhiwa vizuri kwenye ${category.toUpperCase()}!`);
      setMovieData(null);
      setDownloads([]);
      setTmdbId('');
    } catch (error) {
      console.error("Save Error:", error);
      alert("Kosa: " + error);
    }
  };

  return (
    <div className="p-6 bg-zinc-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="bg-zinc-800 p-4 rounded mb-6">
        <label className="block mb-2 text-sm font-bold">Chagua Kategoria ya Movie:</label>
        <select 
          className="w-full bg-zinc-700 p-3 rounded mb-4" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
        </select>

        <div className="flex gap-2">
          <input 
            className="bg-zinc-700 p-2 rounded w-full border border-zinc-600" 
            placeholder="TMDB ID" 
            value={tmdbId}
            onChange={(e) => setTmdbId(e.target.value)} 
          />
          <button onClick={fetchMovie} className="bg-blue-600 px-6 py-2 rounded font-bold">Vuta Data</button>
        </div>
      </div>

      {movieData && (
        <div className="space-y-6">
          <div className="bg-zinc-800 p-4 rounded border-l-4 border-green-500">
            <h2 className="text-xl font-bold">{movieData.title}</h2>
          </div>
          <div className="bg-zinc-800 p-4 rounded">
            <h3 className="font-bold mb-3">Download & Embed Options:</h3>
            <input 
              className="w-full bg-zinc-700 p-2 mb-2 rounded" 
              placeholder="URL" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
            />
            <div className="flex gap-2">
              <select className="bg-zinc-700 p-2 rounded w-1/3" value={dlQuality} onChange={(e) => {
                  setDlQuality(e.target.value);
                  setDlSize(SIZE_PRESETS[e.target.value] || '');
              }}>
                {Object.keys(SIZE_PRESETS).map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              <input className="w-full bg-zinc-700 p-2 rounded" value={dlSize} onChange={(e) => setDlSize(e.target.value)} />
            </div>
            <button onClick={addDownloadOption} className="w-full bg-blue-600 mt-3 p-2 rounded font-bold">Ongeza Link</button>
          </div>
          
          <button onClick={handleSave} className="w-full bg-green-600 py-4 rounded font-bold text-lg">SAVE MOVIE KWA KATEGORIA: {category.toUpperCase()}</button>
        </div>
      )}
    </div>
  );
}
