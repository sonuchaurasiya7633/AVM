import React from 'react';
import { 
  Phone, MessageSquare, ChevronLeft, ChevronRight, User, MapPin, 
  ArrowRight, Flame, Sparkles, Building2, Calendar, FileCheck2
} from 'lucide-react';
import { CRM_STAGES, CRM_PRIORITIES } from '../../data/initialCrmData';
import { useCRM } from '../../context/CRMContext';
import { useLanguage } from '../../context/LanguageContext';

export const CrmKanban = ({ onSelectLead, searchQuery, filterCorridor, filterPriority }) => {
  const { leads, changeLeadStage } = useCRM();
  const { isHindi } = useLanguage();

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name.toLowerCase().includes(q);
      const matchPhone = lead.phone.includes(q);
      const matchCity = (lead.city || '').toLowerCase().includes(q);
      const matchPlot = (lead.plotName || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchCity && !matchPlot) return false;
    }
    if (filterCorridor && lead.corridor !== filterCorridor) return false;
    if (filterPriority && lead.priority !== filterPriority) return false;
    return true;
  });

  const getPriorityInfo = (priorityId) => {
    return CRM_PRIORITIES.find((p) => p.id === priorityId) || CRM_PRIORITIES[1];
  };

  const getStageIndex = (stageId) => CRM_STAGES.findIndex((s) => s.id === stageId);

  const moveLead = (e, leadId, currentStage, direction) => {
    e.stopPropagation();
    const currentIndex = getStageIndex(currentStage);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < CRM_STAGES.length) {
      const nextStage = CRM_STAGES[newIndex].id;
      changeLeadStage(leadId, nextStage);
    }
  };

  return (
    <div className="overflow-x-auto pb-4 pt-1">
      <div className="flex gap-4 min-w-[1240px] items-start">
        {CRM_STAGES.map((stage, sIdx) => {
          const stageLeads = filteredLeads.filter((l) => l.stage === stage.id);
          const stageBudgetLakhs = stageLeads.reduce((acc, l) => acc + (Number(l.budgetLakhs) || 0), 0);
          const stageBudgetCr = (stageBudgetLakhs / 100).toFixed(2);

          return (
            <div
              key={stage.id}
              className="w-80 flex-shrink-0 flex flex-col rounded-2xl bg-theme-card border dark:border-white/10 border-slate-200/80 shadow-sm overflow-hidden"
            >
              {/* Stage Header */}
              <div className="p-3.5 border-b dark:border-white/10 border-slate-200 bg-slate-50/70 dark:bg-white/[0.02]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-theme-primary truncate">
                      {isHindi ? stage.labelHi : stage.labelEn}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-theme-base border dark:border-white/10 border-slate-300 text-luxury-gold">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-theme-muted font-mono">
                  <span>{isHindi ? 'पाइपलाइन राशि:' : 'Value:'}</span>
                  <span className="font-bold text-theme-secondary">₹{stageBudgetCr} Cr</span>
                </div>
              </div>

              {/* Leads Container */}
              <div className="p-2 space-y-2.5 max-h-[calc(100vh-340px)] overflow-y-auto">
                {stageLeads.length === 0 ? (
                  <div className="py-10 text-center text-theme-muted text-xs border border-dashed dark:border-white/10 border-slate-200 rounded-xl m-1">
                    {isHindi ? 'कोई लीड नहीं' : 'No leads in this stage'}
                  </div>
                ) : (
                  stageLeads.map((lead) => {
                    const priority = getPriorityInfo(lead.priority);
                    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                    const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                    const whatsappMsg = `Namaste ${lead.name} ji, this is from Avnish's Advisory Desk regarding your interest in ${lead.plotName || lead.corridor}.`;
                    const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(whatsappMsg)}`;

                    return (
                      <div
                        key={lead.id}
                        onClick={() => onSelectLead(lead)}
                        className="group p-3 rounded-xl bg-theme-base border dark:border-white/10 border-slate-200 hover:border-luxury-gold dark:hover:border-luxury-gold transition-all shadow-sm hover:shadow-md cursor-pointer space-y-2.5 relative"
                      >
                        {/* Header: Name & Priority */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-serif font-bold text-xs text-theme-primary group-hover:text-luxury-gold transition-colors leading-tight">
                              {lead.name}
                            </h4>
                            <p className="text-[10px] text-theme-muted mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                              <span className="truncate">{lead.city}</span>
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider border ${priority.color}`}>
                            {priority.badge}
                          </span>
                        </div>

                        {/* Plot / Corridor */}
                        <div className="px-2 py-1.5 rounded-lg bg-theme-card border dark:border-white/5 border-slate-100 text-[10.5px]">
                          <p className="font-semibold text-theme-primary truncate">
                            {lead.plotName}
                          </p>
                          <p className="text-[9.5px] text-theme-muted truncate mt-0.5">
                            {lead.corridor}
                          </p>
                        </div>

                        {/* Metrics: Budget & Size */}
                        <div className="flex items-center justify-between text-[10.5px] font-mono pt-0.5">
                          <span className="text-luxury-gold font-bold">
                            ₹{lead.budgetLakhs} Lakhs
                          </span>
                          <span className="text-theme-secondary">
                            {lead.plotSizeGaj} Gaj
                          </span>
                        </div>

                        {/* Coordinator pill */}
                        <div className="flex items-center justify-between text-[9.5px] text-theme-muted pt-1 border-t dark:border-white/5 border-slate-100">
                          <span className="truncate max-w-[130px]">
                            Coord: <strong className="text-theme-primary">{lead.coordinatorAssigned.split(' ')[0]}</strong>
                          </span>
                          <span className="text-[9px] font-mono opacity-80">
                            {lead.source.split(' ')[0]}
                          </span>
                        </div>

                        {/* Actions Footer */}
                        <div className="flex items-center justify-between pt-1 gap-1">
                          {/* Stage Transition Controls */}
                          <div className="flex items-center gap-1">
                            <button
                              disabled={sIdx === 0}
                              onClick={(e) => moveLead(e, lead.id, lead.stage, 'prev')}
                              title={isHindi ? 'पिछला चरण' : 'Move to Previous Stage'}
                              className="p-1 rounded-md border dark:border-white/10 border-slate-200 hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={sIdx === CRM_STAGES.length - 1}
                              onClick={(e) => moveLead(e, lead.id, lead.stage, 'next')}
                              title={isHindi ? 'अगला चरण' : 'Advance to Next Stage'}
                              className="p-1 rounded-md border dark:border-white/10 border-slate-200 hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Quick WhatsApp & Call Buttons */}
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${lead.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              title={`Call ${lead.name}`}
                              className="p-1.5 rounded-lg border dark:border-white/10 border-slate-200 bg-theme-card text-theme-secondary hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title={`WhatsApp ${lead.name}`}
                              className="p-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
