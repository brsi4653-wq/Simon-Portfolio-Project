import React, { useState } from 'react';
import { Menu, X, Film } from 'lucide-react';
import { ActiveView } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export default function Header({ activeView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: ActiveView) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="site-header"
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/90 backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto flex max-w-7xl h-22 items-center justify-between px-6 lg:px-12">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="group flex flex-col items-start justify-center cursor-pointer text-left focus:outline-none"
        >
          <span className="text-[9px] tracking-[0.40em] uppercase font-semibold text-white/40 transition-colors group-hover:text-white/60 leading-none mb-1">
            Director Portfolio
          </span>
          <span className="font-serif text-[18px] font-light tracking-[0.25em] text-white uppercase transition-all duration-300 group-hover:tracking-[0.28em]">
            SIMON J BROOKES
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-[10px] tracking-[0.3em] uppercase font-medium">
          {navItems.map((item) => {
            const isActive = activeView === item.id || (item.id === 'projects' && !navItems.some(ni => ni.id === activeView));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 cursor-pointer transition-colors duration-300 focus:outline-none ${
                  isActive 
                    ? 'text-white border-b border-white/50' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-[#050505] border-b border-white/5 px-6 py-8 animate-fade-in flex flex-col space-y-6">
          {navItems.map((item) => {
            const isActive = activeView === item.id || (item.id === 'projects' && !navItems.some(ni => ni.id === activeView));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-sans text-[10px] tracking-[0.3em] uppercase py-2 border-b border-white/5 ${
                  isActive ? 'text-white font-semibold pl-2 border-l-2 border-l-white' : 'text-white/55'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
