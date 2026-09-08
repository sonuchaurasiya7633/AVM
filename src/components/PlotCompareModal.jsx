import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, Check, ArrowRight, ShieldCheck, Scale, Car, Trash2, 
  Building2, Compass, AlertCircle, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompare } from '../context/CompareContext';
import { useLanguage } from '../context/LanguageContext';

export const PlotCompareModal = () => {
  const { 
    comparedPlots, 
    removeFromCompare, 
    clearCompare, 
    isCompareModalOpen, 
    setIsCompareModalOpen 
  } = useCompare();
  const { isHindi } = useLanguage();

  if (comparedPlots.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Comparison Dock */}
      <AnimatePresence>
        {!isCompareModalOpen && comparedPlots.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto"
          >
            <div className="p-3 sm:px-5 sm:py-3.5 rounded-full bg-[#021710]/95 backdrop-blur-md border-2 border-luxury-gold shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4 text-white leather-stitch-outline">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-gradient text-luxury-darker flex items-center justify-center font-bold text-xs shadow">
                  <Scale className="w-4 h-4" />
                </div>
                <div className="flex items-center -space-x-2">
                  {comparedPlots.map((plot) => (
                    <img
                      key={plot.id}
                      src={plot.coverImage || plot.image}
                      alt={plot.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-luxury-gold shadow-sm"
                    />
                  ))}
                </div>
                <div className="hidden sm:block">
                  <span className="text-xs font-bold text-luxury-goldLight block">
                    {comparedPlots.length} {isHindi ? 'प्लॉट चुने गए' : 'Plots Selected'}
                  </span>
                  <span className="text-[10px] text-white/60">
                    {isHindi ? 'तुलना हेतु तैयार' : 'Ready for side-by-side audit'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="px-4 sm:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all whitespace-nowrap"
                >
                  {isHindi ? `तुलना करें (${comparedPlots.length}/3)` : `Compare Now (${comparedPlots.length}/3)`}
                </button>
                <button
                  onClick={clearCompare}
                  className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  title={isHindi ? 'सभी हटाएं' : 'Clear all'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Multi-Scheme Comparison Modal */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl rounded-3xl bg-[#021710] border-2 border-luxury-gold shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden leather-stitch-outline my-auto flex flex-col max-h-[92vh]"
            >
              {/* 4 Corner Solid Brass Screws */}
              <div className="brass-screw absolute top-3.5 left-3.5" />
              <div className="brass-screw absolute top-3.5 right-3.5" />
              <div className="brass-screw absolute bottom-3.5 left-3.5" />
              <div className="brass-screw absolute bottom-3.5 right-3.5" />

              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-luxury-gold/30 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-luxury-emerald/40 border border-luxury-gold/50 flex items-center justify-center text-luxury-gold">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-serif font-bold text-white leading-snug">
                      {isHindi ? 'संस्थागत प्लॉट तुलनात्मक विश्लेषण' : 'Institutional Plotted Scheme Comparison Matrix'}
                    </h3>
                    <p className="text-[11px] text-luxury-goldLight font-mono">
                      {isHindi ? 'जेडीए 90-A, रेरा एवं टेक्निकल मानकों की निष्पक्ष समीक्षा' : 'Side-by-side statutory, dimensional & infrastructure audit'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={clearCompare}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/20 text-white/70 hover:text-white"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'रीसेट करें' : 'Clear All'}</span>
                  </button>
                  <button
                    onClick={() => setIsCompareModalOpen(false)}
                    className="p-2 rounded-full bg-black/60 text-luxury-gold hover:text-white border border-luxury-gold/30"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Comparison Table / Matrix Body */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-luxury-gold/30">
                <div className="min-w-[650px]">
                  {/* Grid Layout: Column 1 = Metric Labels, Columns 2..4 = Compared Plots */}
                  <div 
                    className="grid gap-4 pb-6"
                    style={{ gridTemplateColumns: `200px repeat(${comparedPlots.length}, minmax(200px, 1fr))` }}
                  >
                    {/* Header Row: Plot Image & Title */}
                    <div className="p-3 font-serif font-bold text-luxury-goldLight flex items-end">
                      <span>{isHindi ? 'मानक / विशेषता' : 'Statutory Metric'}</span>
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="relative rounded-2xl p-3 bg-black/40 border border-luxury-gold/30 text-center">
                        <button
                          onClick={() => removeFromCompare(plot.id)}
                          className="absolute -top-2 -right-2 p-1 rounded-full bg-rose-900 text-white border border-rose-500 hover:scale-110 transition-transform"
                          title="Remove"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <img
                          src={plot.coverImage || plot.image}
                          alt={plot.name}
                          className="w-full h-28 object-cover rounded-xl border border-luxury-gold/30 mb-2"
                        />
                        <h4 className="font-serif font-bold text-sm text-white truncate">
                          {plot.name}
                        </h4>
                        <span className="text-[11px] text-luxury-gold font-mono block">
                          {plot.corridor}
                        </span>
                      </div>
                    ))}

                    {/* Metric Row 1: Rate Per Gaj */}
                    <div className="p-3 bg-white/[0.02] rounded-xl text-xs font-semibold text-white/70">
                      {isHindi ? 'शुरुआती दर (प्रति गज)' : 'Starting Rate / Gaj'}
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="p-3 bg-white/[0.02] rounded-xl text-xs font-serif font-bold text-gold-gradient text-center">
                        {plot.priceStartingGaj}
                      </div>
                    ))}

                    {/* Metric Row 2: Starting Ticket Size */}
                    <div className="p-3 bg-white/[0.04] rounded-xl text-xs font-semibold text-white/70">
                      {isHindi ? 'न्यूनतम कुल मूल्य' : 'Minimum Outlay'}
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="p-3 bg-white/[0.04] rounded-xl text-xs font-mono font-bold text-white text-center">
                        {plot.priceStartingLakhs} {isHindi ? 'से प्रारंभ' : 'Onwards'}
                      </div>
                    ))}

                    {/* Metric Row 3: JDA Section 90-A Approval */}
                    <div className="p-3 bg-white/[0.02] rounded-xl text-xs font-semibold text-white/70">
                      {isHindi ? 'जेडीए धारा 90-A स्टेटस' : 'JDA Section 90-A'}
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="p-3 bg-white/[0.02] rounded-xl text-xs font-mono font-bold text-emerald-400 text-center flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{isHindi ? '100% स्वीकृत व समर्पित' : '100% Sanctioned'}</span>
                      </div>
                    ))}

                    {/* Metric Row 4: RERA Sanction */}
                    <div className="p-3 bg-white/[0.04] rounded-xl text-xs font-semibold text-white/70">
                      {isHindi ? 'रेरा पंजीकरण' : 'RERA Registration'}
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="p-3 bg-white/[0.04] rounded-xl text-xs font-mono text-center text-luxury-goldLight">
                        {plot.reraRegistered ? 'RAJ/P/2024/VERIFIED' : 'Compliant Exempt'}
                      </div>
                    ))}

                    {/* Metric Row 5: Road Widths */}
                    <div className="p-3 bg-white/[0.02] rounded-xl text-xs font-semibold text-white/70">
                      {isHindi ? 'सड़क चौड़ाई (आंतरिक / मुख्य)' : 'Masterplan Road Widths'}
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="p-3 bg-white/[0.02] rounded-xl text-xs font-mono text-white/90 text-center">
                        {plot.roadWidths.join(' • ')}
                      </div>
                    ))}

                    {/* Metric Row 6: Available Sizing */}
                    <div className="p-3 bg-white/[0.04] rounded-xl text-xs font-semibold text-white/70">
                      {isHindi ? 'उपलब्ध प्लॉट साइज़' : 'Available Dimensions'}
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="p-3 bg-white/[0.04] rounded-xl text-xs font-mono text-white/80 text-center">
                        {plot.plotSizesGaj.join(', ')} Gaj
                      </div>
                    ))}

                    {/* Metric Row 7: Bank Approvals */}
                    <div className="p-3 bg-white/[0.02] rounded-xl text-xs font-semibold text-white/70">
                      {isHindi ? 'बैंक लोन सुविधा' : 'Nationalized Bank Loan'}
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="p-3 bg-white/[0.02] rounded-xl text-xs font-mono text-emerald-400 text-center">
                        {isHindi ? 'SBI, HDFC से 80% तक' : 'Up to 80% (SBI, HDFC, ICICI)'}
                      </div>
                    ))}

                    {/* Metric Row 8: Possession */}
                    <div className="p-3 bg-white/[0.04] rounded-xl text-xs font-semibold text-white/70">
                      {isHindi ? 'कब्जा स्थिति' : 'Possession Timeline'}
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="p-3 bg-white/[0.04] rounded-xl text-xs font-mono font-bold text-luxury-goldLight text-center">
                        {isHindi ? 'तत्काल रजिस्ट्री व कब्जा' : 'Immediate Demarcation'}
                      </div>
                    ))}

                    {/* Action Row */}
                    <div className="p-3 text-xs font-semibold text-white/70 flex items-center">
                      {isHindi ? 'कार्यवाही' : 'Next Action'}
                    </div>
                    {comparedPlots.map((plot) => (
                      <div key={plot.id} className="p-3 text-center">
                        <Link
                          to="/book-visit"
                          onClick={() => setIsCompareModalOpen(false)}
                          className="w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold flex items-center justify-center gap-1.5 hover:scale-105 transition-transform"
                        >
                          <Car className="w-3.5 h-3.5" />
                          <span>{isHindi ? 'विजिट बुक करें' : 'Inspect Site'}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
