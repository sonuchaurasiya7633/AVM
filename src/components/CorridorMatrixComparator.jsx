import React, { useState } from 'react';
import { Compass, TrendingUp, ShieldCheck, Zap, Droplets, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { CORRIDORS_DATA } from '../data/insights';
import { useLanguage } from '../context/LanguageContext';

const CORRIDOR_METRICS_MATRIX = [
  {
    id: 'corridor-ajmer-road',
    name: 'Ajmer Road & Tech Corridor (NH-48)',
    badge: 'Class A+ Institutional Grade',
    transitSpeed: '95 km/h (6-Lane NH-48 Expressway)',
    historicalCagr: '21.4% (Last 5 Years)',
    reraRatio: '98% Sanctioned',
    industrialJobs: '85,000+ Tech & Industrial Professionals',
    waterSecurity: 'Bisalpur Dam Pipeline Line-1 Connected',
    connectivityScore: 98,
    investmentHorizon: 'Short-to-Medium (2–4 Years)',
    verdict: 'Highest immediate capital liquidity, rapid tech corridor expansion, and guaranteed JDA Section 90-A legal compliance.'
  },
  {
    id: 'corridor-ring-road',
    name: '47-KM Ring Road Expressway Belt',
    badge: 'Mega-Infrastructure Multiplier',
    transitSpeed: '110 km/h (Access-Controlled Corridor)',
    historicalCagr: '24.8% (Highest Velocity)',
    reraRatio: '94% Sanctioned',
    industrialJobs: 'Multi-Modal Logistics & Export Parks',
    waterSecurity: 'Treated Ring Road Dual Phased Line',
    connectivityScore: 96,
    investmentHorizon: 'Medium-to-Long (3–7 Years)',
    verdict: 'Unprecedented capital appreciation upside driven by heavy commercial vehicular bypass redirection and cloverleaf interchanges.'
  },
  {
    id: 'corridor-dmic',
    name: 'Delhi-Mumbai Expressway Hub',
    badge: 'National Economic Corridor',
    transitSpeed: '120 km/h (8-Lane Electric Expressway)',
    historicalCagr: '19.8% (Institutional Baseline)',
    reraRatio: '92% Sanctioned',
    industrialJobs: 'Freight Warehousing & RIICO Industrial Hub',
    waterSecurity: 'Groundwater + PHED Feeder Channel',
    connectivityScore: 94,
    investmentHorizon: 'Long-Term Generational (5–10 Years)',
    verdict: 'Strategic gateway connecting Jaipur to Mumbai & NCR ports in under 12 hours. Prime for logistics frontage and farm-villa enclaves.'
  }
];

export const CorridorMatrixComparator = () => {
  const { t } = useLanguage();
  const [selectedCorridorId, setSelectedCorridorId] = useState(CORRIDOR_METRICS_MATRIX[0].id);

  const activeData = CORRIDOR_METRICS_MATRIX.find(c => c.id === selectedCorridorId) || CORRIDOR_METRICS_MATRIX[0];

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
            <Compass className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Quantitative Corridor Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white leading-tight">
            Jaipur Highway Corridors Quantitative Growth Matrix
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-1">
            Evaluate and benchmark the 3 primary high-velocity land corridors across transit speeds, historical CAGRs, RERA sanction ratios, and infrastructure connectivity.
          </p>
        </div>

        {/* Corridor Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-luxury-gold/30">
          {CORRIDOR_METRICS_MATRIX.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCorridorId(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedCorridorId === c.id
                  ? 'bg-gold-gradient text-luxury-darker shadow-md'
                  : 'text-luxury-ivory hover:text-luxury-gold'
              }`}
            >
              {c.name.split(' & ')[0].split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Active Corridor Telemetry Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left 5 cols: Scorecard & Verdict */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#060b17] via-[#0b1120] to-[#030712] border-2 border-cyan-500/30 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.2)] relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-goldLight font-bold">
                Connectivity Index
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-gold-gradient text-luxury-darker shadow-sm">
                {activeData.badge}
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-white mb-2">
              {activeData.name}
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-serif font-black text-white font-tabular">
                {activeData.connectivityScore}
              </span>
              <span className="text-xs font-mono text-luxury-goldLight">/ 100 Sovereign Rating</span>
            </div>

            <p className="text-xs text-theme-secondary font-light leading-relaxed mb-4">
              {activeData.verdict}
            </p>
          </div>

          <div className="pt-3 border-t border-luxury-gold/30 flex items-center justify-between text-xs font-mono">
            <span className="text-theme-muted">Target Horizon:</span>
            <span className="text-luxury-gold font-bold">{activeData.investmentHorizon}</span>
          </div>
        </div>

        {/* Right 7 cols: Quantitative Metric Tiles */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs">
          <div className="p-4 rounded-xl bg-theme-card border border-luxury-gold/25 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-luxury-gold mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] uppercase text-theme-muted">Transit Velocity</span>
            </div>
            <span className="text-sm font-bold text-white block">
              {activeData.transitSpeed}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-theme-card border border-luxury-gold/25 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-luxury-gold mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] uppercase text-theme-muted">Historical Capital CAGR</span>
            </div>
            <span className="text-sm font-bold text-gold-gradient block font-tabular">
              {activeData.historicalCagr}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-theme-card border border-luxury-gold/25 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-luxury-goldLight mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] uppercase text-theme-muted">RERA Compliance Ratio</span>
            </div>
            <span className="text-sm font-bold text-white block">
              {activeData.reraRatio}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-theme-card border border-luxury-gold/25 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Droplets className="w-4 h-4" />
              <span className="text-[10px] uppercase text-theme-muted">Water Pipeline Infrastructure</span>
            </div>
            <span className="text-sm font-bold text-white block">
              {activeData.waterSecurity}
            </span>
          </div>

          <div className="sm:col-span-2 p-4 rounded-xl bg-theme-card border border-luxury-gold/25 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-luxury-gold" />
              <span className="text-[11px] text-theme-muted">Employment Base:</span>
            </div>
            <span className="text-xs font-bold text-white">{activeData.industrialJobs}</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix Table */}
      <div className="overflow-x-auto pt-4 border-t border-luxury-gold/20">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-luxury-gold/30 text-luxury-goldLight text-[10px] uppercase">
              <th className="py-2.5 px-3">Corridor</th>
              <th className="py-2.5 px-3">Transit Speed</th>
              <th className="py-2.5 px-3">Historical CAGR</th>
              <th className="py-2.5 px-3">RERA Ratio</th>
              <th className="py-2.5 px-3 text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {CORRIDOR_METRICS_MATRIX.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelectedCorridorId(c.id)}
                className={`cursor-pointer transition-colors ${
                  selectedCorridorId === c.id ? 'bg-luxury-emerald/20 text-white font-bold' : 'text-theme-secondary hover:text-white'
                }`}
              >
                <td className="py-2.5 px-3 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${selectedCorridorId === c.id ? 'bg-luxury-gold' : 'bg-white/20'}`} />
                  {c.name.split(' (')[0]}
                </td>
                <td className="py-2.5 px-3">{c.transitSpeed.split(' (')[0]}</td>
                <td className="py-2.5 px-3 text-luxury-goldLight font-semibold">{c.historicalCagr.split(' (')[0]}</td>
                <td className="py-2.5 px-3">{c.reraRatio}</td>
                <td className="py-2.5 px-3 text-right text-luxury-gold font-bold">{c.connectivityScore}/100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

