import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, ArrowRight, ShieldCheck, TrendingUp, Radio, Award, Compass, 
  CheckCircle2, Eye, Building2, MapPin, Calculator, PhoneCall, Sparkles, Filter, Check,
  Video, Volume2, VolumeX, Image as ImageIcon, Maximize2, X, Download, ZoomIn, Layers, FileText
} from 'lucide-react';
import logoImg from '../assets/logo/avm-logo.png';
import heroEstateImg from '../assets/images/hero-plotted-estate.jpg';
import dronePlotsHeroImg from '../assets/images/drone-plots-hero.jpg';
import masterBlueprintImg from '../assets/images/master-blueprint.jpg';

const CLOUDINARY_DRONE_IMAGE = "https://res.cloudinary.com/dqpbo1uho/image/upload/v1788952291/yzmkuehvawne25oas0lr.png";
const CLOUDINARY_REEL_VIDEO = "https://res.cloudinary.com/dqpbo1uho/video/upload/v1788951913/wmmrzbq5i4ojin2lcbbs.mp4";
import { SectionHeading } from '../components/SectionHeading';
import { PlotCard } from '../components/PlotCard';
import { VideoCard } from '../components/VideoCard';
import { PlotCalculator } from '../components/PlotCalculator';
import { LeatherUnitCalculator } from '../components/LeatherUnitCalculator';
import { RouteMapGuide } from '../components/RouteMapGuide';
import { AgentDirectory } from '../components/AgentDirectory';
import { FlyingMoneyAnimation } from '../components/FlyingMoneyAnimation';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { DueDiligenceCalculator } from '../components/DueDiligenceCalculator';
import { Newsletter } from '../components/Newsletter';
import { VideoModal } from '../components/VideoModal';
import { InteractiveCadastralMap } from '../components/InteractiveCadastralMap';
import { DroneProximityHUD } from '../components/DroneProximityHUD';
import { DueDiligenceDossierModal } from '../components/DueDiligenceDossierModal';
import { VastuSunPathSimulator } from '../components/VastuSunPathSimulator';
import { AIAirAppreciationForecaster } from '../components/AIAirAppreciationForecaster';
import { ForensicTitleChainTimeline } from '../components/ForensicTitleChainTimeline';
import { ExecutiveAudioBriefing } from '../components/ExecutiveAudioBriefing';
import { DroneReelShowcase } from '../components/DroneReelShowcase';

