import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { FAQS_DATA, FAQ_CATEGORIES } from '../data/faqs';
import { HelpCircle, ChevronDown, Search, ShieldCheck, PhoneCall, MessageSquare, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({ 'jda-vs-society': true });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Statutory Due Diligence Knowledgebase</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          Frequently Asked Questions & <br />
          <span className="text-gold-gradient italic">Rajasthan Land Law Advisory.</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          Critical legal answers regarding JDA pattas, Section 90-A conversion, RERA statutory protections, bank financing rules, and registry stamp duty across Jaipur.
        </p>
      </div>

      {/* Search & Filter Bar Leather Desk Pad */}
      <div className="p-4 sm:p-6 rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-xl mb-10 max-w-4xl mx-auto relative overflow-hidden leather-stitch-outline">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-3 left-3" />
        <div className="brass-screw absolute top-3 right-3" />
        <div className="brass-screw absolute bottom-3 left-3" />
        <div className="brass-screw absolute bottom-3 right-3" />

        <div className="relative mb-5">
          <Search className="w-5 h-5 text-luxury-gold absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search any legal term (e.g. 90-A, JDA Patta, Stamp Duty, RERA, NRI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold font-bold'
                  : 'bg-theme-card border border-theme-gold/20 text-theme-secondary hover:text-luxury-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4 mb-16">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-theme-surface border border-theme-gold/30 p-8">
            <HelpCircle className="w-12 h-12 text-luxury-gold/50 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-theme-primary">No Matching Advisory Found</h3>
            <p className="text-xs text-theme-secondary mt-1">
              Try a different keyword or connect directly with our 52+ ground coordinators for personal assistance.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-2xl leather-folio-card border border-luxury-gold/40 overflow-hidden shadow-md transition-all relative"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-luxury-emerald/30 border border-luxury-gold/40 text-luxury-gold text-xs flex items-center justify-center font-mono font-bold flex-shrink-0 mt-0.5">
                      Q
                    </span>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-theme-primary group-hover:text-luxury-gold transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-luxury-gold transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-theme-secondary font-light leading-relaxed border-t border-theme-gold/10">
                    <p className="pl-9">{faq.answer}</p>
                    <div className="mt-4 pl-9 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-theme-card text-luxury-gold border border-theme-gold/20">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Doubts Leather Folio Callout */}
      <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 leather-badge-container border-2 border-luxury-gold shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden leather-stitch-outline">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/40 text-luxury-goldLight border border-luxury-gold/30">
            <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
            <span>1-on-1 Legal Review</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Have a Specific Khasra or Registry Query?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 font-light">
            Share your patta copy or agreement draft with our legal panel for an unbiased statutory title check.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            to="/contact"
            className="flex-1 md:flex-none px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all text-center flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consult Legal Team</span>
          </Link>
          <Link
            to="/registry-process"
            className="flex-1 md:flex-none px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider border border-luxury-gold/50 bg-black/40 text-luxury-goldLight hover:border-luxury-gold transition-all text-center"
          >
            <span>Registry Process</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
