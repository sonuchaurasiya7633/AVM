import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle = () => {
  const { isHindi, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="relative inline-flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-full border border-luxury-gold/40 hover:border-luxury-gold bg-luxury-surface/80 dark:bg-[#042217] shadow-md transition-all duration-300 group select-none focus:outline-none"
      title={isHindi ? 'Switch to English' : 'हिन्दी में बदलें'}
      aria-label="Toggle Language"
    >
      <Languages className="w-3.5 h-3.5 text-luxury-gold group-hover:rotate-12 transition-transform duration-300 ml-0.5" />
      <div className="relative flex items-center bg-black/40 dark:bg-black/60 rounded-full p-0.5 text-[10px] sm:text-[11px] font-bold font-mono">
        <span
          className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
            !isHindi
              ? 'bg-gold-gradient text-luxury-darker shadow-sm font-extrabold'
              : 'text-theme-muted hover:text-luxury-goldLight'
          }`}
        >
          EN
        </span>
        <span
          className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
            isHindi
              ? 'bg-gold-gradient text-luxury-darker shadow-sm font-extrabold'
              : 'text-theme-muted hover:text-luxury-goldLight'
          }`}
        >
          हिन्दी
        </span>
      </div>
    </button>
  );
};
