import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { ActiveView } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-[#050505] border-t border-white/5 text-zinc-500 py-16 px-6 lg:px-12 relative z-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-white/5">
          
          {/* Column 1: Info */}
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-3 font-mono">Portfolio Owner</span>
            <h4 className="font-serif text-[18px] text-white tracking-widest font-light uppercase mb-4">
              SIMON J BROOKES
            </h4>
            <p className="font-sans text-xs leading-relaxed text-zinc-400 max-w-sm">
              Director focusing on independent dark narrative dramas, psychological depth, and atmospheric storytelling.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-3 font-mono">Index</span>
            <div className="flex flex-col space-y-2 text-[11px] uppercase tracking-wider font-mono text-zinc-400">
              <button 
                onClick={() => { onNavigate('home'); window.scrollTo({top:0, behavior:'smooth'}); }} 
                className="text-left hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                Home
              </button>
              <button 
                onClick={() => { onNavigate('projects'); window.scrollTo({top:0, behavior:'smooth'}); }} 
                className="text-left hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                Projects
              </button>
              <button 
                onClick={() => { onNavigate('about'); window.scrollTo({top:0, behavior:'smooth'}); }} 
                className="text-left hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                About
              </button>
              <button 
                onClick={() => { onNavigate('contact'); window.scrollTo({top:0, behavior:'smooth'}); }} 
                className="text-left hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Column 3: Contact Representative */}
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-3 font-mono">Direct Inquiry</span>
            <h4 className="font-serif text-sm text-zinc-200 tracking-widest uppercase mb-2">
              Simon J Brookes
            </h4>
            <p className="font-sans text-xs text-zinc-400 mb-4">
              Inquiries: simon_j_brookes@icloud.com
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-white/30 rounded text-zinc-300 hover:text-white text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              Write To Director
              <ArrowUpRight size={12} />
            </button>
          </div>

        </div>

        {/* Base Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] tracking-wide text-zinc-500 font-mono">
          <p>© {currentYear} Simon J Brookes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
