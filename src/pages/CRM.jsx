import React, { useState } from 'react';
import { 
  Kanban, Table, Car, CheckSquare, BarChart3, Search, Filter, 
  Plus, Download, RefreshCw, ShieldCheck, Sparkles, Building2, User 
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { useLanguage } from '../context/LanguageContext';
import { CRM_CORRIDORS, CRM_PRIORITIES } from '../data/initialCrmData';
import { CrmStatsHeader } from '../components/crm/CrmStatsHeader';
import { CrmKanban } from '../components/crm/CrmKanban';
import { CrmTable } from '../components/crm/CrmTable';
import { CrmVisitsCalendar } from '../components/crm/CrmVisitsCalendar';
import { CrmTasks } from '../components/crm/CrmTasks';
import { CrmAnalytics } from '../components/crm/CrmAnalytics';
import { CrmLeadDetailModal } from '../components/crm/CrmLeadDetailModal';
import { CrmAddLeadModal } from '../components/crm/CrmAddLeadModal';

export const CRM = () => {
  const { isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'table' | 'visits' | 'tasks' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCorridor, setFilterCorridor] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const tabs = [
    { id: 'kanban', labelEn: 'Pipeline (Kanban)', labelHi: 'पाइपलाइन (कान्बान)', icon: Kanban },
    { id: 'table', labelEn: 'All Leads (Table)', labelHi: 'सभी लीड्स (तालिका)', icon: Table },
    { id: 'visits', labelEn: 'VIP Site Visits', labelHi: 'साइट विजिट्स', icon: Car },
    { id: 'tasks', labelEn: 'Action Tasks', labelHi: 'कार्य एवं फॉलो-अप', icon: CheckSquare },
    { id: 'analytics', labelEn: 'Analytics & Insights', labelHi: 'एनालिटिक्स एवं अंतर्दृष्टि', icon: BarChart3 },
  ];

  return (
    <div className="pt-28 pb-20 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto space-y-8">
      {/* Top Section: Executive Stats Header & KPIs */}
      <CrmStatsHeader 
        onOpenAddLead={() => setIsAddLeadOpen(true)} 
      />

      {/* View Switcher & Universal Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-theme-card border dark:border-white/10 border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Tab Navigation Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gold-gradient text-luxury-darker font-bold shadow-sm'
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{isHindi ? tab.labelHi : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          {(activeTab === 'kanban' || activeTab === 'table') && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[220px] flex-1 sm:flex-none">
                <Search className="w-3.5 h-3.5 text-theme-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isHindi ? 'नाम, फोन, शहर से खोजें...' : 'Search name, phone, city...'}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-xs text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
                />
              </div>

              {/* Corridor Filter */}
              <select
                value={filterCorridor}
                onChange={(e) => setFilterCorridor(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-xs text-theme-primary focus:outline-none focus:border-luxury-gold"
              >
                <option value="">{isHindi ? 'सभी कॉरिडोर' : 'All Corridors'}</option>
                {CRM_CORRIDORS.map((c) => (
                  <option key={c} value={c}>
                    {c.split(' (')[0]}
                  </option>
                ))}
              </select>

              {/* Priority Filter */}
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-xs text-theme-primary focus:outline-none focus:border-luxury-gold"
              >
                <option value="">{isHindi ? 'सभी प्राथमिकता' : 'All Priorities'}</option>
                {CRM_PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.badge}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Active Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === 'kanban' && (
          <CrmKanban
            onSelectLead={(lead) => setSelectedLead(lead)}
            searchQuery={searchQuery}
            filterCorridor={filterCorridor}
            filterPriority={filterPriority}
          />
        )}

        {activeTab === 'table' && (
          <CrmTable
            onSelectLead={(lead) => setSelectedLead(lead)}
            searchQuery={searchQuery}
            filterCorridor={filterCorridor}
            filterPriority={filterPriority}
          />
        )}

        {activeTab === 'visits' && <CrmVisitsCalendar />}

        {activeTab === 'tasks' && <CrmTasks />}

        {activeTab === 'analytics' && <CrmAnalytics />}
      </div>

      {/* Lead Detail Dossier Modal */}
      {selectedLead && (
        <CrmLeadDetailModal
          lead={selectedLead}
          isOpen={Boolean(selectedLead)}
          onClose={() => setSelectedLead(null)}
        />
      )}

      {/* Add Lead Entry Modal */}
      <CrmAddLeadModal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
      />
    </div>
  );
};
