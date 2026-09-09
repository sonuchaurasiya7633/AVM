import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  centered = true,
  className = ""
}) => {
  return (
    <div className={`mb-12 sm:mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border dark:border-white/10 border-cyan-500/30 dark:bg-cyan-500/10 bg-cyan-100/70 dark:text-cyan-300 text-cyan-800 mb-3 shadow-lg backdrop-blur-md`}
        >
          <span className="w-2 h-2 rounded-full dark:bg-cyan-400 bg-cyan-600 beacon-pulse"></span>
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-theme-primary leading-tight"
      >
        {title}
      </motion.h2>

      {/* Decorative Cyan/Gold Accent Line with Fluid Liquid Sheen */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`h-[2px] w-28 bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-4 shadow-[0_0_15px_rgba(6,182,212,0.5)] ${
          centered ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`max-w-3xl text-sm sm:text-base lg:text-lg text-theme-secondary font-light leading-relaxed ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
