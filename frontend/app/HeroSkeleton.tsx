import React from 'react';

export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-[#07070a] overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-white/[0.03]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/50 to-transparent"></div>
      <div className="absolute bottom-12 left-4 md:left-12 space-y-4 w-[90%] md:w-1/2 z-10">
        <div className="w-24 h-6 bg-white/10 rounded-full"></div>
        <div className="w-3/4 h-10 md:h-14 bg-white/10 rounded-xl"></div>
        <div className="w-1/2 h-10 md:h-14 bg-white/10 rounded-xl"></div>
        <div className="w-full h-4 bg-white/10 rounded-md mt-4"></div>
        <div className="w-5/6 h-4 bg-white/10 rounded-md"></div>
        <div className="w-4/6 h-4 bg-white/10 rounded-md"></div>
        <div className="flex gap-4 mt-8">
          <div className="w-32 h-12 bg-white/10 rounded-full"></div>
          <div className="w-32 h-12 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
