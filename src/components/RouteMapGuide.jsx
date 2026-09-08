import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Car, Clock, ShieldCheck, CheckCircle2, Image as ImageIcon, Layers } from 'lucide-react';
import routeMapImg from '../assets/images/route-map.jpg';

const ROUTE_MILESTONES = [
  { step: 1, name: "Police Commissionerate / MI Road", distance: "0 KM", leg: "Start 1", landmark: "Police Headquarters" },
  { step: 2, name: "Rambagh Circle", distance: "0 KM", leg: "Start 2", landmark: "Heritage Circle" },
  { step: 3, name: "Sodala Elevated Flyover", distance: "4.3 KM", leg: "+4.3 KM", landmark: "Elevated Expressway" },
  { step: 4, name: "DCM / Elements Mall", distance: "6.9 KM", leg: "+2.6 KM", landmark: "Commercial Hub" },
  { step: 5, name: "200 Ft Bypass", distance: "7.8 KM", leg: "+0.9 KM", landmark: "Bypass Junction" },
  { step: 6, name: "Heerapura", distance: "9.1 KM", leg: "+1.0 KM", landmark: "Highway Sector" },
  { step: 7, name: "Bhankrota", distance: "11 KM", leg: "+1.2 KM", landmark: "Township Junction" },
  { step: 8, name: "Ring Road / Mahapura Interchange", distance: "15 KM", leg: "+1.3 KM", landmark: "Cloverleaf Toll" },
  { step: 9, name: "Mahindra SEZ Tech Hub Side", distance: "17 KM", leg: "+1.8 KM", landmark: "Global IT & SEZ" },
  { step: 10, name: "Vatika Infotech City / Theekariya", distance: "19.9 KM", leg: "+1.2 KM", landmark: "Infotech Campus" },
  { step: 11, name: "AVM Plotted Enclave & Sovereign Township", distance: "20–21 KM", leg: "+0.9 KM", landmark: "Destination Sanctuary" }
];

