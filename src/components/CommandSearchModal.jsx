import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, X, Building2, Play, Users, MapPin, Calculator, 
  FileText, ShieldCheck, ArrowRight, CornerDownLeft, Sparkles, Compass 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLOTS_DATA } from '../data/plots';
import { YOUTUBE_VIDEOS } from '../data/videos';
import { AGENTS_DATA } from '../data/agents';
import { CORRIDORS_DATA } from '../data/insights';
import { FAQS_DATA } from '../data/faqs';
import { useLanguage } from '../context/LanguageContext';

export const CommandSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Static curated tools list
  const toolsList = useMemo(() => [
    {
      type: 'tool',
      title: isHindi ? 'इंटरैक्टिव कैडस्ट्रल प्लॉट लेआउट' : 'Interactive Cadastral Plot Demarcation',
      subtitle: isHindi ? 'प्लॉट नंबर, साइज व फेसिंग अनुसार खोजें' : 'Inspect plot divisions, sizing & vastu facing',
      path: '/plots',
      icon: Compass,
      category: 'tools',
      badge: 'CAD Map'
    },
    {
      type: 'tool',
      title: isHindi ? 'प्लॉट साइज व वेल्थ कैलकुलेटर' : 'Wealth & Land Valuation Calculator',
      subtitle: isHindi ? 'गज से स्क्वायर फीट रूपांतरण व स्टाम्प ड्यूटी' : 'Gaj to Sq.Ft conversion, loan EMI & registry duty',
      path: '/calculator',
      icon: Calculator,
      category: 'tools',
      badge: 'Calculator'
    },
    {
      type: 'tool',
      title: isHindi ? '5-चरणीय 90-A रजिस्ट्री रोडमैप' : '5-Stage Section 90-A Registry Roadmap',
      subtitle: isHindi ? 'तहसील पट्टा व टाइटल सर्च चेकलिस्ट' : 'Statutory compliance from token to registry',
      path: '/registry-process',
      icon: FileText,
      category: 'tools',
      badge: 'Statutory'
    },
    {
      type: 'tool',
      title: isHindi ? 'वीआईपी शॉफर साइट इंस्पेक्शन' : 'Schedule VIP Chauffeur Site Visit',
      subtitle: isHindi ? 'जयपुर में मौके पर जमीन व पट्टा निरीक्षण' : 'Luxury chauffeur pickup for on-site plot audit',
      path: '/book-visit',
      icon: ShieldCheck,
      category: 'tools',
      badge: 'VIP Visit'
    },
  ], [isHindi]);

  // Unified search results
  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();

    // Collect candidate items
    let results = [];

    // 1. Tools
    if (activeCategory === 'all' || activeCategory === 'tools') {
      const matchedTools = toolsList.filter(
        t => !q || t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q)
      );
      results = results.concat(matchedTools);
    }

    // 2. Plotted Schemes
    if (activeCategory === 'all' || activeCategory === 'plots') {
      const matchedPlots = PLOTS_DATA.filter(p => 
        !q || 
        p.name.toLowerCase().includes(q) || 
        p.corridor.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.priceStartingGaj.toLowerCase().includes(q)
      ).map(p => ({
        type: 'plot',
        id: p.id,
        title: p.name,
        subtitle: `${p.corridor} • ${p.priceStartingGaj} (${p.roadWidths.join(', ')})`,
        path: '/plots',
        icon: Building2,
        category: 'plots',
        badge: p.jdaApproved ? 'JDA Approved' : 'Sanctioned'
      }));
      results = results.concat(matchedPlots);
    }

    // 3. YouTube Masterclasses
    if (activeCategory === 'all' || activeCategory === 'videos') {
      const matchedVideos = YOUTUBE_VIDEOS.filter(v => 
        !q || 
        v.title.toLowerCase().includes(q) || 
        v.category.toLowerCase().includes(q)
      ).slice(0, 8).map(v => ({
        type: 'video',
        id: v.id,
        title: v.title,
        subtitle: `Episode ${v.id} • ${v.duration} • ${v.category}`,
        path: '/media',
        icon: Play,
        category: 'videos',
        badge: 'Masterclass'
      }));
      results = results.concat(matchedVideos);
    }

    // 4. Territory Coordinators
    if (activeCategory === 'all' || activeCategory === 'agents') {
      const matchedAgents = AGENTS_DATA.filter(a => 
        !q || 
        a.name.toLowerCase().includes(q) || 
        a.territory.toLowerCase().includes(q) ||
        a.phone.includes(q)
      ).slice(0, 6).map(a => ({
        type: 'agent',
        id: a.id,
        title: a.name,
        subtitle: `${a.territory} • Call: ${a.phone}`,
        path: '/contact',
        icon: Users,
        category: 'agents',
        badge: 'Coordinator'
      }));
      results = results.concat(matchedAgents);
    }

    // 5. Corridors
    if (activeCategory === 'all' || activeCategory === 'corridors') {
      const matchedCorridors = CORRIDORS_DATA.filter(c => 
        !q || 
        c.name.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q)
      ).map(c => ({
        type: 'corridor',
        id: c.id,
        title: c.name,
        subtitle: `Connectivity Score: ${c.connectivityScore}/100 • ${c.status}`,
        path: '/insights',
        icon: MapPin,
        category: 'corridors',
        badge: 'Corridor'
      }));
      results = results.concat(matchedCorridors);
    }

    // 6. FAQs
    if (activeCategory === 'all' || activeCategory === 'faqs') {
      const matchedFaqs = FAQS_DATA.filter(f => 
        !q || 
        f.question.toLowerCase().includes(q) || 
        f.answer.toLowerCase().includes(q)
      ).slice(0, 5).map(f => ({
        type: 'faq',
        id: f.id,
        title: f.question,
        subtitle: f.answer.substring(0, 95) + '...',
        path: '/faq',
        icon: ShieldCheck,
        category: 'faqs',
        badge: 'Legal FAQ'
      }));
      results = results.concat(matchedFaqs);
    }

    return results;
  }, [query, activeCategory, toolsList]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % (filteredResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (item) => {
    onClose();
    navigate(item.path);
  };

  const categories = [
    { id: 'all', label: isHindi ? 'सभी' : 'All' },
    { id: 'plots', label: isHindi ? 'टाउनशिप्स' : 'Plots' },
    { id: 'videos', label: isHindi ? 'मास्टरक्लास' : 'Masterclasses' },
    { id: 'agents', label: isHindi ? 'कोऑर्डिनेटर्स' : 'Agents' },
    { id: 'tools', label: isHindi ? 'टूल्स' : 'Utilities' },
    { id: 'faqs', label: isHindi ? 'कानूनी FAQ' : 'Legal' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-black/80 dark:bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-3xl bg-theme-surface border-2 dark:border-cyan-500/30 border-slate-300 shadow-[0_25px_60px_rgba(0,0,0,0.5)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden leather-stitch-outline flex flex-col max-h-[85vh]"
        >
          {/* 4 Corner Solid Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          {/* Search Header Bar */}
          <div className="p-4 sm:p-5 border-b dark:border-white/10 border-slate-200 flex items-center gap-3 dark:bg-black/40 bg-slate-50/80">
            <Search className="w-5 h-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={isHindi ? "खोजें: प्लॉट्स, 90-A रजिस्ट्री, 21 मास्टरक्लास, कोऑर्डिनेटर्स..." : "Instant Search: Plots, 90-A orders, 21 masterclasses, agents..."}
              className="flex-1 bg-transparent border-none text-theme-primary text-sm sm:text-base placeholder:text-theme-muted focus:outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-theme-muted hover:text-theme-primary"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2 py-1 rounded-md text-[10px] uppercase font-mono font-bold dark:bg-white/10 bg-slate-200 dark:text-slate-200 text-slate-700 dark:border-white/20 border-slate-300 hover:bg-slate-300 dark:hover:bg-white/20"
            >
              ESC
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="px-4 py-2.5 border-b dark:border-white/10 border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none dark:bg-[#0b1120]/95 bg-slate-100/90">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gold-gradient text-luxury-darker font-bold shadow-sm'
                    : 'text-theme-muted hover:text-theme-primary dark:hover:bg-white/5 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div
            ref={resultsContainerRef}
            className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 max-h-[50vh] scrollbar-thin scrollbar-thumb-luxury-gold/30"
          >
            {filteredResults.length === 0 ? (
              <div className="py-12 text-center text-theme-muted space-y-2">
                <Sparkles className="w-8 h-8 text-luxury-gold mx-auto opacity-40" />
                <p className="text-sm font-medium">
                  {isHindi ? 'कोई परिणाम नहीं मिला' : 'No matches found'}
                </p>
                <p className="text-xs text-theme-muted opacity-80">
                  {isHindi ? 'कृपया अन्य कीवर्ड खोजें या श्रेणी बदलें।' : 'Try searching for "Ajmer", "Registry", "90-A", or "Masterclass".'}
                </p>
              </div>
            ) : (
              filteredResults.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={`${item.type}-${item.id || idx}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'dark:bg-gradient-to-r dark:from-cyan-950/80 dark:to-[#060b17] bg-cyan-50/90 border dark:border-cyan-400/50 border-cyan-500 text-theme-primary shadow-sm'
                        : 'dark:hover:bg-white/5 hover:bg-slate-100/80 border border-transparent text-theme-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-gold-gradient text-luxury-darker' : 'dark:bg-white/10 bg-slate-200/80 dark:text-luxury-gold text-amber-700'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold truncate text-theme-primary">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-theme-muted truncate font-light">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold dark:bg-black/40 bg-white dark:text-luxury-goldLight text-amber-800 border dark:border-luxury-gold/30 border-amber-300 shadow-sm">
                        {item.badge}
                      </span>
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-luxury-gold animate-pulse hidden sm:inline" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts Hint */}
          <div className="p-3 border-t dark:border-luxury-gold/20 border-slate-200 dark:bg-black/60 bg-slate-100 flex items-center justify-between text-[11px] text-theme-muted px-4">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 rounded dark:bg-white/10 bg-slate-200 dark:text-luxury-gold text-amber-800 font-mono">↑↓</kbd> {isHindi ? 'नेविगेट' : 'Navigate'}</span>
              <span><kbd className="px-1.5 py-0.5 rounded dark:bg-white/10 bg-slate-200 dark:text-luxury-gold text-amber-800 font-mono">↵</kbd> {isHindi ? 'चुनें' : 'Select'}</span>
              <span><kbd className="px-1.5 py-0.5 rounded dark:bg-white/10 bg-slate-200 dark:text-luxury-gold text-amber-800 font-mono">ESC</kbd> {isHindi ? 'बंद करें' : 'Close'}</span>
            </div>
            <div className="text-luxury-gold font-mono font-medium">
              AVM Institutional Intelligence
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
