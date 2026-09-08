import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle2, Play, Sparkles, ChevronRight, X, Clock, HelpCircle } from 'lucide-react';
import { YOUTUBE_VIDEOS } from '../data/videos';
import { useLanguage } from '../context/LanguageContext';

const LEARNING_TRACKS = [
  {
    id: 'track-1',
    title: 'Track 1: Statutory Foundations & Land Law',
    subtitle: 'Master Section 90-A surrender, Khatedari Jamabandi, and JDA Patta regularization.',
    episodeIds: ['1', '2', '3', '4', '5', '6', '7']
  },
  {
    id: 'track-2',
    title: 'Track 2: Regional Corridor Reconnaissance',
    subtitle: 'Ground reality audits across Ring Road Expressway, DMIC Freight, and Ajmer Road.',
    episodeIds: ['8', '9', '10', '11', '12', '13', '14']
  },
  {
    id: 'track-3',
    title: 'Track 3: Registry Execution & Anti-Fraud Shield',
    subtitle: 'Sub-registrar biometric protocols, token security, and avoiding private society traps.',
    episodeIds: ['15', '16', '17', '18', '19', '20', '21']
  }
];

export const MasterclassLearningPath = ({ onSelectVideo }) => {
  const { t } = useLanguage();
  const [completedEpisodes, setCompletedEpisodes] = useState(() => {
    try {
      const saved = localStorage.getItem('avm_completed_episodes');
      return saved ? JSON.parse(saved) : ['1', '2'];
    } catch {
      return ['1', '2'];
    }
  });

  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [selectedNotesEpisode, setSelectedNotesEpisode] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('avm_completed_episodes', JSON.stringify(completedEpisodes));
    } catch {}
  }, [completedEpisodes]);

  const toggleEpisodeComplete = (epId) => {
    setCompletedEpisodes(prev => 
      prev.includes(epId) ? prev.filter(id => id !== epId) : [...prev, epId]
    );
  };

  const activeTrack = LEARNING_TRACKS[activeTrackIndex];
  const trackVideos = YOUTUBE_VIDEOS.filter(v => activeTrack.episodeIds.includes(v.id.toString()));

  const totalEpisodes = 21;
  const progressPct = Math.round((completedEpisodes.length / totalEpisodes) * 100);

  return (
    <div className="royal-obsidian-card rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
      {/* 4 Corner Brass Screws */}
      <div className="brass-screw absolute top-3.5 left-3.5" />
      <div className="brass-screw absolute top-3.5 right-3.5" />
      <div className="brass-screw absolute bottom-3.5 left-3.5" />
      <div className="brass-screw absolute bottom-3.5 right-3.5" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-luxury-gold/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-luxury-emerald/30 text-luxury-goldLight border border-luxury-gold/40 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Structured Investor Curriculum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white leading-tight">
            Masterclass Learning Tracks & Curriculum Syllabus
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-1">
            Complete the 21 masterclasses in structured executive sequence to earn your Fiduciary Certified Land Investor badge.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="p-4 rounded-2xl bg-black/40 border border-luxury-gold/30 min-w-[240px]">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-theme-muted">Curriculum Progress:</span>
            <span className="text-luxury-gold font-bold">{progressPct}% ({completedEpisodes.length}/21)</span>
          </div>
          <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gold-gradient rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {LEARNING_TRACKS.map((track, idx) => (
          <button
            key={track.id}
            onClick={() => setActiveTrackIndex(idx)}
            className={`p-4 rounded-2xl text-left border transition-all ${
              activeTrackIndex === idx
                ? 'bg-luxury-emerald/30 border-luxury-gold shadow-lg font-bold'
                : 'bg-black/30 border-white/10 hover:border-luxury-gold/40'
            }`}
          >
            <span className="text-[10px] font-mono uppercase text-luxury-goldLight block mb-1">
              Module 0{idx + 1} • 7 Masterclasses
            </span>
            <h4 className="text-xs font-serif font-bold text-white mb-1">
              {track.title}
            </h4>
            <p className="text-[11px] text-theme-muted line-clamp-2 leading-relaxed font-sans">
              {track.subtitle}
            </p>
          </button>
        ))}
      </div>

      {/* Episode List for Active Track */}
      <div className="space-y-3 mb-6">
        {trackVideos.map((video) => {
          const isDone = completedEpisodes.includes(video.id.toString());
          return (
            <div
              key={video.id}
              className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-luxury-gold/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleEpisodeComplete(video.id.toString())}
                  className={`w-6 h-6 rounded-full flex items-center justify-center border mt-0.5 flex-shrink-0 transition-colors ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'border-white/30 text-transparent hover:border-luxury-gold'
                  }`}
                  title={isDone ? 'Mark as Incomplete' : 'Mark as Completed'}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-theme-card text-luxury-goldLight border border-white/5">
                      Episode 0{video.id}
                    </span>
                    <span className="text-[10px] font-mono text-theme-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {video.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-white leading-tight">
                    {video.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setSelectedNotesEpisode(video)}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono text-luxury-gold hover:text-white bg-black/50 border border-luxury-gold/25 transition-colors"
                >
                  Key Takeaways
                </button>
                <button
                  onClick={() => onSelectVideo && onSelectVideo(video)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-sm hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Episode</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Takeaways Modal */}
      {selectedNotesEpisode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl royal-obsidian-card p-6 sm:p-8 border-2 border-luxury-gold shadow-2xl leather-stitch-outline">
            <div className="brass-screw absolute top-3 left-3" />
            <div className="brass-screw absolute top-3 right-3" />
            <div className="brass-screw absolute bottom-3 left-3" />
            <div className="brass-screw absolute bottom-3 right-3" />

            <div className="flex items-center justify-between pb-3 border-b border-luxury-gold/30 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold">
                Executive Takeaways • Episode 0{selectedNotesEpisode.id}
              </span>
              <button
                onClick={() => setSelectedNotesEpisode(null)}
                className="p-1 rounded-full text-luxury-gold hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-base font-serif font-bold text-white mb-3">
              {selectedNotesEpisode.title}
            </h3>

            <p className="text-xs text-theme-secondary font-light leading-relaxed mb-6 font-sans">
              {selectedNotesEpisode.description}
            </p>

            <div className="p-4 rounded-xl bg-luxury-emerald/20 border border-luxury-gold/30 text-xs text-luxury-ivory font-light mb-6 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-luxury-gold font-bold">Avnish's Non-Negotiable Rule: </strong>
                Never sign an agreement to sell or hand over advance tokens until the developer shows the registered Section 90-A revenue order surrender challan.
              </span>
            </div>

            <button
              onClick={() => setSelectedNotesEpisode(null)}
              className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
            >
              Close Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

