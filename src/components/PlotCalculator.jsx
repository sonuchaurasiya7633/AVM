import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, DollarSign, Building, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const PlotCalculator = () => {
  const [gaj, setGaj] = useState(200);
  const [ratePerGaj, setRatePerGaj] = useState(25000);
  const [loanTenure, setLoanTenure] = useState(15); // years
  const interestRate = 8.65; // % per annum standard for plot / home loan

  // Conversions
  const sqFt = gaj * 9;
  const sqMt = (gaj * 0.836127).toFixed(1);
  const baseCost = gaj * ratePerGaj;
  const stampDutyAndRegistry = baseCost * 0.075; // 7.5% standard in Rajasthan
  const totalInvestment = baseCost + stampDutyAndRegistry;

  // Loan Calculation (75% loan)
  const loanAmount = baseCost * 0.75;
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = loanTenure * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="rounded-3xl p-6 sm:p-10 lg:p-12 leather-badge-container border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
      {/* 4 Solid Brass Rivets on Corners */}
      <div className="brass-screw absolute top-4 left-4" title="Solid Brass Rivet"></div>
      <div className="brass-screw absolute top-4 right-4" title="Solid Brass Rivet"></div>
      <div className="brass-screw absolute bottom-4 left-4" title="Solid Brass Rivet"></div>
      <div className="brass-screw absolute bottom-4 right-4" title="Solid Brass Rivet"></div>

      {/* Background glow */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-luxury-emerald/20 blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-luxury-emerald/50 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-luxury-gold">
                Interactive Land Tool
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary">
                Plot Sizing & Investment Valuation Estimator
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
            Convert standard Rajasthan land units (Gaj to Sq.Ft), estimate statutory registry budgeting, and compute bank EMI options instantly.
          </p>

          {/* Sizing Slider */}
          <div className="space-y-3 p-5 rounded-2xl dark:bg-[#0b1120]/80 bg-slate-50 border dark:border-white/10 border-slate-200 shadow-inner">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-luxury-ivory/90 font-medium">
                Plot Dimension in Gaj (Square Yards)
              </label>
              <div className="px-3 py-1 rounded-lg bg-gold-gradient text-luxury-darker font-bold text-sm font-mono">
                {gaj} Gaj
              </div>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="25"
              value={gaj}
              onChange={(e) => setGaj(Number(e.target.value))}
              className="w-full h-2 dark:bg-[#0f172a] bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            {/* Conversion Equivalents */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="p-2 rounded dark:bg-black/40 bg-slate-100 text-luxury-muted">
                <span className="block font-mono text-luxury-gold font-semibold">{sqFt.toLocaleString('en-IN')}</span>
                <span className="text-[10px]">Square Feet</span>
              </div>
              <div className="p-2 rounded dark:bg-black/40 bg-slate-100 text-luxury-muted">
                <span className="block font-mono text-luxury-gold font-semibold">{sqMt}</span>
                <span className="text-[10px]">Square Meters</span>
              </div>
              <div className="p-2 rounded dark:bg-black/40 bg-slate-100 text-luxury-muted col-span-2 sm:col-span-1">
                <span className="block font-mono text-luxury-gold font-semibold">{(gaj / 100).toFixed(2)}</span>
                <span className="text-[10px]">Standard Units</span>
              </div>
            </div>
          </div>

          {/* Rate Per Gaj Slider */}
          <div className="space-y-3 p-5 rounded-2xl dark:bg-black/40 bg-slate-50 border dark:border-luxury-gold/25 border-amber-300/40 shadow-inner">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-luxury-ivory/90 font-medium">
                Expected Rate per Gaj
              </label>
              <div className="px-3 py-1 rounded-lg dark:bg-[#0b1120] bg-white text-cyan-600 dark:text-cyan-300 border dark:border-white/15 border-slate-200 font-bold text-sm font-mono">
                ₹{ratePerGaj.toLocaleString('en-IN')} / Gaj
              </div>
            </div>
            <input
              type="range"
              min="10000"
              max="60000"
              step="1000"
              value={ratePerGaj}
              onChange={(e) => setRatePerGaj(Number(e.target.value))}
              className="w-full h-2 dark:bg-[#0f172a] bg-slate-200 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
            />
            <div className="flex justify-between text-[11px] text-luxury-muted">
              <span>₹10,000 (Peripheral Corridors)</span>
              <span>₹35,000 (Prime Sectors)</span>
              <span>₹60,000+ (Commercial)</span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-luxury-muted mr-1">Popular Plot Sizes:</span>
            {[111, 166, 200, 250, 500].map((size) => (
              <button
                key={size}
                onClick={() => setGaj(size)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                  gaj === size
                    ? 'bg-luxury-gold text-luxury-darker font-bold'
                    : 'dark:bg-white/5 bg-slate-100 text-luxury-muted hover:text-luxury-gold dark:hover:bg-white/10 hover:bg-slate-200'
                }`}
              >
                {size} Gaj
              </button>
            ))}
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl dark:bg-gradient-to-b dark:from-[#0f172a] dark:via-[#0b1120] dark:to-[#030712] bg-gradient-to-b from-slate-50 to-white border-2 dark:border-cyan-500/30 border-amber-400/40 shadow-2xl space-y-6">
          <div className="border-b border-luxury-gold/20 pb-4 text-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold font-medium">
              Estimated Total Acquisition
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-gold-gradient mt-1">
              {formatINR(totalInvestment)}
            </div>
            <p className="text-[11px] text-luxury-muted mt-1">
              Inclusive of Estimated Stamp Duty & Registration
            </p>
          </div>

          {/* Financial Breakdown Table */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b dark:border-white/5 border-slate-100">
              <span className="text-luxury-muted">Base Land Valuation ({gaj} Gaj)</span>
              <span className="font-mono text-luxury-ivory font-semibold">{formatINR(baseCost)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b dark:border-white/5 border-slate-100">
              <span className="text-luxury-muted">Est. Stamp Duty & Registry (~7.5%)</span>
              <span className="font-mono text-luxury-goldLight">{formatINR(stampDutyAndRegistry)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b dark:border-white/5 border-slate-100">
              <span className="text-luxury-muted">Eligible Bank Loan (75%)</span>
              <span className="font-mono text-luxury-goldLight font-semibold">{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-luxury-muted">Own Capital Downpayment (25%)</span>
              <span className="font-mono text-luxury-ivory">{formatINR(baseCost * 0.25 + stampDutyAndRegistry)}</span>
            </div>
          </div>

          {/* EMI Card */}
          <div className="p-4 rounded-2xl dark:bg-cyan-950/30 bg-amber-50 border dark:border-white/15 border-amber-300/40 text-center shadow-inner">
            <span className="text-[10px] uppercase tracking-wider text-luxury-goldLight block">
              Estimated Monthly Bank EMI ({loanTenure} Years @ 8.65%)
            </span>
            <span className="text-2xl font-serif font-bold text-gold-gradient mt-0.5 block">
              {formatINR(emi)} <span className="text-xs text-luxury-ivory font-normal">/ month</span>
            </span>
          </div>

          <a
            href="/contact"
            className="w-full py-3.5 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
          >
            <span>Enquire Available Plots in This Bracket</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
