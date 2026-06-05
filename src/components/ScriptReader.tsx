import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, Minimize2, Sparkles, BookOpen } from 'lucide-react';
import { ScriptPage } from '../types';

interface ScriptReaderProps {
  scriptPages: ScriptPage[];
  projectTitle: string;
}

export default function ScriptReader({ scriptPages, projectTitle }: ScriptReaderProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const totalPages = scriptPages.length;
  const currentPage = scriptPages[currentPageIndex];

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  // Helper to format text with classic screenwriting margins
  const formatScreenplayText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // If line is empty, render a margin space
      if (line.trim() === '') {
        return <div key={idx} className="h-4" />;
      }
      
      // Rough screenplay indents formatting helper based on original line spacing
      const originalSpacingCount = line.length - line.trimStart().length;
      
      // Let's analyze spacing to align character centers, parentheticals, and dialog
      let indentClass = "pl-4 md:pl-0 pr-4 md:pr-0"; // default action / direction line
      
      if (originalSpacingCount >= 25) {
        // Dialogue lines or speaker headers
        if (line.toUpperCase() === line && !line.includes('(') && !line.includes(')')) {
          // Character Speaker Headings (typically indented ~25-30 spaces in raw script files)
          indentClass = "text-center md:pl-[35%] md:pr-[25%] md:text-left font-bold text-white uppercase tracking-wider";
        } else if (line.trim().startsWith('(') && line.trim().endsWith(')')) {
          // Parentheticals (typically indented ~15-20 spaces)
          indentClass = "text-center md:pl-[25%] md:pr-[25%] md:text-left italic text-zinc-400";
        } else {
          // Dialogue Blocks (typically indented ~10-15 spaces)
          indentClass = "text-center md:pl-[20%] md:pr-[20%] md:text-left text-zinc-100 max-w-[85%] mx-auto md:mx-0";
        }
      } else if (originalSpacingCount >= 20) {
        // Speaker names or Dialogue offsets
        if (line.toUpperCase() === line) {
          indentClass = "text-center md:pl-[25%] md:text-left font-bold text-white uppercase tracking-wider";
        } else {
          indentClass = "text-center md:pl-[18%] md:text-left text-zinc-200 max-w-[90%] mx-auto md:mx-0";
        }
      } else if (line.trim().startsWith('EXT.') || line.trim().startsWith('INT.') || line.trim().startsWith('SCENE')) {
        // Scene Headings (flush left, bold/high contrast)
        indentClass = "font-bold text-white border-b border-zinc-950 pb-1 mt-6 tracking-wide uppercase";
      }

      return (
        <p key={idx} className={`font-mono text-xs md:text-sm leading-relaxed ${indentClass} whitespace-pre-wrap`}>
          {line.trim()}
        </p>
      );
    });
  };

  return (
    <div 
      id="script-reading-room"
      className={`transition-all duration-500 ${
        isFocusMode 
          ? 'fixed inset-0 bg-[#050505] z-50 overflow-y-auto p-4 md:p-12 flex flex-col items-center justify-start' 
          : 'relative bg-[#070707] border border-zinc-950 rounded-lg p-6 md:p-10'
      }`}
    >
      {/* Reader Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-950 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <BookOpen className="text-zinc-500" size={16} />
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              Screenplay Reading Room
            </span>
          </div>
          <h3 className="font-serif text-lg text-white font-medium">
            {projectTitle} — Screenplay Excerpt
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Active indicator */}
          <span className="font-mono text-[9px] text-zinc-500 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900">
            PAGE {currentPage.pageNum} OF {totalPages}
          </span>
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white transition-all text-xs font-mono cursor-pointer"
          >
            {isFocusMode ? (
              <>
                <Minimize2 size={12} />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Eye size={12} />
                <span>Focus Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Screenplay Content Box */}
      <div 
        className={`mx-auto bg-[#040404] rounded border border-zinc-950 p-6 md:p-12 shadow-2xl ${
          isFocusMode ? 'max-w-[800px] w-full min-h-[70vh] my-8' : 'w-full min-h-[500px]'
        }`}
        style={{
          backgroundImage: 'radial-gradient(circle at center, #0a0a0a 0%, #040404 100%)'
        }}
      >
        {/* Screenplay Page Text Block */}
        <div className="relative z-10 space-y-4 font-mono select-text">
          {formatScreenplayText(currentPage.content)}
        </div>
      </div>

      {/* Script Pagination Interface Actions */}
      <div className="flex items-center justify-between pt-8 border-t border-zinc-950 mt-8 max-w-full">
        <button
          onClick={handlePrevPage}
          disabled={currentPageIndex === 0}
          className={`group flex items-center gap-2 px-3 py-2 rounded text-xs font-mono tracking-widest uppercase transition-all border ${
            currentPageIndex === 0
              ? 'opacity-30 border-transparent text-zinc-600 cursor-not-allowed'
              : 'border-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-950 hover:border-zinc-800 cursor-pointer'
          }`}
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          <span>Prev Page</span>
        </button>

        {/* Dynamic page map dots */}
        <div className="hidden md:flex items-center space-x-1.5">
          {scriptPages.map((page, idx) => (
            <button
              key={page.pageNum}
              onClick={() => setCurrentPageIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentPageIndex === idx 
                  ? 'w-6 bg-white' 
                  : 'w-1.5 bg-zinc-800 hover:bg-zinc-600'
              }`}
              title={`Jump to Page ${page.pageNum}`}
            />
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPageIndex === totalPages - 1}
          className={`group flex items-center gap-2 px-3 py-2 rounded text-xs font-mono tracking-widest uppercase transition-all border ${
            currentPageIndex === totalPages - 1
              ? 'opacity-30 border-transparent text-zinc-600 cursor-not-allowed'
              : 'border-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-950 hover:border-zinc-800 cursor-pointer'
          }`}
        >
          <span>Next Page</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Focus Mode tip */}
      {!isFocusMode && (
        <p className="text-[10px] text-center text-zinc-600 font-mono tracking-wider mt-4">
          Tip: Tap "Focus Mode" for an unobstructed screenwriting manuscript experience.
        </p>
      )}
    </div>
  );
}