import { PLOTS_DATA } from '../data/plots';
import { YOUTUBE_VIDEOS } from '../data/videos';
import { CORRIDORS_DATA, MACRO_METRICS } from '../data/insights';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const { t, isHindi } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeVideoCategory, setActiveVideoCategory] = useState('All');
  const [heroMode, setHeroMode] = useState('overview'); // 'drone-plots' | 'video' | 'blueprint'
  const [isMuted, setIsMuted] = useState(true);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const [heroProgress, setHeroProgress] = useState(0);
  const [heroShowCenterIcon, setHeroShowCenterIcon] = useState(false);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);
  const [isDroneImgModalOpen, setIsDroneImgModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const videoRef = React.useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleHeroPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setHeroPlaying(true);
    } else {
      videoRef.current.pause();
      setHeroPlaying(false);
    }
    setHeroShowCenterIcon(true);
    setTimeout(() => setHeroShowCenterIcon(false), 900);
  };

  const handleHeroTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setHeroProgress(pct);
  };

  const videoCategories = useMemo(() => {
    return ['All', 'Plot Due Diligence', 'Corridor Audits', 'Legal Mastery', 'Investment Strategy'];
  }, []);

  const filteredVideos = useMemo(() => {
    if (activeVideoCategory === 'All') return YOUTUBE_VIDEOS;
    return YOUTUBE_VIDEOS.filter((v) => v.category === activeVideoCategory);
  }, [activeVideoCategory]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-theme-base text-theme-primary">
      {/* 5-Second Flying Money & Gold Coins Prosperity Animation on Site Open */}
      <FlyingMoneyAnimation />

      {/* ----------------- 1. CINEMATIC REAL ESTATE HERO ----------------- */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Pure Luxury Obsidian Backdrop (Clean, Zero Image/Video Clutter in Background) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#030712] via-[#08101e] to-[#030712]">
          {/* Ambient Cyan & Gold Radial Glow Highlights */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-cyan-900/25 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-12 -left-20 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

          {/* Cosmic Geometric Square Grid Pattern */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_25%,#000_65%,transparent_100%)]" />
        </div>

        {/* Media Switcher Capsule: Switch between Overview, 4K Drone View, 4K Drone Reel, and Masterplan Blueprint */}
        <div className="relative z-20 mb-6 flex items-center justify-center">
          <div className="inline-flex items-center p-1 rounded-full bg-black/80 border border-luxury-gold/40 backdrop-blur-md shadow-2xl text-xs">
            <button
              onClick={() => setHeroMode('overview')}
              className={"flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 " + (heroMode === 'overview' ? 'bg-gold-gradient text-luxury-darker shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10')}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{t('hero.switcherOverview', 'Overview')}</span>
            </button>
            <button
              onClick={() => setHeroMode('drone-plots')}
              className={"flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 " + (heroMode === 'drone-plots' ? 'bg-gold-gradient text-luxury-darker shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10')}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t('hero.switcherDrone', '4K Drone View')}</span>
            </button>
            <button
              onClick={() => setHeroMode('video')}
              className={"flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 " + (heroMode === 'video' ? 'bg-gold-gradient text-luxury-darker shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10')}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{t('hero.switcherReel', '4K Drone Reel')}</span>
            </button>
            <button
              onClick={() => setHeroMode('blueprint')}
              className={"flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 " + (heroMode === 'blueprint' ? 'bg-gold-gradient text-luxury-darker shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10')}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t('hero.switcherBlueprint', 'Masterplan Blueprint')}</span>
            </button>
            {heroMode === 'blueprint' && (
              <button
                onClick={() => setIsBlueprintModalOpen(true)}
                title={t('blueprint.highResTitle', 'Inspect 8K High-Resolution Blueprint')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 ml-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
              >
                <Maximize2 className="w-3 h-3 text-luxury-darker" />
                <span className="hidden sm:inline">{t('hero.inspect8k', 'Inspect 8K')}</span>
              </button>
            )}
            {heroMode === 'drone-plots' && (
              <button
                onClick={() => setIsDroneImgModalOpen(true)}
                title="Inspect 4K Fullscreen"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 ml-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
              >
                <ZoomIn className="w-3 h-3 text-luxury-darker" />
                <span className="hidden sm:inline">4K Fullscreen</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content: Luxury Glass & Stitched Leather Chassis for 100% Crisp Typography */}
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          {heroMode === 'drone-plots' ? (
            /* 4K AERIAL DRONE PERSPECTIVE CARD DISPLAYED DIRECTLY IN FRONT */
            <div className="w-full bg-[#030712]/92 backdrop-blur-2xl rounded-3xl p-5 sm:p-8 lg:p-10 border-2 border-amber-400/70 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.3)] relative overflow-hidden gold-specular-border animate-fade-in">
              <div className="leather-corner-bracket-tl"></div>
              <div className="leather-corner-bracket-tr"></div>
              <div className="leather-corner-bracket-bl"></div>
              <div className="leather-corner-bracket-br"></div>
              <div className="brass-screw absolute top-4 left-4" title="Rivet"></div>
              <div className="brass-screw absolute top-4 right-4" title="Rivet"></div>
              <div className="brass-screw absolute bottom-4 left-4" title="Rivet"></div>
              <div className="brass-screw absolute bottom-4 right-4" title="Rivet"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center text-left">
                {/* 4K Drone Image Display in Front with Interactive Pins */}
                <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-black group">
                  <img
                    src={CLOUDINARY_DRONE_IMAGE}
                    alt="4K Aerial Drone Perspective of Plotted Township"
                    className="w-full h-auto max-h-[420px] object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-700"
                    onClick={() => setIsDroneImgModalOpen(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-black/80 text-amber-300 border border-amber-400/60 backdrop-blur">
                      ✦ 4K Aerial Drone View
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur">
                      Section 90-A Approved
                    </span>
                  </div>

                  {/* Interactive Pins */}
                  <div className="absolute top-1/4 left-1/4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 border border-amber-400 text-[9px] font-mono font-bold text-amber-200 shadow pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span>80' Boulevard</span>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 border border-cyan-400 text-[9px] font-mono font-bold text-cyan-200 shadow pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Demarcated Plots</span>
                  </div>

                  {/* Bottom Zoom Trigger */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/80 border border-amber-400/40 backdrop-blur">
                    <div>
                      <p className="text-xs font-serif font-bold text-amber-200">
                        {isHindi ? '4K एरियल ड्रोन इंस्पेक्शन' : '4K Aerial Drone Reconnaissance'}
                      </p>
                      <p className="text-[10px] text-slate-300">
                        {isHindi ? 'बड़ी स्क्रीन में देखने के लिए फोटो पर क्लिक करें' : 'Click image to inspect in 4K Fullscreen'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsDroneImgModalOpen(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-gold-gradient text-luxury-darker shadow hover:scale-105 transition-all whitespace-nowrap"
                    >
                      <ZoomIn className="w-3 h-3" />
                      <span>{isHindi ? '4K देखें' : 'Inspect 4K'}</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Physical Ground Reality Specs & Actions */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isHindi ? '100% ऑन-ग्राउंड फिजिकल वेरिफिकेशन' : '100% On-Ground Physical Verification'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                      {isHindi
                        ? 'कागजी नक्शे नहीं — मौके पर 60ft/80ft सड़कें और डिमार्केटेड प्लॉट्स'
                        : 'No Paper Promises: Wide Boulevards & Demarcated Land on Ground'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-1.5 leading-relaxed">
                      {isHindi
                        ? 'बैकग्राउंड के बजाय सीधे स्क्रीन पर देखें — टाउनशिप में डामर की सड़कें डल चुकी हैं, कर्बस्टोन्स लग चुके हैं, अंडरग्राउंड बिजली की व्यवस्था है और हर प्लॉट की बाउंड्री पत्थरों से तय है।'
                        : 'Inspect real on-site infrastructure directly on screen: completed bitumen boulevards, concrete curbstones, underground electricity, and plot boundary demarcation.'}
                    </p>
                  </div>

                  {/* 4 Feature Chips */}
                  <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'मास्टरप्लान मुख्य सड़कें' : 'Masterplan Boulevards'}
                      </span>
                      <span className="font-bold text-amber-300 text-xs">
                        {isHindi ? '60ft व 80ft डामर' : '60 Ft & 80 Ft Asphalt'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'अंडरग्राउंड बिजली' : 'Underground Utilities'}
                      </span>
                      <span className="font-bold text-cyan-300 text-xs">
                        {isHindi ? 'केबलिंग व LED लाइट्स' : 'Wiring & LED Lights'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'कानूनी टाइटल' : 'Legal Sanction'}
                      </span>
                      <span className="font-bold text-emerald-300 text-xs">
                        {isHindi ? '100% धारा 90-A' : '100% Section 90-A'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'प्लॉट बाउंड्री' : 'Plot Demarcation'}
                      </span>
                      <span className="font-bold text-amber-300 text-xs">
                        {isHindi ? 'मौके पर कटी सीमा' : 'Ready Physical Cuts'}
                      </span>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <Link
                      to="/book-visit"
                      className="flex-1 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider gold-shimmer-btn text-white text-center shadow-lg hover:scale-[1.02] transition-transform"
                    >
                      {isHindi ? 'फ्री वीआईपी साइट विजिट' : 'Book VIP Fortuner Visit'}
                    </Link>
                    <a
                      href="https://wa.me/919928365001?text=Hello%20Avnish%20ji,%20I%20inspected%20the%204K%20Drone%20View%20on%20the%20website%20and%20want%20details."
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#128C7E] text-white text-center shadow-md hover:scale-[1.02] transition-all"
                    >
                      {isHindi ? 'व्हाट्सएप' : 'WhatsApp Enquiry'}
                    </a>
                    <button
                      onClick={() => setHeroMode('overview')}
                      className="py-3 px-3.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-center"
                    >
                      {isHindi ? 'ओवरव्यू' : 'Overview'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : heroMode === 'blueprint' ? (
            /* MASTERPLAN BLUEPRINT DISPLAYED DIRECTLY IN FRONT */
            <div className="w-full bg-[#030712]/92 backdrop-blur-2xl rounded-3xl p-5 sm:p-8 lg:p-10 border-2 border-amber-400/70 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.3)] relative overflow-hidden gold-specular-border animate-fade-in">
              <div className="leather-corner-bracket-tl"></div>
              <div className="leather-corner-bracket-tr"></div>
              <div className="leather-corner-bracket-bl"></div>
              <div className="leather-corner-bracket-br"></div>
              <div className="brass-screw absolute top-4 left-4" title="Rivet"></div>
              <div className="brass-screw absolute top-4 right-4" title="Rivet"></div>
              <div className="brass-screw absolute bottom-4 left-4" title="Rivet"></div>
              <div className="brass-screw absolute bottom-4 right-4" title="Rivet"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center text-left">
                <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border-2 border-luxury-gold/70 shadow-2xl bg-[#0b1120] group">
                  <img
                    src={masterBlueprintImg}
                    alt="Sanctioned Masterplan Architectural Blueprint"
                    className="w-full h-auto max-h-[420px] object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-700"
                    onClick={() => setIsBlueprintModalOpen(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-black/80 text-amber-300 border border-amber-400/60 backdrop-blur">
                      ✦ Masterplan Blueprint
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur">
                      Scale 1:1500 CAD
                    </span>
                  </div>
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/80 border border-amber-400/40 backdrop-blur">
                    <div>
                      <p className="text-xs font-serif font-bold text-amber-200">
                        {isHindi ? '8K मास्टरप्लान लेआउट' : '8K Masterplan CAD Layout'}
                      </p>
                      <p className="text-[10px] text-slate-300">
                        {isHindi ? 'फुलस्क्रीन में देखने के लिए ब्लूप्रिंट पर क्लिक करें' : 'Click to inspect in 8K Fullscreen'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsBlueprintModalOpen(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-gold-gradient text-luxury-darker shadow hover:scale-105 transition-all whitespace-nowrap"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>{isHindi ? '8K देखें' : 'Inspect 8K'}</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isHindi ? 'जेडीए स्वीकृत टाउनशिप लेआउट' : 'JDA Sanctioned Layout'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                      {isHindi ? 'मास्टरप्लान ब्लूप्रिंट व सेक्टर डिमार्केशन' : 'Masterplan Blueprint & Sector Demarcation'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-1.5 leading-relaxed">
                      {isHindi
                        ? 'आधिकारिक तकनीकी CAD ड्राफ्टिंग — 80ft व 60ft चौड़ी सड़कें, नंबर्ड प्लॉट्स, सेंट्रल पार्क और क्लबहाउस।'
                        : 'Official technical drafting showing 80ft & 60ft sector boulevards, numbered plots, central park, and clubhouse.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'मुख्य सेक्टर रोड' : 'Main Boulevards'}
                      </span>
                      <span className="font-bold text-amber-300 text-xs">80 Ft & 60 Ft</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'आंतरिक सड़कें' : 'Internal Roads'}
                      </span>
                      <span className="font-bold text-cyan-300 text-xs">30 Ft & 40 Ft</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'पार्क व ग्रीनरी' : 'Green Parks'}
                      </span>
                      <span className="font-bold text-emerald-300 text-xs">10%+ Dedicated</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'क्लबहाउस' : 'Clubhouse'}
                      </span>
                      <span className="font-bold text-amber-300 text-xs">15,000 Sq.Ft</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <button
                      onClick={() => setIsBlueprintModalOpen(true)}
                      className="flex-1 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker font-bold shadow-lg hover:scale-[1.02] transition-transform text-center"
                    >
                      {isHindi ? '8K फुलस्क्रीन खोलें' : 'Open 8K Fullscreen'}
                    </button>
                    <button
                      onClick={() => setHeroMode('overview')}
                      className="py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-center"
                    >
                      {isHindi ? 'ओवरव्यू' : 'Overview'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : heroMode === 'video' ? (
            <div className="w-full bg-[#030712]/92 backdrop-blur-2xl rounded-3xl p-5 sm:p-8 lg:p-10 border-2 border-amber-400/70 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.3)] relative overflow-hidden gold-specular-border animate-fade-in">
              {/* 4 Antiqued Solid Corner Brackets */}
              <div className="leather-corner-bracket-tl"></div>
              <div className="leather-corner-bracket-tr"></div>
              <div className="leather-corner-bracket-bl"></div>
              <div className="leather-corner-bracket-br"></div>

              {/* 4 Rivets */}
              <div className="brass-screw absolute top-4 left-4" title="Rivet"></div>
              <div className="brass-screw absolute top-4 right-4" title="Rivet"></div>
              <div className="brass-screw absolute bottom-4 left-4" title="Rivet"></div>
              <div className="brass-screw absolute bottom-4 right-4" title="Rivet"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center text-left">
                {/* 9:16 Vertical Reel Player Right in the Front */}
                <div className="lg:col-span-5 flex justify-center">
                  <div
                    onClick={toggleHeroPlay}
                    className="relative w-full max-w-[300px] sm:max-w-[330px] aspect-[9/16] rounded-3xl overflow-hidden border-2 sm:border-4 border-amber-400/80 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(245,158,11,0.4)] bg-black cursor-pointer select-none group"
                  >
                    <video
                      ref={videoRef}
                      src={CLOUDINARY_REEL_VIDEO}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onTimeUpdate={handleHeroTimeUpdate}
                      className="w-full h-full object-cover"
                    />

                    {/* Top & Bottom Vignettes */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                    {/* Floating Top Controls: 4K Pill & Mute Button */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur border border-white/20 text-white shadow">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span className="text-[10px] font-mono font-bold text-amber-300">4K REEL</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur border border-amber-400/60 text-white shadow-lg text-[10px] font-bold transition-all"
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                            <span className="text-amber-200">{isHindi ? 'आवाज खोलें' : 'Unmute'}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                            <span className="text-cyan-300">{isHindi ? 'म्यूट' : 'Mute'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Flash Center Play/Pause indicator */}
                    {heroShowCenterIcon && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="w-14 h-14 rounded-full bg-black/75 backdrop-blur-md border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-2xl animate-scale-up">
                          {heroPlaying ? <Play className="w-7 h-7 fill-amber-300 ml-0.5" /> : <Pause className="w-7 h-7 fill-amber-300" />}
                        </div>
                      </div>
                    )}

                    {/* Bottom Overlay Info & Progress */}
                    <div className="absolute bottom-0 inset-x-0 p-3.5 z-10">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-400 text-luxury-darker">
                          AVM Verified
                        </span>
                        <span className="text-[11px] font-serif font-bold text-white drop-shadow">
                          AVM Talks by Avnish
                        </span>
                      </div>
                      <p className="text-[11px] text-white/90 font-medium leading-snug drop-shadow line-clamp-2">
                        {isHindi
                          ? "60ft व 80ft चौड़ी सड़कें, बिजली के खंभे और सीमांकित प्लॉट्स का वास्तविक वीडियो।"
                          : "Real on-site aerial footage: 60ft/80ft sector avenues & physical demarcation."}
                      </p>
                      {/* Progress line */}
                      <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-all duration-100"
                          style={{ width: `${heroProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Physical Ground Reality Specs & Actions */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isHindi ? '100% ऑन-ग्राउंड लाइव इंस्पेक्शन' : '100% On-Ground Live Inspection'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                      {isHindi
                        ? 'कागजी वादे नहीं — मौके पर 60ft/80ft सड़कें और कटे हुए प्लॉट्स'
                        : 'Real On-Site Aerial Footage: Wide Boulevards & Demarcated Plots'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 leading-relaxed">
                      {isHindi
                        ? 'आसमान से देखें टाउनशिप का वास्तविक विकास — डामर की चौड़ी सड़कें, कर्बस्टोन्स, अंडरग्राउंड बिजली की व्यवस्था और हर प्लॉट की बाउंड्री।'
                        : 'Direct aerial reconnaissance showing actual physical development: completed asphalt boulevards, concrete curbstones, underground electricity, and plot boundary demarcation.'}
                    </p>
                  </div>

                  {/* 4 Feature Chips */}
                  <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'मास्टरप्लान मुख्य सड़कें' : 'Masterplan Boulevards'}
                      </span>
                      <span className="font-bold text-amber-300 text-xs sm:text-sm">
                        {isHindi ? '60ft व 80ft डामर' : '60 Ft & 80 Ft Asphalt'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'अंडरग्राउंड बिजली' : 'Underground Utilities'}
                      </span>
                      <span className="font-bold text-cyan-300 text-xs sm:text-sm">
                        {isHindi ? 'केबलिंग व LED लाइट्स' : 'Wiring & LED Lights'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'कानूनी टाइटल' : 'Legal Sanction'}
                      </span>
                      <span className="font-bold text-emerald-300 text-xs sm:text-sm">
                        {isHindi ? '100% धारा 90-A' : '100% Section 90-A'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-amber-400/30">
                      <span className="text-slate-400 font-sans text-[10px] block">
                        {isHindi ? 'प्लॉट बाउंड्री' : 'Plot Demarcation'}
                      </span>
                      <span className="font-bold text-amber-300 text-xs sm:text-sm">
                        {isHindi ? 'मौके पर कटी सीमा' : 'Ready Physical Cuts'}
                      </span>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      to="/book-visit"
                      className="flex-1 py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider gold-shimmer-btn text-white text-center shadow-lg hover:scale-[1.02] transition-transform"
                    >
                      {isHindi ? 'फ्री वीआईपी साइट विजिट बुक करें' : 'Book Free VIP Fortuner Visit'}
                    </Link>
                    <a
                      href="https://wa.me/919928365001?text=Hello%20Avnish%20ji,%20I%20watched%20the%204K%20Drone%20Reel%20and%20want%20details."
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#128C7E] text-white text-center shadow-md hover:scale-[1.02] transition-all"
                    >
                      {isHindi ? 'व्हाट्सएप चैट' : 'WhatsApp Enquiry'}
                    </a>
                    <button
                      onClick={() => setHeroMode('drone-plots')}
                      className="py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-center"
                    >
                      {isHindi ? 'वापस ओवरव्यू' : 'Back to Overview'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-[#030712]/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden gold-specular-border">
              {/* 4 Antiqued Solid Corner Brackets */}
              <div className="leather-corner-bracket-tl"></div>
              <div className="leather-corner-bracket-tr"></div>
              <div className="leather-corner-bracket-bl"></div>
              <div className="leather-corner-bracket-br"></div>

              {/* 4 Rivets for High-Tech Engineering Look */}
              <div className="brass-screw absolute top-4 left-4" title="Rivet"></div>
              <div className="brass-screw absolute top-4 right-4" title="Rivet"></div>
              <div className="brass-screw absolute bottom-4 left-4" title="Rivet"></div>
              <div className="brass-screw absolute bottom-4 right-4" title="Rivet"></div>

              {/* Brand Emblem — 100% Static & Crisp, Zero Border */}
              <div className="mb-5 flex justify-center">
                <img
                  src={logoImg}
                  alt="AVM TALKS BY AVNISH"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-2xl"
                />
              </div>

              {/* Subtitle Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.22em] border border-amber-400/30 bg-amber-400/10 text-amber-300 mb-5 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-cyan-400 beacon-pulse"></span>
                <span>{t('hero.badge', 'JDA Approved Plotted Townships • Real Estate Media')}</span>
              </div>

              {/* Majestic Hero Headline: Pure Crisp White + Shimmering Imperial Gold/Cyan Gradient with High-Contrast Shadow */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-serif font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)] max-w-5xl">
                Curated Estates & Intelligence in the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-cyan-300 italic font-normal">
                  {t('hero.titleHighlight', 'High-Stakes Land Due Diligence.')}
                </span>
              </h1>

              {/* Subtext: Slate-300 with High Contrast */}
              <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {t('hero.subtitle', "From wide 60ft/80ft master-planned avenues to forensic 30-year revenue title checks. Discover verified residential and commercial plots across Greater Jaipur's highest-velocity growth corridors with AVM TALKS BY AVNISH.")}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-8">
                <Link
                  to="/plots"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider gold-shimmer-btn text-white shadow-[0_0_30px_rgba(130,69,236,0.5)] group font-sans"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{t('hero.browsePlots', 'Explore Available Plots')}</span>
                </Link>

                <button
                  onClick={() => setHeroMode('video')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border border-amber-400/50 bg-amber-400/15 text-amber-300 hover:bg-amber-400/25 hover:border-amber-400 backdrop-blur-xl transition-all duration-300 font-sans shadow-md"
                >
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>{t('hero.switcherReel', '4K Drone Reel')}</span>
                </button>

                <Link
                  to="/media"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/15 bg-white/[0.04] text-white hover:border-cyan-400/50 hover:bg-white/[0.08] backdrop-blur-xl transition-all duration-300 font-sans hover:scale-105 shadow-md"
                >
                  <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  <span>{t('hero.watchVault', 'Watch 21+ Masterclasses')}</span>
                </Link>
              </div>

              {/* Live Trust Metrics Bar with Animated Numbers */}
              <div className="w-full pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                <div className="flex flex-col items-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-2xl sm:text-3xl font-serif font-extrabold text-gold-gradient">
                    <AnimatedCounter end={100} suffix="%" />
                  </span>
                  <span className="text-xs text-white font-medium mt-0.5">
                    {t('hero.metricPlotsLabel', 'JDA & RERA Screened')}
                  </span>
                  <span className="text-[11px] text-white/70 font-light">
                    {t('hero.metricPlotsSub', 'Zero illegal schemes')}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-2xl sm:text-3xl font-serif font-extrabold text-gold-gradient">
                    <AnimatedCounter end={30} suffix={isHindi ? ' वर्ष' : '-Year'} />
                  </span>
                  <span className="text-xs text-white font-medium mt-0.5">
                    {isHindi ? 'टाइटल सर्च ऑडिट' : 'Title Search Audits'}
                  </span>
                  <span className="text-[11px] text-white/70 font-light">
                    {isHindi ? 'अखंड रेवेन्यू रिकॉर्ड' : 'Unbroken revenue chain'}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-2xl sm:text-3xl font-serif font-extrabold text-gold-gradient">
                    <AnimatedCounter end={21} suffix={isHindi ? ' एपिसोड' : ' Episodes'} />
                  </span>
                  <span className="text-xs text-white font-medium mt-0.5">
                    {t('hero.metricVideosLabel', 'YouTube Masterclasses')}
                  </span>
                  <span className="text-[11px] text-white/70 font-light">
                    {t('hero.metricVideosSub', 'On-site ground reports')}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-2xl sm:text-3xl font-serif font-extrabold text-gold-gradient">
                    <AnimatedCounter end={52} suffix={isHindi ? '+ फील्ड एजेंट' : '+ Agents'} />
                  </span>
                  <span className="text-xs text-white font-medium mt-0.5">
                    {t('hero.metricCoordinatorsLabel', 'Territory Coordinators')}
                  </span>
                  <span className="text-[11px] text-white/70 font-light">
                    {t('hero.metricCoordinatorsSub', 'Jaipur on-ground support')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Animated Plotted Ticker Across Hero Bottom (Handcrafted Stitched Leather Belt) */}
        <div className="absolute bottom-0 inset-x-0 leather-belt-ticker py-3 overflow-hidden z-20">
          <div className="animate-ticker text-xs text-luxury-goldLight font-medium tracking-wider uppercase font-mono">
            {isHindi ? (
              <>
                <span className="inline-block px-4">✦ 60ft व 80ft मास्टरप्लान चौड़े रोड स्वीकृत</span>
                <span className="inline-block px-4">✦ 47-KM रिंग रोड 360-मीटर कमर्शियल जोन लाइव</span>
                <span className="inline-block px-4">✦ अजमेर रोड इंस्टीट्यूशनल कॉरिडोर प्रमाणित</span>
                <span className="inline-block px-4">✦ 100% गारंटीकृत धारा 90-A रेवेन्यू ऑर्डर्स</span>
                <span className="inline-block px-4">✦ राष्ट्रीयकृत बैंकों से 80% तक लोन सुविधा</span>
                <span className="inline-block px-4">✦ 52+ फील्ड कोऑर्डिनेटर्स साइट सीमांकन हेतु तत्पर</span>
                <span className="inline-block px-4">✦ 60ft व 80ft मास्टरप्लान चौड़े रोड स्वीकृत</span>
                <span className="inline-block px-4">✦ 47-KM रिंग रोड 360-मीटर कमर्शियल जोन लाइव</span>
                <span className="inline-block px-4">✦ अजमेर रोड इंस्टीट्यूशनल कॉरिडोर प्रमाणित</span>
                <span className="inline-block px-4">✦ 100% गारंटीकृत धारा 90-A रेवेन्यू ऑर्डर्स</span>
                <span className="inline-block px-4">✦ राष्ट्रीयकृत बैंकों से 80% तक लोन सुविधा</span>
                <span className="inline-block px-4">✦ 52+ फील्ड कोऑर्डिनेटर्स साइट सीमांकन हेतु तत्पर</span>
              </>
            ) : (
              <>
                <span className="inline-block px-4">✦ 60ft & 80ft Masterplan Boulevards Sanctioned</span>
                <span className="inline-block px-4">✦ 47-KM Ring Road 360-Meter Commercial Zone Live</span>
                <span className="inline-block px-4">✦ Ajmer Road Institutional Tech Corridor Verified</span>
                <span className="inline-block px-4">✦ 100% Guaranteed Section 90-A Revenue Orders</span>
                <span className="inline-block px-4">✦ Up to 80% Nationalized Bank Loan Sanctioned</span>
                <span className="inline-block px-4">✦ 52+ Local Field Coordinators Available for Site Demarcation</span>
                <span className="inline-block px-4">✦ 60ft & 80ft Masterplan Boulevards Sanctioned</span>
                <span className="inline-block px-4">✦ 47-KM Ring Road 360-Meter Commercial Zone Live</span>
                <span className="inline-block px-4">✦ Ajmer Road Institutional Tech Corridor Verified</span>
                <span className="inline-block px-4">✦ 100% Guaranteed Section 90-A Revenue Orders</span>
                <span className="inline-block px-4">✦ Up to 80% Nationalized Bank Loan Sanctioned</span>
                <span className="inline-block px-4">✦ 52+ Local Field Coordinators Available for Site Demarcation</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ----------------- 4K ON-GROUND DRONE REEL SHOWCASE (9:16 REEL PLAYER) ----------------- */}
      <DroneReelShowcase />

      {/* ----------------- 2. FEATURED PLOTTED TOWNSHIPS SHOWCASE ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border dark:border-white/10 border-cyan-500/30 dark:bg-cyan-500/10 bg-cyan-100/70 dark:text-cyan-300 text-cyan-800 font-bold mb-3">
              <Building2 className="w-3.5 h-3.5 dark:text-cyan-400 text-cyan-600" />
              {t('plots.badge', 'Verified Plotted Projects')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-theme-primary">
              {t('plots.title', 'Premier Plotted Schemes & Estates')}
            </h2>
            <p className="text-xs sm:text-sm text-theme-muted mt-2">
              {t('plots.subtitle', 'Every plotted enclave is physically inspected for bitumen roads, underground wiring, and Section 90-A revenue orders.')}
            </p>
          </div>
          <Link
            to="/plots"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-luxury-gold hover:underline"
          >
            <span>{t('plots.viewAll', 'View All Plotted Townships')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {PLOTS_DATA.slice(0, 2).map((plot) => (
            <PlotCard key={plot.id} plot={plot} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/plots"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider border border-theme-gold bg-theme-surface text-theme-primary hover:border-luxury-gold transition-all shadow-md"
          >
            <span>{t('plots.browseMore', 'Browse Farm Villas & Commercial Frontage Plots')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ----------------- ARCHITECTURAL MASTERPLAN BLUEPRINT INSPECTION ----------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge={t('blueprint.badge', '✦ JDA Sanctioned Layout Blueprint ✦')}
          title={t('blueprint.title', 'Masterplan Blueprint & Sector Demarcation')}
          subtitle={t('blueprint.subtitle', 'Official technical CAD drafting showcasing 80ft & 60ft masterplan sector boulevards, numbered plot divisions, central park, and dedicated clubhouse zone.')}
        />

        <div className="leather-badge-container rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Solid Brass Rivets */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Blueprint Display Card with Interactive Zoom Action */}
            <div className="lg:col-span-8 group relative rounded-2xl overflow-hidden border-2 border-luxury-gold/60 shadow-2xl bg-[#0b1120]">
              <img
                src={masterBlueprintImg}
                alt="Township Masterplan Technical CAD Blueprint"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => setIsBlueprintModalOpen(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-luxury-emerald/90 text-luxury-goldLight border border-luxury-gold/50 backdrop-blur-md">
                  {t('blueprint.scale', 'Scale 1:1500 CAD Drafting')}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-black/75 text-luxury-goldLight border border-luxury-gold/50 backdrop-blur-md">
                  {t('blueprint.approved', 'Section 90-A Approved')}
                </span>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="absolute bottom-4 inset-x-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-black/80 border border-luxury-gold/40 backdrop-blur-md">
                <div className="text-left">
                  <p className="text-xs font-serif font-bold text-luxury-goldLight">
                    {t('blueprint.highResTitle', 'High-Resolution Sector Blueprint')}
                  </p>
                  <p className="text-[11px] text-white/70 font-light">
                    {t('blueprint.highResDesc', 'Click anywhere to inspect in 8K Fullscreen Mode with technical demarcation legend')}
                  </p>
                </div>
                <button
                  onClick={() => setIsBlueprintModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all whitespace-nowrap"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{t('blueprint.inspectBtn', 'Inspect 8K Blueprint')}</span>
                </button>
              </div>
            </div>

            {/* Right Blueprint Technical Specs & Demarcation */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-widest text-luxury-gold block mb-1">
                  {t('blueprint.statutoryDetails', 'Statutory Blueprint Details')}
                </span>
                <h3 className="text-2xl font-serif font-bold text-theme-primary leading-snug">
                  {t('blueprint.engineeredTitle', 'Engineered for Generational Living')}
                </h3>
                <p className="text-xs sm:text-sm text-theme-secondary font-light mt-2 leading-relaxed">
                  {t('blueprint.engineeredDesc', 'Every plot is verified with digital total station survey (DGPS). Clean right-angle cuts, underground electrical lines, and arterial sector connectivity.')}
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-theme-card border border-theme-gold/30 flex items-center justify-between">
                  <span className="text-theme-muted font-sans">{t('blueprint.specBoulevards', 'Sector Arterial Boulevards:')}</span>
                  <span className="font-bold text-luxury-goldLight">{t('blueprint.specBoulevardsVal', '80 Ft & 60 Ft Wide')}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-theme-card border border-theme-gold/30 flex items-center justify-between">
                  <span className="text-theme-muted font-sans">{t('blueprint.specInternal', 'Internal Residential Roads:')}</span>
                  <span className="font-bold text-luxury-goldLight">{t('blueprint.specInternalVal', '30 Ft & 40 Ft Bitumen')}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-theme-card border border-theme-gold/30 flex items-center justify-between">
                  <span className="text-theme-muted font-sans">{t('blueprint.specGreen', 'Open Greenery & Parks:')}</span>
                  <span className="font-bold text-luxury-goldLight">{t('blueprint.specGreenVal', '10%+ Dedicated Area')}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-theme-card border border-theme-gold/30 flex items-center justify-between">
                  <span className="text-theme-muted font-sans">{t('blueprint.specClub', 'Clubhouse & Sports Zone:')}</span>
                  <span className="font-bold text-luxury-goldLight">{t('blueprint.specClubVal', 'Fully Demarcated')}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => setIsBlueprintModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>{t('blueprint.openFullscreen', 'Open Fullscreen Blueprint')}</span>
                </button>
                <a
                  href={masterBlueprintImg}
                  download="AVM_Township_Masterplan_Blueprint.jpg"
                  className="w-full py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-theme-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:border-luxury-gold transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>{t('blueprint.downloadFile', 'Download Blueprint File')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- INTERACTIVE CADASTRAL SECTOR DEMARCATION MAP ----------------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <InteractiveCadastralMap />
      </section>

      {/* ----------------- INTERACTIVE VASTU SUN-PATH & SOLAR SHADOW SIMULATOR ----------------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <VastuSunPathSimulator />
      </section>

      {/* ----------------- 3. INTERACTIVE PLOT CALCULATORS ----------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge={t('calc.plotBadge', 'Rajasthan Sizing Utility')}
          title={t('calc.plotTitle', 'Interactive Plot Size & Valuation Calculator')}
          subtitle={t('calc.plotSubtitle', 'Easily convert Gaj into Square Feet and compute total acquisition outlay including stamp duty and monthly bank loan EMI.')}
        />
        <PlotCalculator />
      </section>

      {/* ----------------- 3. BESPOKE HANDCRAFTED LEATHER UNIT CALCULATOR ----------------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge={t('calc.leatherBadge', '✦ Bespoke Leather Land Desk Pad ✦')}
          title={t('calc.leatherTitle', 'Artisan Handcrafted Land & Unit Converter')}
          subtitle={t('calc.leatherSubtitle', "Inspired by Rajasthan's heritage revenue ledgers, crafted in saddle leather with precision formulas for Gaj, Bigha, Biswa & Sq. Metres.")}
        />
        <LeatherUnitCalculator />
      </section>

      {/* ----------------- AI LAND VALUATION & COMPOUND APPRECIATION FORECASTER ----------------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AIAirAppreciationForecaster />
      </section>

      {/* ----------------- VOICE OF AVNISH EXECUTIVE AUDIO BRIEFING ----------------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ExecutiveAudioBriefing />
      </section>

      {/* ----------------- 4. ALL 21 YOUTUBE MASTERCLASSES ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border dark:border-white/10 border-cyan-500/30 dark:bg-cyan-500/10 bg-cyan-100/70 dark:text-cyan-300 text-cyan-800 font-bold mb-3">
            <Play className="w-3 h-3 fill-cyan-500 text-cyan-500" />
            {t('media.badge', 'AVM Talks Video Vault')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-theme-primary">
            {t('media.title', 'Watch All 21 Video Masterclasses by Avnish')}
          </h2>
          <p className="text-xs sm:text-sm text-theme-muted mt-2 max-w-2xl mx-auto">
            {t('media.subtitle', 'Ground reality audits, RERA portal tutorials, ring road masterplan inspections, and legal pitfalls to avoid before buying land.')}
          </p>
        </div>

        {/* Video Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {videoCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveVideoCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeVideoCategory === cat
                  ? 'bg-gold-gradient text-luxury-darker font-bold shadow-luxury-gold'
                  : 'bg-theme-surface border border-theme-gold/30 text-theme-secondary hover:border-luxury-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid (Shows 6 on Home, links to Media for all) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredVideos.slice(0, 6).map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={(v) => setSelectedVideo(v)}
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/media"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
          >
            <span>{t('media.viewAllEpisodes', 'View All 21 YouTube Episodes')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ----------------- 5. JAIPUR GROWTH CORRIDORS ----------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge={t('corridors.badge', 'Corridor Intelligence')}
          title={t('corridors.title', 'Where Land Values Are Compounding')}
          subtitle={t('corridors.subtitle', "Strategic dissection of the road networks driving real-estate appreciation across Rajasthan's capital.")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORRIDORS_DATA.map((corridor) => (
            <div
              key={corridor.id}
              className="rounded-3xl p-7 leather-folio-card border border-luxury-gold/40 shadow-theme-card transition-all flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider dark:bg-cyan-950/40 bg-cyan-100/80 dark:text-cyan-300 text-cyan-800 dark:border-white/10 border-cyan-300/60">
                    {corridor.status}
                  </span>
                  <span className="text-xs font-mono text-luxury-gold font-bold">
                    {t('corridors.score', 'Score')}: {corridor.connectivityScore}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-theme-primary group-hover:text-luxury-gold transition-colors mb-3">
                  {corridor.name}
                </h3>

                <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed mb-6">
                  {corridor.description}
                </p>

                <div className="space-y-2 mb-6">
                  {corridor.keyHighlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-theme-secondary font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 flex-shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-theme-gold/20">
                <Link
                  to="/insights"
                  className="inline-flex items-center gap-1.5 text-xs text-luxury-gold hover:text-luxury-goldLight uppercase tracking-wider font-bold"
                >
                  <span>{t('corridors.explorePaper', 'Explore Corridor Whitepaper')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- HIGHWAY ROUTE & GOOGLE MAPS NAVIGATION ----------------- */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <RouteMapGuide />
      </section>

      {/* ----------------- VIRTUAL AERIAL DRONE RADAR HUD ----------------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <DroneProximityHUD />
      </section>

      {/* ----------------- 6. 52+ AUTHORIZED COORDINATORS NETWORK ----------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge={t('coordinators.badge', 'Verified Field Coordinators')}
          title={t('coordinators.title', 'Connect with 52+ Territory Coordinators Across Jaipur')}
          subtitle={t('coordinators.subtitle', 'Directly reach our local ground representatives for on-site plot inspections, registry assistance, and boundary verification.')}
        />
        <AgentDirectory />
      </section>

      {/* ----------------- 30-YEAR FORENSIC TITLE CHAIN & DEED INSPECTOR ----------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ForensicTitleChainTimeline />
      </section>

      {/* ----------------- 7. INTERACTIVE DUE DILIGENCE AUDIT ----------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="flex-1">
            <SectionHeading
              badge={t('dueDiligence.badge', 'Buyer Protection')}
              title={t('dueDiligence.title', 'Self-Audit Your Target Land Deal')}
              subtitle={t('dueDiligence.subtitle', 'Score your property across 7 statutory checks before transferring advance booking funds.')}
              className="mb-0"
            />
          </div>
          <button
            onClick={() => setIsDossierOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold hover:scale-105 transition-all border border-luxury-gold/40"
          >
            <FileText className="w-4 h-4" />
            <span>{t('dossier.generateCertificate', 'Generate Certified Due Diligence Dossier')}</span>
          </button>
        </div>
        <DueDiligenceCalculator />
      </section>

      {/* ----------------- 8. VIP NEWSLETTER DISPATCH ----------------- */}
      <Newsletter />

      {/* Cinema Lightbox Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo?.youtubeId}
        title={selectedVideo?.title}
      />

      {/* High-Definition Masterplan Blueprint Fullscreen Modal */}
      {isBlueprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-6xl rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl overflow-hidden leather-stitch-outline my-auto">
            {/* 4 Corner Brass Screws */}
            <div className="brass-screw absolute top-3.5 left-3.5" />
            <div className="brass-screw absolute top-3.5 right-3.5" />
            <div className="brass-screw absolute bottom-3.5 left-3.5" />
            <div className="brass-screw absolute bottom-3.5 right-3.5" />

            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-luxury-gold/30 bg-black/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-luxury-emerald/30 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-xl font-serif font-bold text-white leading-tight">
                    {t('blueprint.modalTitle', 'Sanctioned Masterplan: Luxury Plotted Residential Township')}
                  </h3>
                  <p className="text-[11px] text-luxury-goldLight font-mono">
                    {t('blueprint.modalSubtitle', 'Technical Scale: 1:1500 • Section 90-A Surrendered & JDA Compliant')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={masterBlueprintImg}
                  download="AVM_Township_Masterplan_Blueprint.jpg"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-theme-card border border-theme-gold/40 text-luxury-goldLight hover:border-luxury-gold"
                >
                  <Download className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>{t('blueprint.downloadFile', 'Download')}</span>
                </a>
                <button
                  onClick={() => setIsBlueprintModalOpen(false)}
                  className="p-2 rounded-full bg-black/60 text-luxury-gold hover:text-white hover:bg-black/80 transition-colors border border-luxury-gold/30"
                  aria-label={t('blueprint.closeView', 'Close Blueprint Modal')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Blueprint View Area */}
            <div className="relative w-full max-h-[75vh] overflow-auto bg-[#0b1120] flex items-center justify-center p-2 sm:p-4">
              <img
                src={masterBlueprintImg}
                alt="Sanctioned Masterplan Blueprint Full View"
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-2xl border border-luxury-gold/30"
              />
            </div>

            {/* Modal Footer Legend */}
            <div className="p-4 sm:p-5 border-t border-luxury-gold/20 bg-black/75 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-3 text-luxury-ivory font-mono text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span>{t('blueprint.legend80', "80' Main Sector Avenue")}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <span>{t('blueprint.legend60', "60' Wide Secondary Road")}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>{t('blueprint.legendPark', 'Central Landscaped Park')}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  <span>{t('blueprint.legendClub', 'Clubhouse & Swimming Pool')}</span>
                </span>
              </div>
              <button
                onClick={() => setIsBlueprintModalOpen(false)}
                className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all ml-auto"
              >
                {t('blueprint.closeView', 'Close View')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certified Forensic Due Diligence Dossier Modal */}
      
      {/* 4K Drone Aerial Perspective Fullscreen Lightbox Modal */}
      {isDroneImgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-6xl rounded-3xl leather-badge-container border-2 border-amber-400 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-auto">
            <div className="flex items-center justify-between p-4 bg-[#0b1120] border-b border-amber-400/40">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-serif font-bold text-amber-200">
                  {isHindi ? '4K एरियल ड्रोन इंस्पेक्शन व्यू • अल्ट्रा हाई-डेफिनिशन' : '4K Aerial Drone Reconnaissance • Ultra High-Definition'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={CLOUDINARY_DRONE_IMAGE}
                  target="_blank"
                  rel="noreferrer"
                  download="AVM_Township_4K_Drone_View.png"
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 px-3"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setIsDroneImgModalOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative max-h-[80vh] overflow-auto flex items-center justify-center bg-black p-2 sm:p-4">
              <img
                src={CLOUDINARY_DRONE_IMAGE}
                alt="4K Aerial Drone Perspective Full View"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />
            </div>
            <div className="p-3 bg-[#0b1120] border-t border-white/10 flex justify-end">
              <button
                onClick={() => setIsDroneImgModalOpen(false)}
                className="px-5 py-1.5 rounded-full text-xs font-bold uppercase bg-gold-gradient text-luxury-darker shadow"
              >
                {isHindi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      <DueDiligenceDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
    </div>
  );
};
