import React, { useState, useMemo } from 'react';
import { Compass, Sun, Moon, Wind, ShieldCheck, Sparkles, CheckCircle2, Info, Eye, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VastuSunPathSimulator = () => {
  const { t, isHindi } = useLanguage();
  const [selectedFacing, setSelectedFacing] = useState('East'); // 'East' | 'North' | 'North-East' | 'West'
  const [timeHour, setTimeHour] = useState(10); // 6 to 18 (hours)
  const [activeTab, setActiveTab] = useState('solar'); // 'solar' | 'vastu-zones' | 'recommendations'

  // Sun path calculation based on hour (6 = sunrise East, 12 = noon South, 18 = sunset West)
  const solarState = useMemo(() => {
    // Hour mapped from 6 to 18 (12-hour span)
    const normalized = (timeHour - 6) / 12; // 0.0 to 1.0
    const angleRad = Math.PI * (1 - normalized); // from PI (East/right) to 0 (West/left)
    
    // Coordinates for Sun in an arc (center at (250, 240), radius = 170)
    const cx = 250;
    const cy = 240;
    const r = 170;
    const sunX = cx - Math.cos(angleRad) * r;
    const sunY = cy - Math.sin(angleRad) * 150;

    // Shadow angle and length
    const shadowAngle = (normalized - 0.5) * 80; // degrees
    const shadowLength = Math.max(15, Math.abs(normalized - 0.5) * 90 + 20);
    const shadowOpacity = Math.max(0.2, 0.7 - Math.abs(normalized - 0.5) * 0.5);

    let periodName = 'Midday Zenith';
    let energyDesc = 'Direct vertical illumination. Ideal thermal balance.';
    if (timeHour <= 7) {
      periodName = 'Brahma Muhurta / Dawn';
      energyDesc = 'Purifying UV-free morning sun rays. Maximum Ishanya energization.';
    } else if (timeHour <= 10) {
      periodName = 'Morning Absorption';
      energyDesc = 'Optimal 45° angle illumination. Vitamin-D synthesized natural lighting.';
    } else if (timeHour >= 16) {
      periodName = 'Sandhya / Sunset Horizon';
      energyDesc = 'Low-intensity evening twilight. Nairutya (South-West) cooling phase.';
    } else if (timeHour >= 13) {
      periodName = 'Afternoon Peak Heat';
      energyDesc = 'South-West thermal absorption. Heavy buffer walls recommended.';
    }

    return {
      sunX,
      sunY,
      shadowAngle,
      shadowLength,
      shadowOpacity,
      periodName,
      energyDesc,
      elevationDeg: Math.round(Math.sin(angleRad) * 78)
    };
  }, [timeHour]);

  // Vastu compliance metrics based on facing
  const vastuMetrics = useMemo(() => {
    switch (selectedFacing) {
      case 'East':
        return {
          score: 96,
          rating: 'Supreme Sovereign (Class A+)',
          verdict: 'Sunrise entry brings longevity, positive solar flux, and statutory layout priority.',
          ishanyaScore: 98,
          kuberScore: 92,
          bramhasthan: 'Completely Open & Unobstructed',
          color: '#D4AF37'
        };
      case 'North-East':
        return {
          score: 99,
          rating: 'Divine Ishanya Sanctum (Ultimate)',
          verdict: 'Two-sided arterial corner opening into North & East. Unrivaled prosperity matrix.',
          ishanyaScore: 100,
          kuberScore: 98,
          bramhasthan: 'Naturally Harmonized',
          color: '#D4AF37'
        };
      case 'North':
        return {
          score: 94,
          rating: 'Kuber Treasury Gateway (Class A)',
          verdict: 'Attracts commercial liquidity and intellectual growth. Minimum afternoon thermal load.',
          ishanyaScore: 94,
          kuberScore: 99,
          bramhasthan: 'Unrestricted Cross Ventilation',
          color: '#E2C178'
        };
      default: // West
        return {
          score: 87,
          rating: 'Varuna Water Direction (Class B+)',
          verdict: 'Requires thickened South-West boundary and entrance placed in 4th/5th Vastu Pada.',
          ishanyaScore: 85,
          kuberScore: 88,
          bramhasthan: 'Requires Central Courtyard',
          color: '#F59E0B'
        };
    }
  }, [selectedFacing]);

  const vastuZones = [
    { dir: 'Ishanya (NE)', elem: 'Water (Jal)', use: 'Puja Room / Borewell / Lawn', score: '100% Ideal' },
    { dir: 'Purva (East)', elem: 'Sun (Surya)', use: 'Main Foyer / Large Verandah', score: '98% Ideal' },
    { dir: 'Agneya (SE)', elem: 'Fire (Agni)', use: 'Kitchen / Electrical Panel', score: 'Sanctified' },
    { dir: 'Dakshin (South)', elem: 'Earth (Prithvi)', use: 'Heavy Buffer Wall / Stairs', score: 'Compliant' },
    { dir: 'Nairutya (SW)', elem: 'Earth (Prithvi)', use: 'Master Bedroom (Highest Point)', score: 'Highest Stability' },
    { dir: 'Paschim (West)', elem: 'Air/Water', use: 'Study / Overhead Water Tank', score: 'Standard' },
    { dir: 'Vayavya (NW)', elem: 'Air (Vayu)', use: 'Guest Suite / Garage Driveway', score: 'Harmonious' },
    { dir: 'Uttar (North)', elem: 'Kuber (Wealth)', use: 'Living Pavilion / Open Greens', score: '99% Prosperous' }
  ];

  return (
    <div className="leather-badge-container rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
      {/* 4 Corner Brass Screws */}
      <div className="brass-screw absolute top-3.5 left-3.5" />
      <div className="brass-screw absolute top-3.5 right-3.5" />
      <div className="brass-screw absolute bottom-3.5 left-3.5" />
      <div className="brass-screw absolute bottom-3.5 right-3.5" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-luxury-gold/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-950/40 text-cyan-300 border border-white/15 mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Celestial Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-theme-primary leading-tight">
            Vastu Compass & 3D Solar Sun-Path Simulator
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-1">
            Simulate solar illumination angle, shadow trajectory, and 8-directional Vastu energy flows before purchasing your plot.
          </p>
        </div>

        {/* Facing Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 dark:bg-black/40 bg-slate-100 p-1.5 rounded-2xl border dark:border-luxury-gold/30 border-slate-200">
          {['East', 'North-East', 'North', 'West'].map((facing) => (
            <button
              key={facing}
              onClick={() => setSelectedFacing(facing)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedFacing === facing
                  ? 'bg-gold-gradient text-luxury-darker shadow-md'
                  : 'text-luxury-ivory hover:text-luxury-gold'
              }`}
            >
              {facing} Facing
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Viewport (Canvas / SVG + Interactive Control Deck) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
        {/* Left / Top: Interactive Celestial Dome Canvas */}
        <div className="lg:col-span-7 bg-[#0b1120] rounded-2xl p-4 sm:p-6 border border-white/10 relative overflow-hidden flex flex-col items-center">
          {/* Subtle Celestial Coordinates Grid */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* SVG Sun Path Dome */}
          <svg viewBox="0 0 500 320" className="w-full max-w-[480px] h-auto overflow-visible select-none">
            {/* Horizon Ground Line */}
            <line x1="20" y1="240" x2="480" y2="240" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
            
            {/* Horizon Cardinal Points */}
            <text x="30" y="258" fill="#D4AF37" fontSize="11" fontFamily="monospace" fontWeight="bold">WEST (Ast)</text>
            <text x="235" y="258" fill="#D4AF37" fontSize="11" fontFamily="monospace" fontWeight="bold">SOUTH (Zenith)</text>
            <text x="420" y="258" fill="#D4AF37" fontSize="11" fontFamily="monospace" fontWeight="bold">EAST (Uday)</text>

            {/* Sun Trajectory Arc */}
            <path
              d="M 80 240 A 170 150 0 0 1 420 240"
              fill="none"
              stroke="url(#sunArcGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="sunArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFF0C8" stopOpacity="1" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
              </linearGradient>
              <radialGradient id="sunGlow">
                <stop offset="0%" stopColor="#FFF5CC" stopOpacity="1" />
                <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Central Demarcated Plot Representation */}
            <g transform="translate(200, 205)">
              {/* Dynamic Cast Shadow */}
              <polygon
                points={`0,35 100,35 ${100 + solarState.shadowAngle},${35 + solarState.shadowLength} ${solarState.shadowAngle},${35 + solarState.shadowLength}`}
                fill="#000000"
                opacity={solarState.shadowOpacity}
              />
              
              {/* Plot Boundary */}
              <rect
                x="0"
                y="0"
                width="100"
                height="35"
                rx="4"
                fill="#0b1120"
                stroke="#06b6d4"
                strokeWidth="2"
              />
              {/* Plot Label */}
              <text x="50" y="16" fill="#FFF0C8" fontSize="9" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                DEMARCATED PLOT
              </text>
              <text x="50" y="27" fill="#E2C178" fontSize="8" fontFamily="monospace" textAnchor="middle">
                {selectedFacing} Facing • 250 Gaj
              </text>

              {/* Entrance Gate Indicator */}
              <circle cx="50" cy="0" r="3.5" fill="#D4AF37" />
              <text x="50" y="-5" fill="#D4AF37" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                GATE
              </text>
            </g>

            {/* Sun Body & Ambient Flare */}
            <g transform={`translate(${solarState.sunX}, ${solarState.sunY})`}>
              <circle cx="0" cy="0" r="28" fill="url(#sunGlow)" />
              <circle cx="0" cy="0" r="11" fill="#FFFBEB" stroke="#D4AF37" strokeWidth="2" />
              {/* Sun Ray Ticks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1={Math.cos((deg * Math.PI) / 180) * 14}
                  y1={Math.sin((deg * Math.PI) / 180) * 14}
                  x2={Math.cos((deg * Math.PI) / 180) * 18}
                  y2={Math.sin((deg * Math.PI) / 180) * 18}
                  stroke="#FBBF24"
                  strokeWidth="1.5"
                />
              ))}
            </g>

            {/* Time Annotation on Sun */}
            <text
              x={solarState.sunX}
              y={solarState.sunY - 32}
              fill="#FFF0C8"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
              className="drop-shadow"
            >
              {String(timeHour).padStart(2, '0')}:00 IST ({solarState.elevationDeg}°)
            </text>
          </svg>

          {/* Time Scrubber Slider Bar */}
          <div className="w-full mt-4 bg-black/60 p-4 rounded-xl border border-luxury-gold/20">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Sun className="w-3.5 h-3.5" /> 06:00 (Dawn)
              </span>
              <span className="text-luxury-gold font-bold">
                Solar Position: {String(timeHour).padStart(2, '0')}:00 hrs
              </span>
              <span className="flex items-center gap-1.5 text-orange-400">
                18:00 (Dusk) <Moon className="w-3.5 h-3.5" />
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="18"
              step="1"
              value={timeHour}
              onChange={(e) => setTimeHour(parseInt(e.target.value))}
              className="w-full h-2 bg-luxury-emerald/40 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex items-center justify-between text-[10px] font-mono text-theme-muted mt-2">
              <span>06:00</span>
              <span>08:00</span>
              <span>10:00</span>
              <span className="text-luxury-gold font-bold">12:00 (Noon)</span>
              <span>14:00</span>
              <span>16:00</span>
              <span>18:00</span>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Real-Time Vastu & Solar Telemetry Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Vastu Score Medallion */}
          <div className="p-5 rounded-2xl dark:bg-black/40 bg-slate-50 border dark:border-luxury-gold/40 border-amber-300/40 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-theme-muted">
                Statutory Vastu Compliance
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
                style={{ backgroundColor: `${vastuMetrics.color}25`, color: vastuMetrics.color, border: `1px solid ${vastuMetrics.color}60` }}
              >
                {vastuMetrics.rating}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-serif font-black text-theme-primary font-tabular">
                {vastuMetrics.score}
              </span>
              <span className="text-sm font-mono text-amber-500 font-bold">/ 100 Sanctity Score</span>
            </div>

            <p className="text-xs text-theme-secondary font-light leading-relaxed">
              {vastuMetrics.verdict}
            </p>
          </div>

          {/* Active Solar Metrics Telemetry */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-theme-card border border-luxury-gold/20">
              <span className="text-[10px] font-mono uppercase text-theme-muted block mb-1">
                Solar Phase
              </span>
              <span className="text-xs font-bold text-theme-primary block">
                {solarState.periodName}
              </span>
              <span className="text-[10px] font-mono text-luxury-gold block mt-0.5">
                Elevation: {solarState.elevationDeg}° above horizon
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-theme-card border border-luxury-gold/20">
              <span className="text-[10px] font-mono uppercase text-theme-muted block mb-1">
                Ishanya (NE) Water Energy
              </span>
              <span className="text-xs font-bold text-amber-500 block">
                {vastuMetrics.ishanyaScore}% Harmonic
              </span>
              <span className="text-[10px] font-mono text-theme-muted block mt-0.5">
                Borewell / Puja Alignment
              </span>
            </div>
          </div>

          {/* Energy Summary Banner */}
          <div className="p-4 rounded-xl dark:bg-cyan-950/30 bg-amber-50 border dark:border-white/15 border-amber-300/40 text-xs dark:text-slate-200 text-slate-800 font-light leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="dark:text-cyan-300 text-amber-600 font-semibold">Ground Audit Note: </strong>
              {solarState.energyDesc}
            </span>
          </div>
        </div>
      </div>

      {/* 8-Directional Vastu Zoning Matrix Table */}
      <div className="mt-6 pt-6 border-t border-luxury-gold/20">
        <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-500 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-luxury-gold" />
          8-Directional Energy & Architectural Masterplan Zoning
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {vastuZones.map((z, idx) => (
            <div key={idx} className="p-3 rounded-xl dark:bg-black/30 bg-slate-50 border dark:border-luxury-gold/15 border-slate-200">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-luxury-gold mb-1">
                <span>{z.dir}</span>
                <span className="text-[9px] text-theme-muted">{z.elem}</span>
              </div>
              <p className="text-[11px] text-theme-primary font-medium truncate mb-1">
                {z.use}
              </p>
              <span className="text-[10px] font-mono text-amber-500 font-semibold">
                ✓ {z.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
