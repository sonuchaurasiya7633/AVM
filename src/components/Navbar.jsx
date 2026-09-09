import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, ChevronRight, 
  Building2, BookOpen, Film, Compass, User, Mail, Home, PhoneCall,
  Calculator, FileCheck2, HelpCircle, Sparkles, Phone, ShieldCheck,
  Search, Scale
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { CommandSearchModal } from './CommandSearchModal';
import { PlotCompareModal } from './PlotCompareModal';
import { useLanguage } from '../context/LanguageContext';
import { useCompare } from '../context/CompareContext';
import logoImg from '../assets/logo/avm-logo.png';
import { motion, AnimatePresence } from 'framer-motion';

// Primary high-frequency destination links
const PRIMARY_LINKS = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Plots & Estates', path: '/plots', icon: Building2, highlight: true },
  { name: '90-A Registry', path: '/registry-process', icon: FileCheck2 },
  { name: 'Wealth Calculator', path: '/calculator', icon: Calculator },
  { name: 'Jaipur Corridors', path: '/insights', icon: Compass },
];

// Deep advisory, media & statutory links in luxury dropdown
const ADVISORY_LINKS = [
  { 
    name: 'Buyer Guide & Protocol', 
    path: '/buyer-guide', 
    icon: ShieldCheck, 
    desc: '5-Phase statutory audit before paying token' 
  },
  { 
    name: 'Statutory Land FAQs', 
    path: '/faq', 
    icon: HelpCircle, 
    desc: '25+ critical questions on JDA, RERA & loans' 
  },
  { 
    name: '21 Video Masterclasses', 
    path: '/media', 
    icon: Film, 
    desc: 'Ground reality audits & RERA tutorials' 
  },
  { 
    name: 'Intelligence Journal', 
    path: '/blog', 
    icon: BookOpen, 
    desc: 'Whitepapers on Jaipur growth corridors' 
  },
  { 
    name: 'About Avnish', 
    path: '/about', 
    icon: User, 
    desc: 'Editorial story & due diligence mission' 
  },
  { 
    name: '52+ Field Coordinators', 
    path: '/contact', 
    icon: Mail, 
    desc: 'Authorized territory network across Jaipur' 
  },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advisoryDropdownOpen, setAdvisoryDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { comparedPlots, setIsCompareModalOpen } = useCompare();

  // Global Ctrl + K / Cmd + K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAdvisoryDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAdvisoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for external trigger to open/toggle mobile menu (e.g. from MobileBottomNav)
  useEffect(() => {
    const handleOpen = () => setMobileMenuOpen(true);
    const handleToggle = () => setMobileMenuOpen((prev) => !prev);
    window.addEventListener('open-mobile-menu', handleOpen);
    window.addEventListener('toggle-mobile-menu', handleToggle);
    return () => {
      window.removeEventListener('open-mobile-menu', handleOpen);
      window.removeEventListener('toggle-mobile-menu', handleToggle);
    };
  }, []);

  const { t, isHindi } = useLanguage();

  const primaryLinks = [
    { name: t('nav.home', 'Home'), path: '/', icon: Home },
    { name: t('nav.plots', 'Plots & Estates'), path: '/plots', icon: Building2, highlight: true },
    { name: t('nav.registry', '90-A Registry'), path: '/registry-process', icon: FileCheck2 },
    { name: t('nav.calculator', 'Wealth Calculator'), path: '/calculator', icon: Calculator },
    { name: t('nav.corridors', 'Jaipur Corridors'), path: '/insights', icon: Compass },
  ];

  const advisoryLinks = [
    { 
      name: t('nav.buyerGuide', 'Buyer Guide & Protocol'), 
      path: '/buyer-guide', 
      icon: ShieldCheck, 
      desc: t('nav.buyerGuideDesc', '5-Phase statutory audit before paying token') 
    },
    { 
      name: t('nav.faqs', 'Statutory Land FAQs'), 
      path: '/faq', 
      icon: HelpCircle, 
      desc: t('nav.faqsDesc', '25+ critical questions on JDA, RERA & loans') 
    },
    { 
      name: t('nav.videos', '21 Video Masterclasses'), 
      path: '/media', 
      icon: Film, 
      desc: t('nav.videosDesc', 'Ground reality audits & RERA tutorials') 
    },
    { 
      name: t('nav.journal', 'Intelligence Journal'), 
      path: '/blog', 
      icon: BookOpen, 
      desc: t('nav.journalDesc', 'Whitepapers on Jaipur growth corridors') 
    },
    { 
      name: t('nav.about', 'About Avnish'), 
      path: '/about', 
      icon: User, 
      desc: t('nav.aboutDesc', 'Editorial story & due diligence mission') 
    },
    { 
      name: t('nav.coordinators', '52+ Field Coordinators'), 
      path: '/contact', 
      icon: Mail, 
      desc: t('nav.coordinatorsDesc', 'Authorized territory network across Jaipur') 
    },
  ];

  const isAdvisoryActive = advisoryLinks.some((item) => item.path === location.pathname);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-2 sm:py-2.5 bg-white/95 dark:bg-[#030712]/95 backdrop-blur-2xl border-b border-slate-300/80 dark:border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.7)]'
            : 'py-2.5 sm:py-3.5 bg-white/90 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200/90 dark:border-white/10 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
        }`}
      >
        {/* Precision Architectural Glow Line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/70 via-amber-400/50 to-transparent" />

        <div className="max-w-[1440px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Emblem with Outlined Medallion Ring */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 min-w-0">
            <div className="relative p-0.5 rounded-full border dark:border-cyan-400/40 border-amber-500/40 group-hover:border-amber-500 dark:group-hover:border-cyan-400 transition-colors shadow-sm">
              <img
                src={logoImg}
                alt="AVM TALKS BY AVNISH Logo"
                className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 min-[400px]:w-9 min-[400px]:h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif tracking-tight min-[380px]:tracking-wide sm:tracking-wider text-xs min-[360px]:text-sm sm:text-base lg:text-lg font-bold dark:text-white text-slate-900 group-hover:text-amber-500 transition-colors leading-none truncate">
                AVM TALKS
              </span>
              <span className="text-[6.5px] min-[360px]:text-[7.5px] sm:text-[9.5px] uppercase tracking-[0.14em] min-[360px]:tracking-[0.18em] sm:tracking-[0.25em] dark:text-cyan-400 text-amber-600 font-extrabold mt-0.5 sm:mt-1 truncate">
                BY AVNISH
              </span>
            </div>
          </Link>

          {/* Desktop Luxury Navigation Architecture with Structural Pill & Crisp Outlines */}
          <nav className="hidden lg:flex items-center gap-1 dark:bg-[#070d18]/90 bg-slate-50/90 backdrop-blur-2xl p-1.5 rounded-full border dark:border-white/15 border-slate-300/80 shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
            {/* Primary Destination Links */}
            {primaryLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-full flex items-center gap-1.5 border ${
                    isActive
                      ? 'dark:bg-gradient-to-r dark:from-cyan-950/90 dark:to-indigo-950/90 bg-slate-900 text-white dark:text-cyan-200 border-slate-800 dark:border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold'
                      : link.highlight
                      ? 'border-transparent dark:text-cyan-300 text-amber-600 font-bold hover:border-amber-400/40 dark:hover:border-cyan-400/40 hover:bg-amber-500/10 dark:hover:bg-cyan-950/40'
                      : 'border-transparent dark:text-slate-300 text-slate-700 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-200/60 dark:hover:bg-white/5'
                  }`}
                >
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]"></span>
                  )}
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Advisory & Knowledgebase Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setAdvisoryDropdownOpen(!advisoryDropdownOpen)}
                className={`px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-full flex items-center gap-1.5 border ${
                  isAdvisoryActive || advisoryDropdownOpen
                    ? 'dark:bg-cyan-950/60 bg-amber-50 dark:text-slate-200 text-amber-800 border-amber-400/50 dark:border-cyan-400/50 shadow-sm font-bold'
                    : 'border-transparent dark:text-slate-300 text-slate-700 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-200/60 dark:hover:bg-white/5'
                }`}
                aria-expanded={advisoryDropdownOpen}
              >
                <span>{t('nav.advisory', 'Advisory & Media')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-amber-500 transition-transform duration-200 ${
                    advisoryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Luxury Dropdown Menu with Precision Outlines */}
              <AnimatePresence>
                {advisoryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-3 w-80 rounded-2xl dark:bg-[#0b1120]/95 bg-white/95 backdrop-blur-2xl border dark:border-white/15 border-slate-300 shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-2 z-50 ring-1 ring-black/5"
                  >
                    <div className="px-3 py-2 border-b dark:border-white/10 border-slate-200 mb-1 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500">
                        {t('nav.statutorySuite', 'Statutory Advisory Suite')}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                    </div>

                    <div className="space-y-1">
                      {advisoryLinks.map((item) => {
                        const Icon = item.icon;
                        const isSubActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all ${
                              isSubActive
                                ? 'dark:bg-cyan-950/60 bg-amber-50/90 dark:text-[#FFF0C8] text-amber-800 border-amber-400/40 dark:border-cyan-400/40 font-bold shadow-sm'
                                : 'border-transparent hover:border-slate-200 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 dark:text-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg border dark:border-white/10 border-amber-300/40 dark:bg-cyan-950/40 bg-amber-100/60 text-amber-600 flex-shrink-0 mt-0.5 shadow-sm">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-tight">
                                {item.name}
                              </p>
                              <p className="text-[10px] dark:text-slate-400 text-slate-500 font-light mt-0.5 leading-snug">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action Suite: Search, Compare, Language Toggle & Theme Toggle with Outlines */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Instant Search Command Palette Trigger with Crisp Border */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border dark:border-white/15 border-slate-300/90 dark:bg-[#0b1120]/80 bg-white/80 dark:text-slate-200 text-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all group"
              title={isHindi ? 'त्वरित खोज (Ctrl+K)' : 'Instant Search (Ctrl+K)'}
            >
              <Search className="w-3.5 h-3.5 text-cyan-500 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium">{isHindi ? 'खोजें...' : 'Search...'}</span>
              <kbd className="px-1.5 py-0.5 rounded text-[9px] font-mono border dark:border-white/10 border-slate-200 dark:bg-white/10 bg-slate-100 text-cyan-600 dark:text-cyan-400 font-bold">
                ⌘K
              </kbd>
            </button>

            {/* Compare Schemes Badge Button (Visible when plots selected) */}
            {comparedPlots.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="relative p-2 rounded-full border border-luxury-gold bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
                title={isHindi ? `तुलना करें (${comparedPlots.length})` : `Compare (${comparedPlots.length})`}
              >
                <Scale className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow">
                  {comparedPlots.length}
                </span>
              </button>
            )}

            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Header: ONLY Dotted-Outlined Menu Button (Zero Clutter, 100% Focused) */}
          <div className="flex items-center lg:hidden flex-shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border-2 border-dotted border-amber-500 dark:border-amber-400 bg-gold-gradient text-luxury-darker font-extrabold text-xs uppercase tracking-wider shadow-[0_2px_14px_rgba(212,175,55,0.45)] hover:border-amber-300 hover:scale-105 active:scale-95 transition-all flex-shrink-0 cursor-pointer"
              aria-label="Open Navigation Menu"
              title={isHindi ? 'मेन्यू खोलें' : 'Open Menu'}
            >
              <Menu className="w-5 h-5 stroke-[2.5] text-luxury-darker" />
              <span className="text-[11px] sm:text-xs font-black text-luxury-darker tracking-wide">
                {isHindi ? 'मेन्यू' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Ultra-Luxury Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm dark:bg-[#0b1120] bg-white dark:border-l-white/15 border-l border-slate-200 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto dark:text-white text-slate-900"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b dark:border-white/10 border-slate-200 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-0.5 rounded-full border border-amber-400/50 dark:border-cyan-400/50 shadow-sm">
                      <img
                        src={logoImg}
                        alt="AVM Talks Crest"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-sm dark:text-white text-slate-900 tracking-wider block">
                        AVM TALKS
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-amber-500 font-extrabold block">
                        BY AVNISH
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl border dark:border-white/15 border-slate-300 dark:text-cyan-300 text-slate-700 dark:hover:bg-white/10 hover:bg-slate-100 transition-colors shadow-sm"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Drawer Quick Tools: Instant Search, Language & Theme Toggles */}
                <div className="flex items-center gap-2 pb-4 mb-4 border-b dark:border-white/10 border-slate-200">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchModalOpen(true);
                    }}
                    className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full border dark:border-white/15 border-slate-300/80 dark:bg-[#070d18] bg-slate-50 text-xs font-semibold dark:text-slate-200 text-slate-700 hover:border-cyan-400 shadow-sm"
                  >
                    <Search className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px]">{isHindi ? 'खोजें...' : 'Search...'}</span>
                  </button>
                  <LanguageToggle />
                  <ThemeToggle />
                </div>

                {/* Primary Destination Links */}
                <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-500 dark:text-cyan-400 font-bold block mb-2 px-1">
                  {t('nav.menu', 'Core Plotted Portals')}
                </span>
                <div className="space-y-1 mb-5">
                  {primaryLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                          isActive
                            ? 'dark:bg-cyan-950/70 bg-cyan-50 dark:text-cyan-200 text-cyan-950 border-cyan-400/50 dark:border-cyan-500/40 shadow-sm font-bold'
                            : 'border-transparent dark:text-[#E8DFC9] text-slate-800 hover:border-slate-200 dark:hover:border-white/10 dark:hover:bg-white/5 hover:bg-slate-100 dark:hover:text-white hover:text-slate-950'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 dark:text-cyan-400/60 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>

                {/* Advisory & Knowledge Links */}
                <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-500 dark:text-cyan-400 font-bold block mb-2 px-1">
                  {t('nav.advisory', 'Advisory & Research')}
                </span>
                <div className="space-y-1">
                  {advisoryLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                          isActive
                            ? 'dark:bg-cyan-950/70 bg-cyan-50 dark:text-cyan-200 text-cyan-950 border-cyan-400/50 dark:border-cyan-500/40 shadow-sm font-bold'
                            : 'border-transparent dark:text-[#E8DFC9] text-slate-800 hover:border-slate-200 dark:hover:border-white/10 dark:hover:bg-white/5 hover:bg-slate-100 dark:hover:text-white hover:text-slate-950'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-luxury-gold" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 dark:text-luxury-gold/40 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer Actions (Structured & Outlined) */}
              <div className="pt-5 border-t dark:border-white/10 border-slate-200 space-y-2.5 mt-5">
                <a
                  href="tel:9928365001"
                  className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider border border-amber-400/80 bg-gold-gradient text-luxury-darker shadow-[0_2px_14px_rgba(212,175,55,0.35)] hover:scale-[1.02] active:scale-98 transition-all"
                >
                  <Phone className="w-4 h-4 fill-luxury-darker" />
                  <span>{t('floating.call', 'Call Coordinator')}: 99283-65001</span>
                </a>

                <div className="text-center pt-2">
                  <p className="text-[10px] dark:text-slate-400 text-slate-500 font-medium">
                    © 2026 AVM TALKS BY AVNISH • Ultra-Luxury Plotted Real Estate
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Command Palette Instant Search (Ctrl+K) */}
      <CommandSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* Global Scheme Comparison Tray & Modal */}
      <PlotCompareModal />
    </>
  );
};
