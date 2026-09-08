import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, CheckCircle2, ArrowRight, Compass, Maximize2, FileCheck, Car, Scale, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { PlotInquiryModal } from './PlotInquiryModal';
import { DueDiligenceDossierModal } from './DueDiligenceDossierModal';
import { useLanguage } from '../context/LanguageContext';
import { useCompare } from '../context/CompareContext';
import { useCurrency } from '../context/CurrencyContext';

export const PlotCard = ({ plot }) => {
  const { t, isHindi } = useLanguage();
  const { toggleCompare, isComparing } = useCompare();
  const { formatPrice, currency } = useCurrency();
  const [modalOpen, setModalOpen] = useState(false);
  const [dossierOpen, setDossierOpen] = useState(false);
  const comparing = isComparing(plot.id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group rounded-3xl overflow-hidden bg-theme-surface border-2 border-luxury-gold/40 shadow-theme-card hover:border-luxury-gold transition-all duration-300 flex flex-col h-full relative leather-stitch-outline"
    >
      {/* Cover Image & Badges */}
      <div className="relative w-full h-60 sm:h-64 overflow-hidden bg-black">
        {/* 4 Corner Solid Brass Rivets on Image */}
        <div className="brass-screw absolute top-3 left-3 !w-3 !h-3 !z-20" title="Brass Rivet"></div>
        <div className="brass-screw absolute top-3 right-3 !w-3 !h-3 !z-20" title="Brass Rivet"></div>
        <div className="brass-screw absolute bottom-3 left-3 !w-3 !h-3 !z-20" title="Brass Rivet"></div>
        <div className="brass-screw absolute bottom-3 right-3 !w-3 !h-3 !z-20" title="Brass Rivet"></div>

        <img
          src={plot.coverImage || plot.image}
          alt={plot.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-darker via-black/30 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-4 left-8 flex flex-wrap gap-2 z-10">
          {plot.jdaApproved && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#02261A] text-luxury-goldLight border border-dashed border-luxury-gold/60 shadow-md backdrop-blur-md leather-deboss-gold">
              {t('plots.jdaBadge', 'JDA Approved')}
            </span>
          )}
          {plot.reraRegistered && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#3D2314] text-luxury-goldLight border border-dashed border-luxury-gold/60 shadow-md backdrop-blur-md leather-deboss-gold">
              {t('plots.reraBadge', 'RERA Sanctioned')}
            </span>
          )}
        </div>

        {/* Top-Right Instant Multi-Scheme Compare Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(plot);
          }}
          className={`absolute top-4 right-8 z-10 px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md ${
            comparing
              ? 'bg-gold-gradient text-luxury-darker border border-luxury-gold'
              : 'bg-black/75 text-white/80 hover:text-white border border-white/20'
          }`}
          title={comparing ? "Remove from comparison" : "Add to side-by-side comparison"}
        >
          <Scale className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {comparing ? (isHindi ? 'तुलना में' : 'Comparing') : (isHindi ? '+ तुलना' : '+ Compare')}
          </span>
        </button>

        {/* Price Tag Overlay with Stitched Leather Ribbon */}
        <div className="absolute bottom-3 right-8 text-right bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-luxury-gold/40 shadow-xl z-10">
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold block font-mono">
            {t('plots.startingFrom', 'Starting Price')}
          </span>
          <span className="text-xl font-serif font-extrabold text-gold-gradient block font-tabular">
            {currency === 'INR' ? plot.priceStartingGaj : `${formatPrice(parseInt(plot.priceStartingGaj.replace(/[^0-9]/g, '')) || 25000)} / Gaj`}
          </span>
          <span className="text-xs text-luxury-ivory font-mono font-medium">
            ({currency === 'INR' ? plot.priceStartingLakhs : formatPrice((parseFloat(plot.priceStartingLakhs.replace(/[^0-9.]/g, '')) || 35) * 100000, { compact: true })} {isHindi ? 'से प्रारंभ' : 'onwards'})
          </span>
        </div>

        {/* Road Width Badge */}
        <div className="absolute bottom-3 left-8 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 text-xs font-mono text-white/90 border border-luxury-gold/30 z-10">
          <Compass className="w-3.5 h-3.5 text-luxury-gold" />
          <span>{isHindi ? 'सड़क चौड़ाई:' : 'Roads:'} {plot.roadWidths[1] || plot.roadWidths[0]}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-luxury-gold font-medium mb-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{plot.corridor}</span>
          </div>

          <h3 className="text-xl font-serif font-bold text-theme-primary group-hover:text-luxury-gold transition-colors leading-snug mb-2">
            {plot.name}
          </h3>

          <p className="text-xs sm:text-sm text-theme-secondary font-light line-clamp-2 leading-relaxed mb-4">
            {plot.tagline}
          </p>

          {/* Plot Sizes Pill matrix */}
          <div className="mb-5 p-3 rounded-xl bg-theme-card border border-theme-gold/20">
            <span className="text-[10px] uppercase tracking-widest text-theme-muted block mb-1.5 font-semibold">
              {t('plots.availableSizes', 'Available Dimensions:')}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {plot.plotSizesGaj.map((size) => (
                <span
                  key={size}
                  className="px-2 py-0.5 rounded text-xs font-mono bg-theme-surface text-theme-primary border border-theme-gold/30"
                >
                  {size} {isHindi ? 'गज' : 'Gaj'} ({size * 9} {isHindi ? 'वर्ग फीट' : 'Sq.Ft'})
                </span>
              ))}
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-1.5 mb-6 text-xs text-theme-secondary font-light">
            {plot.amenities.slice(0, 3).map((amenity, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-theme-gold/20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex-1 py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <Car className="w-3.5 h-3.5" />
            <span>{t('plots.bookInspection', 'Book Guided Site Visit')}</span>
          </button>
          <button
            type="button"
            onClick={() => setDossierOpen(true)}
            className="p-3 rounded-xl border border-luxury-gold/40 hover:border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
            title={isHindi ? "विधिक ड्यू डिलिजेंस प्रमाण-पत्र देखें" : "View Statutory Due Diligence Dossier"}
          >
            <FileText className="w-4 h-4" />
          </button>
          <Link
            to="/buyer-guide"
            className="p-3 rounded-xl border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
            title={t('plots.viewDocuments', 'Inspect Legal Records & Map')}
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Interactive Site Inspection Modal */}
      <PlotInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plot={plot}
      />

      {/* Certified Due Diligence Dossier Modal */}
      <DueDiligenceDossierModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
        plotData={plot}
      />
    </motion.div>
  );
};
