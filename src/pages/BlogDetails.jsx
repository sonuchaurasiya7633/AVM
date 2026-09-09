import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOGS_DATA } from '../data/blogs';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { BlogCard } from '../components/BlogCard';
import { ArrowLeft, Clock, Calendar, User, Share2, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BlogDetails = () => {
  const { isHindi } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const blog = BLOGS_DATA.find((b) => b.slug === slug);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="pt-36 pb-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-serif font-bold text-theme-primary mb-4">
          {isHindi ? 'लेख उपलब्ध नहीं है' : 'Article Not Found'}
        </h2>
        <p className="text-xs text-theme-muted mb-6">
          {isHindi ? 'जिस लेख को आप खोज रहे हैं, वह शायद स्थानांतरित कर दिया गया है।' : 'The publication you are searching for may have been archived or moved.'}
        </p>
        <Link
          to="/blog"
          className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-luxury-darker"
        >
          {isHindi ? 'सभी लेखों पर लौटें' : 'Return to All Articles'}
        </Link>
      </div>
    );
  }

  const relatedBlogs = BLOGS_DATA.filter((b) => b.id !== blog.id).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <ReadingProgressBar />

      <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-theme-muted font-light mb-8">
          <Link to="/" className="hover:text-luxury-gold transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-luxury-gold transition-colors">
            {isHindi ? 'ब्लॉग' : 'Blog'}
          </Link>
          <span>/</span>
          <span className="text-luxury-goldLight truncate max-w-xs">{blog.title}</span>
        </div>

        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-luxury-gold hover:text-luxury-goldLight mb-6 transition-colors font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isHindi ? 'सभी लेखों पर वापस जाएं' : 'Back to Articles'}</span>
        </button>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-luxury-emerald/80 text-luxury-goldLight border border-luxury-gold/40">
            {blog.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-theme-muted font-light">
            <Clock className="w-3.5 h-3.5 text-luxury-gold" />
            <span>{blog.readTime}</span>
          </div>
          <span className="text-theme-muted">•</span>
          <div className="flex items-center gap-1.5 text-xs text-theme-muted font-light">
            <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
            <span>{blog.date}</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Author Line */}
        <div className="flex items-center justify-between py-4 border-y border-luxury-gold/20 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/20 border border-luxury-gold flex items-center justify-center text-luxury-gold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-theme-primary uppercase tracking-wider">
                {blog.author}
              </p>
              <p className="text-[11px] text-theme-muted">
                {isHindi ? 'कार्यकारी संपादकीय डेस्क' : 'Executive Editorial Desk'}
              </p>
            </div>
          </div>

          {/* Share Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold transition-colors"
              title={isHindi ? 'लिंक कॉपी करें' : 'Copy Link'}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-luxury-gold" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? (isHindi ? 'कॉपी हुआ' : 'Copied') : (isHindi ? 'शेयर करें' : 'Share')}</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-luxury-gold/30 shadow-2xl mb-10 aspect-video">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Executive Excerpt Box */}
        <div className="p-6 rounded-2xl bg-theme-card border-l-4 border-luxury-gold mb-10 text-sm sm:text-base text-theme-primary font-serif italic leading-relaxed shadow-sm">
          "{blog.excerpt}"
        </div>

        {/* Render Formatted Content */}
        <div className="prose dark:prose-invert prose-slate max-w-none text-theme-primary leading-relaxed space-y-6 text-sm sm:text-base font-light">
          {blog.content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();

            if (trimmed.startsWith('### ')) {
              return (
                <h3
                  key={index}
                  className="text-xl sm:text-2xl font-serif font-bold text-theme-primary mt-8 mb-3 pt-4 border-t border-luxury-gold/20"
                >
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            if (trimmed.startsWith('#### ')) {
              return (
                <h4
                  key={index}
                  className="text-base sm:text-lg font-serif font-bold text-theme-primary mt-6 mb-2"
                >
                  {trimmed.replace('#### ', '')}
                </h4>
              );
            }

            if (trimmed.startsWith('---')) {
              return <hr key={index} className="border-luxury-gold/20 my-8" />;
            }

            return (
              <p key={index} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-8 mt-12 border-t border-luxury-gold/20 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-theme-muted mr-2">{isHindi ? 'टैग्स:' : 'Tags:'}</span>
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs bg-theme-card text-luxury-gold font-medium border border-luxury-gold/30"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles Section */}
        <div className="pt-16 mt-16 border-t border-luxury-gold/20">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary mb-8">
            {isHindi ? 'संबंधित अनुसंधान एवं विश्लेषण रिपोर्ट' : 'Related Intelligence Reports'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedBlogs.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>
        </div>
      </article>
    </>
  );
};
