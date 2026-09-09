import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles, Video, CheckCircle2, Car, MessageCircle, Phone, Compass, Image as ImageIcon, ZoomIn, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const REEL_VIDEO_URL = "https://res.cloudinary.com/dqpbo1uho/video/upload/v1788951913/wmmrzbq5i4ojin2lcbbs.mp4";
const DRONE_IMAGE_URL = "https://res.cloudinary.com/dqpbo1uho/image/upload/v1788952291/yzmkuehvawne25oas0lr.png";

export const DroneReelShowcase = () => {
  const { t, isHindi } = useLanguage();
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [activeTab, setActiveTab] = useState('reel'); // 'reel' | 'drone-photo'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showCenterIcon, setShowCenterIcon] = useState(false);
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowCenterIcon(true);
    setTimeout(() => setShowCenterIcon(false), 900);
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(pct);
  };

  const handleRestart = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = (e) => {
    e?.stopPropagation();
    const el = containerRef.current || videoRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (videoRef.current?.webkitEnterFullscreen) {
      videoRef.current.webkitEnterFullscreen();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting && activeTab === 'reel') {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [activeTab]);

  const primaryPhone = "9928365001";
  const whatsappUrl = "https://wa.me/91" + primaryPhone + "?text=" + encodeURIComponent(
    isHindi
      ? "नमस्ते अविनाश जी, मैंने वेबसाइट पर 4K ड्रोन व्यू और रील देखी। मुझे इस टाउनशिप में प्लॉट्स और रेट्स की जानकारी चाहिए।"
      : "Hello Avnish ji, I inspected your 4K Drone Aerial View and Reel on the website. I want to inspect plot options and rates in this project."
  );

  return (
    <section id="drone-reel-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Header with Dual Switcher Tabs */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.22em] border border-amber-400/30 bg-amber-400/10 text-amber-300 mb-4 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('droneReel.badge', '✦ Official 4K Drone Reconnaissance • On-Ground Hub ✦')}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-theme-primary leading-tight">
          {isHindi ? 'मौके की वास्तविक हकीकत: ऑन-पेज 4K ड्रोन इंस्पेक्शन' : 'Real Ground Reality: On-Page 4K Drone Inspection'}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-theme-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          {isHindi
            ? 'बैकग्राउंड के बजाय सीधे पेज पर देखें — 60ft/80ft चौड़ी सड़कें, कर्बस्टोन्स, अंडरग्राउंड बिजली और हर प्लॉट का वास्तविक सीमांकन।'
            : 'Inspect actual physical township development right on the page — 60ft/80ft bitumen boulevards, concrete curbstones, underground electricity, and plot boundary stones.'}
        </p>

        {/* Dual Tab Switcher: Reel Video vs Aerial Photo */}
        <div className="mt-6 inline-flex p-1 rounded-full bg-black/70 border border-amber-400/40 shadow-xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('reel')}
            className={"flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all " + (activeTab === 'reel' ? 'bg-gold-gradient text-luxury-darker shadow-md' : 'text-slate-300 hover:text-white')}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{isHindi ? '4K ड्रोन रील (वीडियो)' : '4K Drone Reel (Video)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('drone-photo')}
            className={"flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all " + (activeTab === 'drone-photo' ? 'bg-gold-gradient text-luxury-darker shadow-md' : 'text-slate-300 hover:text-white')}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{isHindi ? '4K एरियल फोटो (मास्टर व्यू)' : '4K Aerial Photo (Master View)'}</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Chassis: Leather Badge Container */}
      <div className="leather-badge-container rounded-3xl p-5 sm:p-8 lg:p-12 border-2 border-luxury-gold shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden leather-stitch-outline">
        {/* 4 Solid Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: ACTIVE TAB DISPLAY (9:16 REEL OR HIGH-RES AERIAL PHOTO) */}
          <div className="lg:col-span-6 flex justify-center">
            {activeTab === 'reel' ? (
              /* 9:16 SMARTPHONE REEL PLAYER WITH LUXURY FRAME */
              <div
                ref={containerRef}
                onClick={togglePlay}
                className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[9/16] rounded-3xl overflow-hidden border-2 sm:border-4 border-amber-400/80 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.35)] bg-black cursor-pointer select-none group"
              >
                {/* Cloudinary Reel Video */}
                <video
                  ref={videoRef}
                  src={REEL_VIDEO_URL}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  poster={DRONE_IMAGE_URL}
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover"
                />

                {/* Top Vignette & Subtle Gradient Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                {/* Top Bar Floating Controls */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white shadow">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                      4K REEL
                    </span>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-amber-400/60 text-white shadow-lg hover:scale-105 transition-all"
                    title={isMuted ? t('droneReel.unmuteHint', 'Tap to Unmute Audio') : t('droneReel.muteHint', 'Mute Audio')}
                    aria-label="Toggle Sound"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                        <span className="text-[10px] font-semibold text-amber-200">
                          {isHindi ? 'आवाज खोलें' : 'Unmute'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                        <span className="text-[10px] font-semibold text-cyan-300">
                          {isHindi ? 'म्यूट' : 'Mute'}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Center Flash Play / Pause Indicator */}
                {showCenterIcon && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-16 h-16 rounded-full bg-black/75 backdrop-blur-md border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-2xl animate-scale-up">
                      {isPlaying ? <Play className="w-8 h-8 fill-amber-300 ml-1" /> : <Pause className="w-8 h-8 fill-amber-300" />}
                    </div>
                  </div>
                )}

                {/* Bottom Reel Caption & Action Suite */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-luxury-darker">
                      AVM Verified
                    </span>
                    <span className="text-[11px] font-serif font-bold text-white drop-shadow">
                      AVM Talks by Avnish
                    </span>
                  </div>

                  <p className="text-xs text-white/95 font-medium leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-3">
                    {isHindi
                      ? "60ft व 80ft सेक्टर रोड, बिजली के खंभे और सीमांकित प्लॉट्स का वास्तविक वीडियो।"
                      : "Real on-site aerial footage: 60ft/80ft sector avenues & physical demarcation."}
                  </p>

                  {/* Secondary Controls (Restart & Fullscreen) */}
                  <div className="flex items-center justify-between text-white/80 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleRestart}
                        className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur text-white/90 hover:text-white transition-colors"
                        title="Replay Reel"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleFullscreen}
                        className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur text-white/90 hover:text-white transition-colors"
                        title="Fullscreen"
                      >
                        <Maximize className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-amber-300/90">
                      {isPlaying ? (isHindi ? 'चल रहा है • टैप करें' : 'Playing • Tap to pause') : (isHindi ? 'रुका हुआ है' : 'Paused')}
                    </span>
                  </div>

                  {/* Progress Timeline Bar */}
                  <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-all duration-100"
                      style={{ width: progress + "%" }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* HIGH-RESOLUTION 4K AERIAL DRONE PHOTO WITH INTERACTIVE PINS */
              <div className="relative w-full rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-[#0b1120] group">
                <img
                  src={DRONE_IMAGE_URL}
                  alt="4K Aerial Drone Perspective of Plotted Township"
                  className="w-full h-auto max-h-[480px] object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-700"
                  onClick={() => setIsImageLightboxOpen(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-black/75 text-amber-300 border border-amber-400/60 backdrop-blur-md">
                    ✦ 4K Aerial Drone View
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    Section 90-A Approved
                  </span>
                </div>

                {/* Interactive Hotspot Pins Overlay */}
                <div className="absolute top-1/4 left-1/3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-amber-400/80 text-[10px] font-mono font-bold text-amber-200 shadow-lg pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>80' Arterial Boulevard</span>
                </div>

                <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-cyan-400/80 text-[10px] font-mono font-bold text-cyan-200 shadow-lg pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Demarcated Plots</span>
                </div>

                {/* Bottom Bar with Inspect 4K Button */}
                <div className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-between gap-3 p-3 rounded-xl bg-black/80 border border-amber-400/40 backdrop-blur-md">
                  <div>
                    <p className="text-xs font-serif font-bold text-amber-200">
                      {isHindi ? '4K हाई-रेजोल्यूशन एरियल फोटो' : '4K High-Resolution Aerial View'}
                    </p>
                    <p className="text-[10px] text-slate-300">
                      {isHindi ? 'फुलस्क्रीन में देखने के लिए फोटो पर क्लिक करें' : 'Click image to inspect in 4K Fullscreen Lightbox'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsImageLightboxOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-md hover:scale-105 transition-all whitespace-nowrap"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{isHindi ? '4K में देखें' : 'Inspect 4K'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: DETAILED AUDIT SPECS & DIRECT BOOKING CTAS */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isHindi ? '100% ऑन-ग्राउंड फिजिकल वेरिफिकेशन' : '100% On-Ground Physical Verification'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-theme-primary leading-snug">
                {isHindi
                  ? 'कागजी वादे नहीं — मौके पर 60ft/80ft सड़कें और डिमार्केटेड प्लॉट्स'
                  : 'No Paper Promises: Wide Boulevards & Demarcated Land on Ground'}
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary font-light mt-2 leading-relaxed">
                {isHindi
                  ? 'बैकग्राउंड के बजाय सीधे यहाँ देखें — टाउनशिप में डामर की सड़कें डल चुकी हैं, कर्बस्टोन्स लग चुके हैं, अंडरग्राउंड बिजली की व्यवस्था है और हर प्लॉट की बाउंड्री पत्थरों से तय है।'
                  : 'Inspect real on-site physical infrastructure directly on this page: completed bitumen boulevards, concrete curbstones, underground electrical lines, and DGPS stone-demarcated plots.'}
              </p>
            </div>

            {/* 4 Key Physical Specification Cards */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 shadow-sm flex flex-col justify-between">
                <span className="text-theme-muted font-sans text-[11px] flex items-center gap-1.5 mb-1">
                  <Compass className="w-3.5 h-3.5 text-luxury-gold" />
                  {t('droneReel.specRoads', 'Masterplan Boulevards')}
                </span>
                <span className="font-bold text-xs sm:text-sm text-luxury-goldLight">
                  {t('droneReel.specRoadsVal', '60 Ft & 80 Ft Asphalt')}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 shadow-sm flex flex-col justify-between">
                <span className="text-theme-muted font-sans text-[11px] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  {t('droneReel.specInfra', 'Underground Utilities')}
                </span>
                <span className="font-bold text-xs sm:text-sm text-luxury-goldLight">
                  {t('droneReel.specInfraVal', 'Wiring & LED Lights')}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 shadow-sm flex flex-col justify-between">
                <span className="text-theme-muted font-sans text-[11px] flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {t('droneReel.specTitle', 'Legal Sanction')}
                </span>
                <span className="font-bold text-xs sm:text-sm text-luxury-goldLight">
                  {t('droneReel.specTitleVal', '100% Section 90-A')}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 shadow-sm flex flex-col justify-between">
                <span className="text-theme-muted font-sans text-[11px] flex items-center gap-1.5 mb-1">
                  <Video className="w-3.5 h-3.5 text-amber-400" />
                  {t('droneReel.specPossession', 'Plot Demarcation')}
                </span>
                <span className="font-bold text-xs sm:text-sm text-luxury-goldLight">
                  {t('droneReel.specPossessionVal', 'Ready Physical Cuts')}
                </span>
              </div>
            </div>

            {/* Direct Action Suite */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/book-visit"
                className="flex-1 py-3.5 px-5 rounded-2xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-center"
              >
                <Car className="w-4 h-4 text-luxury-darker" />
                <span>{t('droneReel.bookVisitBtn', 'Book Free VIP Fortuner Visit')}</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t('droneReel.whatsappBtn', 'WhatsApp Enquiry')}</span>
              </a>

              <a
                href={"tel:" + primaryPhone}
                className="py-3.5 px-4 rounded-2xl bg-theme-card border border-theme-gold/40 text-theme-primary hover:border-luxury-gold font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors text-center"
                title={"Call " + primaryPhone}
              >
                <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                <span className="hidden xl:inline">{t('droneReel.callBtn', 'Direct Call')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4K Drone Aerial Photo Fullscreen Lightbox Modal */}
      {isImageLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-6xl rounded-3xl leather-badge-container border-2 border-amber-400 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#0b1120] border-b border-amber-400/40">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-serif font-bold text-amber-200">
                  {isHindi ? '4K एरियल ड्रोन इंस्पेक्शन व्यू • अल्ट्रा हाई-डेफिनिशन' : '4K Aerial Drone Reconnaissance • Ultra High-Definition'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={DRONE_IMAGE_URL}
                  target="_blank"
                  rel="noreferrer"
                  download="AVM_Township_4K_Drone_View.png"
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 px-3"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setIsImageLightboxOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Image display */}
            <div className="relative max-h-[80vh] overflow-auto flex items-center justify-center bg-black p-2 sm:p-4">
              <img
                src={DRONE_IMAGE_URL}
                alt="4K Aerial Drone Perspective Full View"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />
            </div>
            {/* Footer */}
            <div className="p-3 bg-[#0b1120] border-t border-white/10 flex justify-end">
              <button
                onClick={() => setIsImageLightboxOpen(false)}
                className="px-5 py-1.5 rounded-full text-xs font-bold uppercase bg-gold-gradient text-luxury-darker shadow"
              >
                {isHindi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
