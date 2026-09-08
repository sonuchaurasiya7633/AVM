import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlogCard = ({ blog }) => {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col h-full rounded-2xl overflow-hidden leather-folio-card border-2 border-luxury-gold hover:border-luxury-goldLight shadow-theme-card transition-all duration-300 relative"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-black">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-luxury-emerald/90 text-luxury-goldLight border border-luxury-gold/40 backdrop-blur-md">
            {blog.category}
          </span>
        </div>

        {/* Read Time */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white/90">
          <Clock className="w-3.5 h-3.5 text-luxury-gold" />
          <span>{blog.readTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-theme-muted mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-luxury-gold/70" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 text-luxury-gold/70" />
              {blog.author}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-theme-primary group-hover:text-luxury-gold transition-colors leading-snug mb-3">
            {blog.title}
          </h3>

          <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>
        </div>

        <div className="pt-5 mt-5 border-t border-theme-gold/20 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold group-hover:underline">
            Read Full Analysis
          </span>
          <div className="w-8 h-8 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-dark transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <Link
        to={`/blog/${blog.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read article: ${blog.title}`}
      />
    </motion.article>
  );
};
