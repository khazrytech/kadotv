'use client';

import { motion } from 'framer-motion';

interface GenreFilterProps {
  genres: string[];
  activeGenre: string;
  onChange: (genre: string) => void;
}

export default function GenreFilter({ genres, activeGenre, onChange }: GenreFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => {
        const active = genre === activeGenre;
        return (
          <button
            key={genre}
            id={`genre-${genre.toLowerCase()}`}
            onClick={() => onChange(genre)}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
              active ? 'text-white' : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            {active && (
              <motion.span
                layoutId="genre-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative">{genre}</span>
          </button>
        );
      })}
    </div>
  );
}
