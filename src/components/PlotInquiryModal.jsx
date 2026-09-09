import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, MapPin, Calendar, Phone, User, MessageSquare, Car, Sparkles } from 'lucide-react';

export const PlotInquiryModal = ({ isOpen, onClose, plot }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    notes: 'I want physical road width and 90-A revenue demarcation.'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !plot) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/919928365001?text=Hello%20AVM%20Talks,%20I%20want%20to%20schedule%20a%20site%20inspection%20for%20${encodeURIComponent(plot.name)}%20(${encodeURIComponent(plot.corridor)}).%20Client:%20${encodeURIComponent(formData.name)}.%20Phone:%20${encodeURIComponent(formData.phone)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl overflow-hidden z-10 my-8 leather-stitch-outline"
        >
          {/* 4 Corner Solid Brass Screws */}
          <div className="brass-screw absolute top-3 left-3" />
          <div className="brass-screw absolute top-3 right-3" />
          <div className="brass-screw absolute bottom-3 left-3" />
          <div className="brass-screw absolute bottom-3 right-3" />

          {/* Header Banner */}
          <div className="relative p-6 sm:p-7 bg-gradient-to-r dark:from-[#0b1120] dark:via-indigo-950 dark:to-[#030712] from-slate-900 via-slate-800 to-slate-950 text-white border-b border-white/10">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-black/40 text-cyan-400 hover:text-white hover:bg-black/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-black/40 text-slate-200 border border-white/10 mb-2">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>On-Ground Site Demarcation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              {plot.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-200 font-medium mt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{plot.corridor}</span>
              <span>•</span>
              <span className="font-mono text-amber-300">{plot.priceStartingGaj}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-serif font-bold text-theme-primary">
                  Site Inspection Booked Successfully
                </h4>
                <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed max-w-sm mx-auto">
                  Your site visit request for <strong className="font-bold text-theme-primary">{plot.name}</strong> has been logged. An authorized territory coordinator will call you within 15 minutes.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open on WhatsApp</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-theme-gold/30 text-theme-primary hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1.5">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-theme-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Vikramaditya"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/30 text-xs text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-cyan-400 shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-theme-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/30 text-xs text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-cyan-400 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1.5">
                    Preferred Visit Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-theme-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/30 text-xs text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-cyan-400 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1.5">
                    What You Will Receive on Site:
                  </label>
                  <div className="p-3 rounded-xl bg-theme-card border border-theme-gold/20 space-y-1.5 text-[11px] text-theme-secondary shadow-sm">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>Certified Section 90-A revenue conversion order copy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>Measuring tape physical road width verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>Sanctioned JDA layout map & corner boundary check</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 mt-4"
                >
                  <Car className="w-4 h-4" />
                  <span>Confirm Free Inspection</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
