'use client';
import React, { useState } from 'react';

export default function AdminAddMovie() {
  const [tmdbInput, setTmdbInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [generatedData, setGeneratedData] = useState<any>(null);
  
  // States kwa ajili ya kuongeza download links
  const [dlUrl, setDlUrl] = useState('');
  const [dlQuality, setDlQuality] = useState('1080p');
  const [dlSize, setDlSize] = useState('');

  // Function ya kucalculate MB to GB
  const formatSize = (mb: number) => {
    if (mb >= 1024) {
      return (mb / 1024).toFixed(2) + ' GB';
    }
    return mb + ' MB';
  };

  const addDownloadOption = () => {
    if (!dlUrl || !dlSize) return alert('Jaza link na ukubwa (MB)!');
    
    const newDownload = {
      quality: dlQuality,
      size: formatSize(parseInt(dlSize)), // Hapa ndipo uchawi unapotokea
      url: dlUrl
    };

    setGeneratedData({
      ...generatedData,
      downloads: [...(generatedData.downloads || []), newDownload]
    });
    
    setDlUrl('');
    setDlSize('');
  };

  const TMDB_API_KEY = '7f986e64c22a0567ea19d9718a2a00ef';

  const handleFetchFromTMDB = async () => {
    if (!tmdbInput) return alert('Weka TMDB ID!');
    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbInput}?api_key=${TMDB_API_KEY}`);
      const data = await res.json();
      
      setGeneratedData({
        title: data.title,
        description: data.overview,
        type: 'movie',
        posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        videoUrl: `https://vidsrc.to/embed/movie/${tmdbInput}`,
        rating: data.vote_average ? parseFloat(data.vote_average.toFixed(1)) : 0,
        downloads: [] // Tunaanzisha array ya downloads
      });
      setMessage({ text: 'Data imepatikana!', type: 'success' });
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
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'KADOTV_SECRET_2026' },
        body: JSON.stringify(generatedData),
      });

      if (!response.ok) throw new Error('Imefeli');
      setMessage({ text: '🎉 Muvi imehifadhiwa!', type: 'success' });
      setGeneratedData(null);
    } catch (err: any) {
      setMessage({ text: 'Save imefeli', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-md mx-auto bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <h1 className="text-xl font-bold mb-4">KadoTV Admin</h1>
        {/* ... Input ya TMDB hapa ... */}
        <input className="w-full bg-zinc-800 p-3 mb-4 rounded" placeholder="TMDB ID..." value={tmdbInput} onChange={(e) => setTmdbInput(e.target.value)} />
        <button onClick={handleFetchFromTMDB} className="w-full bg-red-600 p-3 rounded mb-4">Vuta Data</button>

        {generatedData && (
          <div className="border-t border-zinc-700 pt-4 mt-4">
            <h2 className="font-bold mb-2">Ongeza Download Option:</h2>
            <input className="w-full bg-zinc-800 p-2 mb-2 rounded" placeholder="Download URL" value={dlUrl} onChange={(e) => setDlUrl(e.target.value)} />
            <input className="w-full bg-zinc-800 p-2 mb-2 rounded" placeholder="Size (MB) mfano: 1024" value={dlSize} onChange={(e) => setDlSize(e.target.value)} type="number" />
            <select className="w-full bg-zinc-800 p-2 mb-4 rounded" value={dlQuality} onChange={(e) => setDlQuality(e.target.value)}>
              <option>1080p</option><option>720p</option><option>480p</option>
            </select>
            <button onClick={addDownloadOption} className="w-full bg-blue-600 p-2 rounded mb-4">Ongeza Link</button>

            {/* Orodha ya links zilizoongezwa */}
            {generatedData.downloads?.map((d: any, i: number) => (
               <div key={i} className="text-xs bg-zinc-800 p-2 mb-1 rounded">{d.quality} - {d.size}</div>
            ))}

            <button onClick={handleSaveToDatabase} className="w-full bg-green-600 p-3 rounded mt-4 font-bold">🚀 Save & Push</button>
          </div>
        )}
      </div>
    </div>
  );
}
