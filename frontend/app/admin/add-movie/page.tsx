'use client';
import React, { useState } from 'react';

export default function AdminAddMovie() {
  const [tmdbInput, setTmdbInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [generatedData, setGeneratedData] = useState<any>(null);

  // States za download
  const [dlUrl, setDlUrl] = useState('');
  const [dlQuality, setDlQuality] = useState('1080p');
  const [dlSize, setDlSize] = useState('');

  const TMDB_API_KEY = '7f986e64c22a0567ea19d9718a2a00ef';

  const formatSize = (mb: number) => {
    if (mb >= 1024) return (mb / 1024).toFixed(2) + ' GB';
    return mb + ' MB';
  };

  const handleFetchFromTMDB = async () => {
    if (!tmdbInput) return alert('Weka TMDB ID!');
    setLoading(true);
    setMessage({ text: 'Inatafuta...', type: 'success' });
    
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbInput}?api_key=${TMDB_API_KEY}`);
      if (!res.ok) throw new Error(`TMDB imekataa (Status: ${res.status})`);
      const data = await res.json();
      
      setGeneratedData({
        title: data.title,
        description: data.overview,
        type: 'movie',
        posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        videoUrl: `https://vidsrc.to/embed/movie/${tmdbInput}`,
        rating: data.vote_average ? parseFloat(data.vote_average.toFixed(1)) : 0,
        downloads: []
      });
      setMessage({ text: 'Data imepatikana!', type: 'success' });
    } catch (err: any) {
      setMessage({ text: `KOSA: ${err.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const addDownloadOption = () => {
    if (!dlUrl || !dlSize) return alert('Jaza link na ukubwa (MB)!');
    const newDownload = {
      quality: dlQuality,
      size: formatSize(parseInt(dlSize)),
      url: dlUrl
    };
    setGeneratedData({ ...generatedData, downloads: [...(generatedData.downloads || []), newDownload] });
    setDlUrl('');
    setDlSize('');
  };

  const handleSaveToDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://kadotv.onrender.com/api/admin/add-movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'KADOTV_SECRET_2026' },
        body: JSON.stringify(generatedData),
      });
      if (!response.ok) throw new Error('Save imefeli');
      setMessage({ text: '🎉 Imehifadhiwa!', type: 'success' });
      setGeneratedData(null);
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
        <input className="w-full bg-zinc-800 p-3 mb-4 rounded" placeholder="TMDB ID..." value={tmdbInput} onChange={(e) => setTmdbInput(e.target.value)} />
        <button onClick={handleFetchFromTMDB} disabled={loading} className="w-full bg-red-600 p-3 rounded mb-4">{loading ? '...' : 'Vuta Data'}</button>

        {message.text && <div className={`p-3 mb-4 rounded text-sm ${message.type === 'success' ? 'bg-emerald-900' : 'bg-red-900'}`}>{message.text}</div>}

        {generatedData && (
          <div className="border-t border-zinc-700 pt-4 mt-4">
            <h2 className="font-bold mb-2">Download Options:</h2>
            <input className="w-full bg-zinc-800 p-2 mb-2 rounded" placeholder="URL" value={dlUrl} onChange={(e) => setDlUrl(e.target.value)} />
            <input className="w-full bg-zinc-800 p-2 mb-2 rounded" placeholder="Size (MB)" value={dlSize} onChange={(e) => setDlSize(e.target.value)} type="number" />
            <select className="w-full bg-zinc-800 p-2 mb-4 rounded" value={dlQuality} onChange={(e) => setDlQuality(e.target.value)}>
              <option>1080p</option><option>720p</option>
            </select>
            <button onClick={addDownloadOption} className="w-full bg-blue-600 p-2 rounded mb-4">Ongeza Link</button>
            <button onClick={handleSaveToDatabase} disabled={loading} className="w-full bg-green-600 p-3 rounded font-bold">🚀 Save</button>
          </div>
        )}
      </div>
    </div>
  );
}
