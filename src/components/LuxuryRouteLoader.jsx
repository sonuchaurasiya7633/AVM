import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo/avm-logo.png';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LuxuryRouteLoader = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center p-6 select-none relative">
      {/* Centered Ambient Glow */}
      <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-amber-500/10 via-cyan-500/10 to-transparent blur-3xl absolute pointer-events-none" />

      {/* Rotating Dual Orbital Rings with Logo */}
      <div className="relative w-24 h-24 flex items-center justify-center mb-6">
        {/* Outer Rotating Dashed Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-luxury-gold/50"
        />

        {/* Counter Orbiting Glow Dot */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-4px] pointer-events-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] absolute top-0 left-1/2 -translate-x-1/2 border border-white" />
        </motion.div>

        {/* Inner Logo Badge */}
        <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#0b1120] to-[#030712] border border-luxury-gold shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center relative z-10">
          <img
            src={logoImg}
            alt="AVM Talks Emblem"
            className="w-14 h-14 rounded-full object-cover animate-pulse"
          />
        </div>
      </div>

      {/* Status Typography */}
      <div className="text-center space-y-2 relative z-10 max-w-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-gradient/10 border border-luxury-gold/30 text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold">
          <Sparkles className="w-3 h-3 animate-spin text-luxury-gold" />
          <span>{isHindi ? 'दस्तावेज़ लोड हो रहा है' : 'Loading Intelligence'}</span>
        </div>

        <p className="text-xs font-serif font-semibold text-theme-primary tracking-wide">
          {isHindi ? 'कृपया प्रतीक्षा करें • डेटा संकलन जारी' : 'Securing Statutory Land Intelligence...'}
        </p>

        {/* Hairline Loading Indicator */}
        <div className="w-48 mx-auto h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative mt-3 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gold-gradient shadow-[0_0_10px_rgba(212,175,55,0.7)]"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ width: '50%' }}
          />
        </div>
      </div>
    </div>
  );
};
