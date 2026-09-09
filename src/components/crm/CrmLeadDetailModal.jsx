import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Phone, MessageSquare, MapPin, Calendar, Clock, User, 
  Send, FileCheck2, Car, ShieldCheck, Sparkles, CheckCircle2, ChevronRight, Award
} from 'lucide-react';
import { CRM_STAGES, CRM_PRIORITIES } from '../../data/initialCrmData';
import { AGENTS_DATA } from '../../data/agents';
import { useCRM } from '../../context/CRMContext';
import { useLanguage } from '../../context/LanguageContext';

export const CrmLeadDetailModal = ({ lead, isOpen, onClose }) => {
  const { updateLead, changeLeadStage, addActivity, scheduleVisit } = useCRM();
  const { isHindi } = useLanguage();
  const [newNoteText, setNewNoteText] = useState('');
  const [isSchedulingVisit, setIsSchedulingVisit] = useState(false);
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen || !lead) return null;

  const currentStageIndex = CRM_STAGES.findIndex((s) => s.id === lead.stage);
  const priorityObj = CRM_PRIORITIES.find((p) => p.id === lead.priority) || CRM_PRIORITIES[1];

  const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
  const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const whatsappMsg = `Namaste ${lead.name} ji, this is from Avnish's Advisory Desk regarding your inquiry for ${lead.plotName || lead.corridor}.`;
  const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addActivity(lead.id, {
      type: 'note',
      text: newNoteText.trim(),
    });
    setNewNoteText('');
  };

  const handleQuickVisitSchedule = (e) => {
    e.preventDefault();
    scheduleVisit({
      leadId: lead.id,
      leadName: lead.name,
      phone: lead.phone,
      date: visitDate,
      timeSlot: 'Morning (10:30 AM)',
      pickupLocation: `${lead.city} / Residence`,
      corridor: lead.corridor,
      vehicle: 'Executive SUV (Toyota Fortuner)',
      coordinator: lead.coordinatorAssigned || AGENTS_DATA[0].name,
      notes: `Direct VIP site visit scheduled for ${lead.plotName}`,
    });
    setIsSchedulingVisit(false);
  };

  const handleCoordinatorChange = (e) => {
    updateLead(lead.id, { coordinatorAssigned: e.target.value });
    addActivity(lead.id, {
      type: 'assigned',
      text: `Assigned territory coordinator changed to ${e.target.value}`,
    });
  };

  const handlePriorityChange = (e) => {
    updateLead(lead.id, { priority: e.target.value });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative w-full max-w-3xl rounded-3xl bg-theme-card border-2 border-luxury-gold shadow-2xl overflow-hidden z-10 my-8 leather-stitch-outline max-h-[90vh] flex flex-col"
        >
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5 z-20" />
          <div className="brass-screw absolute top-3.5 right-3.5 z-20" />
          <div className="brass-screw absolute bottom-3.5 left-3.5 z-20" />
          <div className="brass-screw absolute bottom-3.5 right-3.5 z-20" />

          {/* Modal Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r dark:from-[#0b1120] dark:via-indigo-950/60 dark:to-[#030712] from-slate-900 via-slate-800 to-slate-950 text-white border-b border-white/10 flex-shrink-0 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/40 text-cyan-400 hover:text-white hover:bg-black/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${priorityObj.color}`}>
                {priorityObj.badge}
              </span>
              <span className="text-[10.5px] font-mono text-cyan-400">
                Lead ID: {lead.id}
              </span>
              <span className="text-[10px] text-slate-400">•</span>
              <span className="text-[10px] text-slate-300 font-mono">
                Source: {lead.source}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {lead.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {lead.city}
              </span>
              <span>•</span>
              <span className="font-mono">{lead.phone}</span>
              {lead.email && (
                <>
                  <span>•</span>
                  <span>{lead.email}</span>
                </>
              )}
            </div>

            {/* Stage Progression Stepper */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                <span>{isHindi ? 'पाइपलाइन चरण:' : 'Pipeline Progression:'}</span>
                <span className="text-amber-400 font-mono">
                  Stage {currentStageIndex + 1} of {CRM_STAGES.length}
                </span>
              </div>

              <div className="grid grid-cols-6 gap-1.5">
                {CRM_STAGES.map((stg, idx) => {
                  const isPastOrCurrent = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  return (
                    <button
                      key={stg.id}
                      onClick={() => changeLeadStage(lead.id, stg.id)}
                      className={`py-1 px-1 rounded-lg text-center text-[9px] font-semibold truncate transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-gold-gradient text-luxury-darker font-bold shadow-md'
                          : isPastOrCurrent
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-black/30 text-slate-400 border border-white/5 hover:border-white/20'
                      }`}
                    >
                      {isHindi ? stg.labelHi.split(' ')[0] : stg.labelEn.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs">
            {/* Action Bar (WhatsApp, Call, Schedule Visit) */}
            <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-2xl bg-theme-base border dark:border-white/10 border-slate-200">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isHindi ? 'व्हाट्सएप चैट' : 'Open WhatsApp'}</span>
              </a>

              <a
                href={`tel:${lead.phone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border dark:border-white/15 border-slate-300 bg-theme-card text-theme-primary hover:border-cyan-400 font-bold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isHindi ? 'कॉल करें' : 'Call Client'}</span>
              </a>

              <button
                onClick={() => setIsSchedulingVisit(!isSchedulingVisit)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-luxury-darker font-bold transition-all shadow-sm"
              >
                <Car className="w-3.5 h-3.5" />
                <span>{isHindi ? 'साइट विजिट तय करें' : 'Schedule Visit'}</span>
              </button>
            </div>

            {/* Quick Visit Scheduler inline */}
            {isSchedulingVisit && (
              <form onSubmit={handleQuickVisitSchedule} className="p-4 rounded-xl bg-theme-base border border-luxury-gold space-y-3">
                <h4 className="font-serif font-bold text-xs text-luxury-gold flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'साइट विजिट तारीख तय करें' : 'Schedule VIP Chauffeur Inspection'}</span>
                </h4>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-theme-card border dark:border-white/10 border-slate-300 text-theme-primary text-xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase"
                  >
                    {isHindi ? 'कन्फर्म करें' : 'Book Chauffeur'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSchedulingVisit(false)}
                    className="px-3 py-2 text-theme-muted hover:text-theme-primary text-xs"
                  >
                    {isHindi ? 'रद्द' : 'Cancel'}
                  </button>
                </div>
              </form>
            )}

            {/* Core Deal Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-theme-base border dark:border-white/5 border-slate-100">
                <span className="text-[10px] uppercase font-bold text-theme-muted block">{isHindi ? 'बजट' : 'Target Budget'}</span>
                <span className="text-base font-serif font-bold text-luxury-gold">₹{lead.budgetLakhs} Lakhs</span>
              </div>
              <div className="p-3.5 rounded-xl bg-theme-base border dark:border-white/5 border-slate-100">
                <span className="text-[10px] uppercase font-bold text-theme-muted block">{isHindi ? 'प्लॉट साइज' : 'Plot Size'}</span>
                <span className="text-base font-serif font-bold text-theme-primary">{lead.plotSizeGaj} Gaj</span>
              </div>
              <div className="p-3.5 rounded-xl bg-theme-base border dark:border-white/5 border-slate-100">
                <span className="text-[10px] uppercase font-bold text-theme-muted block">{isHindi ? 'प्राथमिकता' : 'Priority Level'}</span>
                <select
                  value={lead.priority}
                  onChange={handlePriorityChange}
                  className="mt-1 text-xs font-bold bg-transparent text-theme-primary focus:outline-none"
                >
                  <option value="hot">🔥 Hot Lead</option>
                  <option value="warm">⚡ Warm Lead</option>
                  <option value="cold">❄️ Cold Lead</option>
                </select>
              </div>
              <div className="p-3.5 rounded-xl bg-theme-base border dark:border-white/5 border-slate-100">
                <span className="text-[10px] uppercase font-bold text-theme-muted block">{isHindi ? 'समन्वयक' : 'Coordinator'}</span>
                <select
                  value={lead.coordinatorAssigned}
                  onChange={handleCoordinatorChange}
                  className="mt-1 text-xs font-bold bg-transparent text-theme-primary focus:outline-none truncate w-full"
                >
                  {AGENTS_DATA.slice(0, 15).map((a) => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scheme & Corridor Info */}
            <div className="p-4 rounded-xl bg-theme-base border dark:border-white/5 border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-theme-muted">{isHindi ? 'लक्षित संपत्ति / योजना' : 'Property / Scheme of Interest'}</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
                  90-A Verified
                </span>
              </div>
              <p className="text-sm font-serif font-bold text-theme-primary">{lead.plotName}</p>
              <p className="text-xs text-theme-secondary flex items-center gap-1">
                <MapPin className="w-3 h-3 text-luxury-gold" />
                <span>{lead.corridor}</span>
              </p>
              {lead.notes && (
                <div className="pt-2 border-t dark:border-white/5 border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-theme-muted block mb-0.5">{isHindi ? 'क्लाइंट नोट्स / आवश्यकताएं' : 'Client Requirements & Notes'}</span>
                  <p className="text-xs text-theme-secondary font-light leading-relaxed">
                    {lead.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Activity & Communication History */}
            <div className="space-y-3 pt-2">
              <h4 className="font-serif font-bold text-sm text-theme-primary flex items-center justify-between">
                <span>{isHindi ? 'गतिविधि एवं परामर्श इतिहास' : 'Audit Trail & Activity Timeline'}</span>
                <span className="text-[10px] font-mono text-theme-muted">
                  {(lead.activities || []).length} events
                </span>
              </h4>

              {/* Add Note Input */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder={isHindi ? 'नया नोट या कॉल विवरण दर्ज करें...' : 'Log a call note, document dispatch, or requirement...'}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-xs text-theme-primary focus:outline-none focus:border-luxury-gold"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gold-gradient text-luxury-darker font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isHindi ? 'जोड़ें' : 'Log Note'}</span>
                </button>
              </form>

              {/* Activity Timeline List */}
              <div className="space-y-2.5 pt-2">
                {(lead.activities || []).map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-theme-base border dark:border-white/5 border-slate-100 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px]">
                      ✦
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <p className="text-xs text-theme-primary font-medium leading-relaxed">
                        {act.text}
                      </p>
                      <p className="text-[10px] font-mono text-theme-muted">
                        {new Date(act.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
