import React, { useState, useMemo } from 'react';
import { TrendingUp, Calculator, ShieldCheck, ArrowUpRight, DollarSign, Calendar, Sparkles, Check } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

export const AIAirAppreciationForecaster = () => {
  const { formatPrice, convertAmount, activeConfig } = useCurrency();
  const { t } = useLanguage();

  const [ratePerGaj, setRatePerGaj] = useState(28500);
  const [plotSizeGaj, setPlotSizeGaj] = useState(250);
  const [holdingYears, setHoldingYears] = useState(5); // 3 | 5 | 10
  
  // Infrastructure Catalyst Toggles
  const [catalysts, setCatalysts] = useState({
    ringRoad: true,      // +3.5%
    dmicCorridor: true,  // +4.2%
    metroExtension: false, // +2.8%
    sectorArterial: true // +2.5%
  });

  const toggleCatalyst = (key) => {
    setCatalysts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculations
  const forecastData = useMemo(() => {
    // Baseline organic Jaipur plotted CAGR is 10.5%
    let totalCagr = 10.5;
    if (catalysts.ringRoad) totalCagr += 3.5;
    if (catalysts.dmicCorridor) totalCagr += 4.2;
    if (catalysts.metroExtension) totalCagr += 2.8;
    if (catalysts.sectorArterial) totalCagr += 2.5;

    const basePlotCost = ratePerGaj * plotSizeGaj;
    const stampDuty = basePlotCost * 0.075;
    const totalEntryOutlay = basePlotCost + stampDuty;

    // Compound Formula: A = P * (1 + r)^t
    const r = totalCagr / 100;
    const projectedRatePerGaj = Math.round(ratePerGaj * Math.pow(1 + r, holdingYears));
    const projectedGrossValue = Math.round(projectedRatePerGaj * plotSizeGaj);
    const grossProfit = projectedGrossValue - totalEntryOutlay;

    // Real net return adjusting for 5.5% annual inflation
    const inflationFactor = Math.pow(1.055, holdingYears);
    const inflationAdjustedNet = Math.round(projectedGrossValue / inflationFactor) - totalEntryOutlay;

    // Yearly progression breakdown
    const yearlyProgression = [];
    for (let y = 1; y <= holdingYears; y++) {
      const yearRate = Math.round(ratePerGaj * Math.pow(1 + r, y));
      const yearVal = yearRate * plotSizeGaj;
      yearlyProgression.push({
        year: 2026 + y,
        rate: yearRate,
        value: yearVal,
        growthPct: Math.round(((yearVal - totalEntryOutlay) / totalEntryOutlay) * 100)
      });
    }

    return {
      cagr: totalCagr.toFixed(1),
      totalEntryOutlay,
      projectedRatePerGaj,
      projectedGrossValue,
      grossProfit,
      inflationAdjustedNet,
      multiplier: (projectedGrossValue / totalEntryOutlay).toFixed(2),
      yearlyProgression
    };
  }, [ratePerGaj, plotSizeGaj, holdingYears, catalysts]);

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
            <TrendingUp className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Quantitative Land Economics (2026–2036)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white leading-tight">
            AI Land Valuation & Compound Appreciation Forecaster
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-1">
            Institutional forecast model powered by Jaipur highway infrastructure multipliers, Section 90-A revenue metrics, and historical appreciation data.
          </p>
        </div>

        {/* Holding Horizon Selector */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-luxury-gold/30">
          {[
            { label: '3 Years (2029)', val: 3 },
            { label: '5 Years (2031)', val: 5 },
            { label: '10 Years (2036)', val: 10 }
          ].map((h) => (
            <button
              key={h.val}
              onClick={() => setHoldingYears(h.val)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                holdingYears === h.val
                  ? 'bg-gold-gradient text-luxury-darker shadow-md'
                  : 'text-luxury-ivory hover:text-luxury-gold'
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left 6 Columns: Interactive Parameters */}
        <div className="lg:col-span-6 space-y-6">
          {/* Rate per Gaj Slider */}
          <div className="p-5 rounded-2xl bg-black/40 border border-luxury-gold/25">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-theme-muted">
                Initial Plot Rate (₹ / Gaj)
              </span>
              <span className="text-base font-serif font-bold text-luxury-gold font-tabular">
                {formatPrice(ratePerGaj)} / Gaj
              </span>
            </div>
            <input
              type="range"
              min="15000"
              max="65000"
              step="500"
              value={ratePerGaj}
              onChange={(e) => setRatePerGaj(parseInt(e.target.value))}
              className="w-full h-2 bg-luxury-emerald/40 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex justify-between text-[10px] font-mono text-theme-muted mt-2">
              <span>₹15,000 (Ring Road Belt)</span>
              <span>₹28,500 (Tech Corridor)</span>
              <span>₹65,000 (Commercial Front)</span>
            </div>
          </div>

          {/* Plot Size Selector */}
          <div className="p-5 rounded-2xl bg-black/40 border border-luxury-gold/25">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-theme-muted">
                Plot Sizing Enclave
              </span>
              <span className="text-xs font-mono font-bold text-luxury-goldLight">
                {plotSizeGaj} Gaj ({Math.round(plotSizeGaj * 9)} Sq. Ft)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[150, 200, 250, 500].map((size) => (
                <button
                  key={size}
                  onClick={() => setPlotSizeGaj(size)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    plotSizeGaj === size
                      ? 'bg-gold-gradient text-luxury-darker border-luxury-gold shadow-sm'
                      : 'bg-theme-card text-luxury-ivory border-luxury-gold/20 hover:border-luxury-gold'
                  }`}
                >
                  {size} Gaj
                </button>
              ))}
            </div>
          </div>

          {/* Infrastructure Growth Catalysts (Multipliers) */}
          <div className="p-5 rounded-2xl bg-black/40 border border-luxury-gold/25">
            <span className="text-xs font-mono uppercase tracking-wider text-luxury-goldLight font-bold block mb-3">
              Corridor Catalyst Multipliers (CAGR Boosters)
            </span>
            <div className="space-y-2.5">
              {[
                { id: 'ringRoad', title: '47-KM Ring Road Direct Interchange', boost: '+3.5% CAGR' },
                { id: 'dmicCorridor', title: 'Delhi-Mumbai Expressway Cargo Corridor', boost: '+4.2% CAGR' },
                { id: 'metroExtension', title: 'Jaipur Metro Phase-2 Extended Line', boost: '+2.8% CAGR' },
                { id: 'sectorArterial', title: 'JDA 80-Ft & 200-Ft Masterplan Boulevards', boost: '+2.5% CAGR' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCatalyst(cat.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all ${
                    catalysts[cat.id]
                      ? 'bg-luxury-emerald/40 border-luxury-gold text-white font-bold'
                      : 'bg-theme-card border-white/5 text-theme-muted hover:text-luxury-ivory'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                      catalysts[cat.id] ? 'bg-luxury-gold text-luxury-darker border-luxury-gold' : 'border-white/20'
                    }`}>
                      {catalysts[cat.id] && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{cat.title}</span>
                  </div>
                  <span className="text-luxury-gold font-bold">{cat.boost}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Executive Financial Terminal */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {/* Main Gross Valuation Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#063826] via-[#032418] to-[#01140D] border-2 border-luxury-gold shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-luxury-goldLight">
                Projected Valuation ({2026 + holdingYears})
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold-gradient text-luxury-darker shadow-luxury-gold">
                {forecastData.cagr}% Projected CAGR
              </span>
            </div>

            <div className="mb-4">
              <span className="text-xs font-mono text-theme-muted block mb-1">
                Estimated Capital Realization
              </span>
              <div className="text-3xl sm:text-5xl font-serif font-black text-white font-tabular">
                {formatPrice(forecastData.projectedGrossValue, { compact: false })}
              </div>
              <span className="text-xs font-mono text-luxury-goldLight block mt-1">
                Projected Rate: {formatPrice(forecastData.projectedRatePerGaj)} / Gaj ({forecastData.multiplier}x Initial Capital)
              </span>
            </div>

            {/* Entry vs Gross Profit Breakdown */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-luxury-gold/30">
              <div>
                <span className="text-[10px] font-mono uppercase text-theme-muted block">
                  Total Entry Outlay (Incl. 7.5% Duty)
                </span>
                <span className="text-sm font-bold text-luxury-ivory font-tabular">
                  {formatPrice(forecastData.totalEntryOutlay)}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-theme-muted block">
                  Estimated Gross Profit
                </span>
                <span className="text-sm font-bold text-emerald-400 font-tabular flex items-center gap-1">
                  +{formatPrice(forecastData.grossProfit)}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Inflation-Adjusted Net Realization Tile */}
          <div className="p-5 rounded-2xl bg-black/40 border border-luxury-gold/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-theme-muted block">
                Inflation-Adjusted Real Net Yield (5.5% CPI)
              </span>
              <span className="text-base sm:text-lg font-bold text-luxury-gold font-tabular">
                +{formatPrice(forecastData.inflationAdjustedNet)}
              </span>
              <span className="text-[10px] font-mono text-theme-muted block mt-0.5">
                Calculated after deducting annual currency depreciation
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-luxury-emerald/30 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Milestone Progression Bar Chart */}
          <div className="p-5 rounded-2xl bg-black/40 border border-luxury-gold/25">
            <span className="text-xs font-mono uppercase tracking-wider text-luxury-goldLight font-bold block mb-3">
              Year-by-Year Capital Progression
            </span>
            <div className="space-y-2">
              {forecastData.yearlyProgression.map((item) => (
                <div key={item.year} className="flex items-center justify-between text-xs font-mono">
                  <span className="text-theme-muted w-14">Year {item.year}</span>
                  <div className="flex-1 mx-3 h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gold-gradient rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(15, (item.value / forecastData.projectedGrossValue) * 100))}%`
                      }}
                    />
                  </div>
                  <span className="text-white font-bold font-tabular text-right">
                    {formatPrice(item.value, { compact: true })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
