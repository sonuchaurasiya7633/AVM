import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Generates gold coins flying from ALL 4 SIDES (Bottom, Top, Left, Right)
const generateAllSidesGoldCoins = (count = 16) => {
  const directions = ['bottom', 'left', 'right', 'top'];
  
  return Array.from({ length: count }, (_, i) => {
    const direction = directions[i % directions.length];
    const size = 28 + Math.random() * 20; // 28px to 48px
    const delay = Math.random() * 0.8;
    const duration = 2.2 + Math.random() * 1.0;
    const rotateZ = (Math.random() - 0.5) * 360;
    const rotateX = (Math.random() - 0.5) * 360;
    const rotateY = (Math.random() - 0.5) * 360;

    let initial = {};
    let animate = {};

    if (direction === 'bottom') {
      const startX = Math.random() * 100;
      const driftX = (Math.random() - 0.5) * 100;
      initial = { y: '110vh', x: `${startX}vw`, scale: 0.5, opacity: 0 };
      animate = { y: '-15vh', x: `calc(${startX}vw + ${driftX}px)`, scale: [0.5, 1.1, 1, 0.9], opacity: [0, 1, 1, 1, 0] };
    } else if (direction === 'top') {
      const startX = Math.random() * 100;
      const driftX = (Math.random() - 0.5) * 100;
      initial = { y: '-15vh', x: `${startX}vw`, scale: 0.5, opacity: 0 };
      animate = { y: '110vh', x: `calc(${startX}vw + ${driftX}px)`, scale: [0.5, 1.0, 1, 0.8], opacity: [0, 1, 1, 1, 0] };
    } else if (direction === 'left') {
      const startY = Math.random() * 80 + 10;
      const driftY = (Math.random() - 0.5) * 100;
      initial = { x: '-15vw', y: `${startY}vh`, scale: 0.5, opacity: 0 };
      animate = { x: '115vw', y: `calc(${startY}vh + ${driftY}px)`, scale: [0.5, 1.1, 1, 0.9], opacity: [0, 1, 1, 1, 0] };
    } else {
      // right
      const startY = Math.random() * 80 + 10;
      const driftY = (Math.random() - 0.5) * 100;
      initial = { x: '115vw', y: `${startY}vh`, scale: 0.5, opacity: 0 };
      animate = { x: '-15vw', y: `calc(${startY}vh + ${driftY}px)`, scale: [0.5, 1.1, 1, 0.9], opacity: [0, 1, 1, 1, 0] };
    }

    return {
      id: i,
      size,
      delay,
      duration,
      rotateZ,
      rotateX,
      rotateY,
      initial,
      animate,
      symbol: i % 2 === 0 ? '₹' : '✦',
    };
  });
};

export const FlyingMoneyAnimation = () => {
  const [active, setActive] = useState(true);
  const [coins] = useState(() => generateAllSidesGoldCoins(16));

  useEffect(() => {
    // Dismiss automatically after 3.2 seconds
    const timer = setTimeout(() => {
      setActive(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  if (!active) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          style={{ perspective: 1200 }}
          aria-hidden="true"
        >
          {/* Subtle Cosmic Obsidian & Gold Ambient Aura */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-[#030712]/40 pointer-events-none" />

          {/* Top Luxury Prosperity Banner Badge */}
          <motion.div
            initial={{ y: -60, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-20 sm:top-24 inset-x-0 mx-auto max-w-md px-4 pointer-events-auto flex justify-center z-10"
          >
            <div className="px-5 py-2.5 rounded-full bg-[#0b1120]/92 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.3)] flex items-center justify-between gap-3 text-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-luxury-gold animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-xs sm:text-sm font-serif font-bold text-luxury-goldLight tracking-wider">
                  ✦ Compounding Wealth Through Sanctioned Land ✦
                </span>
              </div>
              <button
                onClick={() => setActive(false)}
                className="p-1 rounded-full text-luxury-gold/70 hover:text-white hover:bg-white/10 transition-colors ml-2"
                title="Skip animation"
                aria-label="Skip animation"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* 3D Gold Coins Coming From All Sides */}
          <div className="absolute inset-0">
            {coins.map((c) => {
              return (
                <motion.div
                  key={c.id}
                  initial={c.initial}
                  animate={{
                    ...c.animate,
                    rotateZ: c.rotateZ,
                    rotateX: [0, c.rotateX, c.rotateX * 1.5],
                    rotateY: [0, c.rotateY, c.rotateY * 1.5],
                  }}
                  transition={{
                    duration: c.duration,
                    delay: c.delay,
                    ease: [0.25, 0.1, 0.25, 1],
                    repeat: 0,
                  }}
                  className="absolute will-change-transform drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
                  style={{
                    width: c.size,
                    height: c.size,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Ultra-Realistic 3D Embossed Gold Coin */}
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center relative shadow-2xl"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #FFF6B8 0%, #F5C542 30%, #D4AF37 65%, #8C6D1F 90%, #523F0C 100%)',
                      border: '2.5px solid #FFF199',
                      boxShadow: '0 0 25px rgba(245, 197, 66, 0.75), inset 0 2px 5px rgba(255, 255, 255, 0.9), inset 0 -3px 5px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {/* Beaded coin edge ring */}
                    <div className="w-[84%] h-[84%] rounded-full border border-dashed border-amber-950/40 flex items-center justify-center bg-gradient-to-br from-amber-400/20 via-transparent to-black/20">
                      <span
                        className="font-bold text-amber-950 select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] font-serif"
                        style={{ fontSize: `${c.size * 0.44}px`, lineHeight: 1 }}
                      >
                        {c.symbol}
                      </span>
                    </div>

                    {/* Specular light sheen highlight */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/45 to-transparent opacity-90" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
