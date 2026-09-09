import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Eye, CheckCircle2, ShieldCheck, Car, Maximize2, 
  Sparkles, Filter, Layers, DollarSign, ArrowRight, Info, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Mock Cadastral Plot Dataset
const CADASTRAL_PLOTS = [
  // Sector A - 80ft Boulevard
  { id: 'A-101', sector: 'Sector A', sizeGaj: 250, widthFt: 37.5, depthFt: 60, facing: 'East', road: '80 Ft Boulevard', status: 'available', ratePerGaj: 19500, x: 50, y: 50, w: 90, h: 60 },
  { id: 'A-102', sector: 'Sector A', sizeGaj: 250, widthFt: 37.5, depthFt: 60, facing: 'East', road: '80 Ft Boulevard', status: 'hold', ratePerGaj: 19500, x: 150, y: 50, w: 90, h: 60 },
  { id: 'A-103', sector: 'Sector A', sizeGaj: 500, widthFt: 60, depthFt: 75, facing: 'North', road: '80 Ft Boulevard', status: 'available', ratePerGaj: 21000, x: 250, y: 50, w: 140, h: 60 },
  { id: 'A-104', sector: 'Sector A', sizeGaj: 250, widthFt: 37.5, depthFt: 60, facing: 'North', road: '80 Ft Boulevard', status: 'demarcated', ratePerGaj: 19500, x: 400, y: 50, w: 90, h: 60 },
  { id: 'A-105', sector: 'Sector A', sizeGaj: 250, widthFt: 37.5, depthFt: 60, facing: 'East', road: '80 Ft Boulevard', status: 'available', ratePerGaj: 19500, x: 500, y: 50, w: 90, h: 60 },

  // Sector B - Parkview Central
  { id: 'B-201', sector: 'Sector B', sizeGaj: 200, widthFt: 30, depthFt: 60, facing: 'East', road: '60 Ft Avenue', status: 'available', ratePerGaj: 18500, x: 50, y: 160, w: 80, h: 55 },
  { id: 'B-202', sector: 'Sector B', sizeGaj: 200, widthFt: 30, depthFt: 60, facing: 'North', road: '60 Ft Avenue', status: 'available', ratePerGaj: 18500, x: 140, y: 160, w: 80, h: 55 },
  { id: 'B-203', sector: 'Sector B', sizeGaj: 150, widthFt: 25, depthFt: 54, facing: 'East', road: '40 Ft Road', status: 'hold', ratePerGaj: 17500, x: 230, y: 160, w: 70, h: 55 },
  { id: 'B-204', sector: 'Sector B', sizeGaj: 150, widthFt: 25, depthFt: 54, facing: 'North', road: '40 Ft Road', status: 'available', ratePerGaj: 17500, x: 310, y: 160, w: 70, h: 55 },
  { id: 'B-205', sector: 'Sector B', sizeGaj: 200, widthFt: 30, depthFt: 60, facing: 'East', road: '60 Ft Avenue', status: 'available', ratePerGaj: 18500, x: 390, y: 160, w: 80, h: 55 },
  { id: 'B-206', sector: 'Sector B', sizeGaj: 200, widthFt: 30, depthFt: 60, facing: 'North', road: '60 Ft Avenue', status: 'demarcated', ratePerGaj: 18500, x: 480, y: 160, w: 80, h: 55 },

  // Sector C - Executive
  { id: 'C-301', sector: 'Sector C', sizeGaj: 111, widthFt: 20, depthFt: 50, facing: 'East', road: '30 Ft Road', status: 'available', ratePerGaj: 16500, x: 50, y: 260, w: 65, h: 50 },
  { id: 'C-302', sector: 'Sector C', sizeGaj: 111, widthFt: 20, depthFt: 50, facing: 'East', road: '30 Ft Road', status: 'available', ratePerGaj: 16500, x: 125, y: 260, w: 65, h: 50 },
  { id: 'C-303', sector: 'Sector C', sizeGaj: 150, widthFt: 25, depthFt: 54, facing: 'North', road: '40 Ft Road', status: 'available', ratePerGaj: 17000, x: 200, y: 260, w: 75, h: 50 },
  { id: 'C-304', sector: 'Sector C', sizeGaj: 150, widthFt: 25, depthFt: 54, facing: 'North', road: '40 Ft Road', status: 'hold', ratePerGaj: 17000, x: 285, y: 260, w: 75, h: 50 },
  { id: 'C-305', sector: 'Sector C', sizeGaj: 111, widthFt: 20, depthFt: 50, facing: 'East', road: '30 Ft Road', status: 'available', ratePerGaj: 16500, x: 370, y: 260, w: 65, h: 50 },
  { id: 'C-306', sector: 'Sector C', sizeGaj: 111, widthFt: 20, depthFt: 50, facing: 'East', road: '30 Ft Road', status: 'available', ratePerGaj: 16500, x: 445, y: 260, w: 65, h: 50 },
  { id: 'C-307', sector: 'Sector C', sizeGaj: 150, widthFt: 25, depthFt: 54, facing: 'North', road: '40 Ft Road', status: 'demarcated', ratePerGaj: 17000, x: 520, y: 260, w: 75, h: 50 },

  // Commercial Frontage Boulevard
  { id: 'COMM-01', sector: 'Commercial Strip', sizeGaj: 300, widthFt: 40, depthFt: 67.5, facing: 'North', road: '80 Ft Expressway Link', status: 'available', ratePerGaj: 28000, x: 50, y: 360, w: 120, h: 65 },
  { id: 'COMM-02', sector: 'Commercial Strip', sizeGaj: 300, widthFt: 40, depthFt: 67.5, facing: 'North', road: '80 Ft Expressway Link', status: 'available', ratePerGaj: 28000, x: 180, y: 360, w: 120, h: 65 },
  { id: 'COMM-03', sector: 'Commercial Strip', sizeGaj: 450, widthFt: 60, depthFt: 67.5, facing: 'East', road: '80 Ft Expressway Link', status: 'hold', ratePerGaj: 31000, x: 310, y: 360, w: 160, h: 65 },
  { id: 'COMM-04', sector: 'Commercial Strip', sizeGaj: 300, widthFt: 40, depthFt: 67.5, facing: 'North', road: '80 Ft Expressway Link', status: 'available', ratePerGaj: 28000, x: 480, y: 360, w: 120, h: 65 },
];

