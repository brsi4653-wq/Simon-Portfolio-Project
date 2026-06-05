import React, { useState } from 'react';

interface PosterPlaceholderProps {
  title: string;
  subtitle?: string;
  starring?: string;
  posterUrl?: string;
  className?: string;
}

export default function PosterPlaceholder({ 
  title, 
  subtitle = "ONE FOOT AFTER THE OTHER", 
  starring = "PRESTON FITZGERALD & LION MARK CIUFFREDA",
  posterUrl,
  className = "" 
}: PosterPlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  // Split starring for design
  const actors = starring.split('&').map(s => s.trim());
  const actor1 = actors[0] || "PRESTON FITZGERALD";
  const actor2 = actors[1] || "LION CIUFFREDA";

  // If a physical image was provided, always load the image tag directly
  if (posterUrl) {
    return (
      <div 
        id="physical-poster"
        className={`relative aspect-[3/4] w-full bg-[#050505] border border-white/5 overflow-hidden select-none shadow-2xl transition-all duration-700 hover:border-white/10 group ${className}`}
      >
        <img 
          src={posterUrl} 
          alt={title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.025]"
        />
      </div>
    );
  }

  return (
    <div 
      id="poster-placeholder"
      className={`relative aspect-[3/4] w-full bg-[#050505] border border-white/5 overflow-hidden flex flex-col justify-between p-8 text-center select-none group shadow-2xl transition-all duration-700 hover:border-white/10 ${className}`}
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505] z-0"></div>

      {/* Upper Actor Name */}
      <div className="z-10 mt-12">
        <span className="font-serif text-sm tracking-[0.3em] text-white/70 font-medium block uppercase md:text-base">
          {actor1}
        </span>
      </div>

      {/* Central Black Tear Belt with Tracks & Title */}
      <div className="relative my-auto py-8 bg-[#0a0a0a]/80 border-y border-white/5 z-10 flex flex-col items-center justify-center overflow-hidden min-h-[140px] shadow-inner">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/5 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white/5 to-transparent opacity-30"></div>

        <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 block uppercase mb-2 relative z-10">
          {subtitle}
        </span>
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-wider text-white font-extrabold uppercase relative z-10 scale-y-110">
          {title}
        </h2>
        <span className="font-serif text-[10px] tracking-[0.15em] text-white/50 block mt-2 uppercase italic relative z-10">
          A Film By Simon Brookes
        </span>
      </div>

      {/* Lower Actor Name & Technical Credits */}
      <div className="z-10 mb-8 flex flex-col items-center">
        <span className="font-serif text-sm tracking-[0.3em] text-white/70 font-medium block uppercase md:text-base mb-6">
          {actor2}
        </span>

        {/* Cinematic Credits Block (very small at the base) */}
        <p className="font-serif text-[7px] md:text-[8px] leading-relaxed text-white/30 tracking-wider max-w-[90%] mx-auto uppercase border-t border-white/5 pt-4 opacity-70 group-hover:opacity-90 transition-all">
          CEC Presents A JPHSLS Production A Film By Simon Brookes "Moving Forward" Starring Lion Ciuffreda and Preston Fitzgerald, Music by Enzo Alves, Editor Enzo Alves, Production Designer Preston Fitzgerald, Director of Photography Jonah Benvie, Executive Producers Preston Fitzgerald. Written by Preston Fitzgerald. Directed by Simon Brookes.
        </p>

        {/* Placement Notification */}
        <div className="mt-4 px-2.5 py-1 rounded bg-[#050505]/95 text-white/30 font-mono text-[8px] tracking-widest border border-white/5 group-hover:text-white/60 group-hover:border-white/10 transition-all">
          PORTFOLIO ENTRY ONLY • COMING SOON
        </div>
      </div>
    </div>
  );
}
