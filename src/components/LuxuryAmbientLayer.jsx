import React, { useEffect, useRef } from 'react';
import ParticleCanvas from './ParticleCanvas';
import BlurBlob from './BlurBlob';

export const LuxuryAmbientLayer = React.memo(() => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (spotlight) {
          spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(6, 182, 212, 0.06), transparent 80%)`;
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
      {/* 1. Interactive Constellation Stars Canvas */}
      <ParticleCanvas />

      {/* 2. Interactive Cursor Spotlight (Buttery 60fps via direct DOM style) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500 hidden md:block"
        style={{
          background: 'radial-gradient(600px circle at -500px -500px, rgba(6, 182, 212, 0.06), transparent 80%)',
        }}
      />

      {/* 3. Atmospheric Ambient Glow Blobs (Dark: Cool Cyan & Midnight Blue; Light: Soft Luminous Warm Champagne/Cyan) */}
      <div className="dark:opacity-100 opacity-60 transition-opacity duration-700">
        <BlurBlob 
          position={{ top: '10%', left: '20%' }} 
          size={{ width: '45vw', height: '45vw' }} 
          color="dark:from-cyan-950/20 dark:via-blue-950/15 from-amber-200/25 via-cyan-100/30 to-transparent" 
        />
        <BlurBlob 
          position={{ top: '30%', left: '85%' }} 
          size={{ width: '40vw', height: '40vw' }} 
          color="dark:from-blue-950/20 dark:via-slate-900/10 from-cyan-100/25 via-amber-100/20 to-transparent" 
        />
        <BlurBlob 
          position={{ top: '55%', left: '15%' }} 
          size={{ width: '45vw', height: '45vw' }} 
          color="dark:from-cyan-900/15 dark:via-blue-950/10 from-amber-200/20 via-sky-100/25 to-transparent" 
        />
        <BlurBlob 
          position={{ top: '80%', left: '80%' }} 
          size={{ width: '40vw', height: '40vw' }} 
          color="dark:from-blue-950/20 dark:via-slate-900/10 from-cyan-100/20 via-amber-100/20 to-transparent" 
        />
      </div>

      {/* 4. Universal Geometric Square Grid — Persistent Across Whole Website & All Pages */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />
    </div>
  );
});

export default LuxuryAmbientLayer;
