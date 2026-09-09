import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle = () => {
  const { isHindi, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="relative inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:px-2 sm:py-1 rounded-full border dark:border-white/15 border-slate-200 hover:border-cyan-400 dark:bg-[#0b1120] bg-white shadow-sm transition-all duration-300 group select-none focus:outline-none flex-shrink-0"
      title={isHindi ? 'Switch to English' : 'हिन्दी में बदलें'}
      aria-label="Toggle Language"
    >
      <Languages className="w-3.5 h-3.5 text-luxury-gold group-hover:rotate-12 transition-transform duration-300 ml-0.5" />
      {/* Mobile Compact Badge (<sm screens) */}
      <span className="sm:hidden px-1.5 py-0.5 rounded-full bg-gold-gradient text-luxury-darker font-bold text-[10px] font-mono shadow-sm">
        {isHindi ? 'HI' : 'EN'}
      </span>

      {/* Desktop / Tablet Dual Pill (sm+ screens) */}
      <div className="hidden sm:flex relative items-center dark:bg-black/60 bg-slate-100 rounded-full p-0.5 text-[10px] sm:text-[11px] font-bold font-mono">
        <span
          className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
            !isHindi
              ? 'bg-gold-gradient text-luxury-darker shadow-sm font-extrabold'
              : 'text-theme-muted hover:text-luxury-gold'
          }`}
        >
          EN
        </span>
        <span
          className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
            isHindi
              ? 'bg-gold-gradient text-luxury-darker shadow-sm font-extrabold'
              : 'text-theme-muted hover:text-luxury-gold'
          }`}
        >
          हिन्दी
        </span>
      </div>
    </button>
  );
};
