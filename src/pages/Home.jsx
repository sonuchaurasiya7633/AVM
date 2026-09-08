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

import { PLOTS_DATA } from '../data/plots';
import { YOUTUBE_VIDEOS } from '../data/videos';
import { CORRIDORS_DATA, MACRO_METRICS } from '../data/insights';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const { t, isHindi } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeVideoCategory, setActiveVideoCategory] = useState('All');
  const [heroMode, setHeroMode] = useState('drone-plots'); // 'drone-plots' | 'video' | 'blueprint'
  const [isMuted, setIsMuted] = useState(true);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const videoRef = React.useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
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
        {/* Dynamic Media Backdrop: Drone Plots Aerial View, 4K Video Loop, or Masterplan Blueprint */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroMode === 'drone-plots' ? (
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={dronePlotsHeroImg}
                alt="AVM Plotted Township Aerial Drone Perspective"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover scale-105 filter brightness-[0.62] contrast-[1.12] transition-all duration-700 ease-out"
              />
            </div>
          ) : heroMode === 'video' ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover scale-105 filter brightness-[0.55] contrast-[1.15] transition-all duration-700 ease-out"
                poster={dronePlotsHeroImg}
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-residential-complex-41618-large.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          ) : (
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-[#031d28]">
              <img
                src={masterBlueprintImg}
                alt="Sanctioned Masterplan Architectural Blueprint"
                className="w-full h-full object-cover scale-100 filter brightness-[0.7] contrast-[1.25] transition-all duration-700 ease-out"
              />
            </div>
          )}

          {/* Multi-layered Velvet Emerald Scrim & Vignette for Total Eye-Friendly Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#021710] via-[#021710]/75 to-[#021710]/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(2,23,16,0.65)_0%,_rgba(2,23,16,0.92)_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021710]/80 via-transparent to-[#021710]" />

          {/* Ambient Emerald & Gold Radial Glow Highlights */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-12 -left-20 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Subtle Architectural Luxury Grid Lines */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* Media Switcher Capsule: Switch between Drone Plots View, 4K Drone Reel, and Masterplan Blueprint */}
        <div className="relative z-20 mb-6 flex items-center justify-center">
          <div className="inline-flex items-center p-1 rounded-full bg-black/75 border border-luxury-gold/40 backdrop-blur-md shadow-2xl text-xs">
            <button
              onClick={() => setHeroMode('drone-plots')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 ${
                heroMode === 'drone-plots'
                  ? 'bg-gold-gradient text-luxury-darker shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t('hero.switcherDrone', 'Drone Plots View')}</span>
            </button>
            <button
              onClick={() => setHeroMode('video')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 ${
                heroMode === 'video'
                  ? 'bg-gold-gradient text-luxury-darker shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{t('hero.switcherReel', '4K Drone Reel')}</span>
            </button>
            <button
              onClick={() => setHeroMode('blueprint')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 ${
                heroMode === 'blueprint'
                  ? 'bg-gold-gradient text-luxury-darker shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
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
            {heroMode === 'video' && (
              <button
                onClick={toggleMute}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
                className="p-1.5 ml-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-luxury-gold" />}
              </button>
            )}
          </div>
        </div>

        {/* Main Content: Luxury Glass & Stitched Leather Chassis for 100% Crisp Typography */}
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          <div className="w-full bg-black/70 dark:bg-[#021710]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-luxury-gold/50 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden leather-stitch-outline gold-specular-border">
            {/* 4 Antiqued Solid Brass Corner Brackets */}
            <div className="leather-corner-bracket-tl"></div>
            <div className="leather-corner-bracket-tr"></div>
            <div className="leather-corner-bracket-bl"></div>
            <div className="leather-corner-bracket-br"></div>

            {/* 4 Antiqued Solid Brass Rivets for Bespoke Leather Look */}
            <div className="brass-screw absolute top-4 left-4" title="Artisan Solid Brass Rivet"></div>
            <div className="brass-screw absolute top-4 right-4" title="Artisan Solid Brass Rivet"></div>
            <div className="brass-screw absolute bottom-4 left-4" title="Artisan Solid Brass Rivet"></div>
            <div className="brass-screw absolute bottom-4 right-4" title="Artisan Solid Brass Rivet"></div>

            {/* Brand Emblem — 100% Static & Crisp (No Animations/Pulsing) with Leather Bezel */}
            <div className="mb-5 flex justify-center">
              <div className="p-1 rounded-full bg-gradient-to-tr from-luxury-gold via-amber-200 to-luxury-goldDark shadow-2xl border border-luxury-gold/50">
                <img
                  src={logoImg}
                  alt="AVM TALKS BY AVNISH"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#021710]"
                />
              </div>
            </div>

            {/* Subtitle Stitched Leather Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.22em] border border-dashed border-luxury-gold bg-gradient-to-r from-[#3D2214] via-[#03281E] to-[#3D2214] text-luxury-goldLight mb-5 shadow-xl leather-deboss-gold">
              <span className="w-2 h-2 rounded-full bg-luxury-gold beacon-pulse"></span>
              <span>{t('hero.badge', 'JDA Approved Plotted Townships • Real Estate Media')}</span>
            </div>

            {/* Majestic Hero Headline: Pure Crisp White + Shimmering Gold Gradient with High-Contrast Shadow */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-[1.15] mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {t('hero.titleMain', 'Prime Plotted Estates &')} <br className="hidden sm:inline" />
              <span className="text-gold-gradient italic font-normal">
                {t('hero.titleHighlight', 'High-Stakes Land Due Diligence.')}
              </span>
            </h1>

            {/* Subtext: Warm Eye-Friendly Ivory Linen with High Contrast */}
            <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-[#F1EAD8] font-light leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {t('hero.subtitle', "From wide 60ft/80ft master-planned avenues to forensic 30-year revenue title checks. Discover verified residential and commercial plots across Greater Jaipur's highest-velocity growth corridors with AVM TALKS BY AVNISH.")}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
              <Link
                to="/plots"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider gold-shimmer-btn text-luxury-darker shadow-luxury-gold group font-sans"
              >
                <Building2 className="w-4 h-4" />
                <span>{t('hero.browsePlots', 'Explore Available Plots')}</span>
              </Link>

              <Link
                to="/media"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border border-luxury-gold/60 bg-black/70 text-white hover:border-luxury-gold hover:bg-black/90 transition-all duration-300 font-sans hover:scale-105 shadow-md"
              >
                <Play className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                <span>{t('hero.watchVault', 'Watch 21+ Masterclasses')}</span>
              </Link>
            </div>

            {/* Live Trust Metrics Bar with Animated Numbers */}
            <div className="w-full pt-6 border-t border-luxury-gold/25 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
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

      {/* ----------------- 2. FEATURED PLOTTED TOWNSHIPS SHOWCASE ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-theme-gold bg-luxury-emerald/20 text-luxury-gold font-bold mb-3">
              <Building2 className="w-3.5 h-3.5" />
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
            <div className="lg:col-span-8 group relative rounded-2xl overflow-hidden border-2 border-luxury-gold/60 shadow-2xl bg-[#021720]">
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
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-black/75 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
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
                  <span className="font-bold text-emerald-400">{t('blueprint.specGreenVal', '10%+ Dedicated Area')}</span>
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
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-theme-gold bg-luxury-emerald/20 text-luxury-gold font-bold mb-3">
            <Play className="w-3 h-3 fill-luxury-gold text-luxury-gold" />
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
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-luxury-emerald text-luxury-goldLight border border-luxury-gold/30">
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
            <div className="relative w-full max-h-[75vh] overflow-auto bg-[#021720] flex items-center justify-center p-2 sm:p-4">
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
      <DueDiligenceDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
    </div>
  );
};