export const RouteMapGuide = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(ROUTE_MILESTONES[10]);
  const [activeView, setActiveView] = useState('blueprint'); // 'blueprint' | 'interactive'

  const googleMapsUrl = "https://www.google.com/maps/place/26%C2%B048'41.9%22N+75%C2%B035'47.8%22E/@26.8116297,75.5966099,17z/data=!3m1!4b1!4m4!3m3!8m2!3d26.8116297!4d75.5966099";

  return (
    <div className="w-full max-w-7xl mx-auto my-14">
      {/* Handcrafted Stitched Connolly Leather Folio Container */}
      <div className="leather-badge-container rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
        {/* 4 Corner Solid Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        {/* Ambient emerald backlight */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-950/40 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-theme-gold/30 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] bg-luxury-emerald/30 border border-luxury-gold text-luxury-goldLight mb-3">
              <Navigation className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Sanctioned Expressway Route</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-theme-primary tracking-tight">
              Route from MI Road & Rambagh Circle
            </h2>
            <p className="text-xs sm:text-sm text-theme-secondary font-light mt-2 max-w-2xl leading-relaxed">
              The high-speed expressway route from Police Commissionerate (MI Road) and Rambagh Circle via Ajmer Road / NH-48. Total approximate transit distance: <strong>20–21 km</strong> (~25 mins).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="inline-flex p-1 rounded-full bg-theme-card border border-theme-gold/40">
              <button
                type="button"
                onClick={() => setActiveView('interactive')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeView === 'interactive'
                    ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold'
                    : 'text-theme-secondary hover:text-luxury-gold'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Live GPS & Milestones</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView('blueprint')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeView === 'blueprint'
                    ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold'
                    : 'text-theme-secondary hover:text-luxury-gold'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Official Blueprint</span>
              </button>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Route Highlights Pill Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/30 flex items-center gap-3">
            <Car className="w-5 h-5 text-luxury-gold flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-theme-muted block font-semibold">Corridor</span>
              <span className="text-xs font-bold text-theme-primary">6-Lane NH-48 Ajmer Road</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/30 flex items-center gap-3">
            <Clock className="w-5 h-5 text-luxury-gold flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-theme-muted block font-semibold">Travel Time</span>
              <span className="text-xs font-bold text-theme-primary">~22 to 26 Minutes</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/30 flex items-center gap-3">
            <Compass className="w-5 h-5 text-luxury-gold flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-theme-muted block font-semibold">Interlink</span>
              <span className="text-xs font-bold text-theme-primary">Direct Ring Road Interchange</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/30 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-theme-muted block font-semibold">Coordinates</span>
              <span className="text-xs font-mono font-bold text-theme-primary">26°48'41.9"N 75°35'47.8"E</span>
            </div>
          </div>
        </div>

        {/* Dynamic View: Interactive Milestones & GPS OR Official Blueprint */}
        {activeView === 'interactive' ? (
          <>
            {/* Interactive Timeline Track */}
            <div className="mb-10 p-5 rounded-2xl bg-theme-card border border-theme-gold/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-luxury-gold font-bold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Interactive Transit Waypoints (Click Any Milestone)
                </span>
                <span className="text-xs text-theme-muted hidden sm:inline">
                  Step {selectedMilestone.step} of 11 • {selectedMilestone.distance}
                </span>
              </div>

              <div className="overflow-x-auto pb-4 pt-2">
                <div className="min-w-[1000px] flex items-center relative">
                  {/* Central Highway Track Line */}
                  <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-500 -translate-y-1/2 rounded-full z-0"></div>

                  {/* Waypoint Nodes */}
                  {ROUTE_MILESTONES.map((item, idx) => {
                    const isDestination = idx === ROUTE_MILESTONES.length - 1;
                    const isSelected = selectedMilestone.step === item.step;
                    return (
                      <div
                        key={item.step}
                        onClick={() => setSelectedMilestone(item)}
                        className="relative z-10 flex-1 flex flex-col items-center cursor-pointer group px-1"
                      >
                        {/* Distance Badge */}
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full mb-2 bg-theme-card border border-theme-gold/30 text-theme-primary shadow-sm">
                          {item.leg}
                        </span>

                        {/* Node Dot */}
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-gold-gradient border-white scale-125 shadow-luxury-gold'
                              : isDestination
                              ? 'bg-emerald-500 border-white'
                              : 'bg-theme-surface border-theme-gold group-hover:border-luxury-gold'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-luxury-darker' : 'bg-luxury-gold'}`}></div>
                        </div>

                        {/* Name & Total KM */}
                        <div className="text-center mt-2.5">
                          <p className={`text-[11px] font-bold line-clamp-2 leading-tight ${isSelected ? 'text-luxury-gold' : 'text-theme-primary'}`}>
                            {item.name}
                          </p>
                          <p className="text-[10px] font-mono text-theme-muted font-semibold mt-0.5">
                            {item.distance}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Interactive Google Map & Selected Waypoint Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Embedded Google Maps View */}
              <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-theme-gold shadow-2xl relative min-h-[360px] bg-black">
                <iframe
                  src="https://maps.google.com/maps?q=26.8116297,75.5966099&z=15&output=embed"
                  title="AVM Plotted Enclave Location Map"
                  className="w-full h-full min-h-[380px] border-0"
                  loading="lazy"
                  allowFullScreen
                />
                {/* Live Pin Overlay Callout */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-luxury-darker/90 backdrop-blur-md border border-luxury-gold/50 shadow-xl max-w-xs text-xs text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-luxury-gold animate-bounce" />
                    <span className="font-bold text-luxury-goldLight">26°48'41.9"N 75°35'47.8"E</span>
                  </div>
                  <p className="text-[11px] text-white/80 font-light">
                    Ajmer Road Corridor, Near Mahindra SEZ & Ring Road Interchange, Greater Jaipur.
                  </p>
                </div>
              </div>

              {/* Waypoint Info Card */}
              <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-theme-card border border-theme-gold shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold font-bold block mb-1">
                    Selected Waypoint Details
                  </span>
                  <h3 className="text-xl font-serif font-bold text-theme-primary mb-1">
                    {selectedMilestone.name}
                  </h3>
                  <p className="text-xs text-theme-muted font-mono mb-4">
                    Highway Landmark: {selectedMilestone.landmark}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-theme-gold/20 text-xs text-theme-secondary font-light">
                    <div className="flex justify-between items-center">
                      <span className="text-theme-muted">Cumulative Highway Distance:</span>
                      <span className="font-mono font-bold text-theme-primary">{selectedMilestone.distance}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-theme-muted">Leg Distance:</span>
                      <span className="font-mono font-bold text-luxury-gold">{selectedMilestone.leg}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-theme-muted">Road Specification:</span>
                      <span className="font-bold text-theme-primary">6-to-8 Lane Bitumen Tarmac</span>
                    </div>
                  </div>

                  <div className="mt-5 p-3.5 rounded-xl bg-luxury-emerald/20 border border-theme-gold/30 text-[11px] text-theme-secondary leading-relaxed">
                    <p>
                      * Smooth, non-stop drive directly connected from Central Jaipur. Seamless link to Ring Road & Southern Expressways.
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-theme-gold/20 mt-4">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                    <span>Navigate via Google GPS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Official Blueprint Infographic View */
          <div className="rounded-3xl p-4 sm:p-6 bg-theme-card border border-theme-gold shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-theme-gold/30">
              <div>
                <span className="text-xs uppercase tracking-wider text-luxury-gold font-bold block">
                  Official Route Infographic
                </span>
                <h4 className="text-lg font-serif font-bold text-theme-primary">
                  Sanctioned Waypoints from Rambagh & MI Road to AVM Plotted Township
                </h4>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open GPS Pin</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-theme-gold/40 bg-black flex items-center justify-center p-2">
              <img
                src={routeMapImg}
                alt="Sanctioned Highway Route from MI Road & Rambagh Circle"
                className="max-h-[650px] w-full object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
