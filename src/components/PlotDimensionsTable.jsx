import React, { useState } from 'react';
import { PLOT_DIMENSIONS_DATA } from '../data/plotSizes';
import { Store, Building, Home, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PlotDimensionsTable = () => {
  const [activeTab, setActiveTab] = useState('residential'); // 'residential' | 'commercial' | 'shops'

  const currentData = PLOT_DIMENSIONS_DATA[activeTab];

  return (
    <div className="w-full max-w-6xl mx-auto my-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('residential')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
            activeTab === 'residential'
              ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold scale-105'
              : 'bg-theme-surface border border-theme-gold text-theme-secondary hover:border-luxury-gold'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Residential Plot Sizes (60 – 1500 Gaj)</span>
        </button>

        <button
          onClick={() => setActiveTab('commercial')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
            activeTab === 'commercial'
              ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold scale-105'
              : 'bg-theme-surface border border-theme-gold text-theme-secondary hover:border-luxury-gold'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Commercial Plots (145 – 960 Gaj)</span>
        </button>

        <button
          onClick={() => setActiveTab('shops')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
            activeTab === 'shops'
              ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold scale-105'
              : 'bg-theme-surface border border-theme-gold text-theme-secondary hover:border-luxury-gold'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Normal Shop Sizes (16 – 135 Gaj)</span>
        </button>
      </div>

      {/* Dimensions Table Leather Card */}
      <div className="leather-badge-container rounded-3xl overflow-hidden border-2 border-luxury-gold shadow-2xl relative leather-stitch-outline p-2 sm:p-4">
        {/* 4 Solid Brass Screws */}
        <div className="brass-screw absolute top-3 left-3" />
        <div className="brass-screw absolute top-3 right-3" />
        <div className="brass-screw absolute bottom-3 left-3" />
        <div className="brass-screw absolute bottom-3 right-3" />

        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-luxury-emerald/20 border-b border-theme-gold text-xs uppercase tracking-wider text-theme-primary font-bold">
                <th className="py-4 px-6">Area (Sq. Yard / Gaj)</th>
                <th className="py-4 px-6">Area (Sq. Mtr.)</th>
                <th className="py-4 px-6">Front × Width (Meters)</th>
                <th className="py-4 px-6">Front × Width (Approx. Feet)</th>
                <th className="py-4 px-6">Classification</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-gold/20 text-xs sm:text-sm font-light">
              {currentData.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-luxury-gold/5 transition-colors group"
                >
                  <td className="py-4 px-6 font-mono font-bold text-theme-primary text-base">
                    {item.sqYard} <span className="text-xs text-luxury-gold font-normal">Gaj</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-theme-secondary">
                    {item.sqMtr} sq m
                  </td>
                  <td className="py-4 px-6 font-mono text-theme-secondary">
                    {item.meterDim}
                  </td>
                  <td className="py-4 px-6 font-mono font-medium text-theme-primary">
                    {item.feetDim}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-luxury-emerald/10 border border-luxury-gold/30 text-theme-primary">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 text-xs font-bold text-luxury-gold hover:text-luxury-goldLight group-hover:underline"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-theme-card border-t border-theme-gold/30 text-[11px] text-theme-muted flex items-center justify-between">
          <p>
            * Dimensions are standardized benchmarks across sanctioned JDA layouts. Always cross-check the official registered patta map.
          </p>
          <Link to="/contact" className="font-bold text-luxury-gold hover:underline">
            Book Site Demarcation Check →
          </Link>
        </div>
      </div>
    </div>
  );
};
