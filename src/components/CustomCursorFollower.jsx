import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Unified Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Buttery, high-responsiveness spring physics
  // High stiffness + optimal damping ensures fast, zero-lag following without jitter
  const springConfig = { damping: 28, stiffness: 380, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch-only screen to prevent static circle on mobile
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hover over interactive elements (buttons, links, inputs, cards)
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          target.closest('[data-cursor-hover]'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't render on touch screens
  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      {/* 
        UNIFIED SINGLE COMPONENT:
        Both the Outer Circle and the Center Dot Point share the EXACT same (x, y) motion frame.
        The Dot is locked to the dead center (absolute top-1/2 left-1/2) inside the circle.
        It is mathematically impossible for the dot to ever drift outside the circle!
      */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? (isClicked ? 0.8 : isHovered ? 1.55 : 1) : 0,
        }}
        transition={{
          scale: { type: 'spring', damping: 24, stiffness: 350 },
          opacity: { duration: 0.15 },
        }}
        className="relative flex items-center justify-center pointer-events-none"
      >
        {/* 1. Outer Ambient Glow Halo */}
        <div
          className={`absolute rounded-full transition-all duration-300 pointer-events-none ${
            isHovered
              ? 'w-14 h-14 bg-amber-400/15 dark:bg-cyan-400/20 blur-md'
              : 'w-10 h-10 bg-amber-500/10 dark:bg-cyan-400/10 blur-sm'
          }`}
        />

        {/* 2. Main Luxury Architectural Circle Ring */}
        <div
          className={`relative w-9 h-9 rounded-full border transition-all duration-200 flex items-center justify-center ${
            isHovered
              ? 'border-amber-400 dark:border-cyan-300 bg-amber-400/10 dark:bg-cyan-400/15 shadow-[0_0_22px_rgba(245,158,11,0.45)] dark:shadow-[0_0_22px_rgba(6,182,212,0.5)] backdrop-blur-[1px]'
              : 'border-amber-500/60 dark:border-cyan-400/60 bg-white/[0.04] dark:bg-black/[0.1] shadow-[0_0_12px_rgba(212,175,55,0.25)] dark:shadow-[0_0_12px_rgba(6,182,212,0.25)]'
          }`}
        >
          {/* 4 Precision Surveyor Crosshairs (Top, Bottom, Left, Right Ticks) - Active on Hover */}
          {isHovered && (
            <>
              {/* Top tick */}
              <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 bg-amber-400 dark:bg-cyan-300 rounded-full" />
              {/* Bottom tick */}
              <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 bg-amber-400 dark:bg-cyan-300 rounded-full" />
              {/* Left tick */}
              <div className="absolute left-[-3px] top-1/2 -translate-y-1/2 h-[1.5px] w-1.5 bg-amber-400 dark:bg-cyan-300 rounded-full" />
              {/* Right tick */}
              <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 h-[1.5px] w-1.5 bg-amber-400 dark:bg-cyan-300 rounded-full" />
              
              {/* Delicate Inner Focus Ring */}
              <div className="w-5 h-5 rounded-full border border-amber-300/40 dark:border-cyan-300/40 animate-pulse" />
            </>
          )}

          {/* 
            3. EXACT DEAD-CENTER PINPOINT GLOWING DOT:
            Locked precisely in the center of the circle at 50% 50%.
            Never drifts, never lags, always 100% inside.
          */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
              isHovered
                ? 'w-2.5 h-2.5 bg-gradient-to-tr from-amber-500 via-yellow-200 to-white dark:from-cyan-500 dark:via-cyan-200 dark:to-white shadow-[0_0_12px_#f59e0b] dark:shadow-[0_0_12px_#22d3ee] scale-110'
                : 'w-2 h-2 bg-gradient-to-tr from-amber-600 via-amber-400 to-white dark:from-cyan-600 dark:via-cyan-400 dark:to-white shadow-[0_0_8px_#d4af37] dark:shadow-[0_0_8px_#06b6d4]'
            }`}
          >
            {/* Ultra-fine white pinpoint core */}
            <div className="w-1 h-1 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
