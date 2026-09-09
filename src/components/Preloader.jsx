import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo/avm-logo.png';
import { Sparkles, ShieldCheck } from 'lucide-react';

const STATUS_MESSAGES = [
  'Initializing High-Stakes Advisory Engine...',
  'Synchronizing Section 90-A Registry Protocols...',
  'Calibrating 4K Aerial Drone Surveillance...',
  'Loading Institutional Valuation Dossier...',
  'Welcome to AVM Talks by Avnish'
];

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Progress counter animation up to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        // Smooth progressive increment
        const step = prev < 50 ? Math.floor(Math.random() * 9) + 5 : Math.floor(Math.random() * 12) + 7;
        return Math.min(100, prev + step);
      });
    }, 65);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Rotate status message as progress advances
  useEffect(() => {
    if (progress < 25) setStatusIndex(0);
    else if (progress < 50) setStatusIndex(1);
    else if (progress < 75) setStatusIndex(2);
    else if (progress < 95) setStatusIndex(3);
    else setStatusIndex(4);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="avm-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -30,
            scale: 1.02,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] text-white select-none overflow-hidden"
        >
          {/* Ambient Radial Lighting Layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.16),transparent_60%)] pointer-events-none" />
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

          {/* Architectural Background Grid Hairline */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '3.5rem 3.5rem'
            }}
          />

          {/* Centerpiece Luxury Medallion */}
          <div className="relative flex flex-col items-center z-10 px-4">
            {/* Multi-tier Rotating Orbit Rings */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-8">
              {/* Outer Counter-Rotating Dashed Gold Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-amber-400/40"
              />

              {/* Middle Rotating Solid Accent Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-t-2 border-r border-transparent border-t-cyan-400 border-r-amber-400/70"
              />

              {/* Pulsing Back Glow */}
              <motion.div
                animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-500/20 via-cyan-500/20 to-transparent blur-md"
              />

              {/* Central Stitched Leather Medallion Ring */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#0b1120] via-slate-900 to-[#030712] border-2 border-luxury-gold shadow-[0_0_35px_rgba(212,175,55,0.35)] flex items-center justify-center">
                {/* 4 Corner Brass Rivets on the medallion */}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 absolute top-1 left-1/2 -translate-x-1/2 shadow-sm" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 absolute bottom-1 left-1/2 -translate-x-1/2 shadow-sm" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 absolute left-1 top-1/2 -translate-y-1/2 shadow-sm" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 absolute right-1 top-1/2 -translate-y-1/2 shadow-sm" />

                <motion.img
                  src={logoImg}
                  alt="AVM Talks Logo"
                  animate={{ scale: [0.96, 1.03, 0.96] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-inner"
                />
              </div>

              {/* Orbiting Golden Satellite Sparkle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_#f59e0b] absolute -top-1 left-1/2 -translate-x-1/2 border border-white" />
              </motion.div>
            </div>

            {/* Brand Title & Stamped Wordmark */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
                <span>Statutory Land Intelligence</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0C8] to-[#D4AF37] drop-shadow-md">
                AVM TALKS <span className="font-light italic text-amber-400">BY AVNISH</span>
              </h1>

              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-slate-400">
                Ideas • Investment • Infrastructure • Influence
              </p>
            </div>

            {/* Precision Progress Bar & Live Counter */}
            <div className="w-64 sm:w-80 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 text-[11px] font-medium tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dossier Verification</span>
                </span>
                <span className="text-amber-400 font-bold tracking-widest text-sm">
                  {progress}%
                </span>
              </div>

              {/* Track Bar with Moving Shimmer */}
              <div className="relative h-1.5 sm:h-2 w-full rounded-full bg-slate-800/80 border border-white/10 overflow-hidden shadow-inner p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-cyan-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] relative"
                  style={{ width: progress + '%' }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
                </motion.div>
              </div>

              {/* Dynamic Status Text with Smooth Fade */}
              <div className="h-5 flex items-center justify-center">
                <motion.p
                  key={statusIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] sm:text-xs font-light tracking-wide text-slate-300 text-center truncate px-2"
                >
                  {STATUS_MESSAGES[statusIndex]}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Bottom Stamp Footer */}
          <div className="absolute bottom-6 inset-x-0 text-center">
            <span className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-mono">
              Jaipur Growth Corridors • 90-A Certified Protocol
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
