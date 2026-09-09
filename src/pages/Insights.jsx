import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { CORRIDORS_DATA, MACRO_METRICS, INVESTMENT_RULES } from '../data/insights';
import { TrendingUp, MapPin, CheckCircle, ShieldAlert, ArrowRight, BarChart3, Landmark, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CorridorMatrixComparator } from '../components/CorridorMatrixComparator';
import { useLanguage } from '../context/LanguageContext';

export const Insights = () => {
  const { isHindi } = useLanguage();
  const [activeCorridor, setActiveCorridor] = useState(CORRIDORS_DATA[0]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-luxury-gold/50 bg-luxury-emerald/30 text-luxury-goldLight mb-4">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{isHindi ? 'क्षेत्रीय श्वेतपत्र एवं विश्लेषण' : 'Regional Whitepaper'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          {isHindi ? 'जयपुर विकास कॉरिडोर एवं' : 'Jaipur Growth Corridors &'} <br />
          <span className="text-gold-gradient italic">{isHindi ? 'पूंजी गतिशीलता अंतर्दृष्टि।' : 'Capital Dynamics.'}</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          {isHindi
            ? 'ग्रेटर जयपुर में सड़क नेटवर्क, संस्थागत रोजगार घनत्व और मास्टरप्लान ज़ोनिंग का निष्पक्ष, डेटा-समर्थित विश्लेषणात्मक दस्तावेज।'
            : 'An unvarnished, data-backed intelligence dossier evaluating road networks, institutional employment density, and master-plan zoning across Greater Jaipur.'}
        </p>
      </div>

      {/* Macro Indicators Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {MACRO_METRICS.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl leather-folio-card border border-luxury-gold/30 text-center shadow-luxury-card relative"
          >
            <span className="text-2xl sm:text-4xl font-serif font-bold text-gold-gradient block mb-1">
              {item.value}
            </span>
            <h4 className="text-xs sm:text-sm font-semibold text-theme-primary mb-1">
              {isHindi ? item.labelHi : item.label}
            </h4>
            <p className="text-[11px] text-theme-muted font-light">
              {isHindi ? item.subHi : item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Corridor In-Depth Analysis Tabs */}
      <div className="mb-20">
        <SectionHeading
          badge={isHindi ? 'कॉरिडोर विस्तृत विश्लेषण' : 'Corridor Breakdown'}
          title={isHindi ? 'जयपुर के तीन तीव्र-विकासशील कॉरिडोर' : 'The Three High-Velocity Corridors'}
          subtitle={isHindi ? 'बुनियादी ढांचा उत्प्रेरक, कनेक्टिविटी स्कोर और निवेश निष्कर्ष देखने के लिए नीचे दिए गए कॉरिडोर का चयन करें।' : 'Select a corridor below to inspect infrastructure catalysts, connectivity scores, and investment verdicts.'}
        />

        {/* Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {CORRIDORS_DATA.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCorridor(c)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCorridor.id === c.id
                  ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold scale-105'
                  : 'bg-theme-card border border-luxury-gold/30 text-theme-secondary hover:text-theme-primary hover:border-luxury-gold'
              }`}
            >
              {isHindi ? c.nameHi : c.name}
            </button>
          ))}
        </div>

        {/* Active Corridor Leather Card */}
        <div className="rounded-3xl p-8 sm:p-12 leather-badge-container border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-luxury-gold/20 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-luxury-emerald text-luxury-goldLight border border-luxury-gold/30">
                  {isHindi ? activeCorridor.statusHi : activeCorridor.status}
                </span>
                <span className="text-xs font-mono text-luxury-gold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  {isHindi ? 'विकास गति:' : 'Growth Velocity:'} {isHindi ? activeCorridor.growthVelocityHi : activeCorridor.growthVelocity}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-theme-primary">
                {isHindi ? activeCorridor.nameHi : activeCorridor.name}
              </h2>
            </div>

            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-theme-card border border-luxury-gold/30">
              <span className="text-xs uppercase tracking-widest text-theme-muted">{isHindi ? 'कनेक्टिविटी इंडेक्स' : 'Connectivity Index'}</span>
              <span className="text-2xl font-serif font-extrabold text-gold-gradient">
                {activeCorridor.connectivityScore}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-serif font-bold text-theme-primary">
                {isHindi ? 'समग्र परिदृश्य एवं रणनीतिक उत्प्रेरक' : 'Macro Context & Strategic Catalysts'}
              </h3>
              <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
                {isHindi ? activeCorridor.descriptionHi : activeCorridor.description}
              </p>

              <div className="space-y-3 pt-2">
                {(isHindi ? activeCorridor.keyHighlightsHi : activeCorridor.keyHighlights).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-theme-primary font-light">
                    <CheckCircle className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-theme-card border border-luxury-gold/30 shadow-xl space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-semibold">
                {isHindi ? 'निवेश निष्कर्ष एवं सावधानियां' : 'Investment Verdict & Cautionary Notes'}
              </h4>
              <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
                {isHindi ? activeCorridor.investmentVerdictHi : activeCorridor.investmentVerdict}
              </p>

              <div className="pt-4 border-t border-theme-gold/20 space-y-2 text-xs text-theme-muted">
                <p>{isHindi ? '• बिना 90-ए रूपांतरण वाले अनधिकृत कृषि भूखंडों से बचें।' : '• Avoid unapproved agricultural ribbons without 90-A conversions.'}</p>
                <p>{isHindi ? '• स्वीकृत 40+ फीट चौड़े सेक्टर मार्गों से भौतिक पहुंच की पुष्टि करें।' : '• Insist on verified physical access to sanctioned 40ft+ sector roads.'}</p>
              </div>

              <Link
                to="/buyer-guide"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-[1.02] transition-all"
              >
                <span>{isHindi ? 'इस कॉरिडोर में संपत्ति की जांच करें' : 'Audit Property in This Corridor'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Highway Corridors Growth Matrix & Radar Comparator */}
      <CorridorMatrixComparator />

      {/* Investment Rules */}
      <SectionHeading
        badge={isHindi ? 'मूल सिद्धांत' : 'Foundational Tenets'}
        title={isHindi ? 'पूंजी सुरक्षा के चार स्वर्णिम नियम' : 'The Four Golden Rules of Capital Preservation'}
        subtitle={isHindi ? 'दशकों के राजस्व कानून, बाजार चक्र और संस्थागत अधिग्रहणों के अनुभव से तैयार किए गए नियम।' : 'Timeless wisdom formulated from decades of revenue law, market cycles, and institutional acquisitions.'}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {INVESTMENT_RULES.map((rule) => (
          <div
            key={rule.ruleNumber}
            className="p-8 rounded-2xl leather-folio-card border border-luxury-gold/40 hover:border-luxury-gold shadow-luxury-card transition-all relative"
          >
            <span className="text-3xl font-serif font-extrabold text-luxury-gold/40 block mb-2">
              {rule.ruleNumber}
            </span>
            <h4 className="text-lg font-serif font-bold text-theme-primary mb-2">
              {isHindi ? rule.titleHi : rule.title}
            </h4>
            <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
              {isHindi ? rule.textHi : rule.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
