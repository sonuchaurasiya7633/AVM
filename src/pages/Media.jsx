import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { VideoCard } from '../components/VideoCard';
import { VideoModal } from '../components/VideoModal';
import { YOUTUBE_VIDEOS } from '../data/videos';
import { Play, Film, Sparkles, Filter, Search, X, Radio } from 'lucide-react';
import { AudioPlayer } from '../components/AudioPlayer';
import { MasterclassLearningPath } from '../components/MasterclassLearningPath';
import { PODCASTS_DATA } from '../data/podcasts';
import { useLanguage } from '../context/LanguageContext';

export const Media = () => {
  const { isHindi } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePodcast, setActivePodcast] = useState(PODCASTS_DATA[0]);

  const categories = [
    { id: 'All', labelEn: 'All', labelHi: 'सभी' },
    { id: 'Plot Due Diligence', labelEn: 'Plot Due Diligence', labelHi: 'भूखंड ड्यू डिलिजेंस' },
    { id: 'Corridor Audits', labelEn: 'Corridor Audits', labelHi: 'कॉरिडोर ऑडिट' },
    { id: 'Legal Mastery', labelEn: 'Legal Mastery', labelHi: 'विधिक विशेषज्ञता' },
    { id: 'Investment Strategy', labelEn: 'Investment Strategy', labelHi: 'निवेश रणनीति' }
  ];

  const filteredVideos = useMemo(() => {
    return YOUTUBE_VIDEOS.filter((video) => {
      const matchesCategory =
        activeCategory === 'All' || video.category === activeCategory;
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-luxury-gold/50 bg-luxury-emerald/30 text-luxury-goldLight mb-4">
          <Film className="w-3.5 h-3.5" />
          <span>{isHindi ? 'एवीएम टॉक्स मीडिया रिपॉजिटरी' : 'AVM Talks Media Repository'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          {isHindi ? '21 वीडियो मास्टरक्लास एवं' : '21 Video Masterclasses &'} <br />
          <span className="text-gold-gradient italic">{isHindi ? 'धरातलीय वास्तविकता रिपोर्ट।' : 'Ground Reality Reports.'}</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          {isHindi
            ? 'अवनीश के साथ धरातल पर देखें लेआउट अनुमोदन खामियां, मास्टरप्लान ग्रीन-बेल्ट आरक्षण, रेरा एस्क्रो अनुपालन और उच्च-विकास भूमि गलियारे।'
            : 'Watch Avnish on-ground uncovering layout approval flaws, masterplan green-belt reservations, RERA escrow compliance, and high-growth land corridors.'}
        </p>
      </div>

      {/* Embedded Podcast Player Bar */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <Radio className="w-4 h-4 text-luxury-gold animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">
            {isHindi ? 'विशेष ऑडियो स्ट्रीम' : 'Featured Audio Stream'}
          </span>
        </div>
        <AudioPlayer currentPodcast={activePodcast} />
      </div>

      {/* Executive Real Estate Masterclass Learning Path & Curriculum Syllabus */}
      <MasterclassLearningPath onSelectVideo={setSelectedVideo} />

      {/* Filter and Search Bar Leather Desk Pad */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl leather-badge-container border-2 border-luxury-gold shadow-xl mb-10 leather-stitch-outline relative overflow-hidden">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-2.5 left-2.5" />
        <div className="brass-screw absolute top-2.5 right-2.5" />
        <div className="brass-screw absolute bottom-2.5 left-2.5" />
        <div className="brass-screw absolute bottom-2.5 right-2.5" />

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-gold-gradient text-luxury-darker font-bold shadow-luxury-gold'
                  : 'bg-theme-card border border-theme-gold/20 text-theme-secondary hover:text-luxury-gold'
              }`}
            >
              {isHindi ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi ? 'सभी 21 वीडियो में खोजें...' : 'Search all 21 videos...'}
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-theme-card border border-theme-gold/30 text-xs text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-luxury-gold"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Video Counter */}
      <div className="flex items-center justify-between text-xs text-theme-muted mb-6">
        <span>
          {isHindi ? (
            <>दर्शाए जा रहे हैं: 21 में से <strong className="text-luxury-gold font-bold">{filteredVideos.length}</strong> मास्टरक्लास</>
          ) : (
            <>Showing <strong className="text-luxury-gold font-bold">{filteredVideos.length}</strong> of 21 Masterclasses</>
          )}
        </span>
        {activeCategory !== 'All' && (
          <span>
            {isHindi ? 'श्रेणी:' : 'Category:'} <strong className="text-theme-primary">{categories.find(c => c.id === activeCategory)?.[isHindi ? 'labelHi' : 'labelEn']}</strong>
          </span>
        )}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onPlay={(v) => setSelectedVideo(v)}
          />
        ))}
      </div>

      {/* Lightbox Cinema Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo?.youtubeId}
        title={selectedVideo?.title}
      />
    </div>
  );
};
