import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const LuxuryAmbientLayer = React.memo(() => {
  const { isDark } = useTheme();
  const spotlightRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (spotlight) {
          spotlight.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0" 
      aria-hidden="true"
    >
      {/* Primary Floating Ambient Aurora Orb (Top Left - Emerald & Gold) */}
      <div 
        className={`absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full blur-[70px] opacity-60 transition-opacity duration-700 animate-aurora-slow will-change-transform ${
          isDark 
            ? 'bg-gradient-to-br from-emerald-600/20 via-[#C9A35C]/15 to-transparent' 
            : 'bg-gradient-to-br from-[#D4AF37]/15 via-emerald-800/10 to-transparent'
        }`}
      />

      {/* Secondary Floating Ambient Aurora Orb (Top Right - Warm Champagne Gold) */}
      <div 
        className={`absolute top-1/4 -right-24 w-[500px] h-[500px] rounded-full blur-[80px] opacity-50 transition-opacity duration-700 animate-aurora-slow will-change-transform ${
          isDark 
            ? 'bg-gradient-to-bl from-[#D4AF37]/15 via-emerald-950/20 to-transparent' 
            : 'bg-gradient-to-bl from-[#E2C178]/20 via-[#FAF8F5]/30 to-transparent'
        }`}
        style={{ animationDelay: '-7s' }}
      />

      {/* Interactive Cursor Ambient Spotlight (Direct DOM manipulation, 0 React re-renders) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[60px] opacity-60 pointer-events-none will-change-transform"
        style={{
          transform: 'translate3d(-500px, -500px, 0)',
          background: isDark
            ? 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(0, 59, 43, 0.04) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(201, 163, 92, 0.1) 0%, rgba(2, 38, 26, 0.03) 50%, transparent 70%)',
        }}
      />
    </div>
  );
});

