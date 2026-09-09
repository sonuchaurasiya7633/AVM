import React, { useState, useMemo } from 'react';
import { Layers, Plus, Trash2, ShieldCheck, Download, Share2, Sparkles, Check, FileText, ArrowRight, Building2, Droplets } from 'lucide-react';
import { PLOTS_DATA } from '../data/plots';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

export const PlotPortfolioBasket = () => {
  const { formatPrice } = useCurrency();
  const { t, isHindi } = useLanguage();

  // Selected plot IDs for the syndicate basket (default 2 plots for instant demonstration)
  const [selectedPlotIds, setSelectedPlotIds] = useState(['plot-aura-sovereign', 'plot-ring-road-imperial']);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);

  const selectedPlots = useMemo(() => {
    return PLOTS_DATA.filter(p => selectedPlotIds.includes(p.id));
  }, [selectedPlotIds]);

  const togglePlotInBasket = (id) => {
    if (selectedPlotIds.includes(id)) {
      setSelectedPlotIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedPlotIds(prev => [...prev, id]);
    }
  };

  // Aggregated calculations
  const basketTotals = useMemo(() => {
    let totalGaj = 0;
    let totalAcquisitionBase = 0;

    selectedPlots.forEach(plot => {
      const avgGaj = plot.plotSizesGaj[1] || plot.plotSizesGaj[0] || 200;
      const rate = parseInt(plot.priceStartingGaj.replace(/[^0-9]/g, '')) || 25000;
      totalGaj += avgGaj;
      totalAcquisitionBase += avgGaj * rate;
    });

    const stampDuty = totalAcquisitionBase * 0.075; // 7.5% Rajasthan duty
    // Bulk syndicate incentive rebate (2.5% for >400 Gaj)
    const bulkRebate = totalGaj >= 400 ? totalAcquisitionBase * 0.025 : 0;
    const netPayable = totalAcquisitionBase + stampDuty - bulkRebate;
    const estimatedFrontageFt = Math.round(selectedPlots.length * 35); // average 35ft frontage per plot

    return {
      totalPlots: selectedPlots.length,
      totalGaj,
      totalSqFt: totalGaj * 9,
      estimatedFrontageFt,
      totalAcquisitionBase,
      stampDuty,
      bulkRebate,
      netPayable
    };
  }, [selectedPlots]);

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
            <Layers className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Syndicate & Multi-Plot Aggregator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white leading-tight">
            VIP Multi-Plot Portfolio & Syndicate Basket
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-1">
            Aggregate adjacent or multi-corridor plots into a unified land estate. Calculate aggregated frontage, consolidated stamp duty, and institutional bulk acquisition rebates.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-black/50 border border-luxury-gold/40 flex items-center gap-3">
          <span className="text-xs font-mono text-theme-muted uppercase">In Basket:</span>
          <span className="text-lg font-serif font-bold text-luxury-gold font-tabular">
            {selectedPlots.length} Plots ({basketTotals.totalGaj} Gaj)
          </span>
        </div>
      </div>

      {/* Main Grid: Selection Dock (Left) vs Aggregation Spec Ledger (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left: Plot Picker */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-luxury-goldLight font-bold block mb-2">
            Select Plotted Schemes to Include in Estate:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PLOTS_DATA.map((plot) => {
              const isSelected = selectedPlotIds.includes(plot.id);
              const rate = parseInt(plot.priceStartingGaj.replace(/[^0-9]/g, '')) || 25000;
              return (
                <div
                  key={plot.id}
                  onClick={() => togglePlotInBasket(plot.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-luxury-emerald/30 border-luxury-gold shadow-md'
                      : 'bg-black/40 border-white/10 hover:border-luxury-gold/40 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase text-luxury-gold font-bold truncate">
                        {plot.corridor.split(' & ')[0]}
                      </span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                        isSelected ? 'bg-luxury-gold text-luxury-darker border-luxury-gold' : 'border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <h4 className="text-xs font-serif font-bold text-white leading-tight mb-1 truncate">
                      {plot.name}
                    </h4>
                    <p className="text-[11px] font-mono text-theme-muted">
                      {plot.priceStartingGaj} • {plot.roadWidths[0]}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 mt-2 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-emerald-400">Section 90-A Done</span>
                    <span className="text-luxury-ivory font-bold">{formatPrice(rate * 200)} approx.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Financial & Architectural Aggregation Ledger */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#060b17] via-[#0b1120] to-[#030712] border-2 border-cyan-500/30 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-luxury-gold/30">
              <span className="text-xs font-mono uppercase tracking-widest text-luxury-goldLight font-bold">
                Consolidated Estate Outlay
              </span>
              {basketTotals.bulkRebate > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-gold-gradient text-luxury-darker shadow-sm">
                  2.5% Bulk Rebate Applied
                </span>
              )}
            </div>

            <div className="space-y-3 font-mono text-xs mb-4">
              <div className="flex items-center justify-between">
                <span className="text-theme-muted font-sans">Aggregated Land Area:</span>
                <span className="text-white font-bold font-tabular">
                  {basketTotals.totalGaj} Gaj ({basketTotals.totalSqFt} Sq.Ft)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-theme-muted font-sans">Continuous Street Frontage:</span>
                <span className="text-luxury-goldLight font-bold font-tabular">
                  ~{basketTotals.estimatedFrontageFt} Linear Feet
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-theme-muted font-sans">Base Land Acquisition:</span>
                <span className="text-white font-tabular">
                  {formatPrice(basketTotals.totalAcquisitionBase)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-theme-muted font-sans">Rajasthan Stamp Duty (7.5%):</span>
                <span className="text-amber-400 font-tabular">
                  +{formatPrice(basketTotals.stampDuty)}
                </span>
              </div>
              {basketTotals.bulkRebate > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="font-sans">Syndicate Volume Incentive:</span>
                  <span className="font-tabular">-{formatPrice(basketTotals.bulkRebate)}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-luxury-gold/30 flex items-baseline justify-between">
              <span className="text-xs font-mono uppercase text-luxury-gold font-bold">
                Net Consolidated Outlay:
              </span>
              <span className="text-2xl font-serif font-extrabold text-white font-tabular">
                {formatPrice(basketTotals.netPayable)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsDossierModalOpen(true)}
              disabled={selectedPlots.length === 0}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Syndicate Dossier</span>
            </button>
            <a
              href={`https://wa.me/919928365001?text=${encodeURIComponent(`Hello Avnish, I am interested in acquiring an aggregated multi-plot estate of ${basketTotals.totalGaj} Gaj (${basketTotals.totalPlots} plots) in Jaipur.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-theme-card border border-luxury-gold/50 text-luxury-goldLight hover:border-luxury-gold transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-luxury-gold" />
              <span>WhatsApp Counsel</span>
            </a>
          </div>
        </div>
      </div>

      {/* Geotechnical Subsoil & Hydrology Telemetry Specs Table */}
      <div className="mt-6 pt-6 border-t border-luxury-gold/20">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-luxury-goldLight mb-3 flex items-center gap-2">
          <Droplets className="w-3.5 h-3.5 text-luxury-gold" />
          On-Site Geotechnical & Hydrological Total Station Telemetry
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-black/40 border border-luxury-gold/20">
            <span className="text-[10px] text-theme-muted uppercase block">Water Table Depth</span>
            <span className="text-white font-bold block mt-0.5">140–160 Ft (CGWB)</span>
            <span className="text-[9px] text-emerald-400 block mt-0.5">Treated Potable Base</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-luxury-gold/20">
            <span className="text-[10px] text-theme-muted uppercase block">Soil Bearing Capacity</span>
            <span className="text-white font-bold block mt-0.5">180 kN/m² (Hard Murram)</span>
            <span className="text-[9px] text-emerald-400 block mt-0.5">Zero Pile Foundation Cost</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-luxury-gold/20">
            <span className="text-[10px] text-theme-muted uppercase block">Seismic Hazard Index</span>
            <span className="text-white font-bold block mt-0.5">Zone II (Low Damage)</span>
            <span className="text-[9px] text-emerald-400 block mt-0.5">BIS IS-1893 Certified</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-luxury-gold/20">
            <span className="text-[10px] text-theme-muted uppercase block">High-Tension HT Buffer</span>
            <span className="text-white font-bold block mt-0.5">&gt; 250 Meters Clear</span>
            <span className="text-[9px] text-emerald-400 block mt-0.5">Underground Feed Line</span>
          </div>
        </div>
      </div>

      {/* Syndicate Dossier Modal */}
      {isDossierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl royal-obsidian-card p-6 sm:p-8 border-2 border-luxury-gold shadow-2xl leather-stitch-outline">
            <div className="brass-screw absolute top-3 left-3" />
            <div className="brass-screw absolute top-3 right-3" />
            <div className="brass-screw absolute bottom-3 left-3" />
            <div className="brass-screw absolute bottom-3 right-3" />

            <div className="text-center pb-4 border-b border-luxury-gold/30 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-goldLight font-bold block">
                Fiduciary Land Advisory • Jaipur
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                VIP Syndicate Land Acquisition Dossier
              </h3>
              <p className="text-xs font-mono text-theme-muted mt-1">
                Dossier Code: AVM-SYN-{basketTotals.totalGaj}G-{Date.now().toString().slice(-4)}
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs mb-6 bg-black/50 p-4 rounded-xl border border-luxury-gold/20">
              <div className="flex justify-between">
                <span className="text-theme-muted">Aggregated Estate Size:</span>
                <span className="text-white font-bold">{basketTotals.totalGaj} Gaj ({basketTotals.totalPlots} Enclave Plots)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Continuous Frontage:</span>
                <span className="text-luxury-gold font-bold">~{basketTotals.estimatedFrontageFt} Linear Feet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Consolidated Base Outlay:</span>
                <span className="text-white font-bold">{formatPrice(basketTotals.totalAcquisitionBase)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Statutory Stamp Duty (7.5%):</span>
                <span className="text-amber-400">+{formatPrice(basketTotals.stampDuty)}</span>
              </div>
              {basketTotals.bulkRebate > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Syndicate Volume Incentive:</span>
                  <span>-{formatPrice(basketTotals.bulkRebate)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-serif font-bold">
                <span className="text-luxury-gold">Net Consolidated Payable:</span>
                <span className="text-white">{formatPrice(basketTotals.netPayable)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Print Official Dossier</span>
              </button>
              <button
                onClick={() => setIsDossierModalOpen(false)}
                className="py-2.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-theme-card border border-white/20 text-white hover:border-luxury-gold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

