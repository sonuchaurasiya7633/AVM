import React from 'react';
import { 
  Users, TrendingUp, Car, Award, Flame, Download, Plus, RefreshCw, FileSpreadsheet, ShieldCheck
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useLanguage } from '../../context/LanguageContext';

export const CrmStatsHeader = ({ onOpenAddLead, onOpenImport }) => {
  const { metrics, exportLeadsCSV, exportFullJSON, resetToDefaultSeed } = useCRM();
  const { isHindi } = useLanguage();

  const handleReset = () => {
    if (window.confirm(isHindi ? 'क्या आप CRM डेटा को डिफ़ॉल्ट डेमो डेटा पर रीसेट करना चाहते हैं?' : 'Reset CRM data to default high-caliber demo dataset?')) {
      resetToDefaultSeed();
    }
  };

  const statCards = [
    {
      labelEn: 'Total Active Inquiries',
      labelHi: 'कुल सक्रिय लीड्स',
      value: metrics.totalLeads,
      subEn: `${metrics.hotLeadsCount} High Priority (Hot)`,
      subHi: `${metrics.hotLeadsCount} अति-महत्वपूर्ण (Hot)`,
      icon: Users,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      labelEn: 'Live Pipeline Value',
      labelHi: 'सक्रिय पाइपलाइन मूल्य',
      value: `₹${metrics.pipelineValueCrores} Cr`,
      subEn: 'Sum of investor budgets',
      subHi: 'निवेशकों का कुल बजट',
      icon: TrendingUp,
      color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
    },
    {
      labelEn: 'VIP Site Inspections',
      labelHi: 'निर्धारित साइट विजिट',
      value: metrics.siteVisitsCount,
      subEn: 'Chauffeur visits logged',
      subHi: 'वाहन सुविधा सहित',
      icon: Car,
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    },
    {
      labelEn: 'Closed Deals / Patta',
      labelHi: 'सफल रजिस्ट्री / पट्टा',
      value: metrics.closedDeals,
      subEn: `${metrics.conversionRate}% Conversion Rate`,
      subHi: `${metrics.conversionRate}% रूपांतरण दर`,
      icon: Award,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      labelEn: 'Hot Actionable Leads',
      labelHi: 'तत्काल कार्रवाई योग्य',
      value: metrics.hotLeadsCount,
      subEn: `${metrics.pendingTasks} Pending follow-up tasks`,
      subHi: `${metrics.pendingTasks} लंबित कार्य`,
      icon: Flame,
      color: 'from-rose-500/20 to-orange-500/10 border-rose-500/30 text-rose-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-luxury-darker font-bold mb-2 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-luxury-darker" />
            <span>{isHindi ? 'अवनिष संस्थागत CRM' : 'Avnish Institutional Real Estate CRM'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-theme-primary">
            {isHindi ? 'क्लाइंट एवं लीड प्रबंधन केंद्र' : 'Investor Pipeline & Advisory CRM'}
          </h1>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-1">
            {isHindi
              ? 'हाई-नेट-वर्थ निवेशकों, साइट विजिट शेड्यूलिंग और 52+ फील्ड समन्वयकों का एकीकृत डैशबोर्ड।'
              : 'Enterprise CRM managing HNI plotted acquisitions, VIP chauffeur inspections, and territory coordinator dispatches.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={onOpenAddLead}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{isHindi ? 'नई लीड जोड़ें' : 'Add New Lead'}</span>
          </button>

          <button
            onClick={exportLeadsCSV}
            title={isHindi ? 'एक्सेल CSV में डाउनलोड करें' : 'Export leads to CSV'}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border dark:border-white/15 border-slate-300 bg-theme-card hover:border-luxury-gold text-xs font-semibold text-theme-primary hover:text-luxury-gold transition-colors shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span className="hidden md:inline">{isHindi ? 'CSV एक्सपोर्ट' : 'Export CSV'}</span>
          </button>

          <button
            onClick={exportFullJSON}
            title={isHindi ? 'फुल बैकअप डाउनलोड करें' : 'Backup full CRM JSON'}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border dark:border-white/15 border-slate-300 bg-theme-card hover:border-luxury-gold text-xs font-semibold text-theme-primary hover:text-luxury-gold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">{isHindi ? 'बैकअप JSON' : 'Backup'}</span>
          </button>

          <button
            onClick={handleReset}
            title={isHindi ? 'डेमो डेटा रीसेट करें' : 'Reset to default demo data'}
            className="p-2.5 rounded-xl border dark:border-white/15 border-slate-300 bg-theme-card hover:border-rose-400 text-slate-400 hover:text-rose-400 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br bg-theme-card border shadow-sm relative overflow-hidden transition-all hover:scale-[1.02] ${card.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 truncate">
                  {isHindi ? card.labelHi : card.labelEn}
                </span>
                <Icon className="w-4 h-4 opacity-90 flex-shrink-0" />
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-theme-primary tracking-tight">
                {card.value}
              </p>
              <p className="text-[10px] sm:text-[11px] text-theme-muted font-light mt-1 truncate">
                {isHindi ? card.subHi : card.subEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
