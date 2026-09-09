import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { CRM_STAGES, CRM_PRIORITIES, CRM_CORRIDORS } from '../../data/initialCrmData';
import { AGENTS_DATA } from '../../data/agents';
import { useCRM } from '../../context/CRMContext';
import { useLanguage } from '../../context/LanguageContext';

export const CrmAddLeadModal = ({ isOpen, onClose }) => {
  const { addLead } = useCRM();
  const { isHindi } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Jaipur',
    corridor: CRM_CORRIDORS[0],
    plotName: 'Aura Grand Sovereign Plotted Enclave',
    budgetLakhs: 75,
    plotSizeGaj: 300,
    stage: 'new',
    priority: 'hot',
    source: 'Direct Phone Inquiry',
    coordinatorAssigned: AGENTS_DATA[0].name,
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    addLead(formData);
    onClose();
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: 'Jaipur',
      corridor: CRM_CORRIDORS[0],
      plotName: 'Aura Grand Sovereign Plotted Enclave',
      budgetLakhs: 75,
      plotSizeGaj: 300,
      stage: 'new',
      priority: 'hot',
      source: 'Direct Phone Inquiry',
      coordinatorAssigned: AGENTS_DATA[0].name,
      notes: '',
    });
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-theme-card border-2 border-luxury-gold shadow-2xl overflow-hidden z-10 my-8 leather-stitch-outline"
        >
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          {/* Modal Header */}
          <div className="p-6 sm:p-7 bg-gradient-to-r dark:from-[#0b1120] dark:via-indigo-950/70 dark:to-[#030712] from-slate-900 via-slate-800 to-slate-950 text-white border-b border-white/10 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/40 text-cyan-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-black/40 text-slate-200 border border-white/10 mb-2">
              <UserPlus className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{isHindi ? 'नई क्लाइंट लीड प्रविष्टि' : 'New Investor Lead Entry'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {isHindi ? 'पाइपलाइन में नई लीड जोड़ें' : 'Create & Register Investor Lead'}
            </h2>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'क्लाइंट का पूरा नाम *' : 'Full Legal Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Rathore"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'फोन नंबर (व्हाट्सएप) *' : 'Phone Number (WhatsApp) *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 98290-12345"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'ईमेल पता' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. investor@familyoffice.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'निवास शहर / देश' : 'City / Location'}
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Jaipur, Delhi, Bengaluru, Dubai NRI"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'कॉरिडोर ऑफ इंटरेस्ट' : 'Corridor of Interest'}
                </label>
                <select
                  value={formData.corridor}
                  onChange={(e) => setFormData({ ...formData, corridor: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                >
                  {CRM_CORRIDORS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'इच्छित स्कीम / प्लॉट नाम' : 'Target Scheme / Plot'}
                </label>
                <input
                  type="text"
                  value={formData.plotName}
                  onChange={(e) => setFormData({ ...formData, plotName: e.target.value })}
                  placeholder="e.g. Aura Grand Sovereign"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'बजट (₹ लाख)' : 'Budget (₹ Lakhs)'}
                </label>
                <input
                  type="number"
                  value={formData.budgetLakhs}
                  onChange={(e) => setFormData({ ...formData, budgetLakhs: e.target.value })}
                  placeholder="75"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'प्लॉट साइज (गज)' : 'Plot Size (Gaj)'}
                </label>
                <input
                  type="number"
                  value={formData.plotSizeGaj}
                  onChange={(e) => setFormData({ ...formData, plotSizeGaj: e.target.value })}
                  placeholder="300"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'प्रारंभिक पाइपलाइन चरण' : 'Initial Stage'}
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                >
                  {CRM_STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {isHindi ? s.labelHi : s.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'प्राथमिकता स्तर' : 'Priority Level'}
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                >
                  <option value="hot">🔥 Hot Lead (Immediate)</option>
                  <option value="warm">⚡ Warm Lead (Active)</option>
                  <option value="cold">❄️ Cold Lead (Nurture)</option>
                </select>
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'लीड स्रोत' : 'Lead Source'}
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                >
                  <option>Direct Phone Inquiry</option>
                  <option>WhatsApp Direct</option>
                  <option>Website Form</option>
                  <option>4K Drone Video</option>
                  <option>Instagram Masterclass</option>
                  <option>Advisory Desk Consultation</option>
                  <option>Client Referral</option>
                </select>
              </div>

              <div>
                <label className="block text-theme-secondary font-semibold mb-1">
                  {isHindi ? 'जिम्मेदार फील्ड समन्वयक' : 'Territory Coordinator'}
                </label>
                <select
                  value={formData.coordinatorAssigned}
                  onChange={(e) => setFormData({ ...formData, coordinatorAssigned: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
                >
                  {AGENTS_DATA.slice(0, 20).map((a) => (
                    <option key={a.name} value={a.name}>
                      {a.name} ({a.phone})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">
                {isHindi ? 'क्लाइंट नोट्स एवं आवश्यकताएं' : 'Client Requirements & Notes'}
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={isHindi ? 'उदा. 60 फीट सड़क, पूर्व मुखी, 90-ए पट्टा कॉपी की मांग...' : 'e.g. East facing corner plot, needs SBI bank loan sanction on 90-A...'}
                className="w-full px-3.5 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary focus:outline-none focus:border-luxury-gold"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t dark:border-white/10 border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border dark:border-white/10 border-slate-300 text-theme-secondary hover:text-theme-primary transition-colors"
              >
                {isHindi ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold hover:scale-105 transition-all"
              >
                {isHindi ? 'लीड सुरक्षित करें' : 'Save & Register Lead'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
