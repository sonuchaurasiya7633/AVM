import React from 'react';
import { 
  BarChart3, PieChart, TrendingUp, Layers, Compass, ArrowRight, ShieldCheck, Award 
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useLanguage } from '../../context/LanguageContext';
import { CRM_STAGES } from '../../data/initialCrmData';

export const CrmAnalytics = () => {
  const { leads, metrics } = useCRM();
  const { isHindi } = useLanguage();

  const total = leads.length || 1;

  // Source distribution
  const sourceCounts = {};
  leads.forEach((l) => {
    const s = l.source || 'Direct Inquiry';
    sourceCounts[s] = (sourceCounts[s] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-serif font-bold text-theme-primary">
          {isHindi ? 'पाइपलाइन अंतर्दृष्टि एवं विश्लेषणात्मक रिपोर्ट' : 'Investor Pipeline Intelligence & Conversion Metrics'}
        </h2>
        <p className="text-xs text-theme-secondary font-light">
          {isHindi
            ? 'कॉरिडोर-वार मांग, रूपांतरण फ़नल और विभिन्न प्रचार स्रोतों का डेटा-संचालित विश्लेषण।'
            : 'Data-driven intelligence across corridor capital allocations, lead source efficacy, and deal velocity.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Corridor Demand Breakdown */}
        <div className="p-6 rounded-2xl bg-theme-card border dark:border-white/10 border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-luxury-gold" />
              <h3 className="font-serif font-bold text-sm text-theme-primary">
                {isHindi ? 'कॉरिडोर-वार निवेशक मांग विभाजन' : 'Corridor-wise Capital Allocation'}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-luxury-gold font-bold">
              100% Verified
            </span>
          </div>

          <div className="space-y-3.5">
            {Object.entries(metrics.corridorCounts).map(([corridor, count]) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={corridor} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-theme-secondary truncate max-w-[280px]">
                      {corridor}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-theme-muted">{count} leads</span>
                      <span className="font-bold text-luxury-gold">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-theme-base overflow-hidden border dark:border-white/5 border-slate-100">
                    <div
                      className="h-full rounded-full bg-gold-gradient transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6-Stage Conversion Funnel */}
        <div className="p-6 rounded-2xl bg-theme-card border dark:border-white/10 border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="font-serif font-bold text-sm text-theme-primary">
                {isHindi ? '6-चरणीय ड्यू-डिलिजेंस रूपांतरण फ़नल' : '6-Stage Advisory Conversion Funnel'}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold">
              {metrics.conversionRate}% Velocity
            </span>
          </div>

          <div className="space-y-3">
            {CRM_STAGES.map((stage, idx) => {
              const count = metrics.stageCounts[stage.id] || 0;
              const pct = Math.round((count / total) * 100);
              const widthPct = Math.max(15, Math.min(100, 100 - idx * 13));

              return (
                <div key={stage.id} className="p-2.5 rounded-xl bg-theme-base border dark:border-white/5 border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 text-theme-secondary font-mono font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-theme-primary">
                      {isHindi ? stage.labelHi : stage.labelEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span className="font-bold text-luxury-gold">{count}</span>
                    <span className="text-[10px] text-theme-muted">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div className="p-6 rounded-2xl bg-theme-card border dark:border-white/10 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="font-serif font-bold text-sm text-theme-primary">
              {isHindi ? 'लीड स्रोत प्रभावशीलता' : 'Inquiry Source Attribution'}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {Object.entries(sourceCounts).map(([source, count]) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={source} className="p-3 rounded-xl bg-theme-base border dark:border-white/5 border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-theme-muted tracking-wider truncate block">
                    {source}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-serif font-bold text-theme-primary">
                      {count}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-500">
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advisory Quality Guarantee Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-theme-card to-cyan-950/30 border border-luxury-gold/40 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-gold-gradient text-luxury-darker mb-2">
              <ShieldCheck className="w-3 h-3 text-luxury-darker" />
              <span>Zero-Brokerage Fiduciary Model</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-theme-primary">
              {isHindi ? '100% स्वतंत्र और निष्पक्ष राजस्व जांच' : 'Strict Fiduciary Governance Over Deals'}
            </h3>
            <p className="text-xs text-theme-secondary font-light leading-relaxed mt-2">
              {isHindi
                ? 'AVM Talks पर प्रत्येक डील को तब तक क्लोज्ड नहीं माना जाता जब तक 30-वर्षीय जमाबंदी, एनईसी और धारा 90-ए का भौतिक सीमांकन पूर्ण न हो जाए।'
                : 'Under Avnish’s charter, no lead moves to Token or Registry without verified revenue Jamabandi, JDA Section 90-A sanction maps, and ground road bitumen validation.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border dark:border-white/10 border-slate-200 flex items-center justify-between text-xs font-mono">
            <span className="text-theme-muted">Target Registry Horizon:</span>
            <span className="text-luxury-gold font-bold">30–60 Days Average</span>
          </div>
        </div>
      </div>
    </div>
  );
};
