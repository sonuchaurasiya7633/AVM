import React, { useState } from 'react';
import { 
  Radio, Compass, MapPin, Gauge, Navigation, Plane, 
  Car, Clock, ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const PROXIMITY_NODES = [
  {
    id: 'ring-road',
    name: '47-KM Ring Road Interchange',
    nameHi: '47-किमी रिंग रोड क्लोवरलीफ',
    distanceKm: 4.2,
    baseMins: 5,
    road: 'Direct 80 Ft Masterplan Boulevard',
    roadHi: 'सीधा 80 फीट मास्टरप्लान सेक्टर रोड',
    bearing: '045° NE',
    highlight: '360-Meter commercial growth zone linkage',
    highlightHi: '360-मीटर कमर्शियल ग्रोथ कॉरिडोर से सीधी कनेक्टिविटी'
  },
  {
    id: 'mwc-sez',
    name: 'Mahindra World City Tech SEZ',
    nameHi: 'महिंद्रा वर्ल्ड सिटी टेक सेज़',
    distanceKm: 8.5,
    baseMins: 11,
    road: '6-Lane Expressway Arterial Link',
    roadHi: '6-लेन एक्सप्रेसवे मुख्य संपर्क मार्ग',
    bearing: '135° SE',
    highlight: '65,000+ high-income executive workforce catchment',
    highlightHi: '65,000+ उच्च आय वर्ग आईटी व कॉर्पोरेट पेशेवर'
  },
  {
    id: 'freight-corridor',
    name: 'DMIC Dedicated Freight Logistic Hub',
    nameHi: 'डीएमआईसी फ्रेट लॉजिस्टिक जंक्शन',
    distanceKm: 12.0,
    baseMins: 14,
    road: 'State Highway 12 Bypass',
    roadHi: 'स्टेट हाईवे 12 बाईपास',
    bearing: '225° SW',
    highlight: 'Mega dry port & container freight aggregation terminal',
    highlightHi: 'मेगा ड्राई पोर्ट व कंटेनर फ्रेट टर्मिनल'
  },
  {
    id: 'airport',
    name: 'Jaipur International Airport (JAI)',
    nameHi: 'जयपुर इंटरनेशनल एयरपोर्ट (सांगानेर)',
    distanceKm: 18.2,
    baseMins: 22,
    road: 'Signal-Free Ring Road Outer Expressway',
    roadHi: 'सिग्नल-फ्री रिंग रोड आउटर एक्सप्रेसवे',
    bearing: '090° E',
    highlight: 'Terminal 2 seamless 20-minute executive transit',
    highlightHi: 'टर्मिनल 2 तक मात्र 22 मिनट का सुगम सफर'
  },
  {
    id: 'ajmer-expressway',
    name: 'NH-48 Delhi-Jaipur-Ajmer Highway',
    nameHi: 'एनएच-48 अजमेर 6-लेन राष्ट्रीय राजमार्ग',
    distanceKm: 3.1,
    baseMins: 4,
    road: 'Dedicated 80 Ft Sector Right of Way',
    roadHi: 'समर्पित 80 फीट सेक्टर राइट ऑफ वे',
    bearing: '315° NW',
    highlight: 'Zero-jam access to main capital expressway',
    highlightHi: 'मुख्य हाईवे पर बिना जाम सीधा प्रवेश'
  },
];

export const DroneProximityHUD = () => {
  const { isHindi } = useLanguage();
  const [selectedNode, setSelectedNode] = useState(PROXIMITY_NODES[0]);
  const [transitSpeed, setTransitSpeed] = useState('expressway'); // 'expressway' | 'city'

  const currentMins = transitSpeed === 'expressway' 
    ? selectedNode.baseMins 
    : Math.round(selectedNode.baseMins * 1.4);

  return (
    <div className="rounded-3xl leather-badge-container p-6 sm:p-10 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
      {/* 4 Corner Solid Brass Screws */}
      <div className="brass-screw absolute top-3.5 left-3.5" />
      <div className="brass-screw absolute top-3.5 right-3.5" />
      <div className="brass-screw absolute bottom-3.5 left-3.5" />
      <div className="brass-screw absolute bottom-3.5 right-3.5" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-luxury-gold/30 gap-4">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border dark:border-white/15 border-cyan-300/50 dark:bg-cyan-950/40 bg-cyan-100/80 dark:text-cyan-300 text-cyan-800 font-mono mb-2">
            <Radio className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            {isHindi ? 'एरियल ड्रोन नेविगेशन रडार' : 'Aerial Drone Telemetry HUD'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-primary">
            {isHindi ? 'कॉरिडोर दूरी व ट्रांजिट टाइम रडार' : 'Arterial Corridor Transit & Proximity HUD'}
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary mt-1 max-w-2xl">
            {isHindi 
              ? 'जयपुर के प्रमुख हाईवे, रिंग रोड और एयरपोर्ट तक वास्तविक सड़क दूरी व सटीक ड्राइविंग समय का एरियल विश्लेषण।'
              : 'Interactive aerial telemetry mapping point-to-point transit times to Greater Jaipur’s critical capital growth nodes.'}
          </p>
        </div>

        {/* Speed Mode Switcher */}
        <div className="flex items-center p-1 rounded-full bg-black/60 border border-luxury-gold/40 text-xs font-mono">
          <button
            onClick={() => setTransitSpeed('expressway')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all ${
              transitSpeed === 'expressway'
                ? 'bg-gold-gradient text-luxury-darker shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {isHindi ? 'एक्सप्रेसवे स्पीड' : 'Expressway (80+ km/h)'}
          </button>
          <button
            onClick={() => setTransitSpeed('city')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all ${
              transitSpeed === 'city'
                ? 'bg-gold-gradient text-luxury-darker shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {isHindi ? 'सिटी ड्राइव' : 'Chauffeur City Drive'}
          </button>
        </div>
      </div>

      {/* Main Grid: Rotating Radar HUD on Left, Interactive Node Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Tactical Radar HUD Screen */}
        <div className="lg:col-span-6 rounded-3xl bg-[#0b1120] border-2 border-white/15 p-6 shadow-2xl relative flex flex-col items-center justify-center overflow-hidden">
          {/* Telemetry Header */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-200 border-b border-white/10 pb-2 mb-4">
            <span>RADAR: 280M AGL SENSOR</span>
            <span className="animate-pulse text-cyan-400">● LIVE TELEMETRY</span>
          </div>

          {/* Radar Circles & Rotating Sweep */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/10 flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.3)_0%,_rgba(3, 7, 18,0.95)_75%)] shadow-inner my-3">
            {/* Concentric rings */}
            <div className="absolute inset-8 rounded-full border border-luxury-gold/20" />
            <div className="absolute inset-16 rounded-full border border-luxury-gold/15" />
            <div className="absolute inset-24 rounded-full border border-luxury-gold/10" />

            {/* Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-luxury-gold/25" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-luxury-gold/25" />

            {/* Rotating Radar Sweep Needle */}
            <div 
              className="absolute inset-0 rounded-full animate-spin pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, rgba(212,175,55,0.4) 0deg, rgba(16,185,129,0.15) 45deg, transparent 90deg)',
                animationDuration: '4s'
              }}
            />

            {/* Center Origin Dot (Township Location) */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-gold-gradient border-2 border-white shadow-[0_0_15px_#D4AF37]" title="AVM Plotted Township Origin" />
            <span className="absolute z-10 bottom-24 text-[9px] font-mono font-bold text-luxury-goldLight">
              AVM TOWNSHIP
            </span>

            {/* Radar Target Blips */}
            {PROXIMITY_NODES.map((node, i) => {
              const isSelected = selectedNode.id === node.id;
              // Simple angle offsets for visual distribution
              const angles = [45, 135, 225, 90, 315];
              const rad = (angles[i] * Math.PI) / 180;
              const radius = 80 + (node.distanceKm * 2.5);
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="absolute cursor-pointer transition-transform hover:scale-125 z-20"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  title={node.name}
                >
                  <span className={`relative flex h-3.5 w-3.5 ${isSelected ? 'animate-ping' : ''}`}>
                    <span className={`absolute inline-flex h-full w-full rounded-full ${isSelected ? 'bg-amber-400' : 'bg-[#D4AF37]'} opacity-75`} />
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isSelected ? 'bg-amber-500 border-2 border-white' : 'bg-[#9E7B3B] border border-amber-200'}`} />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Target Banner */}
          <div className="w-full mt-3 p-2.5 rounded-xl bg-black/60 border border-luxury-gold/30 text-center font-mono text-xs">
            <span className="text-luxury-gold font-bold">LOCKED TARGET: </span>
            <span className="text-white">{selectedNode.bearing} • {selectedNode.distanceKm} KM</span>
          </div>
        </div>

        {/* Right: Interactive Node Telemetry Cards */}
        <div className="lg:col-span-6 space-y-3">
          {PROXIMITY_NODES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            const mins = transitSpeed === 'expressway' 
              ? node.baseMins 
              : Math.round(node.baseMins * 1.4);

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'dark:bg-gradient-to-r dark:from-cyan-950/80 dark:to-[#0b1120] bg-cyan-50 border-cyan-500/40 shadow-lg ring-1 ring-cyan-400/40'
                    : 'dark:bg-black/40 bg-theme-surface border-theme-gold/25 hover:border-luxury-gold/50'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                      isSelected ? 'bg-gold-gradient text-luxury-darker' : 'bg-theme-card text-luxury-gold border border-theme-gold/20'
                    }`}>
                      <Navigation className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-theme-primary">
                      {isHindi ? node.nameHi : node.name}
                    </h4>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="font-serif font-extrabold text-base text-gold-gradient block">
                      {mins} {isHindi ? 'मिनट' : 'Mins'}
                    </span>
                    <span className="text-[10px] text-luxury-goldLight font-mono">
                      {node.distanceKm} KM
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-theme-secondary font-light pl-9">
                  <span className="truncate">{isHindi ? node.roadHi : node.road}</span>
                  <span className="text-[10px] font-mono text-luxury-gold font-bold">
                    {node.bearing}
                  </span>
                </div>

                {isSelected && (
                  <div className="mt-2.5 pt-2 border-t border-luxury-gold/20 text-[11px] text-luxury-goldLight font-mono flex items-center gap-1.5 pl-9">
                    <Sparkles className="w-3 h-3 text-luxury-gold flex-shrink-0" />
                    <span>{isHindi ? node.highlightHi : node.highlight}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
