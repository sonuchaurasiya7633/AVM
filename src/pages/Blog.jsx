import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { BlogCard } from '../components/BlogCard';
import { BLOGS_DATA } from '../data/blogs';
import { Search, X, BookOpen, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Blog = () => {
  const { isHindi } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryTranslations = {
    'All': { en: 'All', hi: 'सभी' },
    'Legal & Due Diligence': { en: 'Legal & Due Diligence', hi: 'विधिक एवं ड्यू डिलिजेंस' },
    'Jaipur Infrastructure': { en: 'Jaipur Infrastructure', hi: 'जयपुर बुनियादी ढांचा' },
    'Wealth & Mindset': { en: 'Wealth & Mindset', hi: 'संपदा एवं मानसिकता' },
    'Buyer Guide': { en: 'Buyer Guide', hi: 'क्रेता गाइड' }
  };

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
          <span>{isHindi ? 'संपादकीय अभिलेखागार' : 'The Editorial Archive'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          {isHindi ? 'एवीएम इंटेलिजेंस जर्नल:' : 'The AVM Intelligence Journal:'} <br />
          <span className="text-gold-gradient italic">{isHindi ? 'विधिक लेख एवं केस स्टडीज।' : 'Articles & Case Studies.'}</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          {isHindi
            ? 'अवनीश द्वारा लिखित विस्तृत, धरातल पर सत्यापित कानूनी गाइड, राजस्थान भूमि राजस्व कानून और रणनीतिक कॉरिडोर विश्लेषण।'
            : 'Comprehensive, field-verified legal guides, revenue land laws, and strategic corridor analyses authored by Avnish.'}
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
            placeholder={isHindi ? 'लेख, कानून, रेरा खोजें...' : 'Search articles, laws, RERA...'}
            className="w-full pl-11 pr-10 py-2.5 rounded-full bg-theme-card border border-theme-gold/30 text-sm text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-luxury-gold shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-luxury-gold"
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
                  : 'bg-theme-card border border-theme-gold/20 text-theme-muted hover:text-theme-primary hover:border-theme-gold/50'
              }`}
            >
              {categoryTranslations[cat] ? (isHindi ? categoryTranslations[cat].hi : categoryTranslations[cat].en) : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-8 text-xs text-theme-muted font-light">
        <span>
          {isHindi ? (
            <>दर्शाए जा रहे हैं: <strong className="text-luxury-gold font-medium">{filteredBlogs.length}</strong> लेख</>
          ) : (
            <>Showing <strong className="text-luxury-gold font-medium">{filteredBlogs.length}</strong> publication(s)</>
          )}
        </span>
        {searchTerm && (
          <span>
            {isHindi ? 'खोज शब्द:' : 'Filtering by:'} "<em>{searchTerm}</em>"
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
        <div className="p-16 text-center rounded-3xl bg-theme-surface border border-theme-gold/20">
          <BookOpen className="w-12 h-12 text-luxury-gold/40 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-theme-primary mb-2">
            {isHindi ? 'कोई मेल खाता लेख नहीं मिला' : 'No matching articles found'}
          </h3>
          <p className="text-xs text-theme-muted mb-6">
            {isHindi ? 'कृपया अपने खोज शब्द बदलें अथवा अन्य श्रेणी का चयन करें।' : 'Try adjusting your search keywords or switching category filters.'}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-luxury-dark"
          >
            {isHindi ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
          </button>
        </div>
      )}
    </div>
  );
};
