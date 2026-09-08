import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { PROTOCOL_PHASES, BUYER_FAQS } from '../data/buyerGuide';
import { DueDiligenceCalculator } from '../components/DueDiligenceCalculator';
import { GroundAuditChecklist } from '../components/GroundAuditChecklist';
import { ShieldCheck, ChevronDown, CheckCircle2, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuyerGuide = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-luxury-gold/50 bg-luxury-emerald/30 text-luxury-goldLight mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>The Buyer Due Diligence Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary leading-tight mb-6">
          The 5-Phase Land Audit: <br />
          <span className="text-gold-gradient italic">Protect Your Capital.</span>
        </h1>
        <p className="text-base sm:text-lg text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
          Never sign an agreement or transfer advance booking money without completing every verification step in this comprehensive field-tested protocol.
        </p>
      </div>

      {/* 5-Phase Protocol Timeline */}
      <div className="mb-20">
        <SectionHeading
          badge="Procedural Timeline"
          title="The 30-Day Forensic Due Diligence Roadmap"
          subtitle="A systematic, step-by-step checklist designed to uncover unrecorded litigations, revenue discrepancies, and planning defects."
        />

        <div className="space-y-6">
          {PROTOCOL_PHASES.map((phase, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 sm:p-8 leather-folio-card border border-luxury-gold/40 shadow-luxury-card transition-all hover:border-luxury-gold relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-luxury-gold/20 mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker">
                    {phase.phase}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary">
                    {phase.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-luxury-gold font-semibold">
                  Estimated Timeline: {phase.duration}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed mb-6">
                {phase.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {phase.actionItems.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-3.5 rounded-xl bg-luxury-dark/40 dark:bg-black/30 light:bg-gray-50 border border-white/5 dark:border-white/5 light:border-gray-200 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-luxury-ivory/90 dark:text-luxury-ivory/90 light:text-lightBg-textPrimary font-light">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Safety Scorecard */}
      <div className="mb-20">
        <SectionHeading
          badge="Interactive Assessment"
          title="Audit Your Deal Right Now"
          subtitle="Check off each verified legal record you hold to calculate your Transaction Safety Score."
        />
        <DueDiligenceCalculator />
      </div>

      {/* 18-Point Physical Ground Audit & Demarcation Checklist */}
      <GroundAuditChecklist />

      {/* Buyer FAQs */}
      <div className="mb-20 max-w-4xl mx-auto">
        <SectionHeading
          badge="Frequently Clarified"
          title="Critical Legal Questions Answered"
          subtitle="Unpacking the most crucial statutory questions about Section 90-A, RERA, and Rajasthan land revenue."
        />

        <div className="space-y-4">
          {BUYER_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-luxury-gold/30 leather-folio-card overflow-hidden transition-colors relative"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-luxury-gold transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-luxury-gold/15 text-xs sm:text-sm text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Advisory Box */}
      <div className="p-8 sm:p-12 rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl text-center flex flex-col items-center relative leather-stitch-outline overflow-hidden">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        <FileText className="w-10 h-10 text-luxury-gold mb-4" />
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-ivory mb-3">
          Need an Independent Title Audit Review?
        </h3>
        <p className="max-w-xl text-xs sm:text-sm text-luxury-ivory/80 font-light mb-6">
          Schedule a direct advisory session with Avnish and his independent legal review circle before signing documents or releasing payments.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
        >
          <span>Request VIP Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
