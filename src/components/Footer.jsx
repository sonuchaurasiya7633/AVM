import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo/avm-logo.png';
import { Radio, Shield, ArrowUp, PhoneCall, Building2, Calculator, CheckCircle2 } from 'lucide-react';
import { YoutubeIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t, isHindi } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative dark:bg-gradient-to-b dark:from-[#030712]/90 dark:via-[#060b17]/95 dark:to-[#030712] bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:text-slate-100 text-slate-900 border-t dark:border-white/10 border-slate-200 pt-16 pb-12 overflow-hidden">
      {/* Background Cosmic Geometric Square Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_90%)] opacity-75" />

      {/* Background ambient spotlight (Subtle Cyan & Gold) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] dark:bg-cyan-950/25 bg-amber-200/20 blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top VIP Coordinator Bar */}
        <div className="p-6 sm:p-8 rounded-3xl dark:bg-gradient-to-r dark:from-[#0f172a] dark:via-[#0b1120] dark:to-[#0f172a] bg-white border dark:border-white/15 border-slate-200 dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] shadow-[0_10px_30px_rgba(0,0,0,0.06)] mb-14 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* 4 Corner Screws */}
          <div className="brass-screw absolute top-3 left-3 !w-3.5 !h-3.5 !z-20" title="Rivet"></div>
          <div className="brass-screw absolute top-3 right-3 !w-3.5 !h-3.5 !z-20" title="Rivet"></div>
          <div className="brass-screw absolute bottom-3 left-3 !w-3.5 !h-3.5 !z-20" title="Rivet"></div>
          <div className="brass-screw absolute bottom-3 right-3 !w-3.5 !h-3.5 !z-20" title="Rivet"></div>

          <div className="flex items-center gap-4 pl-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 flex-shrink-0 shadow-md">
              <PhoneCall className="w-6 h-6 animate-pulse text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest dark:text-cyan-400 text-amber-600 font-bold block">
                {t('footer.vipDesk', 'Rajasthan Plotted Acquisition Helpdesk')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pr-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider gold-shimmer-btn text-luxury-dark font-black shadow-luxury-gold hover:scale-105 transition-all"
            >
              {isHindi ? 'कोऑर्डिनेटर डायरेक्टरी देखें' : 'Browse Agent Directory'}
            </Link>
            <Link
              to="/plots"
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-white/15 hover:border-amber-400 text-slate-200 bg-white/[0.04] backdrop-blur-md transition-all"
            >
              {isHindi ? 'प्लॉट साइज़ विवरण' : 'Standard Plot Sizes'}
            </Link>
          </div>
        </div>

        {/* 5-Column Navigation Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Col 1: Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={logoImg}
                alt="AVM TALKS BY AVNISH Crest"
                className="w-14 h-14 rounded-full object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-xl font-bold text-luxury-ivory">
                  AVM TALKS
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-luxury-gold font-bold">
                  BY AVNISH
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed max-w-sm">
              Ideas. Investment. Infrastructure. Influence. India's premier real-estate due diligence media and plotted investment advisory house. Powered by 21+ video masterclasses and on-site ground audits.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-luxury-gold/40 hover:border-luxury-gold flex items-center justify-center text-luxury-gold hover:bg-gold-gradient hover:text-luxury-darker transition-all"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-luxury-gold/40 hover:border-luxury-gold flex items-center justify-center text-luxury-gold hover:bg-gold-gradient hover:text-luxury-darker transition-all"
                aria-label="Spotify Podcast"
              >
                <Radio className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-luxury-gold/40 hover:border-luxury-gold flex items-center justify-center text-luxury-gold hover:bg-gold-gradient hover:text-luxury-darker transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-luxury-gold/40 hover:border-luxury-gold flex items-center justify-center text-luxury-gold hover:bg-gold-gradient hover:text-luxury-darker transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Plotted Schemes & Dimensions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold mb-4 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isHindi ? 'प्लॉटेड टाउनशिप' : 'Plotted Hubs'}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-luxury-muted font-light">
              <li>
                <Link to="/plots" className="text-luxury-gold font-medium hover:text-luxury-goldLight transition-colors">
                  ✦ {t('plots.badge', 'Available Plotted Townships')}
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-luxury-gold font-medium hover:text-luxury-goldLight transition-colors">
                  ✦ {t('nav.calculator', 'Wealth & Stamp Duty Calculator')}
                </Link>
              </li>
              <li>
                <Link to="/registry-process" className="hover:text-luxury-goldLight transition-colors">
                  {t('nav.registry', '5-Stage 90-A Registry Roadmap')}
                </Link>
              </li>
              <li>
                <Link to="/plots" className="hover:text-luxury-goldLight transition-colors">
                  {isHindi ? 'आवासीय प्लॉट्स (60 – 1500 गज)' : 'Residential Plots (60 – 1500 Gaj)'}
                </Link>
              </li>
              <li>
                <Link to="/plots" className="hover:text-luxury-goldLight transition-colors">
                  {isHindi ? 'कमर्शियल प्लॉट्स व दुकानें' : 'Commercial Plots & Shops'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Media & 21 Masterclasses */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold mb-4">
              {t('nav.advisory', 'Media & Talks')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-luxury-muted font-light">
              <li>
                <Link to="/media" className="text-luxury-gold font-medium hover:text-luxury-goldLight transition-colors">
                  ✦ {isHindi ? '21 वीडियो मास्टरक्लास' : '21 Video Masterclasses'}
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-luxury-goldLight transition-colors">
                  {isHindi ? 'ग्राउंड इंस्पेक्शन रिपोर्ट्स' : 'Ground Inspection Reports'}
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-luxury-goldLight transition-colors">
                  {isHindi ? 'रेरा पोर्टल ट्यूटोरियल' : 'RERA Portal Live Walkthroughs'}
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-luxury-goldLight transition-colors">
                  {isHindi ? 'पॉडकास्ट अवनीश के साथ' : 'Audio Podcasts with Avnish'}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-luxury-goldLight transition-colors">
                  {t('nav.journal', 'The AVM Intelligence Journal')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Due Diligence & Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold mb-4">
              {isHindi ? 'परामर्श व डेस्क' : 'Governance & Desk'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-luxury-muted font-light">
              <li>
                <Link to="/book-visit" className="text-luxury-gold font-medium hover:text-luxury-goldLight transition-colors">
                  ✦ {t('nav.vipVisit', 'Schedule VIP Site Visit')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-luxury-goldLight transition-colors">
                  {t('nav.faqs', 'Statutory & Legal FAQs')}
                </Link>
              </li>
              <li>
                <Link to="/buyer-guide" className="hover:text-luxury-goldLight transition-colors">
                  {t('nav.buyerGuide', '5-Phase Diligence Protocol')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-luxury-goldLight transition-colors">
                  {t('nav.coordinators', '52+ Coordinator Directory')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-luxury-goldLight transition-colors">
                  {t('nav.about', 'About Avnish & Story')}
                </Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-luxury-goldLight transition-colors">
                  {isHindi ? 'कानूनी डिस्क्लेमर व रेरा नोटिस' : 'Disclaimers & RERA Notice'}
                </Link>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 text-xs text-luxury-gold hover:text-luxury-goldLight pt-2 transition-colors font-semibold"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'ऊपर जाएं' : 'Back to Top'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclosure Box */}
        <div className="p-5 rounded-2xl bg-[#0b1120]/90 border border-luxury-gold/30 shadow-inner mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-[11px] text-luxury-ivory/90 font-light leading-relaxed">
          <Shield className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-luxury-goldLight font-bold">{t('footer.disclaimerHeading', 'Statutory Real Estate Notice')}:</strong>{' '}
            {t('footer.disclaimerText', 'AVM Talks by Avnish is an independent real estate advisory, ground-audit, and media platform. All video analyses, masterclasses, blueprints, and corridor assessments are created for buyer education and transparency. Always verify registered patta and title deeds independently.')}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-luxury-gold/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-luxury-ivory/70 font-light">
          <p>© 2026 AVM TALKS BY AVNISH. {t('footer.copyright', 'All Rights Reserved. Handcrafted bespoke luxury edition.')}</p>
          <div className="flex items-center gap-3">
            <span>{isHindi ? '52+ फील्ड कोऑर्डिनेटर' : '52 Territory Coordinators'}</span>
            <span>•</span>
            <span className="text-luxury-gold font-mono">{isHindi ? '21 वीडियो मास्टरक्लास' : '21 Video Masterclasses'}</span>
            <span>•</span>
            <span>{t('footer.tagline', 'Fiduciary Land Advisory & Forensic Due Diligence')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
