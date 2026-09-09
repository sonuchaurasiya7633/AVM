import React, { useState } from 'react';
import { 
  Car, Calendar, Clock, MapPin, User, Phone, CheckCircle2, 
  Plus, MessageSquare, Trash2, AlertCircle, Sparkles 
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useLanguage } from '../../context/LanguageContext';
import { AGENTS_DATA } from '../../data/agents';
import { CRM_CORRIDORS } from '../../data/initialCrmData';

export const CrmVisitsCalendar = () => {
  const { siteVisits, scheduleVisit, updateVisitStatus, deleteVisit, leads } = useCRM();
  const { isHindi } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    leadId: '',
    leadName: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (10:30 AM)',
    pickupLocation: 'Jaipur International Airport (T2)',
    corridor: CRM_CORRIDORS[0],
    vehicle: 'Executive SUV (Toyota Fortuner)',
    coordinator: AGENTS_DATA[0].name,
    notes: 'Client requests road width physical tape audit and boundary pillar inspection.',
  });

  const handleLeadSelect = (e) => {
    const selectedLeadId = e.target.value;
    const selectedLead = leads.find((l) => l.id === selectedLeadId);
    if (selectedLead) {
      setFormData((prev) => ({
        ...prev,
        leadId: selectedLead.id,
        leadName: selectedLead.name,
        phone: selectedLead.phone,
        corridor: selectedLead.corridor,
        coordinator: selectedLead.coordinatorAssigned || AGENTS_DATA[0].name,
      }));
    } else {
      setFormData((prev) => ({ ...prev, leadId: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    scheduleVisit(formData);
    setShowAddForm(false);
    setFormData({
      leadId: '',
      leadName: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Morning (10:30 AM)',
      pickupLocation: 'Jaipur International Airport (T2)',
      corridor: CRM_CORRIDORS[0],
      vehicle: 'Executive SUV (Toyota Fortuner)',
      coordinator: AGENTS_DATA[0].name,
      notes: '',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return { labelEn: 'Confirmed', labelHi: 'पुष्टीकृत', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' };
      case 'completed':
        return { labelEn: 'Completed', labelHi: 'सम्पन्न', color: 'bg-blue-500/10 text-blue-500 border-blue-500/30' };
      case 'cancelled':
        return { labelEn: 'Cancelled', labelHi: 'रद्द', color: 'bg-rose-500/10 text-rose-500 border-rose-500/30' };
      default:
        return { labelEn: 'Scheduled', labelHi: 'शेड्यूल किया', color: 'bg-amber-500/10 text-amber-500 border-amber-500/30' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-theme-primary">
            {isHindi ? 'ऑन-ग्राउंड वीआईपी साइट विजिट एवं वाहन शेड्यूलर' : 'VIP On-Ground Site Inspections & Chauffeur Transit'}
          </h2>
          <p className="text-xs text-theme-secondary font-light">
            {isHindi
              ? 'लक्जरी एसयूवी पिकअप, ड्राइवर डिस्पैच और फील्ड समन्वयक निरीक्षण रोस्टर।'
              : 'Dedicated luxury chauffeur transits with territory coordinators across Jaipur growth corridors.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-105 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>{isHindi ? 'नई साइट विजिट शेड्यूल करें' : 'Schedule New Inspection'}</span>
        </button>
      </div>

      {/* Add Visit Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-theme-card border-2 border-luxury-gold shadow-lg space-y-4">
          <h3 className="font-serif font-bold text-sm text-theme-primary flex items-center gap-2">
            <Car className="w-4 h-4 text-luxury-gold" />
            <span>{isHindi ? 'वीआईपी साइट विजिट विवरण दर्ज करें' : 'Schedule VIP Chauffeur Site Inspection'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Link to existing lead */}
            <div>
              <label className="block text-theme-secondary font-semibold mb-1">
                {isHindi ? 'मौजूदा लीड से लिंक करें (वैकल्पिक)' : 'Link Existing Lead (Optional)'}
              </label>
              <select
                value={formData.leadId}
                onChange={handleLeadSelect}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              >
                <option value="">-- {isHindi ? 'मैनुअल क्लाइंट विवरण भरें' : 'Custom / Manual Entry'} --</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.phone}) - {l.corridor.split('&')[0]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">{isHindi ? 'क्लाइंट नाम *' : 'Client Name *'}</label>
              <input
                type="text"
                required
                value={formData.leadName}
                onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                placeholder="e.g. Dr. Alok Mathur"
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              />
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">{isHindi ? 'फोन नंबर (व्हाट्सएप) *' : 'Phone Number *'}</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 98290-12345"
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              />
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">{isHindi ? 'विजिट तिथि *' : 'Inspection Date *'}</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              />
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">{isHindi ? 'समय स्लॉट' : 'Time Slot'}</label>
              <select
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              >
                <option>Morning (10:00 AM – 01:00 PM)</option>
                <option>Afternoon (02:00 PM – 05:00 PM)</option>
                <option>Sunset Golden Hour (05:00 PM – 06:30 PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">{isHindi ? 'पिकअप लोकेशन' : 'Pickup Location'}</label>
              <input
                type="text"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                placeholder="e.g. Airport, Marriott, Residence"
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              />
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">{isHindi ? 'लक्ष्य कॉरिडोर' : 'Target Corridor'}</label>
              <select
                value={formData.corridor}
                onChange={(e) => setFormData({ ...formData, corridor: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              >
                {CRM_CORRIDORS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">{isHindi ? 'समन्वयक' : 'Assigned Coordinator'}</label>
              <select
                value={formData.coordinator}
                onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              >
                {AGENTS_DATA.slice(0, 15).map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name} ({a.phone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-theme-secondary font-semibold mb-1">{isHindi ? 'वाहन प्रकार' : 'Vehicle Type'}</label>
              <select
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
              >
                <option>Executive SUV (Toyota Fortuner)</option>
                <option>Luxury MPV (Innova Crysta)</option>
                <option>Premium Sedan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-theme-secondary font-semibold mb-1 text-xs">{isHindi ? 'विशेष निर्देश / नोट्स' : 'Audit Notes & Demarcation Requirements'}</label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-xs text-theme-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-white/10 text-xs text-theme-secondary hover:text-theme-primary"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              {isHindi ? 'शेड्यूल कन्फर्म करें' : 'Confirm Inspection'}
            </button>
          </div>
        </form>
      )}

      {/* List of Visits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {siteVisits.map((visit) => {
          const statusObj = getStatusBadge(visit.status);
          const cleanPhone = (visit.phone || '').replace(/[^0-9]/g, '');
          const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
          const whatsappMsg = `Namaste ${visit.leadName} ji, your VIP site inspection for ${visit.corridor} is scheduled on ${visit.date} (${visit.timeSlot}). Chauffeur pickup at ${visit.pickupLocation}.`;
          const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(whatsappMsg)}`;

          return (
            <div
              key={visit.id}
              className="p-5 rounded-2xl bg-theme-card border dark:border-white/10 border-slate-200 shadow-sm space-y-3 relative hover:border-luxury-gold transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-sm text-theme-primary">
                    {visit.leadName}
                  </h4>
                  <p className="text-xs font-mono text-theme-muted mt-0.5">{visit.phone}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusObj.color}`}>
                  {isHindi ? statusObj.labelHi : statusObj.labelEn}
                </span>
              </div>

              {/* Schedule Details */}
              <div className="p-3 rounded-xl bg-theme-base border dark:border-white/5 border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-theme-primary">
                  <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
                  <span className="font-bold">{visit.date}</span>
                  <span className="text-theme-muted">•</span>
                  <span className="text-theme-secondary">{visit.timeSlot}</span>
                </div>

                <div className="flex items-center gap-2 text-theme-muted text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{visit.pickupLocation}</span>
                </div>

                <div className="flex items-center gap-2 text-theme-muted text-[11px]">
                  <Car className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{visit.vehicle}</span>
                </div>
              </div>

              {/* Corridor & Coordinator */}
              <div className="text-[11px] space-y-1">
                <p className="text-theme-secondary">
                  <span className="text-theme-muted">{isHindi ? 'कॉरिडोर:' : 'Corridor:'}</span> <strong className="text-theme-primary">{visit.corridor}</strong>
                </p>
                <p className="text-theme-secondary">
                  <span className="text-theme-muted">{isHindi ? 'समन्वयक:' : 'Lead Coord:'}</span> <strong className="text-luxury-gold">{visit.coordinator}</strong>
                </p>
                {visit.notes && (
                  <p className="text-[10.5px] text-theme-muted italic border-t dark:border-white/5 border-slate-100 pt-1 mt-1">
                    "{visit.notes}"
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t dark:border-white/5 border-slate-100">
                <select
                  value={visit.status}
                  onChange={(e) => updateVisitStatus(visit.id, e.target.value)}
                  className="text-[11px] rounded-lg px-2 py-1 bg-theme-base border dark:border-white/10 border-slate-300 text-theme-primary"
                >
                  <option value="scheduled">{isHindi ? 'शेड्यूल्ड' : 'Scheduled'}</option>
                  <option value="confirmed">{isHindi ? 'कन्फर्म' : 'Confirmed'}</option>
                  <option value="completed">{isHindi ? 'सम्पन्न' : 'Completed'}</option>
                  <option value="cancelled">{isHindi ? 'रद्द' : 'Cancelled'}</option>
                </select>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${visit.phone}`}
                    className="p-1.5 rounded-lg border dark:border-white/10 border-slate-200 text-theme-secondary hover:text-cyan-400"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => deleteVisit(visit.id)}
                    className="p-1.5 rounded-lg border dark:border-white/10 border-slate-200 text-slate-400 hover:text-rose-500"
                    title="Delete Visit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