export const InteractiveCadastralMap = () => {
  const { isHindi } = useLanguage();
  const [selectedPlot, setSelectedPlot] = useState(CADASTRAL_PLOTS[0]);
  const [sectorFilter, setSectorFilter] = useState('all');
  const [facingFilter, setFacingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hoveredPlot, setHoveredPlot] = useState(null);

  // Filtered plots
  const filteredPlots = useMemo(() => {
    return CADASTRAL_PLOTS.filter((plot) => {
      if (sectorFilter !== 'all' && plot.sector !== sectorFilter) return false;
      if (facingFilter !== 'all' && plot.facing !== facingFilter) return false;
      if (statusFilter !== 'all' && plot.status !== statusFilter) return false;
      return true;
    });
  }, [sectorFilter, facingFilter, statusFilter]);

  // Financial calculations for selected plot
  const plotValue = selectedPlot ? selectedPlot.sizeGaj * selectedPlot.ratePerGaj : 0;
  const stampDuty = Math.round(plotValue * 0.075);
  const totalCost = plotValue + stampDuty;

  const statusColor = (status) => {
    switch (status) {
      case 'available':
        return '#D4AF37'; // 24K Gold
      case 'hold':
        return '#F59E0B'; // amber
      case 'demarcated':
        return '#64748B'; // slate
      default:
        return '#D4AF37';
    }
  };

  return (
    <div className="rounded-3xl leather-badge-container p-4 sm:p-8 lg:p-10 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
      {/* 4 Solid Brass Rivets */}
      <div className="brass-screw absolute top-3.5 left-3.5" />
      <div className="brass-screw absolute top-3.5 right-3.5" />
      <div className="brass-screw absolute bottom-3.5 left-3.5" />
      <div className="brass-screw absolute bottom-3.5 right-3.5" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-luxury-gold/30 gap-4">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border dark:border-white/15 border-cyan-300/50 dark:bg-cyan-950/40 bg-cyan-100/80 dark:text-cyan-300 text-cyan-800 font-mono mb-2">
            <Compass className="w-3.5 h-3.5 text-cyan-500" />
            {isHindi ? 'तकनीकी कैडस्ट्रल लेआउट' : 'Technical Cadastral Layout'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-primary">
            {isHindi ? 'इंटरैक्टिव सेक्टर सीमांकन व प्लॉट एक्सप्लोरर' : 'Interactive Sector Demarcation & Plot Selector'}
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary mt-1 max-w-2xl">
            {isHindi 
              ? 'किसी भी प्लॉट पर क्लिक करके उसका सटीक आकार (गज व वर्ग फीट), वास्तु फेसिंग, 80ft/60ft सेक्टर रोड कनेक्टिविटी और कुल बजट देखें।'
              : 'Click any demarcated plot to inspect total frontage, Vastu compliance, road width, and complete acquisition budgeting.'}
          </p>
        </div>

        {/* Status Color Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-gradient-to-tr from-[#D4AF37] to-[#FFF0C8] border border-amber-300" />
            <span className="text-theme-secondary">{isHindi ? 'उपलब्ध (Available)' : 'Available'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500 border border-amber-300" />
            <span className="text-theme-secondary">{isHindi ? 'ड्यू डिलिजेंस होल्ड' : 'VIP Hold'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-500 border border-slate-400" />
            <span className="text-theme-secondary">{isHindi ? 'सीमांकित / बुक' : 'Demarcated'}</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl dark:bg-black/40 bg-theme-surface border border-theme-gold/25">
        {/* Sector Filter */}
        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-luxury-gold font-bold block mb-1">
            {isHindi ? 'सेक्टर चुनें:' : 'Select Sector:'}
          </label>
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl dark:bg-[#0b1120] bg-theme-card border dark:border-white/15 border-theme-gold/30 text-xs text-theme-primary focus:outline-none focus:border-cyan-400 font-medium"
          >
            <option value="all">{isHindi ? 'सभी सेक्टर (All Sectors)' : 'All Sectors'}</option>
            <option value="Sector A">Sector A (80ft Boulevard)</option>
            <option value="Sector B">Sector B (Parkview 60ft)</option>
            <option value="Sector C">Sector C (Executive 40ft)</option>
            <option value="Commercial Strip">Commercial Frontage</option>
          </select>
        </div>

        {/* Facing Filter */}
        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-luxury-gold font-bold block mb-1">
            {isHindi ? 'वास्तु दिशा (Facing):' : 'Vastu Facing:'}
          </label>
          <select
            value={facingFilter}
            onChange={(e) => setFacingFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl dark:bg-[#0b1120] bg-theme-card border dark:border-white/15 border-theme-gold/30 text-xs text-theme-primary focus:outline-none focus:border-cyan-400 font-medium"
          >
            <option value="all">{isHindi ? 'सभी दिशाएं (All Facings)' : 'All Facings'}</option>
            <option value="East">East Facing (पूर्व मुखी)</option>
            <option value="North">North Facing (उत्तर मुखी)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-luxury-gold font-bold block mb-1">
            {isHindi ? 'उपलब्धता स्टेटस:' : 'Availability Status:'}
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl dark:bg-[#0b1120] bg-theme-card border dark:border-white/15 border-theme-gold/30 text-xs text-theme-primary focus:outline-none focus:border-cyan-400 font-medium"
          >
            <option value="all">{isHindi ? 'सभी प्लॉट्स' : 'All Statuses'}</option>
            <option value="available">{isHindi ? 'केवल उपलब्ध' : 'Available Only'}</option>
            <option value="hold">{isHindi ? 'केवल वीआईपी होल्ड' : 'VIP Hold'}</option>
            <option value="demarcated">{isHindi ? 'केवल सीमांकित' : 'Demarcated'}</option>
          </select>
        </div>
      </div>

      {/* Main Grid: CAD SVG Canvas on Left, Live Plot Spec Sheet on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive SVG CAD Map */}
        <div className="lg:col-span-8 rounded-2xl bg-[#0b1120] border-2 border-white/15 p-4 sm:p-6 shadow-2xl relative overflow-x-auto">
          {/* Top Compass Rose */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 border border-luxury-gold/30 text-[10px] font-mono text-luxury-gold">
            <Compass className="w-3.5 h-3.5 text-luxury-gold" />
            <span>NORTH ↑</span>
          </div>

          <p className="text-[11px] font-mono text-luxury-goldLight mb-3">
            CAD DGPS Grid • Scale 1:1500 • Click any plot box to inspect
          </p>

          <svg 
            viewBox="0 0 650 460" 
            className="w-full h-auto min-w-[550px] select-none"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
          >
            {/* Blueprint Grid Lines */}
            <defs>
              <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="650" height="460" fill="#060b17" />
            <rect width="650" height="460" fill="url(#cadGrid)" />

            {/* Road Label 1: 80ft Boulevard Top */}
            <rect x="30" y="115" width="590" height="35" fill="#0f172a" stroke="#06b6d4" strokeWidth="0.75" strokeDasharray="4 2" />
            <text x="325" y="137" fill="#38bdf8" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              ✦ 80 FT MAIN SECTOR BOULEVARD ✦
            </text>

            {/* Road Label 2: 60ft Secondary Avenue Middle */}
            <rect x="30" y="220" width="590" height="30" fill="#0f172a" stroke="#06b6d4" strokeWidth="0.75" strokeDasharray="4 2" />
            <text x="325" y="239" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              ✦ 60 FT ARTERIAL CONNECTOR ROAD ✦
            </text>

            {/* Road Label 3: Commercial Strip Road Bottom */}
            <rect x="30" y="315" width="590" height="35" fill="#0f172a" stroke="#06b6d4" strokeWidth="0.75" strokeDasharray="4 2" />
            <text x="325" y="337" fill="#38bdf8" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              ✦ 80 FT EXPRESSWAY SERVICE CORRIDOR ✦
            </text>

            {/* Render Plots */}
            {filteredPlots.map((plot) => {
              const isSelected = selectedPlot?.id === plot.id;
              const isHovered = hoveredPlot?.id === plot.id;
              const baseColor = statusColor(plot.status);

              return (
                <g 
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  onMouseEnter={() => setHoveredPlot(plot)}
                  onMouseLeave={() => setHoveredPlot(null)}
                  className="cursor-pointer transition-all"
                >
                  <rect
                    x={plot.x}
                    y={plot.y}
                    width={plot.w}
                    height={plot.h}
                    rx="4"
                    fill={isSelected ? '#06b6d4' : isHovered ? '#0e7490' : '#0b1120'}
                    stroke={isSelected ? '#FFF' : baseColor}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    strokeDasharray={plot.status === 'hold' ? '3 1' : 'none'}
                    className="transition-colors duration-200"
                  />
                  {/* Plot ID Text */}
                  <text
                    x={plot.x + plot.w / 2}
                    y={plot.y + plot.h / 2 - 4}
                    fill={isSelected ? '#030712' : '#FFF'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {plot.id}
                  </text>
                  {/* Plot Size Text */}
                  <text
                    x={plot.x + plot.w / 2}
                    y={plot.y + plot.h / 2 + 10}
                    fill={isSelected ? '#030712' : '#38bdf8'}
                    fontSize="9"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                  >
                    {plot.sizeGaj} Gaj
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Live Plot Spec Sheet */}
        <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-[#0f172a] via-[#0b1120] to-[#030712] border-2 border-luxury-gold p-6 shadow-2xl space-y-5">
          {selectedPlot ? (
            <>
              {/* Header */}
              <div className="border-b border-luxury-gold/30 pb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-[#0b1120] text-cyan-300 border border-white/15">
                    {selectedPlot.sector}
                  </span>
                  <span 
                    className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold"
                    style={{
                      backgroundColor: selectedPlot.status === 'available' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: selectedPlot.status === 'available' ? '#F3DE9A' : '#FBBF24',
                      border: `1px solid ${selectedPlot.status === 'available' ? '#D4AF37' : '#D97706'}`
                    }}
                  >
                    {selectedPlot.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Plot #{selectedPlot.id}
                </h3>
                <p className="text-xs text-luxury-goldLight font-mono">
                  {selectedPlot.road} • {selectedPlot.facing} Facing
                </p>
              </div>

              {/* Technical Dimensions Matrix */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#0b1120] border border-white/10 flex items-center justify-between">
                  <span className="text-white/70 font-sans">{isHindi ? 'प्लॉट क्षेत्रफल (Area):' : 'Total Area:'}</span>
                  <strong className="text-white">{selectedPlot.sizeGaj} Gaj ({selectedPlot.sizeGaj * 9} Sq.Ft)</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0b1120] border border-white/10 flex items-center justify-between">
                  <span className="text-white/70 font-sans">{isHindi ? 'आयाम (Dimensions):' : 'Dimensions:'}</span>
                  <strong className="text-white">{selectedPlot.widthFt}' Front × {selectedPlot.depthFt}' Depth</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0b1120] border border-white/10 flex items-center justify-between">
                  <span className="text-white/70 font-sans">{isHindi ? 'सड़क चौड़ाई (Frontage):' : 'Road Frontage:'}</span>
                  <strong className="text-cyan-300">{selectedPlot.road}</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0b1120] border border-white/10 flex items-center justify-between">
                  <span className="text-white/70 font-sans">{isHindi ? 'दर (Rate / Gaj):' : 'Rate Per Gaj:'}</span>
                  <strong className="text-gold-gradient text-sm">₹{selectedPlot.ratePerGaj.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Acquisition Outlay Calculation */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#060b17] to-[#0b1120] border border-white/15 text-xs space-y-1.5">
                <div className="flex justify-between text-white/80">
                  <span>{isHindi ? 'मूल भूमि मूल्य:' : 'Base Land Value:'}</span>
                  <span className="font-mono font-bold">₹{plotValue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-white/60 text-[11px]">
                  <span>{isHindi ? 'अनुमानित स्टाम्प व रजिस्ट्री (≈7.5%):' : 'Est. Stamp Duty (≈7.5%):'}</span>
                  <span className="font-mono">₹{stampDuty.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-luxury-gold/30 flex justify-between font-serif text-sm font-bold text-luxury-goldLight">
                  <span>{isHindi ? 'कुल अनुमानित लागत:' : 'Total Acquisition Outlay:'}</span>
                  <span className="text-gold-gradient font-mono">₹{totalCost.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <Link
                  to="/book-visit"
                  className="w-full py-3 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Car className="w-4 h-4" />
                  <span>{isHindi ? 'प्लॉट सीमांकन विजिट बुक करें' : 'Reserve Ground Demarcation Visit'}</span>
                </Link>

                <a
                  href={`tel:9928365001`}
                  className="w-full py-2.5 rounded-xl border border-luxury-gold/50 bg-black/40 text-luxury-goldLight text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-black/60 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'फील्ड कोऑर्डिनेटर से बात करें' : 'Call Territory Coordinator'}</span>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-10 text-white/60">
              <Info className="w-8 h-8 text-luxury-gold mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Select any plot on the map to inspect specifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
