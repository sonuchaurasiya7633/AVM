import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle = () => {
  const { isHindi, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="relative inline-flex items-center gap-1 p-0.5 sm:p-1 rounded-full border dark:border-white/10 border-slate-200 hover:border-luxury-gold dark:bg-[#0b1120] bg-white shadow-sm transition-all duration-300 select-none focus:outline-none flex-shrink-0"
      title={isHindi ? 'Switch to English' : 'हिन्दी में बदलें'}
      aria-label="Toggle Language"
    >
      <Languages className="w-3.5 h-3.5 text-luxury-gold ml-1 hidden xl:inline" />
      <div className="flex items-center dark:bg-black/60 bg-slate-100 rounded-full p-0.5 text-[10px] font-bold font-mono">
        <span
          className={`px-1.5 sm:px-2 py-0.5 rounded-full transition-all duration-200 ${
            !isHindi
              ? 'bg-gold-gradient text-luxury-darker shadow-sm font-extrabold'
              : 'text-theme-muted hover:text-luxury-gold'
          }`}
        >
          EN
        </span>
        <span
          className={`px-1.5 sm:px-2 py-0.5 rounded-full transition-all duration-200 ${
            isHindi
              ? 'bg-gold-gradient text-luxury-darker shadow-sm font-extrabold'
              : 'text-theme-muted hover:text-luxury-gold'
          }`}
        >
          HI
        </span>
      </div>
    </button>
  );
};
