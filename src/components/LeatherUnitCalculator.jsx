import React, { useState } from 'react';
import { RotateCcw, Maximize2, Ruler, DollarSign, Info, Sparkles, Compass, ShieldCheck, FileCheck } from 'lucide-react';

export const LeatherUnitCalculator = () => {
  const [activeTab, setActiveTab] = useState('area'); // 'area' | 'length' | 'price'
  const [inputValue, setInputValue] = useState(1);
  const [areaUnit, setAreaUnit] = useState('sqm'); // 'sqm' | 'gaj' | 'sqft' | 'bigha' | 'biswa'
  const [lengthUnit, setLengthUnit] = useState('metre'); // 'metre' | 'gaj' | 'feet'
  const [priceUnit, setPriceUnit] = useState('perGaj'); // 'perGaj' | 'perSqFt'
  const [leatherFinish, setLeatherFinish] = useState('emerald'); // 'emerald' | 'cognac'

  const handleReset = () => {
    setInputValue(1);
    setAreaUnit('sqm');
    setLengthUnit('metre');
    setPriceUnit('perGaj');
  };

  const handlePresetClick = (val) => {
    setInputValue(val);
    setAreaUnit('gaj');
  };

  const setPreset = (val, unit) => {
    setInputValue(val);
    if (unit) setAreaUnit(unit);
  };

  const val = parseFloat(inputValue) || 0;

  // Area Calculations (Base in Sq Metre)
  const getSqMetres = () => {
    switch (areaUnit) {
      case 'sqm':
        return val;
      case 'gaj':
        return val * 0.836127;
      case 'sqft':
        return val * 0.092903;
      case 'bigha':
        return val * 2529.28; // Standard Rajasthan Pukka Bigha
      case 'biswa':
        return val * 126.46;
      default:
        return val;
    }
  };

  const baseSqM = getSqMetres();
  const areaGaj = (baseSqM * 1.19599).toFixed(2);
  const areaSqFt = (baseSqM * 10.7639).toFixed(1);
  const areaSqM = baseSqM.toFixed(2);
  const areaBigha = (baseSqM / 2529.28).toFixed(4);
  const areaBiswa = (baseSqM / 126.46).toFixed(2);

  // Length Calculations (Base in Metre)
  const getMetres = () => {
    switch (lengthUnit) {
      case 'metre':
        return val;
      case 'gaj':
        return val * 0.9144;
      case 'feet':
        return val * 0.3048;
      default:
        return val;
    }
  };

  const baseM = getMetres();
  const lengthGaj = (baseM * 1.09361).toFixed(2);
  const lengthFeet = (baseM * 3.28084).toFixed(2);
  const lengthMetre = baseM.toFixed(2);

  // Price Calculations
  const ratePerGaj = priceUnit === 'perGaj' ? val : val * 9;
  const ratePerSqFt = (ratePerGaj / 9).toFixed(1);
  const ratePerSqM = (ratePerGaj * 1.19599).toFixed(1);
  const ratePerBigha = Math.round(ratePerGaj * 3025);
  const ratePerBiswa = Math.round(ratePerGaj * 151.25);

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      {/* Top Leather Hide Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 px-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-theme-primary">
            Artisan Handcrafted Leather Desk Pad
          </span>
        </div>

        {/* Dual Leather Finish Switcher */}
        <div className="inline-flex items-center p-1 rounded-full bg-black/60 border border-luxury-gold/40 shadow-lg text-[11px]">
          <button
            onClick={() => setLeatherFinish('emerald')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition-all ${
              leatherFinish === 'emerald'
                ? 'bg-gradient-to-r from-[#0b1120] to-indigo-900 text-slate-200 border border-amber-400/40 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Cosmic Obsidian Velvet</span>
          </button>
          <button
            onClick={() => setLeatherFinish('cognac')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition-all ${
              leatherFinish === 'cognac'
                ? 'bg-gradient-to-r from-[#0f172a] to-[#0b1120] text-luxury-goldLight border border-luxury-gold/60 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Imperial Gold Stitched Folio</span>
          </button>
        </div>
      </div>

      {/* Handcrafted Stitched Leather Plaque */}
      <div
        className={`rounded-3xl p-6 sm:p-9 relative overflow-hidden transition-all duration-500 shadow-2xl ${
          leatherFinish === 'cognac' ? 'leather-cognac-container' : 'leather-badge-container'
        }`}
      >
        {/* 4 Antiqued Polished Brass Corner Screws */}
        <div className="brass-screw absolute top-4 left-4" title="Artisan Solid Brass Rivet"></div>
        <div className="brass-screw absolute top-4 right-4" title="Artisan Solid Brass Rivet"></div>
        <div className="brass-screw absolute bottom-4 left-4" title="Artisan Solid Brass Rivet"></div>
        <div className="brass-screw absolute bottom-4 right-4" title="Artisan Solid Brass Rivet"></div>

        {/* Inner Saddle Stitched Border (Silk Thread Effect) */}
        <div className="leather-stitch-border rounded-2xl p-5 sm:p-7 dark:bg-black/30 bg-slate-50/70 backdrop-blur-sm relative">
          {/* Header Deboss Emblem */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-luxury-gold/25">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-luxury-gold" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-500 font-semibold leather-deboss-gold">
                AVM TALKS • RAJASTHAN REVENUE LEDGER
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider dark:text-white/60 text-slate-600 dark:bg-black/40 bg-slate-200/70 px-2.5 py-0.5 rounded-full border border-luxury-gold/20">
              Section 90-A Standard
            </span>
          </div>

          {/* Top Leather Tabs */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
            <button
              onClick={() => setActiveTab('area')}
              className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                activeTab === 'area'
                  ? 'bg-gold-gradient text-luxury-darker font-black border border-amber-200'
                  : 'dark:bg-black/50 bg-slate-100 dark:text-luxury-goldLight/80 text-slate-700 hover:dark:bg-black/70 hover:bg-slate-200 border dark:border-luxury-gold/30 border-slate-300'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>AREA</span>
            </button>

            <button
              onClick={() => setActiveTab('length')}
              className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                activeTab === 'length'
                  ? 'bg-gold-gradient text-luxury-darker font-black border border-amber-200'
                  : 'dark:bg-black/50 bg-slate-100 dark:text-luxury-goldLight/80 text-slate-700 hover:dark:bg-black/70 hover:bg-slate-200 border dark:border-luxury-gold/30 border-slate-300'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>LENGTH</span>
            </button>

            <button
              onClick={() => setActiveTab('price')}
              className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                activeTab === 'price'
                  ? 'bg-gold-gradient text-luxury-darker font-black border border-amber-200'
                  : 'dark:bg-black/50 bg-slate-100 dark:text-luxury-goldLight/80 text-slate-700 hover:dark:bg-black/70 hover:bg-slate-200 border dark:border-luxury-gold/30 border-slate-300'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>PRICE RATE</span>
            </button>
          </div>

          {/* Preset Quick Sizing Chips */}
          {activeTab === 'area' && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-semibold mr-1">
                POPULAR PLOT SIZES:
              </span>
              {[100, 111, 150, 166, 200, 250, 300, 500].map((sz) => (
                <button
                  key={sz}
                  onClick={() => handlePresetClick(sz)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    areaUnit === 'gaj' && parseFloat(inputValue) === sz
                      ? 'bg-gold-gradient text-luxury-darker border border-luxury-gold'
                      : 'dark:bg-black/40 bg-slate-100 dark:text-luxury-goldLight text-slate-700 border dark:border-luxury-gold/20 border-slate-300 hover:border-luxury-gold'
                  }`}
                >
                  {sz} Gaj
                </button>
              ))}
            </div>
          )}

          {/* Inputs Row with Inset Beveled Leather Wells */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6 items-end">
            <div className="sm:col-span-5">
              <label className="block text-[11px] uppercase tracking-widest text-amber-600 font-semibold mb-1.5 leather-deboss-gold">
                ENTER NUMERICAL VALUE
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl dark:bg-black/75 bg-white border dark:border-luxury-gold/50 border-slate-300 text-lg font-mono font-bold dark:text-white text-slate-900 shadow-inner focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/50"
                  placeholder="Enter value"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[11px] uppercase tracking-widest text-amber-600 font-semibold mb-1.5 leather-deboss-gold">
                SELECT BASE UNIT
              </label>
              {activeTab === 'area' && (
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl dark:bg-black/75 bg-white border dark:border-luxury-gold/50 border-slate-300 text-xs font-semibold dark:text-white text-slate-900 focus:outline-none focus:border-luxury-gold"
                >
                  <option value="sqm">Square Metre (sq m)</option>
                  <option value="gaj">Square Yard / Gaj (gaj)</option>
                  <option value="sqft">Square Feet (sq ft)</option>
                  <option value="bigha">Rajasthan Pukka Bigha</option>
                  <option value="biswa">Biswa (1/20 Bigha)</option>
                </select>
              )}

              {activeTab === 'length' && (
                <select
                  value={lengthUnit}
                  onChange={(e) => setLengthUnit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl dark:bg-black/75 bg-white border dark:border-luxury-gold/50 border-slate-300 text-xs font-semibold dark:text-white text-slate-900 focus:outline-none focus:border-luxury-gold"
                >
                  <option value="metre">Metre (m)</option>
                  <option value="gaj">Gaj / Linear Yard (yd)</option>
                  <option value="feet">Feet (ft)</option>
                </select>
              )}

              {activeTab === 'price' && (
                <select
                  value={priceUnit}
                  onChange={(e) => setPriceUnit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl dark:bg-black/75 bg-white border dark:border-luxury-gold/50 border-slate-300 text-xs font-semibold dark:text-white text-slate-900 focus:outline-none focus:border-luxury-gold"
                >
                  <option value="perGaj">Rate per Gaj (₹ / Sq.Yd)</option>
                  <option value="perSqFt">Rate per Sq.Ft (₹ / Sq.Ft)</option>
                </select>
              )}
            </div>

            <div className="sm:col-span-3">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A35C] to-[#E2C178] hover:from-[#E2C178] hover:to-[#C9A35C] text-luxury-darker font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET</span>
              </button>
            </div>
          </div>

          {/* Primary Result Plaque: Embossed Leather Inset */}
          <div className="p-6 rounded-2xl bg-black/70 border border-luxury-gold/40 mb-6 shadow-inner relative">
            {activeTab === 'area' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-5xl font-serif font-black text-gold-gradient tracking-tight">
                      {areaGaj}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-luxury-goldLight font-bold font-mono">
                      SQUARE YARDS (GAJ)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    Primary Plot Metric
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-luxury-gold/25 text-xs">
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Square Feet</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">{areaSqFt} <span className="text-xs font-normal dark:text-white/60 text-slate-500">sq ft</span></span>
                  </div>
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Square Metre</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">{areaSqM} <span className="text-xs font-normal dark:text-white/60 text-slate-500">sq m</span></span>
                  </div>
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Rajasthan Pukka Bigha</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">{areaBigha} <span className="text-xs font-normal dark:text-white/60 text-slate-500">Bigha</span></span>
                  </div>
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Biswa (1/20 Bigha)</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">{areaBiswa} <span className="text-xs font-normal dark:text-white/60 text-slate-500">Biswa</span></span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'length' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-5xl font-serif font-black text-gold-gradient tracking-tight">
                      {lengthFeet}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-amber-500 font-bold font-mono">
                      RUNNING FEET (FT)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    Road & Frontage Metric
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-luxury-gold/25 text-xs">
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Gaj / Linear Yard</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">{lengthGaj} <span className="text-xs font-normal dark:text-white/60 text-slate-500">Gaj</span></span>
                  </div>
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Metric Metres</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">{lengthMetre} <span className="text-xs font-normal dark:text-white/60 text-slate-500">m</span></span>
                  </div>
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Inches</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">{(baseM * 39.3701).toFixed(1)} <span className="text-xs font-normal dark:text-white/60 text-slate-500">in</span></span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'price' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-5xl font-serif font-black text-gold-gradient tracking-tight">
                      ₹{Number(ratePerGaj).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-amber-500 font-bold font-mono">
                      RATE PER GAJ (₹ / SQ.YD)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    Registry Valuation Basis
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-luxury-gold/25 text-xs">
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Rate per Sq.Ft</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">₹{ratePerSqFt} <span className="text-xs font-normal dark:text-white/60 text-slate-500">/ sq ft</span></span>
                  </div>
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Rate per Sq.Metre</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">₹{ratePerSqM} <span className="text-xs font-normal dark:text-white/60 text-slate-500">/ sq m</span></span>
                  </div>
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Rate per Bigha</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">₹{(ratePerBigha / 100000).toFixed(1)}L <span className="text-xs font-normal dark:text-white/60 text-slate-500">/ bigha</span></span>
                  </div>
                  <div className="p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-100/90 border dark:border-white/[0.05] border-slate-200">
                    <span className="text-[10px] text-amber-600 uppercase block font-semibold">Rate per Biswa</span>
                    <span className="font-mono dark:text-white text-slate-900 text-base font-bold">₹{ratePerBiswa} <span className="text-xs font-normal dark:text-white/60 text-slate-500">/ biswa</span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Statutory Heritage Footnote */}
          <div className="text-[11px] text-[#F3E5AB]/90 font-light leading-relaxed flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-luxury-gold/20">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-luxury-gold" />
            <p>
              <strong>Statutory Formula:</strong> 1 Square Metre ≈ 1.196 Square Yard (Gaj) | 1 Pukka Bigha = 20 Biswa = 3,025 Sq.Yards (2,529.28 Sq.M). Rates and conversions reflect official Rajasthan Revenue Department conventions. Always confirm registered measurements on the physical Section 90-A Patta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
