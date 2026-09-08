import React from 'react';
import { Play, Clock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const VideoCard = ({ video, onPlay }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => onPlay && onPlay(video)}
      className="group cursor-pointer rounded-2xl overflow-hidden leather-folio-card border-2 border-luxury-gold hover:border-luxury-goldLight shadow-theme-card transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Play Icon Badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-luxury-gold/90 text-luxury-darker flex items-center justify-center shadow-luxury-gold group-hover:scale-110 group-hover:bg-gold-gradient transition-all duration-300">
            <Play className="w-6 h-6 fill-luxury-darker ml-0.5" />
          </div>
        </div>

        {/* Badge & Duration */}
        {video.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-luxury-emerald/90 text-luxury-goldLight border border-luxury-gold/40">
              {video.badge}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-black/80 text-white/90">
          <Clock className="w-3 h-3 text-luxury-gold" />
          <span>{video.duration}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-theme-muted mb-2">
            <span className="text-luxury-gold font-bold uppercase tracking-wider text-[11px]">
              {video.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-serif font-bold text-theme-primary group-hover:text-luxury-gold transition-colors leading-snug">
            {video.title}
          </h4>

          <p className="mt-2 text-xs sm:text-sm text-theme-secondary font-light line-clamp-2">
            {video.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-theme-gold/20 flex items-center text-xs text-luxury-gold font-bold uppercase tracking-wider group-hover:underline">
          <span>Watch Masterclass</span>
        </div>
      </div>
    </motion.div>
  );
};
