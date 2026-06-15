'use client';
import { useState } from 'react';

// Hizi ni presets za ukubwa wa faili (haitaji kuandika kwa mkono)
const SIZE_PRESETS: { [key: string]: string } = {
  '1080p': '1.5 GB',
  '720p': '800 MB',
  '480p': '400 MB',
  '360p': '200 MB'
};

export default function AdminAddMovie() {
  const [tmdbId, setTmdbId] = useState('');
  const [movieData, setMovieData] = useState<any>(null); // Hapa ndipo data za muvi zinahifadhiwa
  const [downloads, setDownloads] = useState<any[]>([]);
  
  // States kwa ajili ya form
  const [url, setUrl] = useState('');
  const [dlQuality, setDlQuality] = useState('1080p');
  const [dlSize, setDlSize] = useState(SIZE_PRESETS['1080p']);
  const [category, setCategory] = useState('home');

  // 1. Vuta data za movie kutoka TMDB
  const fetchMovie = async () => {
    if (!tmdbId) return alert("Ingiza TMDB ID kwanza!");
    try {
      // Badilisha '/api/tmdb-fetch' na endpoint yako inayovuta data za TMDB
      const res = await fetch(`/api/tmdb-fetch?id=${tmdbId}`);
      const data = await res.json();
      
      if (data && data.title) {
        setMovieData(data); // Hii inaleta jina la muvi kwenye screen
      } else {
        alert("Muvi haikupatikana!");
      }
    } catch (error) {
      alert("Kosa la kimtandao: " + error);
    }
  };

  // 2. Badilisha Size auto ukichagua Quality
  const handleQualityChange = (q: string) => {
    setDlQuality(q);
    setDlSize(SIZE_PRESETS[q] || '');
  };

  // 3. Ongeza kwenye list ya downloads
  const addDownloadOption = () => {
    if (!url) return alert("Weka URL ya download!");
    setDownloads([...downloads, { url, quality: dlQuality, size: dlSize }]);
    setUrl(''); // Clear URL baada ya kuongeza
  };

  // 4. Save kila kitu kwenye database
  const handleSave = async () => {
    if (!movieData) return;

    const payload = { 
      ...movieData, 
      downloads, 
      category,
      tmdbId // Tunahifadhi ID pia
    };

    try {
      const res = await fetch('https://kadotv.onrender.com/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert("Muvi imehifadhiwa vizuri!");
        setMovieData(null); // Clear form baada ya kusave
        setDownloads([]);
      } else {
        alert("Imeshindwa kusave kwenye database!");
      }
    } catch (error) {
      console.error("Kosa:", error);
    }
  };

  return (
    <div className="p-6 bg-zinc-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard: Add Movie</h1>
      
      {/* 1. Search Bar - Hapa ndipo tunavuta jina */}
      <div className="flex gap-2 mb-6">
        <input 
          className="bg-zinc-800 p-2 rounded w-full border border-zinc-700" 
          placeholder="Ingiza TMDB ID (mfano: 12345)" 
          value={tmdbId}
          onChange={(e) => setTmdbId(e.target.value)} 
        />
        <button onClick={fetchMovie} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Vuta Data</button>
      </div>

      {/* 2. Display ya Movie (Tutaona jina hapa baada ya ku-fetch) */}
      {movieData && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="bg-zinc-800 p-4 rounded border-l-4 border-green-500">
            <h2 className="text-xl font-bold">{movieData.title}</h2>
            <p className="text-sm text-zinc-400">{movieData.release_date}</p>
          </div>

          {/* 3. Download Options */}
          <div className="bg-zinc-800 p-4 rounded">
            <h3 className="font-bold mb-3 border-b border-zinc-700 pb-2">Download Options:</h3>
            <input 
              className="w-full bg-zinc-700 p-2 mb-2 rounded border border-zinc-600" 
              placeholder="URL ya Download" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
            />
            <div className="flex gap-2">
              <select 
                className="bg-zinc-700 p-2 rounded w-1/3" 
                value={dlQuality} 
                onChange={(e) => handleQualityChange(e.target.value)}
              >
                {Object.keys(SIZE_PRESETS).map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              <input 
                className="w-full bg-zinc-700 p-2 rounded border border-zinc-600" 
                value={dlSize} 
                onChange={(e) => setDlSize(e.target.value)} 
              />
            </div>
            <button onClick={addDownloadOption} className="w-full bg-blue-600 mt-3 p-2 rounded font-bold hover:bg-blue-500">Ongeza Link</button>
            
            {/* List ya links */}
            <div className="mt-4 space-y-2">
              {downloads.map((dl, i) => (
                <div key={i} className="flex justify-between bg-black p-3 rounded text-sm items-center">
                  <span>{dl.quality} - {dl.size}</span>
                  <button onClick={() => setDownloads(downloads.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300">Futa</button>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Category */}
          <div className="bg-zinc-800 p-4 rounded">
            <label className="block mb-2 font-bold">Chagua Category:</label>
            <select 
              className="w-full bg-zinc-700 p-3 rounded" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="home">Home</option>
              <option value="trending">Trending</option>
              <option value="popular">Popular</option>
              <option value="series">Series</option>
            </select>
          </div>

          {/* 5. Save Button */}
          <button 
            onClick={handleSave} 
            className="w-full bg-green-600 py-4 rounded font-bold text-lg hover:bg-green-500 shadow-lg"
          >
            SAVE MOVIE TO DATABASE
          </button>
        </div>
      )}
    </div>
  );
}
