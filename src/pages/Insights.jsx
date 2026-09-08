import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { CORRIDORS_DATA, MACRO_METRICS, INVESTMENT_RULES } from '../data/insights';
import { TrendingUp, MapPin, CheckCircle, ShieldAlert, ArrowRight, BarChart3, Landmark, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CorridorMatrixComparator } from '../components/CorridorMatrixComparator';

export const Insights = () => {
  const [activeCorridor, setActiveCorridor] = useState(CORRIDORS_DATA[0]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-luxury-gold/50 bg-luxury-emerald/30 text-luxury-goldLight mb-4">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Regional Whitepaper</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary leading-tight mb-6">
          Jaipur Growth Corridors & <br />
          <span className="text-gold-gradient italic">Capital Dynamics.</span>
        </h1>
        <p className="text-base sm:text-lg text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
          An unvarnished, data-backed intelligence dossier evaluating road networks, institutional employment density, and master-plan zoning across Greater Jaipur.
        </p>
      </div>

      {/* Macro Indicators Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {MACRO_METRICS.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl leather-folio-card border border-luxury-gold/30 text-center shadow-luxury-card relative"
          >
            <span className="text-2xl sm:text-4xl font-serif font-bold text-gold-gradient block mb-1">
              {item.value}
            </span>
            <h4 className="text-xs sm:text-sm font-semibold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary mb-1">
              {item.label}
            </h4>
            <p className="text-[11px] text-luxury-muted font-light">
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Corridor In-Depth Analysis Tabs */}
      <div className="mb-20">
        <SectionHeading
          badge="Corridor Breakdown"
          title="The Three High-Velocity Corridors"
          subtitle="Select a corridor below to inspect infrastructure catalysts, connectivity scores, and investment verdicts."
        />

        {/* Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {CORRIDORS_DATA.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCorridor(c)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCorridor.id === c.id
                  ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold scale-105'
                  : 'bg-luxury-surface/60 dark:bg-luxury-surface/80 light:bg-white border border-luxury-gold/30 text-luxury-ivory/80 dark:text-luxury-ivory/80 light:text-lightBg-textPrimary hover:border-luxury-gold'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Active Corridor Leather Card */}
        <div className="rounded-3xl p-8 sm:p-12 leather-badge-container border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-luxury-gold/20 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-luxury-emerald text-luxury-goldLight border border-luxury-gold/30">
                  {activeCorridor.status}
                </span>
                <span className="text-xs font-mono text-luxury-gold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  Growth Velocity: {activeCorridor.growthVelocity}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary">
                {activeCorridor.name}
              </h2>
            </div>

            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-luxury-dark/60 dark:bg-black/40 light:bg-gray-100 border border-luxury-gold/30">
              <span className="text-xs uppercase tracking-widest text-luxury-muted">Connectivity Index</span>
              <span className="text-2xl font-serif font-extrabold text-gold-gradient">
                {activeCorridor.connectivityScore}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary">
                Macro Context & Strategic Catalysts
              </h3>
              <p className="text-sm sm:text-base text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
                {activeCorridor.description}
              </p>

              <div className="space-y-3 pt-2">
                {activeCorridor.keyHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-luxury-ivory/90 dark:text-luxury-ivory/90 light:text-lightBg-textPrimary font-light">
                    <CheckCircle className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-luxury-dark/80 dark:bg-luxury-dark/90 light:bg-gray-50 border border-luxury-gold/30 shadow-xl space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-semibold">
                Investment Verdict & Cautionary Notes
              </h4>
              <p className="text-xs sm:text-sm text-luxury-ivory/90 dark:text-luxury-ivory/90 light:text-lightBg-textPrimary font-light leading-relaxed">
                {activeCorridor.investmentVerdict}
              </p>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-luxury-muted">
                <p>• Avoid unapproved agricultural ribbons without 90-A conversions.</p>
                <p>• Insist on verified physical access to sanctioned 40ft+ sector roads.</p>
              </div>

              <Link
                to="/buyer-guide"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-[1.02] transition-all"
              >
                <span>Audit Property in This Corridor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Highway Corridors Growth Matrix & Radar Comparator */}
      <CorridorMatrixComparator />

      {/* Investment Rules */}
      <SectionHeading
        badge="Foundational Tenets"
        title="The Four Golden Rules of Capital Preservation"
        subtitle="Timeless wisdom formulated from decades of revenue law, market cycles, and institutional acquisitions."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {INVESTMENT_RULES.map((rule) => (
          <div
            key={rule.ruleNumber}
            className="p-8 rounded-2xl leather-folio-card border border-luxury-gold/40 hover:border-luxury-gold shadow-luxury-card transition-all relative"
          >
            <span className="text-3xl font-serif font-extrabold text-luxury-gold/40 block mb-2">
              {rule.ruleNumber}
            </span>
            <h4 className="text-lg font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary mb-2">
              {rule.title}
            </h4>
            <p className="text-xs sm:text-sm text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
              {rule.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
