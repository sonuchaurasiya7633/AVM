import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Radio, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo/avm-logo.png';

export const AudioPlayer = ({ currentPodcast }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Reset player state when podcast changes
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentPodcast?.id]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback simulated playing if soundhelix URL is blocked
        setIsPlaying(true);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e) => {
    const seekPercent = parseFloat(e.target.value);
    setProgress(seekPercent);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (seekPercent / 100) * audioRef.current.duration;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!currentPodcast) return null;

  return (
    <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-luxury-surface to-luxury-surfaceLight dark:from-luxury-surface dark:to-luxury-surfaceLight light:from-white light:to-lightBg-card border border-luxury-gold/30 shadow-2xl overflow-hidden">
      <audio
        ref={audioRef}
        src={currentPodcast.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />

      {/* Ambient background gold glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-luxury-gold/10 blur-3xl pointer-events-none"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Track info & Logo */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-luxury-gold/50 flex-shrink-0">
            <img
              src={currentPodcast.coverImage || logoImg}
              alt={currentPodcast.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-luxury-emerald/60 flex items-center justify-center gap-0.5">
                <span className="w-1 bg-luxury-gold animate-wave-1 rounded-full"></span>
                <span className="w-1 bg-luxury-gold animate-wave-2 rounded-full"></span>
                <span className="w-1 bg-luxury-gold animate-wave-3 rounded-full"></span>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-luxury-gold/20 text-luxury-goldLight border border-luxury-gold/30">
                {currentPodcast.episodeNumber}
              </span>
              <span className="text-xs text-luxury-muted flex items-center gap-1">
                <Radio className="w-3 h-3 text-luxury-gold" />
                AVM Audio Stream
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary truncate mt-1">
              {currentPodcast.title}
            </h4>
            <p className="text-xs text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary truncate">
              {currentPodcast.guest}
            </p>
          </div>
        </div>

        {/* Audio Controls & Progress */}
        <div className="flex-1 w-full max-w-xl flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-gold-gradient text-luxury-darker flex items-center justify-center shadow-luxury-gold hover:scale-105 transition-transform flex-shrink-0"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-luxury-darker" /> : <Play className="w-5 h-5 fill-luxury-darker ml-0.5" />}
            </button>

            <div className="flex-1 flex flex-col gap-1">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-luxury-dark/40 dark:bg-white/10 light:bg-gray-300 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
              />
              <div className="flex justify-between text-[11px] text-luxury-muted font-mono">
                <span>{isPlaying ? 'Playing Live' : '00:00'}</span>
                <span>{currentPodcast.duration}</span>
              </div>
            </div>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full border border-luxury-gold/20 hover:border-luxury-gold text-luxury-gold transition-colors flex-shrink-0"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
