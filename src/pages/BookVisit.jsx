import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { 
  Car, Calendar, Clock, MapPin, User, Phone, CheckCircle2, 
  ShieldCheck, Sparkles, MessageSquare, ArrowRight 
} from 'lucide-react';
import { AGENTS_DATA } from '../data/agents';

export const BookVisit = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickupLocation: 'Jaipur International Airport (JAI)',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM – 01:00 PM)',
    corridor: 'Ajmer Road & Tech Hub (Mahindra SEZ)',
    vehicleType: 'Executive SUV (Toyota Fortuner / Innova Crysta)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappDirectBooking = `https://wa.me/919928365001?text=Hello%20AVM%20Talks,%20I%20want%20to%20schedule%20a%20VIP%20Site%20Inspection%20for%20${encodeURIComponent(formData.corridor)}.%20Pickup:%20${encodeURIComponent(formData.pickupLocation)}.%20Date:%20${encodeURIComponent(formData.preferredDate || 'Upcoming Weekend')}.`;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <Car className="w-3.5 h-3.5" />
          <span>Complimentary Chauffeur Experience</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          Schedule an On-Ground <br />
          <span className="text-gold-gradient italic">VIP Site Inspection.</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          Experience Jaipur’s sanctioned growth corridors firsthand. We provide dedicated luxury chauffeur transit from Jaipur Airport, Railway Station, or your residence, accompanied by an authorized territory coordinator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Handcrafted Leather Folio */}
        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-10 leather-badge-container border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-theme-primary">
                Site Inspection Request Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary font-light max-w-md mx-auto leading-relaxed">
                Our central coordinator desk has received your itinerary. You will receive a confirmation call and driver credentials within 30 minutes.
              </p>
              <div className="pt-6">
                <a
                  href={whatsappDirectBooking}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Rathore"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    Mobile Number (For Driver SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    Pickup Point in Jaipur
                  </label>
                  <select
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  >
                    <option>Jaipur International Airport (JAI - Sanganer)</option>
                    <option>Jaipur Junction Railway Station (Main Gate)</option>
                    <option>MI Road / Police Commissionerate Area</option>
                    <option>Rambagh Circle / Heritage Belt</option>
                    <option>Vaishali Nagar / 200 Ft Bypass</option>
                    <option>Custom Jaipur Hotel / Residence</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    Target Corridor to Inspect
                  </label>
                  <select
                    value={formData.corridor}
                    onChange={(e) => setFormData({ ...formData, corridor: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  >
                    <option>Ajmer Road & Tech Hub (Mahindra SEZ)</option>
                    <option>47-KM Ring Road 360M Development Belt</option>
                    <option>Delhi-Mumbai Expressway & Agra Spur</option>
                    <option>Multi-Corridor Comparative Tour (Full Day)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  >
                    <option>Morning (10:00 AM – 01:00 PM)</option>
                    <option>Afternoon (02:00 PM – 05:00 PM)</option>
                    <option>Full Day Master Tour (10:00 AM – 06:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                  Special Requirements (Plot Size, Budget, Specific Khasra)
                </label>
                <textarea
                  rows="3"
                  placeholder="Mention any specific plot dimensions (e.g. 200 Gaj corner) or patwari survey maps you want ready during the visit..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                <Car className="w-4 h-4" />
                <span>Confirm VIP Chauffeur Booking</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info & Assurance */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl p-6 sm:p-8 leather-badge-container border-2 border-luxury-gold shadow-xl space-y-5 relative overflow-hidden leather-stitch-outline">
            {/* 4 Corner Brass Screws */}
            <div className="brass-screw absolute top-3 left-3" />
            <div className="brass-screw absolute top-3 right-3" />
            <div className="brass-screw absolute bottom-3 left-3" />
            <div className="brass-screw absolute bottom-3 right-3" />

            <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold block">
              VIP Inspection Protocol
            </span>
            <h3 className="text-xl font-serif font-bold text-theme-primary">
              What Is Included in Your Guided Tour
            </h3>

            <div className="space-y-3.5 text-xs text-theme-secondary font-light">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Private luxury AC vehicle (Innova Crysta / Fortuner) with experienced chauffeur.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Physical measuring tape verification of road width and boundary pillars.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Hard-copy handover of certified Section 90-A orders and sanctioned JDA blueprints.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Direct interaction with local territory coordinator from our 52+ coordinator roster.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-luxury-emerald/20 border border-theme-gold/30 text-xs text-theme-primary">
              <p className="font-semibold text-luxury-goldLight mb-1">
                Zero Sales Pressure Guarantee:
              </p>
              <p className="font-light opacity-90 text-[11px] leading-relaxed">
                This is an objective due-diligence ground tour. You are never pushed to book or transfer tokens on site. Take all verified documents home for independent legal audit.
              </p>
            </div>
          </div>

          <div className="rounded-3xl p-6 sm:p-8 bg-theme-surface border border-theme-gold/40 shadow-xl flex items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-theme-muted block font-semibold">
                Instant Coordinator Dispatch
              </span>
              <span className="text-sm sm:text-base font-serif font-bold text-theme-primary">
                Prefer Booking over Phone?
              </span>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-0.5">
                +91 99283-65001
              </p>
            </div>
            <a
              href="tel:9928365001"
              className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-sm hover:scale-105 transition-all"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
