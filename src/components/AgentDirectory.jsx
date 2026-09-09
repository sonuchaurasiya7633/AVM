import React, { useState, useMemo } from 'react';
import { AGENTS_DATA } from '../data/agents';
import { Phone, MessageSquare, Search, ShieldCheck, UserCheck, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AgentDirectory = () => {
  const { isHindi } = useLanguage();
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique alphabetical letters
  const letters = useMemo(() => {
    return ['All', ...new Set(AGENTS_DATA.map((a) => a.letter).sort())];
  }, []);

  const filteredAgents = useMemo(() => {
    return AGENTS_DATA.filter((agent) => {
      const matchesLetter =
        selectedLetter === 'All' || agent.letter === selectedLetter;
      const cleanSearch = searchQuery.toLowerCase().trim();
      const matchesSearch =
        agent.name.toLowerCase().includes(cleanSearch) ||
        agent.phone.replace(/[^0-9]/g, '').includes(cleanSearch.replace(/[^0-9]/g, ''));
      return matchesLetter && matchesSearch;
    });
  }, [selectedLetter, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto my-12">
      {/* Search and Alphabet Filter Leather Desk Pad */}
      <div className="leather-badge-container p-6 sm:p-8 rounded-3xl border-2 border-luxury-gold shadow-2xl mb-8 leather-stitch-outline relative overflow-hidden">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-3 left-3" />
        <div className="brass-screw absolute top-3 right-3" />
        <div className="brass-screw absolute bottom-3 left-3" />
        <div className="brass-screw absolute bottom-3 right-3" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-luxury-gold font-bold block">
              {isHindi ? 'सत्यापित सलाहकार नेटवर्क' : 'Verified Advisory Network'}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">
              {isHindi ? 'अधिकृत क्षेत्रीय समन्वयकों से संपर्क करें' : 'Connect with Authorized Territory Coordinators'}
            </h3>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'नाम या फोन नंबर से खोजें...' : 'Search agent by name or phone...'}
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-theme-card border border-theme-gold/40 text-xs text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-luxury-gold"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Alphabetical Letter Selector */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-theme-gold/20">
          <span className="text-xs font-semibold text-theme-muted mr-2">{isHindi ? 'वर्णमाला अनुसार चुनें:' : 'Filter by Alphabet:'}</span>
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center ${
                selectedLetter === letter
                  ? 'bg-gold-gradient text-luxury-darker shadow-md scale-110'
                  : 'bg-theme-card border border-theme-gold/20 text-theme-secondary hover:border-luxury-gold'
              }`}
            >
              {letter === 'All' && isHindi ? 'सभी' : letter}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Count */}
      <div className="flex items-center justify-between text-xs text-theme-muted mb-6 px-2">
        <span>
          {isHindi ? (
            <>दर्शाए जा रहे हैं: <strong className="text-luxury-gold font-bold">{filteredAgents.length}</strong> अधिकृत समन्वयक</>
          ) : (
            <>Showing <strong className="text-luxury-gold font-bold">{filteredAgents.length}</strong> Authorized Coordinators</>
          )}
        </span>
        <span className="flex items-center gap-1 text-luxury-gold font-medium">
          <ShieldCheck className="w-4 h-4" />
          {isHindi ? '100% पृष्ठभूमि सत्यापित एवं स्थानीय उपस्थिति' : '100% Background Verified & Local Ground Presence'}
        </span>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredAgents.map((agent, idx) => {
          const rawPhone = agent.phone.replace(/[^0-9]/g, '');
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl leather-folio-card border border-luxury-gold/40 hover:border-luxury-gold shadow-theme-card transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-luxury-emerald/20 border border-luxury-gold/50 flex items-center justify-center text-luxury-gold font-serif font-bold text-sm">
                    {agent.letter}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider dark:bg-cyan-950/40 bg-cyan-100/80 dark:text-cyan-300 text-cyan-800 dark:border-white/15 border-cyan-300/50">
                    {isHindi ? 'सत्यापित' : 'Verified'}
                  </span>
                </div>

                <h4 className="text-base font-serif font-bold text-theme-primary group-hover:text-luxury-gold transition-colors leading-snug">
                  {agent.name}
                </h4>

                <p className="text-[11px] text-theme-muted font-light mt-0.5 mb-3">
                  {agent.role}
                </p>
              </div>

              {/* Phone and WhatsApp Actions */}
              <div className="pt-3 border-t border-theme-gold/20 flex items-center gap-2">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex-1 py-2 rounded-xl text-center text-xs font-mono font-bold bg-theme-card border border-theme-gold/30 hover:border-luxury-gold text-theme-primary flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>{agent.phone}</span>
                </a>

                <a
                  href={`https://wa.me/91${rawPhone}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20am%20interested%20in%20verifying%20plots%20via%20AVM%20Talks`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-sm"
                  title="Chat on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
