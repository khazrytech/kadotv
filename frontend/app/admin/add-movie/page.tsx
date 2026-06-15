'use client';
import { useState } from 'react';

// Presets za ukubwa wa file
const SIZE_PRESETS: { [key: string]: string } = {
  '1080p': '1.5 GB',
  '720p': '800 MB',
  '480p': '400 MB',
  '360p': '200 MB'
};

export default function AdminAddMovie() {
  const [tmdbId, setTmdbId] = useState('');
  const [movieData, setMovieData] = useState<any>(null);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [url, setUrl] = useState('');
  const [dlQuality, setDlQuality] = useState('1080p');
  const [dlSize, setDlSize] = useState(SIZE_PRESETS['1080p']);
  const [category, setCategory] = useState('home');

  // Vuta data kutoka TMDB
  const fetchMovie = async () => {
    if (!tmdbId) return alert("Ingiza TMDB ID");
    try {
      const res = await fetch(`/api/tmdb-fetch?id=${tmdbId}`);
      if (!res.ok) throw new Error("Imeshindwa kupata data");
      const data = await res.json();
      setMovieData(data);
    } catch (e) {
      alert("Kosa: Hatujaipata hiyo movie");
    }
  };

  // Badilisha Size kiotomatiki
  const handleQualityChange = (q: string) => {
    setDlQuality(q);
    setDlSize(SIZE_PRESETS[q] || '');
  };

  // Ongeza link kwenye list
  const addDownloadOption = () => {
    if (!url) return alert("Weka URL");
    setDownloads([...downloads, { url, quality: dlQuality, size: dlSize }]);
    setUrl('');
  };

  // SAVE KWENDA DATABASE (Kodi iliyoboreshwa)
  const handleSave = async () => {
    if (!movieData) return;

    const payload = { ...movieData, downloads, category };

    try {
      const res = await fetch('https://kadotv.onrender.com/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Ulinzi: Hapa ndipo tunazuia SyntaxError
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Kosa kutoka Server:", errorText);
        alert(`Server imekataa! (Status: ${res.status}). Angalia Console.`);
        return;
      }

      const data = await res.json();
      alert("Muvi imehifadhiwa vizuri!");
      setMovieData(null);
      setDownloads([]);
    } catch (error) {
      console.error("Kosa la mtandao:", error);
      alert("Kuna tatizo la muunganiko na Server.");
    }
  };

  return (
    <div className="p-6 bg-zinc-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input 
          className="bg-zinc-800 p-2 rounded w-full border border-zinc-700" 
          placeholder="TMDB ID" 
          value={tmdbId}
          onChange={(e) => setTmdbId(e.target.value)} 
        />
        <button onClick={fetchMovie} className="bg-blue-600 px-4 py-2 rounded">Vuta Data</button>
      </div>

      {movieData && (
        <div className="space-y-6">
          <div className="bg-zinc-800 p-4 rounded border-l-4 border-green-500">
            <h2 className="text-xl font-bold">{movieData.title}</h2>
          </div>

          {/* Download Options */}
          <div className="bg-zinc-800 p-4 rounded">
            <h3 className="font-bold mb-3">Download Options:</h3>
            <input 
              className="w-full bg-zinc-700 p-2 mb-2 rounded" 
              placeholder="URL" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
            />
            <div className="flex gap-2">
              <select className="bg-zinc-700 p-2 rounded w-1/3" value={dlQuality} onChange={(e) => handleQualityChange(e.target.value)}>
                {Object.keys(SIZE_PRESETS).map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              <input className="w-full bg-zinc-700 p-2 rounded" value={dlSize} onChange={(e) => setDlSize(e.target.value)} />
            </div>
            <button onClick={addDownloadOption} className="w-full bg-blue-600 mt-3 p-2 rounded font-bold">Ongeza Link</button>
            
            <div className="mt-4 space-y-2">
              {downloads.map((dl, i) => (
                <div key={i} className="flex justify-between bg-black p-3 rounded text-sm items-center">
                  <span>{dl.quality} - {dl.size}</span>
                  <button onClick={() => setDownloads(downloads.filter((_, idx) => idx !== i))} className="text-red-400">Futa</button>
                </div>
              ))}
            </div>
          </div>

          <select className="w-full bg-zinc-800 p-3 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="home">Home</option>
            <option value="trending">Trending</option>
            <option value="popular">Popular</option>
            <option value="series">Series</option>
          </select>

          <button onClick={handleSave} className="w-full bg-green-600 py-4 rounded font-bold text-lg">SAVE MOVIE</button>
        </div>
      )}
    </div>
  );
}
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
