import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative p-2 rounded-full border border-luxury-gold/30 hover:border-luxury-gold transition-all duration-300 bg-luxury-surface/60 dark:bg-luxury-surface/80 hover:shadow-luxury-gold flex items-center justify-center group"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`${isDark ? 'block' : 'hidden'} text-luxury-goldLight`}
      >
        <Moon className="w-4 h-4 text-luxury-gold group-hover:text-luxury-goldLight transition-colors" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className={`${!isDark ? 'block' : 'hidden'} text-luxury-gold`}
      >
        <Sun className="w-4 h-4 text-luxury-gold group-hover:text-amber-600 transition-colors" />
      </motion.div>
    </button>
  );
};
