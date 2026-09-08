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
    <footer className="relative bg-luxury-darker text-luxury-ivory border-t-2 border-dashed border-luxury-gold/50 pt-16 pb-12 overflow-hidden">
      {/* Background ambient spotlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-luxury-emerald/20 blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top VIP Coordinator Bar: Bespoke Handcrafted Stitched Leather Desk Plaque */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#03281E] via-[#1A0F0A] to-[#03281E] border-2 border-luxury-gold/40 shadow-2xl mb-14 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Solid Brass Screws */}
          <div className="brass-screw absolute top-3 left-3 !w-3.5 !h-3.5 !z-20" title="Brass Screw"></div>
          <div className="brass-screw absolute top-3 right-3 !w-3.5 !h-3.5 !z-20" title="Brass Screw"></div>
          <div className="brass-screw absolute bottom-3 left-3 !w-3.5 !h-3.5 !z-20" title="Brass Screw"></div>
          <div className="brass-screw absolute bottom-3 right-3 !w-3.5 !h-3.5 !z-20" title="Brass Screw"></div>

          <div className="flex items-center gap-4 pl-3">
            <div className="w-12 h-12 rounded-2xl bg-luxury-emerald/60 border border-luxury-gold/60 flex items-center justify-center text-luxury-gold flex-shrink-0 shadow-md">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-bold block leather-deboss-gold">
                {isHindi ? 'सीधा जमीनी सहायता नेटवर्क' : 'Direct Ground Assistance Network'}
              </span>
              <h4 className="text-base sm:text-lg font-serif font-bold text-luxury-ivory">
                {t('footer.hotlineTitle', '52+ Authorized Territory Coordinators Available for On-Site Verification')}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 pr-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
            >
              {isHindi ? 'कोऑर्डिनेटर डायरेक्टरी देखें' : 'Browse Agent Directory'}
            </Link>
            <Link
              to="/plots"
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-luxury-gold/40 hover:border-luxury-gold text-luxury-goldLight bg-black/40 transition-all"
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
                className="w-14 h-14 rounded-full object-cover border-2 border-luxury-gold shadow-sm"
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
        <div className="p-5 rounded-2xl bg-luxury-surface/80 border border-luxury-gold/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-[11px] text-luxury-muted font-light leading-relaxed">
          <Shield className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-luxury-goldLight font-bold">{t('footer.disclaimerHeading', 'Statutory Real Estate Notice')}:</strong>{' '}
            {t('footer.disclaimerText', 'AVM Talks by Avnish is an independent real estate advisory, ground-audit, and media platform. All video analyses, masterclasses, blueprints, and corridor assessments are created for buyer education and transparency. Always verify registered patta and title deeds independently.')}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-luxury-muted font-light">
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
