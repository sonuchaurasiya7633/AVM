import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, ChevronRight, 
  Building2, BookOpen, Film, Compass, User, Mail, Home, PhoneCall,
  Calculator, FileCheck2, HelpCircle, Car, Sparkles, Phone, ShieldCheck,
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
            ? 'py-2.5 dark:bg-[#021710]/95 bg-white/95 backdrop-blur-2xl border-b-2 border-dashed dark:border-luxury-gold/40 border-[#D4AF37]/45 dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] shadow-[0_4px_25px_rgba(0,0,0,0.06)]'
            : 'py-3.5 dark:bg-gradient-to-b dark:from-[#021710]/95 dark:via-[#021710]/75 dark:to-transparent bg-gradient-to-b from-white/95 via-white/80 to-transparent border-b-2 border-dashed dark:border-luxury-gold/30 border-[#D4AF37]/30'
        }`}
      >
        {/* Top Hairline Gold Glow Line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Emblem (100% Static & Crisp with Leather Bezel) */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#AA771C] to-[#D4AF37] shadow-md">
              <img
                src={logoImg}
                alt="AVM TALKS BY AVNISH Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#021710] flex-shrink-0"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-base sm:text-lg font-bold dark:text-[#FCF9F2] text-[#02261A] group-hover:text-luxury-gold transition-colors leading-none leather-deboss-gold">
                AVM TALKS
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] dark:text-[#E2C178] text-[#9E7B28] font-bold mt-1">
                BY AVNISH
              </span>
            </div>
          </Link>

          {/* Desktop Luxury Navigation Architecture with Saddle Stitch Capsule */}
          <nav className="hidden lg:flex items-center gap-1.5 dark:bg-[#042217]/95 bg-[#F3F7F4] backdrop-blur-xl px-3.5 py-1.5 rounded-full border-2 border-dashed dark:border-luxury-gold/50 border-[#D4AF37]/50 shadow-md gold-specular-border">
            {/* Primary Destination Links */}
            {primaryLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-full flex items-center gap-1.5 ${
                    isActive
                      ? 'dark:bg-luxury-emerald/60 bg-[#042217] dark:text-[#FFF0C8] text-[#FFF0C8] border dark:border-luxury-gold/50 border-[#D4AF37] shadow-sm font-bold'
                      : link.highlight
                      ? 'dark:text-[#E2C178] text-[#9E7B28] font-bold dark:hover:text-[#FFF0C8] hover:text-[#02261A]'
                      : 'dark:text-[#E8DFC9] text-[#164332] dark:hover:text-[#FFF0C8] hover:text-[#9E7B28] dark:hover:bg-white/5 hover:bg-black/5'
                  }`}
                >
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse"></span>
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
                className={`px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-full flex items-center gap-1.5 ${
                  isAdvisoryActive || advisoryDropdownOpen
                    ? 'dark:bg-luxury-emerald/50 bg-[#042217] dark:text-[#FFF0C8] text-[#FFF0C8] border dark:border-luxury-gold/40 border-[#D4AF37] font-bold'
                    : 'dark:text-[#E8DFC9] text-[#164332] dark:hover:text-[#FFF0C8] hover:text-[#9E7B28] dark:hover:bg-white/5 hover:bg-black/5'
                }`}
                aria-expanded={advisoryDropdownOpen}
              >
                <span>{t('nav.advisory', 'Advisory & Media')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-luxury-gold transition-transform duration-200 ${
                    advisoryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Luxury Dropdown Menu */}
              <AnimatePresence>
                {advisoryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 w-80 rounded-2xl dark:bg-[#042217] bg-white backdrop-blur-2xl border dark:border-luxury-gold/50 border-[#D4AF37]/45 dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] shadow-[0_15px_40px_rgba(0,0,0,0.12)] p-2.5 z-50"
                  >
                    <div className="px-3 py-2 border-b dark:border-theme-gold/20 border-[#D4AF37]/20 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest dark:text-luxury-gold text-[#9E7B28] block">
                        {t('nav.statutorySuite', 'Statutory Advisory Suite')}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {advisoryLinks.map((item) => {
                        const Icon = item.icon;
                        const isSubActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                              isSubActive
                                ? 'dark:bg-luxury-emerald/50 bg-[#E8F3ED] dark:text-[#FFF0C8] text-[#02261A] border dark:border-luxury-gold/40 border-[#D4AF37]/40 font-bold'
                                : 'dark:hover:bg-white/5 hover:bg-[#F3F7F4] dark:text-[#FCF9F2] text-[#02261A]'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg dark:bg-luxury-emerald/30 bg-[#E8F3ED] border dark:border-theme-gold/20 border-[#D4AF37]/30 text-luxury-gold flex-shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-tight">
                                {item.name}
                              </p>
                              <p className="text-[10px] dark:text-[#A3B8AD] text-[#4A6E5E] font-light mt-0.5 leading-snug">
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

          {/* Action Suite: Search, Compare, Language Toggle, Theme Toggle & VIP Site Visit CTA */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Instant Search Command Palette Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border dark:border-luxury-gold/40 border-[#D4AF37]/40 dark:bg-[#03281E] bg-[#F3F7F4] text-xs dark:text-luxury-goldLight text-[#02261A] hover:border-luxury-gold shadow-sm transition-all"
              title={isHindi ? 'त्वरित खोज (Ctrl+K)' : 'Instant Search (Ctrl+K)'}
            >
              <Search className="w-3.5 h-3.5 text-luxury-gold" />
              <span className="hidden xl:inline text-[11px] font-medium">{isHindi ? 'खोजें...' : 'Search...'}</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/20 dark:bg-white/10 dark:text-luxury-gold text-[#9E7B28] font-bold">
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

            {/* VIP Site Visit Capsule CTA */}
            <Link
              to="/book-visit"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider overflow-hidden group gold-shimmer-btn text-luxury-darker shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              <Car className="w-3.5 h-3.5 text-luxury-darker" />
              <span>{t('nav.vipVisit', 'VIP Site Visit')}</span>
            </Link>
          </div>

          {/* Mobile Menu & Language / Theme Toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-full border dark:border-luxury-gold/40 border-[#D4AF37]/40 dark:text-luxury-gold text-[#02261A] hover:bg-black/5"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full border dark:border-luxury-gold/40 border-[#D4AF37]/40 dark:text-luxury-gold text-[#02261A] dark:hover:bg-luxury-gold/10 hover:bg-black/5 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
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
              className="fixed inset-y-0 right-0 w-full max-w-sm dark:bg-[#021710] bg-white border-l dark:border-luxury-gold/40 border-[#D4AF37]/40 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto dark:text-[#FCF9F2] text-[#02261A]"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b dark:border-theme-gold/20 border-[#D4AF37]/20 mb-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoImg}
                      alt="AVM Talks Crest"
                      className="w-10 h-10 rounded-full border border-luxury-gold"
                    />
                    <div>
                      <span className="font-serif font-bold text-sm dark:text-[#FCF9F2] text-[#02261A] tracking-wider block">
                        AVM TALKS
                      </span>
                      <span className="text-[9px] uppercase tracking-widest dark:text-[#E2C178] text-[#9E7B28] font-bold block">
                        BY AVNISH
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full border dark:border-luxury-gold/30 border-[#D4AF37]/30 dark:text-luxury-gold text-[#02261A] dark:hover:bg-luxury-gold/20 hover:bg-black/5 transition-colors"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Primary Destination Links */}
                <span className="text-[10px] uppercase tracking-[0.2em] dark:text-luxury-gold text-[#9E7B28] font-bold block mb-2 px-1">
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
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                          isActive
                            ? 'dark:bg-luxury-emerald/50 bg-[#042217] dark:text-[#FFF0C8] text-[#FFF0C8] border dark:border-luxury-gold border-[#D4AF37] shadow-sm font-bold'
                            : 'dark:text-[#E8DFC9] text-[#164332] dark:hover:bg-white/5 hover:bg-[#F3F7F4] dark:hover:text-[#FFF0C8] hover:text-[#02261A]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-luxury-gold" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 dark:text-luxury-gold/40 text-black/30" />
                      </Link>
                    );
                  })}
                </div>

                {/* Advisory & Knowledge Links */}
                <span className="text-[10px] uppercase tracking-[0.2em] dark:text-luxury-gold text-[#9E7B28] font-bold block mb-2 px-1">
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
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                          isActive
                            ? 'dark:bg-luxury-emerald/50 bg-[#042217] dark:text-[#FFF0C8] text-[#FFF0C8] border dark:border-luxury-gold border-[#D4AF37] shadow-sm font-bold'
                            : 'dark:text-[#E8DFC9] text-[#164332] dark:hover:bg-white/5 hover:bg-[#F3F7F4] dark:hover:text-[#FFF0C8] hover:text-[#02261A]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-luxury-gold" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 dark:text-luxury-gold/40 text-black/30" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t dark:border-luxury-gold/20 border-[#D4AF37]/20 space-y-3 mt-6">
                <Link
                  to="/book-visit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold"
                >
                  <Car className="w-4 h-4" />
                  <span>{t('nav.vipVisit', 'Book VIP Chauffeur Visit')}</span>
                </Link>

                <a
                  href="tel:9928365001"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border dark:border-luxury-gold/50 border-[#D4AF37]/50 dark:bg-[#042217] bg-[#F3F7F4] dark:text-luxury-goldLight text-[#02261A] hover:border-luxury-gold"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>{t('floating.call', 'Call Coordinator')}: 99283-65001</span>
                </a>

                <div className="text-center pt-2">
                  <p className="text-[10px] dark:text-[#A3B8AD] text-[#4A6E5E]">
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
