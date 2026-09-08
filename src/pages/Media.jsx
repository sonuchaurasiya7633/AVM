import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { VideoCard } from '../components/VideoCard';
import { VideoModal } from '../components/VideoModal';
import { YOUTUBE_VIDEOS } from '../data/videos';
import { Play, Film, Sparkles, Filter, Search, X, Radio } from 'lucide-react';
import { AudioPlayer } from '../components/AudioPlayer';
import { MasterclassLearningPath } from '../components/MasterclassLearningPath';
import { PODCASTS_DATA } from '../data/podcasts';

export const Media = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePodcast, setActivePodcast] = useState(PODCASTS_DATA[0]);

  const categories = useMemo(() => {
    return ['All', 'Plot Due Diligence', 'Corridor Audits', 'Legal Mastery', 'Investment Strategy'];
  }, []);

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
          <span>AVM Talks Media Repository</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary leading-tight mb-6">
          21 Video Masterclasses & <br />
          <span className="text-gold-gradient italic">Ground Reality Reports.</span>
        </h1>
        <p className="text-base sm:text-lg text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
          Watch Avnish on-ground uncovering layout approval flaws, masterplan green-belt reservations, RERA escrow compliance, and high-growth land corridors.
        </p>
      </div>

      {/* Embedded Podcast Player Bar */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <Radio className="w-4 h-4 text-luxury-gold animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">
            Featured Audio Stream
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
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-luxury-darker font-bold shadow-luxury-gold'
                  : 'bg-luxury-dark/40 dark:bg-luxury-dark/40 light:bg-gray-100 border border-luxury-gold/20 text-luxury-muted hover:text-luxury-goldLight'
              }`}
            >
              {cat}
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
            placeholder="Search all 21 videos..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-luxury-dark/60 dark:bg-luxury-dark/60 light:bg-gray-100 border border-luxury-gold/30 text-xs text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary placeholder-luxury-muted focus:outline-none focus:border-luxury-gold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-muted hover:text-luxury-gold"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Video Counter */}
      <div className="flex items-center justify-between text-xs text-luxury-muted mb-6">
        <span>Showing <strong className="text-luxury-gold font-bold">{filteredVideos.length}</strong> of 21 Masterclasses</span>
        {activeCategory !== 'All' && <span>Category: <strong className="text-luxury-ivory">{activeCategory}</strong></span>}
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
