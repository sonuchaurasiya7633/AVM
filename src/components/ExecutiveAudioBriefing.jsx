import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, RotateCcw, FastForward, Sparkles, Headphones } from 'lucide-react';
import logoImg from '../assets/logo/avm-logo.png';
import { useLanguage } from '../context/LanguageContext';

const AUDIO_TRACKS = [
  {
    id: 1,
    title: 'The Non-Negotiable Law of JDA Section 90-A Surrender',
    duration: '04:18',
    durationSec: 258,
    category: 'Legal Protocol',
    date: 'March 2026',
    keyTakeaway: 'Why purchasing agricultural share land without a gazetted Section 90-A surrender order is a catastrophic legal trap in Rajasthan.'
  },
  {
    id: 2,
    title: 'Jaipur 47-KM Ring Road & DMIC Expressway Growth Dynamics',
    duration: '05:42',
    durationSec: 342,
    category: 'Corridor Strategy',
    date: 'February 2026',
    keyTakeaway: 'How infrastructure multipliers along the 6-lane cloverleaf junctions create generational wealth and 18-24% annual capital velocity.'
  },
  {
    id: 3,
    title: '7 Forensic Traps in Private Housing Society Pattas',
    duration: '03:55',
    durationSec: 235,
    category: 'Buyer Protection',
    date: 'January 2026',
    keyTakeaway: 'Examining the legal invalidity of pre-1999 Grah Nirman Sahakari Samiti receipts and why nationalized banks reject them.'
  }
];

export const ExecutiveAudioBriefing = () => {
  const { t } = useLanguage();
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef(null);

  const currentTrack = AUDIO_TRACKS[selectedTrackIndex];

  // Simulated audio playback progression
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.durationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, playbackRate, currentTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    setCurrentTime(parseInt(e.target.value));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="royal-obsidian-card rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
      {/* 4 Corner Brass Screws */}
      <div className="brass-screw absolute top-3.5 left-3.5" />
      <div className="brass-screw absolute top-3.5 right-3.5" />
      <div className="brass-screw absolute bottom-3.5 left-3.5" />
      <div className="brass-screw absolute bottom-3.5 right-3.5" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-luxury-gold/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-luxury-emerald/30 text-luxury-goldLight border border-luxury-gold/40 mb-3">
            <Headphones className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Voice of Avnish • Executive Dispatch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white leading-tight">
            Strategic Audio Commentary & Ground Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-1">
            Listen to Avnish's unfiltered editorial analysis on land regulations, corridor economics, and title audits.
          </p>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-luxury-gold/30 self-start md:self-auto">
          {[1.0, 1.25, 1.5].map((speed) => (
            <button
              key={speed}
              onClick={() => setPlaybackRate(speed)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                playbackRate === speed
                  ? 'bg-gold-gradient text-luxury-darker font-bold shadow-sm'
                  : 'text-luxury-ivory hover:text-luxury-gold'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Audio Player Chassis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Speaker Emblem & Active Track Info */}
        <div className="lg:col-span-4 flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-luxury-gold/25">
          <div className="relative flex-shrink-0">
            <img
              src={logoImg}
              alt="AVM Talks by Avnish"
              className="w-14 h-14 rounded-full object-cover border-2 border-luxury-gold shadow-luxury-gold"
            />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black animate-ping" />
            )}
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] font-mono uppercase text-luxury-goldLight font-bold block">
              {currentTrack.category} • {currentTrack.date}
            </span>
            <h4 className="text-sm font-serif font-bold text-white truncate">
              {currentTrack.title}
            </h4>
            <span className="text-xs font-mono text-theme-muted block mt-0.5">
              Avnish • Founder & Senior Land Counsel
            </span>
          </div>
        </div>

        {/* Center / Right: Player Controls, Waveform & Scrubber */}
        <div className="lg:col-span-8 space-y-4">
          {/* Controls + Animated Soundwave Bars */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gold-gradient text-luxury-darker flex items-center justify-center shadow-luxury-gold hover:scale-105 transition-transform"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => setCurrentTime(0)}
                className="p-2 rounded-full text-luxury-gold hover:text-white bg-black/40 border border-luxury-gold/20"
                title="Restart Track"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Animated Waveform Visualizer */}
            <div className="flex items-end gap-1 h-8 flex-1 max-w-xs px-2">
              {[12, 24, 18, 28, 14, 30, 22, 16, 26, 19, 27, 15, 32, 20, 14, 25, 18, 29, 21, 16].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-luxury-gold animate-pulse' : 'bg-luxury-gold/30'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(6, (h * (i % 3 === 0 ? 1.2 : 0.8)))}px` : '6px',
                    animationDelay: `${i * 0.08}s`
                  }}
                />
              ))}
            </div>

            <span className="text-xs font-mono text-luxury-goldLight font-bold">
              {formatTime(currentTime)} / {currentTrack.duration}
            </span>
          </div>

          {/* Scrubber Range Bar */}
          <input
            type="range"
            min="0"
            max={currentTrack.durationSec}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-luxury-emerald/40 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
          />

          {/* Key Editorial Takeaway Card */}
          <div className="p-3 rounded-xl bg-luxury-emerald/20 border border-luxury-gold/25 text-xs text-luxury-ivory font-light flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-luxury-gold font-bold">Executive Thesis: </strong>
              {currentTrack.keyTakeaway}
            </span>
          </div>
        </div>
      </div>

      {/* Playlist Track Switcher Pills */}
      <div className="mt-6 pt-6 border-t border-luxury-gold/20 flex flex-wrap gap-2">
        <span className="text-xs font-mono text-theme-muted uppercase tracking-widest flex items-center mr-2">
          Briefing Archive:
        </span>
        {AUDIO_TRACKS.map((track, idx) => (
          <button
            key={track.id}
            onClick={() => {
              setSelectedTrackIndex(idx);
              setCurrentTime(0);
              setIsPlaying(true);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              selectedTrackIndex === idx
                ? 'bg-luxury-emerald text-white border border-luxury-gold shadow-sm font-bold'
                : 'bg-black/40 text-luxury-ivory border border-luxury-gold/20 hover:border-luxury-gold'
            }`}
          >
            <span>Track 0{track.id}</span>
            <span className="text-[10px] text-luxury-goldLight opacity-80">({track.duration})</span>
          </button>
        ))}
      </div>
    </div>
  );
};
