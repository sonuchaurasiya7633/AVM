import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const LuxuryAmbientLayer = () => {
  const { isDark } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
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
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-700" 
      aria-hidden="true"
    >
      {/* Primary Floating Ambient Aurora Orb (Top Left - Emerald & Gold) */}
      <div 
        className={`absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 animate-aurora-slow ${
          isDark 
            ? 'bg-gradient-to-br from-emerald-600/15 via-[#C9A35C]/12 to-transparent' 
            : 'bg-gradient-to-br from-[#D4AF37]/15 via-emerald-800/10 to-transparent'
        }`}
      />

      {/* Secondary Floating Ambient Aurora Orb (Top Right - Warm Champagne Gold) */}
      <div 
        className={`absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full blur-[140px] transition-all duration-1000 animate-aurora-slow ${
          isDark 
            ? 'bg-gradient-to-bl from-[#D4AF37]/12 via-emerald-950/20 to-transparent' 
            : 'bg-gradient-to-bl from-[#E2C178]/20 via-[#FAF8F5]/30 to-transparent'
        }`}
        style={{ animationDelay: '-7s' }}
      />

      {/* Tertiary Sub-Surface Glow (Bottom Center - Deep Obsidian Core) */}
      <div 
        className={`absolute -bottom-40 left-1/3 w-[700px] h-[500px] rounded-full blur-[150px] transition-all duration-1000 animate-aurora-slow ${
          isDark 
            ? 'bg-gradient-to-t from-emerald-900/15 via-[#AA771C]/10 to-transparent' 
            : 'bg-gradient-to-t from-[#B88E3C]/12 via-transparent to-transparent'
        }`}
        style={{ animationDelay: '-14s' }}
      />

      {/* Interactive Cursor Ambient Spotlight */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[90px] transition-transform duration-200 ease-out opacity-75"
        style={{
          transform: `translate3d(${mousePos.x - 225}px, ${mousePos.y - 225}px, 0)`,
          background: isDark
            ? 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(0, 59, 43, 0.04) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(201, 163, 92, 0.12) 0%, rgba(2, 38, 26, 0.03) 50%, transparent 70%)',
        }}
      />

      {/* Subtle Hairline Radial Vignette */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark 
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(1,10,7,0.45)_100%)]' 
            : 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(248,245,238,0.35)_100%)]'
        }`}
      />
    </div>
  );
};
