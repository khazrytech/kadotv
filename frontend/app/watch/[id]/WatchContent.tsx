'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function WatchContent() {
  const params = useParams();
  const id = params?.id;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        // Hakikisha URL hii ni sahihi na inarudisha data kutoka kwenye DB yako
        const res = await fetch(`https://kadotv.onrender.com/api/media/${id}`);
        const data = await res.json();
        setMovie(data);
      } catch (e) {
        console.error("Kosa:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-white p-10 text-center">Inapakia...</div>;
  if (!movie) return <div className="text-white p-10 text-center">Muvi haijapatikana.</div>;

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Video Player Section */}
        <div className="aspect-video w-full bg-zinc-900 rounded-lg overflow-hidden mb-6">
          <iframe 
            src={movie.videoUrl} 
            className="w-full h-full"
            allowFullScreen 
          />
        </div>

        {/* Maelezo ya Muvi */}
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-zinc-400 mb-6">{movie.description}</p>

        {/* DOWNLOAD SECTION - Hapa ndipo uchawi ulipo */}
        {movie.downloads && movie.downloads.length > 0 && (
          <div className="bg-zinc-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-white">Download Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {movie.downloads.map((dl: any, index: number) => (
                <a 
                  key={index}
                  href={dl.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex justify-between items-center bg-zinc-700 hover:bg-zinc-600 p-4 rounded-md transition"
                >
                  <div>
                    <span className="block font-bold">{dl.quality}</span>
                    <span className="text-sm text-zinc-300">{dl.size}</span>
                  </div>
                  <span className="bg-blue-600 px-4 py-2 rounded font-bold text-sm">Download</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
