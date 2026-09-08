import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VideoModal = ({ isOpen, onClose, videoId, title }) => {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-luxury-dark rounded-2xl overflow-hidden border border-luxury-gold/50 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-gold/20 bg-luxury-surface">
            <h3 className="text-sm sm:text-base font-serif font-semibold text-luxury-ivory truncate pr-4">
              {title || 'AVM Talks Masterclass'}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-luxury-gold hover:text-luxury-goldLight transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Iframe */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title || "AVM Talks Video"}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Footer badge */}
          <div className="px-6 py-3 bg-luxury-surface/90 flex items-center justify-between text-xs text-luxury-muted">
            <span className="text-luxury-gold font-medium">AVM TALKS BY AVNISH — Masterclass Series</span>
            <span>Recorded in High Definition</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
