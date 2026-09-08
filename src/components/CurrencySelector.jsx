import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { ChevronDown, Globe } from 'lucide-react';

export const CurrencySelector = () => {
  const { currency, setCurrency, activeConfig, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold dark:bg-[#021710]/90 bg-white/90 border border-luxury-gold/50 dark:text-luxury-gold text-[#9E7B28] shadow-md hover:border-luxury-gold transition-all"
        title="Select Global Investor Currency"
      >
        <span className="text-sm leading-none">{activeConfig.flag}</span>
        <span>{activeConfig.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl royal-obsidian-card p-2 z-50 shadow-2xl border-2 border-luxury-gold/50">
          <div className="px-3 py-1.5 border-b border-luxury-gold/20 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-goldLight font-bold flex items-center gap-1">
              <Globe className="w-3 h-3 text-luxury-gold" />
              NRI Global Currency
            </span>
          </div>
          <div className="space-y-1">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  currency === c.code
                    ? 'bg-gold-gradient text-luxury-darker font-bold shadow-sm'
                    : 'text-luxury-ivory hover:bg-luxury-emerald/30 hover:text-luxury-gold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{c.flag}</span>
                  <span>{c.code}</span>
                </div>
                <span className="text-[11px] opacity-80">{c.symbol}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
