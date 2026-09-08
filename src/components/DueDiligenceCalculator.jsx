import React, { useState } from 'react';
import { CHECKLIST_QUESTIONS } from '../data/buyerGuide';
import { ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export const DueDiligenceCalculator = () => {
  const [selectedItems, setSelectedItems] = useState({});

  const toggleItem = (id) => {
    setSelectedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      // Check if user hit 100
      const score = calculateScore(updated);
      if (score >= 90) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#C9A35C', '#E2C178', '#003B2B', '#ffffff']
        });
      }
      return updated;
    });
  };

  const calculateScore = (items) => {
    return CHECKLIST_QUESTIONS.reduce((total, q) => {
      return items[q.id] ? total + q.points : total;
    }, 0);
  };

  const score = calculateScore(selectedItems);

  const getVerdict = (score) => {
    if (score >= 90) {
      return {
        label: 'Institutional Investment Grade',
        color: 'text-emerald-400',
        border: 'border-emerald-500/50',
        bg: 'bg-emerald-950/40',
        icon: ShieldCheck,
        desc: 'Exceptional legal compliance. The asset demonstrates multi-decade title lineage and meets institutional acquisition standards.'
      };
    } else if (score >= 60) {
      return {
        label: 'Moderate Caution — Resolve Gaps',
        color: 'text-amber-400',
        border: 'border-amber-500/50',
        bg: 'bg-amber-950/40',
        icon: AlertTriangle,
        desc: 'Notable legal or revenue gaps detected. Do not release advance booking funds until critical certificates are produced.'
      };
    } else {
      return {
        label: 'Critical Legal Peril — High Risk',
        color: 'text-rose-400',
        border: 'border-rose-500/50',
        bg: 'bg-rose-950/40',
        icon: ShieldAlert,
        desc: 'Severe red flags identified. Proceeding without mandatory revenue records and 90-A conversion exposes you to total capital impairment.'
      };
    }
  };

  const verdict = getVerdict(score);
  const VerdictIcon = verdict.icon;

  const handleReset = () => {
    setSelectedItems({});
  };

  return (
    <div className="relative leather-badge-container rounded-3xl p-6 sm:p-10 border-2 border-luxury-gold shadow-2xl overflow-hidden leather-stitch-outline">
      {/* 4 Corner Solid Brass Screws */}
      <div className="brass-screw absolute top-3.5 left-3.5" />
      <div className="brass-screw absolute top-3.5 right-3.5" />
      <div className="brass-screw absolute bottom-3.5 left-3.5" />
      <div className="brass-screw absolute bottom-3.5 right-3.5" />

      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-luxury-emerald/20 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Questions */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-luxury-gold">
                Self-Audit Protocol
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary mt-1">
                Property Due-Diligence Scorecard
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-luxury-muted hover:text-luxury-gold border border-luxury-gold/20 rounded-lg hover:border-luxury-gold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <p className="text-sm text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary mb-6 font-light">
            Check off each verified legal milestone you currently possess in hand for your proposed land deal:
          </p>

          <div className="space-y-3">
            {CHECKLIST_QUESTIONS.map((item) => {
              const isChecked = !!selectedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'bg-luxury-emerald/30 border-luxury-gold/60 shadow-sm'
                      : 'bg-luxury-dark/40 dark:bg-luxury-dark/60 light:bg-gray-50/70 border-white/10 dark:border-white/10 light:border-gray-200 hover:border-luxury-gold/30'
                  }`}
                >
                  <div className="pt-0.5 flex-shrink-0">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-luxury-gold border-luxury-gold text-luxury-dark'
                          : 'border-luxury-gold/40'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-4 h-4 fill-luxury-dark text-luxury-gold" />}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-luxury-gold">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-luxury-goldLight">
                        +{item.points} pts
                      </span>
                    </div>
                    <p className="text-sm text-luxury-ivory/90 dark:text-luxury-ivory/90 light:text-lightBg-textPrimary leading-snug">
                      {item.question}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Safety Gauge & Assessment */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl bg-luxury-dark/80 dark:bg-luxury-dark/90 light:bg-white border border-luxury-gold/30 shadow-xl">
          <span className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-medium mb-4">
            Audited Safety Rating
          </span>

          {/* Radial Score Meter */}
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                fill="transparent"
                className="text-white/10 dark:text-white/10 light:text-gray-200"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#goldGradientGauge)"
                strokeWidth="7"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                strokeLinecap="round"
                fill="transparent"
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="goldGradientGauge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E2C178" />
                  <stop offset="100%" stopColor="#C9A35C" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-serif font-extrabold text-gold-gradient">
                {score}%
              </span>
              <span className="text-[10px] uppercase tracking-widest text-luxury-muted">
                Safety Score
              </span>
            </div>
          </div>

          {/* Verdict Box */}
          <div className={`w-full p-4 rounded-xl border ${verdict.border} ${verdict.bg} mb-6`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <VerdictIcon className={`w-5 h-5 ${verdict.color}`} />
              <h4 className={`text-sm font-bold uppercase tracking-wider ${verdict.color}`}>
                {verdict.label}
              </h4>
            </div>
            <p className="text-xs text-luxury-ivory/80 dark:text-luxury-ivory/80 light:text-lightBg-textSecondary font-light leading-relaxed">
              {verdict.desc}
            </p>
          </div>

          <div className="w-full text-xs text-luxury-muted border-t border-white/10 pt-4 text-left space-y-1.5">
            <p className="flex items-center gap-1.5 text-luxury-goldLight">
              <Award className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Institutional standard requires 90+ points</span>
            </p>
            <p>• 90-A conversion & 30-year chain title carry statutory veto power.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
