import React, { useState } from 'react';
import { 
  Phone, MessageSquare, MapPin, Eye, Trash2, ArrowUpDown, ChevronDown, CheckCircle2 
} from 'lucide-react';
import { CRM_STAGES, CRM_PRIORITIES } from '../../data/initialCrmData';
import { useCRM } from '../../context/CRMContext';
import { useLanguage } from '../../context/LanguageContext';

export const CrmTable = ({ onSelectLead, searchQuery, filterCorridor, filterPriority }) => {
  const { leads, changeLeadStage, deleteLead } = useCRM();
  const { isHindi } = useLanguage();
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter
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

  // Sort
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortBy === 'budget') {
      return sortOrder === 'asc' ? a.budgetLakhs - b.budgetLakhs : b.budgetLakhs - a.budgetLakhs;
    }
    // Default by date
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleDelete = (e, lead) => {
    e.stopPropagation();
    if (window.confirm(isHindi ? `क्या आप "${lead.name}" की लीड हटाना चाहते हैं?` : `Delete lead for ${lead.name}?`)) {
      deleteLead(lead.id);
    }
  };

  return (
    <div className="rounded-2xl bg-theme-card border dark:border-white/10 border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b dark:border-white/10 border-slate-200 bg-slate-50/70 dark:bg-white/[0.02] text-theme-muted uppercase font-bold tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4 cursor-pointer select-none" onClick={() => toggleSort('name')}>
                <div className="flex items-center gap-1.5">
                  <span>{isHindi ? 'क्लाइंट नाम' : 'Client Profile'}</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">{isHindi ? 'कॉरिडोर एवं स्कीम' : 'Corridor & Scheme'}</th>
              <th className="py-3 px-4 cursor-pointer select-none" onClick={() => toggleSort('budget')}>
                <div className="flex items-center gap-1.5">
                  <span>{isHindi ? 'बजट एवं साइज' : 'Budget & Size'}</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">{isHindi ? 'पाइपलाइन चरण' : 'Pipeline Stage'}</th>
              <th className="py-3 px-4">{isHindi ? 'प्राथमिकता' : 'Priority'}</th>
              <th className="py-3 px-4">{isHindi ? 'समन्वयक' : 'Coordinator'}</th>
              <th className="py-3 px-4 text-right">{isHindi ? 'एक्शन' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-white/5 divide-slate-100">
            {sortedLeads.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-theme-muted">
                  {isHindi ? 'कोई लीड नहीं मिली।' : 'No leads match your filter criteria.'}
                </td>
              </tr>
            ) : (
              sortedLeads.map((lead) => {
                const priorityObj = CRM_PRIORITIES.find((p) => p.id === lead.priority) || CRM_PRIORITIES[1];
                const stageObj = CRM_STAGES.find((s) => s.id === lead.stage) || CRM_STAGES[0];
                const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                const whatsappMsg = `Namaste ${lead.name} ji, following up from Avnish's Advisory Desk regarding ${lead.plotName}.`;
                const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(whatsappMsg)}`;

                return (
                  <tr
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    {/* Client Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-theme-base border border-luxury-gold/40 flex items-center justify-center font-bold text-luxury-gold text-xs flex-shrink-0">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-serif font-bold text-xs text-theme-primary leading-tight">
                            {lead.name}
                          </p>
                          <p className="text-[10px] text-theme-muted mt-0.5 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                            <span>{lead.city}</span>
                            <span>•</span>
                            <span className="font-mono">{lead.phone}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Corridor & Plot */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-theme-primary truncate max-w-[200px]">
                        {lead.plotName}
                      </p>
                      <p className="text-[10.5px] text-theme-muted truncate max-w-[200px]">
                        {lead.corridor}
                      </p>
                    </td>

                    {/* Budget & Size */}
                    <td className="py-3.5 px-4 font-mono">
                      <p className="font-bold text-luxury-gold">
                        ₹{lead.budgetLakhs} Lakhs
                      </p>
                      <p className="text-[10.5px] text-theme-muted">
                        {lead.plotSizeGaj} Gaj
                      </p>
                    </td>

                    {/* Stage Selector */}
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.stage}
                        onChange={(e) => changeLeadStage(lead.id, e.target.value)}
                        className="text-xs rounded-lg px-2.5 py-1 bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                      >
                        {CRM_STAGES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {isHindi ? s.labelHi : s.labelEn}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Priority Pill */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${priorityObj.color}`}>
                        {priorityObj.badge}
                      </span>
                    </td>

                    {/* Coordinator */}
                    <td className="py-3.5 px-4 text-theme-secondary text-[11px]">
                      {lead.coordinatorAssigned}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1.5">
                        <a
                          href={`tel:${lead.phone}`}
                          title={`Call ${lead.name}`}
                          className="p-1.5 rounded-lg border dark:border-white/10 border-slate-200 text-theme-secondary hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          title={`WhatsApp ${lead.name}`}
                          className="p-1.5 rounded-lg border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => onSelectLead(lead)}
                          title={isHindi ? 'डिटेल देखें' : 'View Full Dossier'}
                          className="p-1.5 rounded-lg border dark:border-white/10 border-slate-200 text-theme-secondary hover:text-luxury-gold hover:border-luxury-gold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, lead)}
                          title={isHindi ? 'हटाएं' : 'Delete Lead'}
                          className="p-1.5 rounded-lg border dark:border-white/10 border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
