import React, { useState, useMemo } from 'react';
import { TrendingUp, BarChart3, ShieldCheck, DollarSign, ArrowUpRight, CheckCircle2, Sparkles, Scale, Info } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

export const AssetBenchmarkEngine = () => {
  const { formatPrice } = useCurrency();
  const { t, isHindi } = useLanguage();

  const [initialCapitalLakhs, setInitialCapitalLakhs] = useState(50); // ₹50 Lakhs default
  const [holdingHorizon, setHoldingHorizon] = useState(10); // 5 | 10 | 15 years
  const [activeTab, setActiveTab] = useState('benchmark'); // 'benchmark' | 'freeholdLease'

  // Asset benchmark CAGRs (conservative historical metrics)
  const ASSETS = [
    {
      id: 'plotted',
      name: 'Jaipur Plotted Land (Highway Growth Corridors)',
      cagr: 18.5,
      color: '#D4AF37',
      isPrimary: true,
      tangibility: '100% Freehold Physical Ground Registry (JDA Section 90-A Patta)',
      volatility: 'Low (Insulated from equity flash crashes)'
    },
    {
      id: 'nifty',
      name: 'Nifty 50 Large-Cap Equity Index',
      cagr: 12.2,
      color: '#38BDF8',
      isPrimary: false,
      tangibility: 'Paper/Demat financial claim',
      volatility: 'High (Bear cycles & global market drawdowns)'
    },
    {
      id: 'gold',
      name: 'Physical 24K Sovereign Gold',
      cagr: 9.5,
      color: '#F59E0B',
      isPrimary: false,
      tangibility: 'Physical bullion / Sovereign gold bonds',
      volatility: 'Moderate (Currency hedge)'
    },
    {
      id: 'fd',
      name: 'Scheduled Commercial Bank Fixed Deposit (FD)',
      cagr: 6.8,
      color: '#94A3B8',
      isPrimary: false,
      tangibility: 'Bank debtor promise (Post-tax effective ~4.8%)',
      volatility: 'Zero nominal risk (Negative real returns vs inflation)'
    }
  ];

  const benchmarkCalculations = useMemo(() => {
    const P = initialCapitalLakhs * 100000;
    const tYears = holdingHorizon;

    const results = ASSETS.map(asset => {
      const r = asset.cagr / 100;
      const futureVal = Math.round(P * Math.pow(1 + r, tYears));
      const netGain = futureVal - P;
      const multiple = (futureVal / P).toFixed(2);
      
      // Inflation-adjusted real purchasing power (assuming 5.5% annual inflation)
      const inflationFactor = Math.pow(1.055, tYears);
      const realPurchasingPower = Math.round(futureVal / inflationFactor);

      return {
        ...asset,
        futureVal,
        netGain,
        multiple,
        realPurchasingPower
      };
    });

    const maxVal = Math.max(...results.map(r => r.futureVal));

    return {
      initialCapital: P,
      results,
      maxVal,
      alphaVsNifty: (results[0].futureVal - results[1].futureVal)
    };
  }, [initialCapitalLakhs, holdingHorizon]);

  // JDA Lease Money vs One-Time Freehold Conversion Calculator
  const freeholdCalc = useMemo(() => {
    const plotCost = initialCapitalLakhs * 100000;
    const annualLeaseRate = plotCost * 0.005; // 0.5% annual lease money (Nagariya Upbhog Kar)
    const oneTime8YearRate = annualLeaseRate * 8; // JDA rule: 8 times annual lease grants perpetual freehold exemption
    const total30YearAnnualPayment = annualLeaseRate * 30;
    const lifetimeSavings = total30YearAnnualPayment - oneTime8YearRate;

    return {
      plotCost,
      annualLeaseRate,
      oneTime8YearRate,
      total30YearAnnualPayment,
      lifetimeSavings
    };
  }, [initialCapitalLakhs]);

  return (
    <div className="royal-obsidian-card rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
      {/* 4 Corner Brass Screws */}
      <div className="brass-screw absolute top-3.5 left-3.5" />
      <div className="brass-screw absolute top-3.5 right-3.5" />
      <div className="brass-screw absolute bottom-3.5 left-3.5" />
      <div className="brass-screw absolute bottom-3.5 right-3.5" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-luxury-gold/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-luxury-emerald/30 text-luxury-goldLight border border-luxury-gold/40 mb-3">
            <Scale className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Macro Asset Class Benchmarking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-theme-primary leading-tight">
            Multi-Asset Wealth Benchmark Engine (2026–2041)
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-1">
            Compare compounding wealth creation across Jaipur Plotted Land, Nifty 50 Equity, Physical Gold, and Bank Fixed Deposits over 5 to 15-year holding horizons.
          </p>
        </div>

        {/* Horizon Selector */}
        <div className="flex items-center gap-2 dark:bg-black/40 bg-theme-surface p-1.5 rounded-2xl border border-luxury-gold/30">
          {[
            { label: '5 Years', val: 5 },
            { label: '10 Years', val: 10 },
            { label: '15 Years', val: 15 }
          ].map((h) => (
            <button
              key={h.val}
              onClick={() => setHoldingHorizon(h.val)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                holdingHorizon === h.val
                  ? 'bg-gold-gradient text-luxury-darker shadow-md'
                  : 'text-theme-secondary hover:text-luxury-gold'
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Capital Slider */}
      <div className="p-5 rounded-2xl dark:bg-black/40 bg-theme-surface border border-luxury-gold/25 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase text-theme-muted">
            Initial Capital Deployed:
          </span>
          <span className="text-xl font-serif font-bold text-luxury-gold font-tabular">
            {formatPrice(benchmarkCalculations.initialCapital)}
          </span>
        </div>
        <input
          type="range"
          min="25"
          max="200"
          step="5"
          value={initialCapitalLakhs}
          onChange={(e) => setInitialCapitalLakhs(parseInt(e.target.value))}
          className="w-full h-2 bg-luxury-emerald/40 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
        />
        <div className="flex justify-between text-[10px] font-mono text-theme-muted mt-2">
          <span>₹25 Lakhs (Entry Plot)</span>
          <span>₹50 Lakhs (Institutional Villa Plot)</span>
          <span>₹2.00 Cr (Commercial Boulevard Frontage)</span>
        </div>
      </div>

      {/* Comparative Multi-Asset Progression Matrix */}
      <div className="space-y-4 mb-8">
        {benchmarkCalculations.results.map((asset) => {
          const barWidthPct = Math.min(100, Math.max(12, (asset.futureVal / benchmarkCalculations.maxVal) * 100));
          return (
            <div
              key={asset.id}
              className={`p-5 rounded-2xl border transition-all ${
                asset.isPrimary
                  ? 'dark:bg-gradient-to-r dark:from-[#0b1120] dark:via-indigo-950/80 dark:to-[#030712] bg-gradient-to-r from-amber-50/90 to-amber-100/50 border-2 border-cyan-500/30 shadow-2xl relative'
                  : 'dark:bg-black/40 bg-theme-surface border-theme-gold/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: asset.color }}
                  />
                  <h4 className="text-sm font-serif font-bold text-theme-primary">
                    {asset.name}
                  </h4>
                  {asset.isPrimary && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-gold-gradient text-luxury-darker uppercase shadow-sm">
                      Top Wealth Engine
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-theme-muted">CAGR: <strong className="text-theme-primary">{asset.cagr}%</strong></span>
                  <span className="text-luxury-goldLight font-bold">Multiple: {asset.multiple}x</span>
                </div>
              </div>

              {/* Progression Bar */}
              <div className="w-full h-4 dark:bg-black/60 bg-slate-200/80 rounded-full overflow-hidden border dark:border-white/10 border-slate-300 mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    asset.isPrimary ? 'bg-gold-gradient shadow-luxury-gold' : 'bg-slate-400'
                  }`}
                  style={{
                    width: `${barWidthPct}%`,
                    backgroundColor: asset.isPrimary ? undefined : asset.color
                  }}
                />
              </div>

              {/* Financial Metrics Footer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono pt-2 border-t dark:border-white/5 border-slate-200">
                <div>
                  <span className="text-theme-muted block text-[9px] uppercase">Final Capital Value</span>
                  <span className="text-theme-primary font-bold font-tabular text-xs">
                    {formatPrice(asset.futureVal)}
                  </span>
                </div>
                <div>
                  <span className="text-theme-muted block text-[9px] uppercase">Total Wealth Gain</span>
                  <span className="text-gold-gradient font-bold font-tabular text-xs">
                    +{formatPrice(asset.netGain)}
                  </span>
                </div>
                <div>
                  <span className="text-theme-muted block text-[9px] uppercase">Real Purchasing Power</span>
                  <span className="text-theme-primary font-tabular text-xs">
                    {formatPrice(asset.realPurchasingPower)}
                  </span>
                </div>
                <div>
                  <span className="text-theme-muted block text-[9px] uppercase">Asset Tangibility</span>
                  <span className="text-theme-secondary truncate block text-[10px]">
                    {asset.tangibility.split('(')[0]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* JDA Lease Money vs One-Time Freehold Conversion Panel */}
      <div className="p-6 rounded-2xl dark:bg-black/50 bg-theme-surface border border-luxury-gold/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-goldLight font-bold block mb-1">
            Statutory JDA Rules Advisory
          </span>
          <h4 className="text-base font-serif font-bold text-theme-primary">
            JDA One-Time Freehold Conversion Exemption
          </h4>
          <p className="text-xs text-theme-secondary font-light max-w-xl mt-1 leading-relaxed">
            By depositing an 8-year one-time advance lease payment of <strong className="text-luxury-gold">{formatPrice(freeholdCalc.oneTime8YearRate)}</strong>, JDA converts the leasehold into a 100% Freehold (शहरी उपभोग कर मुक्त) deed, saving <strong className="text-luxury-goldLight font-bold">{formatPrice(freeholdCalc.lifetimeSavings)}</strong> over 30 years.
          </p>
        </div>
        <div className="flex-shrink-0 text-right">
          <span className="text-[10px] font-mono uppercase text-theme-muted block">Estimated Lifetime Savings</span>
          <span className="text-2xl font-serif font-black text-gold-gradient font-tabular">
            +{formatPrice(freeholdCalc.lifetimeSavings)}
          </span>
        </div>
      </div>
    </div>
  );
};

