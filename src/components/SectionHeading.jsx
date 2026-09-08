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
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-dashed border-luxury-gold/60 bg-gradient-to-r from-[#03281E] via-[#2F170A] to-[#03281E] text-luxury-goldLight mb-3 shadow-lg backdrop-blur-md leather-deboss-gold gold-specular-border`}
        >
          <span className="w-2 h-2 rounded-full bg-luxury-gold beacon-pulse"></span>
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

      {/* Decorative Gold Accent Line with Fluid Liquid Sheen */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`h-[2.5px] w-28 bg-gradient-to-r from-transparent via-[#E2C178] to-transparent my-4 shadow-luxury-gold ${
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
