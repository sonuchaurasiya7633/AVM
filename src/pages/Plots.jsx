import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { PlotCard } from '../components/PlotCard';
import { PlotCalculator } from '../components/PlotCalculator';
import { LeatherUnitCalculator } from '../components/LeatherUnitCalculator';
import { PlotDimensionsTable } from '../components/PlotDimensionsTable';
import { RouteMapGuide } from '../components/RouteMapGuide';
import { PLOTS_DATA } from '../data/plots';
import { Building2, Filter, ShieldCheck, CheckCircle2, PhoneCall, Sparkles, MapPin, Users, Ruler, Maximize2, X, Download, ZoomIn, Eye, LayoutGrid, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import masterBlueprintImg from '../assets/images/master-blueprint.jpg';
import { InteractiveCadastralMap } from '../components/InteractiveCadastralMap';
import { PlotPortfolioBasket } from '../components/PlotPortfolioBasket';
import { useLanguage } from '../context/LanguageContext';

export const Plots = () => {
  const { t } = useLanguage();
  const [selectedCorridor, setSelectedCorridor] = useState('All');
  const [selectedSizeRange, setSelectedSizeRange] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'cadastral'
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);

  const corridors = ['All', 'Ajmer Road & Tech Corridor', '47-KM Ring Road Belt', 'Delhi-Mumbai Expressway Hub'];

  const filteredPlots = useMemo(() => {
    return PLOTS_DATA.filter((plot) => {
      const matchesCorridor =
        selectedCorridor === 'All' || plot.corridor === selectedCorridor;
      const matchesSize =
        selectedSizeRange === 'All' ||
        (selectedSizeRange === 'Small' && plot.plotSizesGaj.some((s) => s <= 200)) ||
        (selectedSizeRange === 'Medium' && plot.plotSizesGaj.some((s) => s > 200 && s <= 500)) ||
        (selectedSizeRange === 'Large' && plot.plotSizesGaj.some((s) => s > 500));
      return matchesCorridor && matchesSize;
    });
  }, [selectedCorridor, selectedSizeRange]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <Building2 className="w-3.5 h-3.5" />
          <span>Prime Plotted Townships & Estates</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          JDA Approved & RERA Sanctioned <br />
          <span className="text-gold-gradient italic">Plotted Developments.</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          Screened through the rigorous 5-Phase AVM Talks Due Diligence protocol. Every project features verified 30-year revenue titles, wide bitumen sector boulevards, and guaranteed statutory permissions.
        </p>
      </div>

      {/* Corridor & Size Filter Bar Leather Desk Pad */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl leather-badge-container border-2 border-luxury-gold shadow-xl mb-12 leather-stitch-outline relative overflow-hidden">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-2.5 left-2.5" />
        <div className="brass-screw absolute top-2.5 right-2.5" />
        <div className="brass-screw absolute bottom-2.5 left-2.5" />
        <div className="brass-screw absolute bottom-2.5 right-2.5" />

        {/* Corridor Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs uppercase tracking-wider text-luxury-gold font-bold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Corridor:
          </span>
          {corridors.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCorridor(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCorridor === c
                  ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold font-bold'
                  : 'bg-theme-card border border-theme-gold/30 text-theme-secondary hover:text-luxury-gold'
              }`}
            >
              {c === 'All' ? 'All Corridors' : c.split(' & ')[0]}
            </button>
          ))}
        </div>

        {/* Size Range Selector */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <span className="text-xs uppercase tracking-wider text-theme-muted font-medium">
            Plot Size:
          </span>
          {[
            { id: 'All', label: 'All Sizes' },
            { id: 'Small', label: '100-200 Gaj' },
            { id: 'Medium', label: '200-500 Gaj' },
            { id: 'Large', label: '500+ Gaj' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSizeRange(s.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedSizeRange === s.id
                  ? 'bg-luxury-gold text-luxury-darker font-bold'
                  : 'bg-theme-card text-theme-muted border border-white/5 hover:text-luxury-gold'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* View Switcher: Grid Cards vs Interactive Cadastral Map */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-theme-gold/20">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-theme-muted font-mono">
            Display Mode:
          </span>
          <div className="inline-flex p-1 rounded-xl bg-theme-card border border-theme-gold/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-gold-gradient text-luxury-darker shadow-sm'
                  : 'text-theme-secondary hover:text-luxury-gold'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t('advanced.viewModeGrid', 'Grid Cards')}</span>
            </button>
            <button
              onClick={() => setViewMode('cadastral')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cadastral'
                  ? 'bg-gold-gradient text-luxury-darker shadow-sm'
                  : 'text-theme-secondary hover:text-luxury-gold'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>{t('advanced.viewModeCadastral', 'Cadastral Map Layout')}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-luxury-emerald text-luxury-goldLight border border-luxury-gold/40 uppercase">CAD</span>
            </button>
          </div>
        </div>

        <p className="text-xs font-mono text-luxury-goldLight">
          {filteredPlots.length} Verified Plotted Enclaves Indexed
        </p>
      </div>

      {/* Plots Catalog Grid or Interactive Cadastral Layout */}
      {viewMode === 'cadastral' ? (
        <div className="mb-20">
          <InteractiveCadastralMap />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredPlots.map((plot) => (
            <PlotCard key={plot.id} plot={plot} />
          ))}
        </div>
      )}

      {/* Stitched Emerald Leather Unit Calculator (from Reference Image) */}
      <div className="mb-20">
        <SectionHeading
          badge="Unit Conversion Badge"
          title="Instant Land & Price Calculator"
          subtitle="Convert length, area and price between the units used locally. Enter any one value to see the rest instantly."
        />
        <LeatherUnitCalculator />
      </div>

      {/* Masterplan Blueprint Visual Preview */}
      <div className="mb-14">
        <div className="leather-badge-container rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Solid Brass Rivets */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-md space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-luxury-emerald text-luxury-goldLight border border-luxury-gold/30">
                <span>✦ Official Engineering CAD ✦</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-theme-primary leading-tight">
                Sanctioned Township Masterplan Blueprint
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
                Physical ground survey displaying 80' & 60' masterplan arterial boulevards, central landscaped park with fountains, community club area, and exact plot demarcations.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setIsBlueprintModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Inspect 8K Blueprint</span>
                </button>
                <a
                  href={masterBlueprintImg}
                  download="AVM_Township_Masterplan_Blueprint.jpg"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-theme-gold/40 bg-theme-card text-theme-primary hover:border-luxury-gold transition-colors"
                >
                  <Download className="w-4 h-4 text-luxury-gold" />
                  <span>Download CAD Map</span>
                </a>
              </div>
            </div>

            <div 
              className="w-full lg:w-3/5 rounded-2xl overflow-hidden border-2 border-luxury-gold/50 shadow-2xl relative group cursor-pointer bg-[#021720]"
              onClick={() => setIsBlueprintModalOpen(true)}
            >
              <img
                src={masterBlueprintImg}
                alt="Township Masterplan Blueprint"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-5 py-2.5 rounded-full bg-gold-gradient text-luxury-darker text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2">
                  <ZoomIn className="w-4 h-4" />
                  Click to Enlarge 8K Blueprint
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Multi-Plot Portfolio & Syndicate Basket */}
      <PlotPortfolioBasket />

      {/* Standardized Plot & Shop Dimensions Tables */}
      <div className="mb-20">
        <SectionHeading
          badge="Standardized Blueprint Dimensions"
          title="Commonly Available Plot & Shop Sizes"
          subtitle="Indicative layout dimensions across approved Jaipur plotted schemes. Always confirm the exact area and boundaries from the sanctioned layout plan."
        />
        <PlotDimensionsTable />
      </div>

      {/* Interactive Plot Sizing Calculator */}
      <div className="mb-20">
        <SectionHeading
          badge="Rajasthan Sizing Utility"
          title="Compute Exact Plot Value & Bank Loan Outlay"
          subtitle="Adjust the dimension slider in Gaj to inspect exact square footage, statutory registration expenses, and monthly EMI breakdown."
        />
        <PlotCalculator />
      </div>

      {/* Route & Google Maps Highway Guide */}
      <RouteMapGuide />

      {/* Due Diligence Guarantee & 52 Agents Banner */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-luxury-emerald via-luxury-deepEmerald to-luxury-darker border border-luxury-gold shadow-2xl text-white flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/40 text-luxury-goldLight border border-luxury-gold/30">
            <ShieldCheck className="w-4 h-4 text-luxury-gold" />
            <span>52+ Ground Coordinators Available</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Need On-Site Demarcation or Registry Assistance?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
            Our authorized territory coordinators are physically stationed across Ajmer Road, Ring Road, and Delhi-Mumbai Expressway spurs to assist you with patwari map cross-checking, site visits, and RERA file verification.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all text-center flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>View 52+ Coordinators</span>
          </Link>
          <Link
            to="/buyer-guide"
            className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider border border-luxury-gold/50 bg-black/40 text-luxury-goldLight hover:border-luxury-gold transition-all text-center"
          >
            Due Diligence Protocol
          </Link>
        </div>
      </div>

      {/* High-Definition Masterplan Blueprint Fullscreen Modal */}
      {isBlueprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-6xl rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl overflow-hidden leather-stitch-outline my-auto">
            {/* 4 Corner Brass Screws */}
            <div className="brass-screw absolute top-3.5 left-3.5" />
            <div className="brass-screw absolute top-3.5 right-3.5" />
            <div className="brass-screw absolute bottom-3.5 left-3.5" />
            <div className="brass-screw absolute bottom-3.5 right-3.5" />

            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-luxury-gold/30 bg-black/60">
              <div>
                <h3 className="text-base sm:text-xl font-serif font-bold text-white leading-tight">
                  Sanctioned Masterplan: Luxury Plotted Residential Township
                </h3>
                <p className="text-[11px] text-luxury-goldLight font-mono">
                  Technical Scale: 1:1500 • Section 90-A Surrendered & JDA Compliant
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={masterBlueprintImg}
                  download="AVM_Township_Masterplan_Blueprint.jpg"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-theme-card border border-theme-gold/40 text-luxury-goldLight hover:border-luxury-gold"
                >
                  <Download className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setIsBlueprintModalOpen(false)}
                  className="p-2 rounded-full bg-black/60 text-luxury-gold hover:text-white hover:bg-black/80 transition-colors border border-luxury-gold/30"
                  aria-label="Close Blueprint Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Blueprint View Area */}
            <div className="relative w-full max-h-[75vh] overflow-auto bg-[#021720] flex items-center justify-center p-2 sm:p-4">
              <img
                src={masterBlueprintImg}
                alt="Sanctioned Masterplan Blueprint Full View"
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-2xl border border-luxury-gold/30"
              />
            </div>

            {/* Modal Footer Legend */}
            <div className="p-4 sm:p-5 border-t border-luxury-gold/20 bg-black/75 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-3 text-luxury-ivory font-mono text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span>80' Main Sector Avenue</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <span>60' Wide Secondary Road</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>Central Landscaped Park</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  <span>Clubhouse & Swimming Pool</span>
                </span>
              </div>
              <button
                onClick={() => setIsBlueprintModalOpen(false)}
                className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all ml-auto"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
