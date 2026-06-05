import React, { useState, useEffect } from 'react';
import { 
  Play, 
  ArrowRight, 
  Info, 
  Mail, 
  MapPin, 
  FileText, 
  User, 
  Check, 
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Award
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import PosterPlaceholder from './components/PosterPlaceholder';
import ScriptReader from './components/ScriptReader';
import { projectsData, portfolioOwner } from './data/projects';
import { ActiveView, Project } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync route changes to state to permit deep link style transitions
  const handleNavigate = (view: ActiveView) => {
    if (view === 'reel') return; // Showreel is deactivated
    setActiveView(view);
    if (view === 'home' || view === 'projects' || view === 'about' || view === 'contact') {
      setSelectedProject(null);
    } else {
      const foundProject = projectsData.find(p => p.id === view);
      if (foundProject) {
        setSelectedProject(foundProject);
      }
    }
  };

  // Pre-load Moving Forward reference
  const movingForwardProject = projectsData[0];

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e0e0e0] selection:bg-white selection:text-black font-sans border-8 border-[#111] overflow-hidden">
      {/* Cinematic ambient background & floating dust particles */}
      <div className="ambient-light-leaks" />
      <div className="dust-container">
        <div className="dust-particle" style={{ left: '10%', width: '4px', height: '4px', animationDelay: '0s', animationDuration: '28s' }} />
        <div className="dust-particle" style={{ left: '25%', width: '6px', height: '6px', animationDelay: '5s', animationDuration: '22s' }} />
        <div className="dust-particle" style={{ left: '45%', width: '3px', height: '3px', animationDelay: '2s', animationDuration: '30s' }} />
        <div className="dust-particle" style={{ left: '60%', width: '5px', height: '5px', animationDelay: '10s', animationDuration: '25s' }} />
        <div className="dust-particle" style={{ left: '75%', width: '4px', height: '4px', animationDelay: '7s', animationDuration: '27s' }} />
        <div className="dust-particle" style={{ left: '90%', width: '6px', height: '6px', animationDelay: '14s', animationDuration: '20s' }} />
      </div>

      {/* Main Header */}
      <Header activeView={activeView} onNavigate={handleNavigate} />

      {/* Central View Controller */}
      <main id="view-outlet" className="relative z-10 transition-all duration-300 min-h-[75vh]">
        <AnimatePresence mode="wait">
          {/* ======================================= */}
          {/* VIEW 1: HOME PAGE                       */}
          {/* ======================================= */}
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
            {/* Cinematic Large Screen Name Title */}
            <section className="relative flex min-h-[75vh] flex-col items-center justify-center p-6 text-center border-b border-white/5 bg-gradient-to-b from-[#050505] to-[#080808]">
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none z-0" />
              
              <div className="mx-auto max-w-4xl px-4 z-10 space-y-6">
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-widest leading-none text-white font-light uppercase">
                  SIMON J BROOKES
                </h1>
                
                <p className="font-serif text-sm sm:text-lg md:text-xl italic text-white/50 max-w-2xl mx-auto tracking-wide">
                  "{portfolioOwner.title}"
                </p>

                <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                  <button 
                    onClick={() => handleNavigate('projects')}
                    className="group px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-all duration-300 text-[10px] font-mono font-medium tracking-widest uppercase cursor-pointer flex items-center gap-2"
                  >
                    Explore Projects
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* Featured Section: Moving Forward */}
            <section className="mx-auto max-w-7xl py-12 md:py-24 px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-white/5 bg-[#050505]">
              <div className="lg:col-span-5">
                <div 
                  onClick={() => handleNavigate('moving-forward')}
                  className="cursor-pointer overflow-hidden rounded group shadow-2xl transition-transform hover:scale-[1.01]"
                >
                  <PosterPlaceholder 
                    title={movingForwardProject.title} 
                    starring={movingForwardProject.credits.starring} 
                    posterUrl={movingForwardProject.posterUrl || undefined}
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase block font-semibold leading-none">
                    FEATURED PROJECT IN PRODUCTION
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl text-white font-light uppercase tracking-wide leading-tight">
                    {movingForwardProject.title}
                  </h2>
                  <span className="inline-block px-3 py-1 bg-[#090909] border border-white/5 rounded-full text-white/60 font-mono text-[9.5px] uppercase tracking-wider">
                    {movingForwardProject.type} • {movingForwardProject.year}
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/70 max-w-2xl text-pretty">
                  {movingForwardProject.description}
                </p>

                <div className="space-y-4">
                  <h4 className="font-mono text-[9px] tracking-widest text-[#999] uppercase pb-2 border-b border-white/5">
                    Core Themes Explored
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {movingForwardProject.themes.map((theme, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 bg-transparent border border-white/10 rounded-full text-white/50 text-[10px] hover:text-white hover:border-white/30 font-mono transition-all uppercase tracking-wider"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => handleNavigate('moving-forward')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/30 transition-all font-mono text-[10px] tracking-widest uppercase text-white cursor-pointer flex items-center justify-center gap-2"
                  >
                    Read Screenplay & View Credits
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </section>

            {/* Quick Pitch Narrative Statement Quote */}
            <section className="bg-gradient-to-b from-[#050505] to-[#070707] py-24 px-6 border-b border-white/5 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-40" />
              <div className="mx-auto max-w-3xl space-y-6 relative z-10">
                <span className="font-mono text-[8.5px] tracking-[0.55em] text-white/30 uppercase block font-semibold">
                  DIRECTORIAL PHILOSOPHY
                </span>
                <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/80 italic font-light">
                  "Film is the one thing that brings us all together."
                </p>
                <div className="w-12 h-[1px] bg-white/10 mx-auto" />
                <span className="font-serif text-xs tracking-widest text-[#999] uppercase block italic">
                  — Simon J Brookes
                </span>
              </div>
            </section>
          </motion.div>
        )}

        {/* VIEW 2: REEL PAGE DEACTIVATED */}

        {/* ======================================= */}
        {/* VIEW 3: PROJECTS PAGE                   */}
        {/* ======================================= */}
        {activeView === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-7xl pt-6 pb-16 px-6 lg:px-12 space-y-8"
          >
            <div className="space-y-3">
              <span className="font-mono text-[9px] tracking-[0.45em] text-white/40 block uppercase font-semibold">
                DIRECTORIAL PORTFOLIO
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-white font-light uppercase tracking-wider">
                Filmography & In-Production Work
              </h1>
              <p className="font-sans text-xs text-white/50 max-w-2xl leading-relaxed">
                Explore the portfolio entries. Tap on any item to view director credits, complete themes, and interact with script manuscripts.
              </p>
              <div className="w-16 h-[1px] bg-white/20 mt-2" />
            </div>

            {/* Production Grid conforming to exact centering rules to fix giant gaps */}
            <div className={`grid grid-cols-1 ${projectsData.length === 1 ? 'max-w-md mx-auto md:max-w-md lg:max-w-md lg:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8 pt-6 justify-center`}>
              {projectsData.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => handleNavigate(project.id)}
                  className="flex flex-col space-y-4 group cursor-pointer border border-white/5 p-4 rounded bg-[#0a0a0a]/10 hover:bg-[#0a0a0a]/30 transition-all duration-300 w-full"
                >
                  {/* Visual Poster representation */}
                  <div className="rounded overflow-hidden transition-all duration-500 group-hover:scale-[1.012] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.01)]">
                    <PosterPlaceholder 
                      title={project.title} 
                      starring={project.credits.starring} 
                      posterUrl={project.posterUrl || undefined}
                    />
                  </div>

                  {/* Metadata labels */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777] uppercase">
                      <span>{project.year}</span>
                      <span>{project.type}</span>
                    </div>
                    <h3 className="font-serif text-lg text-white group-hover:text-zinc-300 transition-colors uppercase tracking-wider font-semibold">
                      {project.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs leading-relaxed text-white/65 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[9.5px] uppercase text-white/40 group-hover:text-white transition-colors tracking-widest leading-none">
                      ENTER WORKSPACE
                      <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ======================================= */}
        {/* VIEW 4: ABOUT PAGE                      */}
        {/* ======================================= */}
        {activeView === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-7xl py-16 px-6 lg:px-12 space-y-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Minimal bio headers */}
              <div className="lg:col-span-5 space-y-6">
                <span className="font-mono text-[9px] tracking-[0.45em] text-white/40 block uppercase font-semibold">
                  THE DIRECTOR STATEMENT
                </span>
                
                <h1 className="font-serif text-4xl sm:text-5xl text-white font-light uppercase tracking-wide leading-tight">
                  Simon J Brookes
                </h1>
                
                <div className="w-16 h-[1.5px] bg-white/20" />
                
                <p className="font-serif text-lg italic text-[#ddd] leading-relaxed font-light">
                  "{portfolioOwner.aboutText}"
                </p>
              </div>

              {/* Right Column: Detailed history */}
              <div className="lg:col-span-7 space-y-8">
                <h3 className="font-serif text-lg tracking-widest text-white uppercase border-b border-white/5 pb-2">
                  Creative Philosophy
                </h3>

                <div className="space-y-6 font-sans text-sm leading-relaxed text-[#bbb]">
                  {portfolioOwner.aboutDetailed.map((paragraph, index) => (
                    <p key={index} className="text-pretty">{paragraph}</p>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ======================================= */}
        {/* VIEW 5: CONTACT PAGE                     */}
        {/* ======================================= */}
        {activeView === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl py-12 px-6 lg:px-12"
          >
            <div className="text-center space-y-8 border border-white/5 bg-[#080808]/40 p-8 sm:p-16 rounded-none shadow-2xl relative">
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/90 pointer-events-none z-0" />
              
              <div className="space-y-4 relative z-10">
                <h1 className="font-serif text-4xl sm:text-5xl text-white font-light uppercase tracking-wide">
                  Direct Contact
                </h1>
                <div className="w-16 h-[1.5px] bg-white/20 mx-auto" />
              </div>

              <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-300 max-w-lg mx-auto relative z-10 text-pretty">
                I'm available for a phone call, a text message, or an email.
              </p>

              <div className="space-y-6 py-4 relative z-10">
                {/* Clickable Large Email Link */}
                <a 
                  href={`mailto:${portfolioOwner.agent.email}`}
                  className="group inline-flex flex-col items-center justify-center space-y-2 cursor-pointer outline-none focus:ring-1 focus:ring-white/10 p-4"
                >
                  <Mail className="text-white/40 group-hover:text-white transition-colors duration-300" size={28} />
                  <span className="font-serif text-lg sm:text-2xl text-zinc-300 group-hover:text-white transition-colors duration-300 tracking-wider underline underline-offset-8 decoration-white/20 group-hover:decoration-white/50">
                    {portfolioOwner.agent.email}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase mt-1">
                    Click to send email
                  </span>
                </a>
              </div>

            </div>
          </motion.div>
        )}

        {/* ======================================= */}
        {/* VIEW 6: PROJECT DETAIL (Moving Forward) */}
        {/* ======================================= */}
        {activeView === 'moving-forward' && selectedProject && (
          <motion.div
            key="moving-forward"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-16 pb-24"
          >
            
            {/* Project Cover Block Section with Hero Poster conforming to exact placement requirements */}
            <section className="relative min-h-[60vh] pt-20 pb-12 flex flex-col items-center justify-center p-6 border-b border-white/5 bg-[#050505]">
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-stone-950/60 to-black pointer-events-none z-0" />
              
              <div className="mx-auto max-w-4xl w-full px-4 text-center z-10 space-y-6 flex flex-col items-center">
                
                {/* Hero Poster Container */}
                <div className="w-56 sm:w-72 aspect-[3/4] shadow-[0_0_50px_rgba(255,255,255,0.08)] border border-white/10 rounded overflow-hidden">
                  <img 
                    src={selectedProject.posterUrl || ''} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[9px] tracking-[0.45em] text-white/40 block uppercase font-semibold">
                    {selectedProject.type}
                  </span>
                  
                  <h1 className="font-serif text-4xl sm:text-6xl text-white font-light uppercase tracking-widest text-scale-y leading-none pt-2">
                    {selectedProject.title}
                  </h1>
                  
                  <p className="font-serif text-[11px] tracking-[0.25em] text-[#999] block uppercase italic pt-1">
                    A FILM BY {selectedProject.credits.filmBy}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <span className="px-3 py-1 bg-[#090909] border border-white/5 rounded-full text-white/60 font-mono text-[9px] uppercase tracking-wider">
                      {selectedProject.year}
                    </span>
                    <span className="px-3 py-1 bg-[#090909] border border-white/5 rounded-full text-white/60 font-mono text-[9px] uppercase tracking-wider">
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* General Project Description & Credits */}
            <section className="mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Synopsis Panel */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-serif text-lg tracking-widest text-white uppercase border-b border-white/5 pb-2">
                  Film Synopsis
                </h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#ccc] text-pretty">
                  {selectedProject.description}
                </p>

                <div className="space-y-3 pt-4">
                  <h4 className="font-mono text-[9px] tracking-widest text-white/40 uppercase border-b border-white/5 pb-2">
                    Themes Explored
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.themes.map((theme, idx) => (
                      <span key={idx} className="px-3 py-1 bg-transparent border border-white/10 rounded-full text-white/50 text-[10px] font-mono uppercase tracking-wider">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Complete Credits Panel */}
              <div className="lg:col-span-5 bg-[#050505] border border-white/5 p-6 rounded-none space-y-6">
                <div>
                  <h3 className="font-serif text-lg tracking-widest text-white uppercase border-b border-white/5 pb-2">
                    Creative Crew
                  </h3>
                  <span className="font-mono text-[8.5px] text-white/30 tracking-wider block uppercase mt-1">
                    Authentic Production Credits
                  </span>
                </div>

                <div className="space-y-3 font-mono text-[10px] tracking-wide uppercase text-white/50">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">Presented By:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.presentedBy}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">Production:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.production}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">Film By:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.filmBy}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">Written By:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.writtenBy}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">Directed By:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.directedBy}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">Starring:</span>
                    <span className="text-white text-right font-sans font-medium text-xs max-w-[200px]">{selectedProject.credits.starring}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">DOP:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.directorOfPhotography}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">Music By:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.musicBy}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">Editor:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.editor}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/30">Production Designer:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.productionDesigner}</span>
                  </div>
                  <div className="flex justify-between pb-1.5">
                    <span className="text-white/30">Executive Producer:</span>
                    <span className="text-white text-right font-sans font-medium text-xs">{selectedProject.credits.executiveProducer}</span>
                  </div>
                </div>
              </div>

            </section>

            {/* Immersive Script Reader Room */}
            {selectedProject.scriptPages && (
              <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-6">
                <ScriptReader 
                  scriptPages={selectedProject.scriptPages} 
                  projectTitle={selectedProject.title} 
                />
              </section>
            )}

          </motion.div>
        )}

      </AnimatePresence>
    </main>

      {/* Elegant Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
