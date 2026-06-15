'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface DownloadOption {
  quality: string; // Mfano: "1080p", "720p"
  size: string;    // Mfano: "1.2 GB", "800 MB"
  url: string;
}

interface MovieData {
  title: string;
  description: string;
  type: string;
  rating: number;
  videoUrl: string;
  poster?: string;
  posterUrl?: string;
  downloads?: DownloadOption[]; // Hapa ndipo tunapoweka chaguo za download
}

export default function WatchContent() {
  const params = useParams();
  const id = params?.id;
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;
      try {
        const response = await fetch(`https://kadotv.onrender.com/api/media/${id}`); 
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Inapakia...</div>;
  if (!movie) return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Muvi haipatikani.</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Player Section */}
      <div className="w-full bg-black">
        <div className="max-w-6xl mx-auto aspect-video">
           <iframe src={movie.videoUrl} className="w-full h-full border-none" allowFullScreen />
        </div>
      </div>

      {/* Maelezo na Download Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        
        {/* DOWNLOAD OPTIONS */}
        {movie.type.toLowerCase() === 'movie' && movie.downloads && movie.downloads.length > 0 && (
          <div className="mt-8 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-lg font-semibold mb-4 text-white">Chagua Quality ya Kudownload:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movie.downloads.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-zinc-800 hover:bg-red-700 transition p-4 rounded-lg border border-zinc-700"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{item.quality}</span>
                    <span className="text-xs text-zinc-400">Size: {item.size}</span>
                  </div>
                  <span className="text-sm font-bold bg-black/30 px-3 py-1 rounded">⬇️ Download</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
