import React from 'react';
import { Play, Radio, Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const PodcastCard = ({ podcast, onSelect, isCurrent }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between leather-folio-card ${
        isCurrent
          ? 'border-2 border-luxury-gold shadow-luxury-gold ring-2 ring-luxury-gold/50'
          : 'border border-luxury-gold/40 hover:border-luxury-gold shadow-luxury-card'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-luxury-gold/15 text-luxury-goldLight border border-luxury-gold/30">
            {podcast.episodeNumber}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-luxury-muted font-mono">
            <Clock className="w-3.5 h-3.5 text-luxury-gold" />
            <span>{podcast.duration}</span>
          </div>
        </div>

        <h4 className="text-lg font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary hover:text-luxury-goldLight transition-colors leading-snug mb-2">
          {podcast.title}
        </h4>

        <p className="text-xs font-medium text-luxury-goldLight/90 mb-3">
          Guest: <span className="text-luxury-ivory/90 dark:text-luxury-ivory/90 light:text-lightBg-textPrimary">{podcast.guest}</span>
        </p>

        <p className="text-xs text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed line-clamp-2 mb-4">
          {podcast.description}
        </p>

        {/* Discussion Topics Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {podcast.topics?.slice(0, 2).map((topic, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded bg-luxury-dark/40 dark:bg-black/30 light:bg-gray-100 text-luxury-muted border border-white/5"
            >
              #{topic}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 dark:border-white/5 light:border-gray-200 flex items-center justify-between">
        <button
          onClick={() => onSelect && onSelect(podcast)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-luxury-gold hover:text-luxury-goldLight transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
            <Play className="w-3.5 h-3.5 fill-luxury-gold ml-0.5" />
          </div>
          <span>{isCurrent ? 'Now Playing' : 'Listen Episode'}</span>
        </button>

        <span className="text-xs text-luxury-muted font-light">{podcast.date}</span>
      </div>
    </motion.div>
  );
};
