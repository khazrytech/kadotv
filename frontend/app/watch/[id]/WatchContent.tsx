'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function WatchContent() {
  const params = useParams();
  const id = params?.id;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://kadotv.onrender.com/api/media/${id}`);
        const data = await res.json();
        setMovie(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!movie) return <div className="text-white p-10">Muvi haipatikani kwenye database.</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Container inayozuia player isijae screen (max-w-5xl) */}
      <div className="max-w-5xl mx-auto pt-10">
        <div className="aspect-video w-full bg-zinc-900 rounded-lg overflow-hidden shadow-2xl">
          <iframe 
            src={movie.videoUrl} 
            className="w-full h-full"
            allowFullScreen 
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-4 text-zinc-400">{movie.description}</p>

          {/* Download Button - Inatokea kwa Movies tu */}
          {movie.type === 'movie' && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Download Links:</h3>
              {movie.downloads?.map((dl: any, index: number) => (
                <a 
                  key={index}
                  href={dl.url} 
                  target="_blank"
                  className="block bg-red-600 hover:bg-red-700 p-4 mb-2 rounded transition font-bold"
                >
                  Download {dl.quality} ({dl.size})
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
