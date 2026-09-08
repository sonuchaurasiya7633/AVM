import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Authentic WhatsApp Brand Icon
const WhatsAppBrandIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.677.15-.2.301-.777.98-.952 1.18-.176.2-.351.226-.652.076-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.176.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.234-.244-.585-.492-.505-.677-.515-.175-.009-.376-.01-.577-.01-.201 0-.527.076-.803.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.079 2.909 1.229 3.11.15.201 2.122 3.24 5.141 4.544.718.31 1.278.496 1.716.635.722.23 1.379.197 1.9.119.58-.088 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.351z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.434 5.177L2.05 21.95a.75.75 0 0 0 .937.937l4.773-1.384A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-8.5 10c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5a8.47 8.47 0 0 1-4.32-1.176.75.75 0 0 0-.585-.084l-3.32.963.963-3.32a.75.75 0 0 0-.084-.585A8.47 8.47 0 0 1 3.5 12z"
    />
  </svg>
);

export const FloatingBottomBar = () => {
  const { isHindi } = useLanguage();
  const [visible, setVisible] = useState(true);
  const primaryPhone = "9928365001";
  const displayPhone = "+91 99283-65001";
  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=Hello%20AVM%20Talks%20by%20Avnish,%20I%20want%20to%20verify%20plotted%20township%20details%20and%20rates.`;

  if (!visible) return null;

  return (
    <aside
      aria-label="Floating WhatsApp & Call Action Desk"
      className="fixed bottom-5 sm:bottom-7 right-4 sm:right-7 z-40 flex flex-col items-end gap-3.5 select-none"
    >
      {/* 1. ROUND AUTHENTIC WHATSAPP BUTTON (With Emerald Radar Wave Effect) */}
      <div className="relative flex items-center group">
        {/* Desktop Slide-out Tooltip */}
        <span className="hidden sm:inline-block absolute right-18 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#021710]/95 text-emerald-300 border border-emerald-500/50 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-x-2 group-hover:translate-x-0">
          {isHindi ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp'}
        </span>

        {/* Outer Radar Ripple Animation */}
        <span
          className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping pointer-events-none"
          style={{ animationDuration: '2.4s' }}
        />

        {/* Circular Action Button with Stitched Leather Medallion Ring */}
        <div className="p-1 rounded-full bg-gradient-to-tr from-[#3D2314] via-[#021710] to-[#3D2314] border-2 border-dashed border-[#D4AF37] shadow-2xl relative z-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="relative w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#4ADE80] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.55)] border-2 border-emerald-200 hover:scale-105 active:scale-95 transition-all duration-300"
            title="WhatsApp AVM Advisory Desk"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppBrandIcon className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />

            {/* Online green indicator dot */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-300 rounded-full border-2 border-emerald-900 shadow" />
          </a>
        </div>
      </div>

      {/* 2. ROUND CALL BUTTON (With Champagne Gold Radar Wave Effect & Stitched Leather Ring) */}
      <div className="relative flex items-center group">
        {/* Desktop Slide-out Tooltip */}
        <span className="hidden sm:inline-block absolute right-20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#021710]/95 text-luxury-goldLight border border-luxury-gold/50 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-x-2 group-hover:translate-x-0">
          {isHindi ? `सलाहकार को कॉल करें: ${displayPhone}` : `Call Advisor: ${displayPhone}`}
        </span>

        {/* Outer Gold Ripple Animation */}
        <span
          className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping pointer-events-none"
          style={{ animationDuration: '2.0s' }}
        />

        {/* Circular Action Button with Stitched Leather Medallion Ring */}
        <div className="p-1 rounded-full bg-gradient-to-tr from-[#3D2314] via-[#021710] to-[#3D2314] border-2 border-dashed border-[#D4AF37] shadow-2xl relative z-10">
          <a
            href={`tel:${primaryPhone}`}
            className="relative w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 text-luxury-darker flex items-center justify-center shadow-[0_8px_25px_rgba(212,175,55,0.6)] border-2 border-amber-100 hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
            title={`Direct Call: ${displayPhone}`}
            aria-label="Call AVM Advisory"
          >
            <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-luxury-darker drop-shadow group-hover/btn:rotate-12 transition-transform duration-300" />

            {/* Golden glimmer pulse */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-white text-[9px] font-bold text-white items-center justify-center">
                ✦
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Mini Close Toggle Button */}
      <button
        onClick={() => setVisible(false)}
        className="text-[10px] uppercase font-bold tracking-wider text-theme-muted hover:text-luxury-gold transition-colors bg-[#021710]/80 backdrop-blur px-2 py-0.5 rounded-full border border-white/10 shadow"
        title="Hide buttons"
        aria-label="Hide floating buttons"
      >
        {isHindi ? 'छुपाएं' : 'Hide'}
      </button>
    </aside>
  );
};
