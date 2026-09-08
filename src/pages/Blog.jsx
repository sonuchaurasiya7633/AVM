import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { BlogCard } from '../components/BlogCard';
import { BLOGS_DATA } from '../data/blogs';
import { Search, X, BookOpen, Sparkles } from 'lucide-react';

export const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(BLOGS_DATA.map((b) => b.category))];
    return cats;
  }, []);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return BLOGS_DATA.filter((blog) => {
      const matchesCat =
        selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-luxury-gold/50 bg-luxury-emerald/30 text-luxury-goldLight mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Editorial Archive</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary leading-tight mb-6">
          The AVM Intelligence Journal: <br />
          <span className="text-gold-gradient italic">Articles & Case Studies.</span>
        </h1>
        <p className="text-base sm:text-lg text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
          Comprehensive, field-verified legal guides, revenue land laws, and strategic corridor analyses authored by Avnish.
        </p>
      </div>

      {/* Search & Category Filter Bar Leather Desk Pad */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-4 sm:p-6 rounded-2xl leather-badge-container border-2 border-luxury-gold shadow-lg leather-stitch-outline relative overflow-hidden">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-2.5 left-2.5" />
        <div className="brass-screw absolute top-2.5 right-2.5" />
        <div className="brass-screw absolute bottom-2.5 left-2.5" />
        <div className="brass-screw absolute bottom-2.5 right-2.5" />

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles, laws, RERA..."
            className="w-full pl-11 pr-10 py-2.5 rounded-full bg-luxury-dark/60 dark:bg-luxury-dark/60 light:bg-gray-100 border border-luxury-gold/30 text-sm text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary placeholder-luxury-muted focus:outline-none focus:border-luxury-gold"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-muted hover:text-luxury-gold"
              aria-label="Clear Search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold'
                  : 'bg-luxury-dark/40 dark:bg-luxury-dark/40 light:bg-gray-100 border border-luxury-gold/20 text-luxury-muted hover:text-luxury-goldLight'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-8 text-xs text-luxury-muted font-light">
        <span>
          Showing <strong className="text-luxury-gold font-medium">{filteredBlogs.length}</strong> publication(s)
        </span>
        {searchTerm && (
          <span>
            Filtering by: "<em>{searchTerm}</em>"
          </span>
        )}
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-luxury-surface/50 border border-luxury-gold/20">
          <BookOpen className="w-12 h-12 text-luxury-gold/40 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-luxury-ivory mb-2">
            No matching articles found
          </h3>
          <p className="text-xs text-luxury-muted mb-6">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-luxury-dark"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
