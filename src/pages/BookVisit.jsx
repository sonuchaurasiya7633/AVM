import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { 
  Car, Calendar, Clock, MapPin, User, Phone, CheckCircle2, 
  ShieldCheck, Sparkles, MessageSquare, ArrowRight 
} from 'lucide-react';
import { AGENTS_DATA } from '../data/agents';
import { useLanguage } from '../context/LanguageContext';
import { useCRM } from '../context/CRMContext';

export const BookVisit = () => {
  const { t, isHindi } = useLanguage();
  const { addLead, scheduleVisit } = useCRM();
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
    try {
      const createdLead = addLead({
        name: formData.name,
        phone: formData.phone,
        corridor: formData.corridor,
        plotName: `VIP Inspection: ${formData.corridor}`,
        budgetLakhs: 85,
        plotSizeGaj: 300,
        stage: 'site_visit',
        priority: 'hot',
        source: 'VIP Site Visit Chauffeur Form',
        notes: `Pickup: ${formData.pickupLocation} | Vehicle: ${formData.vehicleType} | Time: ${formData.preferredTime} | Notes: ${formData.notes}`,
      });

      if (createdLead) {
        scheduleVisit({
          leadId: createdLead.id,
          leadName: formData.name,
          phone: formData.phone,
          date: formData.preferredDate || new Date().toISOString().split('T')[0],
          timeSlot: formData.preferredTime,
          pickupLocation: formData.pickupLocation,
          corridor: formData.corridor,
          vehicle: formData.vehicleType,
          notes: formData.notes,
        });
      }
    } catch (err) {
      console.error('CRM auto capture error in BookVisit:', err);
    }
    setSubmitted(true);
  };

  const whatsappDirectBooking = `https://wa.me/919928365001?text=Hello%20AVM%20Talks,%20I%20want%20to%20schedule%20a%20VIP%20Site%20Inspection%20for%20${encodeURIComponent(formData.corridor)}.%20Pickup:%20${encodeURIComponent(formData.pickupLocation)}.%20Date:%20${encodeURIComponent(formData.preferredDate || 'Upcoming Weekend')}.`;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <Car className="w-3.5 h-3.5" />
          <span>{isHindi ? 'निःशुल्क वीआईपी वाहन सुविधा' : 'Complimentary Chauffeur Experience'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          {isHindi ? 'ऑन-ग्राउंड वीआईपी' : 'Schedule an On-Ground'} <br />
          <span className="text-gold-gradient italic">{isHindi ? 'साइट निरीक्षण शेड्यूल करें।' : 'VIP Site Inspection.'}</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          {isHindi
            ? 'जयपुर के विकासशील कॉरिडोरों का प्रत्यक्ष अनुभव करें। हम जयपुर हवाई अड्डे, रेलवे स्टेशन या आपके निवास से अधिकृत क्षेत्रीय समन्वयक के साथ लक्जरी वाहन सुविधा उपलब्ध कराते हैं।'
            : 'Experience Jaipur’s sanctioned growth corridors firsthand. We provide dedicated luxury chauffeur transit from Jaipur Airport, Railway Station, or your residence, accompanied by an authorized territory coordinator.'}
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
              <div className="w-16 h-16 rounded-full bg-cyan-950/40 border-2 border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-theme-primary">
                {isHindi ? 'साइट निरीक्षण अनुरोध सफलतापूर्वक भेजा गया' : 'Site Inspection Request Dispatched'}
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary font-light max-w-md mx-auto leading-relaxed">
                {isHindi
                  ? 'हमारे केंद्रीय समन्वयक डेस्क को आपका यात्रा कार्यक्रम प्राप्त हो गया है। आपको 30 मिनट के भीतर पुष्टिकरण कॉल एवं ड्राइवर विवरण प्राप्त होगा।'
                  : 'Our central coordinator desk has received your itinerary. You will receive a confirmation call and driver credentials within 30 minutes.'}
              </p>
              <div className="pt-6">
                <a
                  href={whatsappDirectBooking}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isHindi ? 'व्हाट्सएप पर तुरंत जुड़ें' : 'Connect Instantly on WhatsApp'}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    {isHindi ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isHindi ? 'उदा. विक्रमादित्य राठौड़' : 'e.g. Vikramaditya Rathore'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    {isHindi ? 'मोबाइल नंबर (एसएमएस हेतु) *' : 'Mobile Number (For Driver SMS) *'}
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
                    {isHindi ? 'जयपुर में पिकअप बिंदु' : 'Pickup Point in Jaipur'}
                  </label>
                  <select
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  >
                    <option>{isHindi ? 'जयपुर अंतर्राष्ट्रीय हवाई अड्डा (सांगानेर)' : 'Jaipur International Airport (JAI - Sanganer)'}</option>
                    <option>{isHindi ? 'जयपुर जंक्शन रेलवे स्टेशन (मुख्य द्वार)' : 'Jaipur Junction Railway Station (Main Gate)'}</option>
                    <option>{isHindi ? 'एमआई रोड / पुलिस कमिश्नरेट क्षेत्र' : 'MI Road / Police Commissionerate Area'}</option>
                    <option>{isHindi ? 'रामबाग सर्किल / हेरिटेज बेल्ट' : 'Rambagh Circle / Heritage Belt'}</option>
                    <option>{isHindi ? 'वैशाली नगर / 200 फीट बाईपास' : 'Vaishali Nagar / 200 Ft Bypass'}</option>
                    <option>{isHindi ? 'अन्य होटल अथवा व्यक्तिगत आवास' : 'Custom Jaipur Hotel / Residence'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    {isHindi ? 'निरीक्षण हेतु लक्षित कॉरिडोर' : 'Target Corridor to Inspect'}
                  </label>
                  <select
                    value={formData.corridor}
                    onChange={(e) => setFormData({ ...formData, corridor: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  >
                    <option>{isHindi ? 'अजमेर रोड एवं टेक हब (महिंद्रा सेज़)' : 'Ajmer Road & Tech Hub (Mahindra SEZ)'}</option>
                    <option>{isHindi ? '47 किमी रिंग रोड 360M विकास बेल्ट' : '47-KM Ring Road 360M Development Belt'}</option>
                    <option>{isHindi ? 'दिल्ली-मुंबई एक्सप्रेसवे एवं आगरा स्पर' : 'Delhi-Mumbai Expressway & Agra Spur'}</option>
                    <option>{isHindi ? 'बहु-कॉरिडोर तुलनात्मक दौरा (पूर्ण दिवस)' : 'Multi-Corridor Comparative Tour (Full Day)'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                    {isHindi ? 'पसंदीदा तिथि' : 'Preferred Date'}
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
                    {isHindi ? 'पसंदीदा समय स्लॉट' : 'Preferred Time Slot'}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/30 text-theme-primary text-sm focus:outline-none focus:border-luxury-gold"
                  >
                    <option>{isHindi ? 'प्रातः (10:00 AM – 01:00 PM)' : 'Morning (10:00 AM – 01:00 PM)'}</option>
                    <option>{isHindi ? 'दोपहर (02:00 PM – 05:00 PM)' : 'Afternoon (02:00 PM – 05:00 PM)'}</option>
                    <option>{isHindi ? 'पूर्ण दिवस विस्तृत दौरा (10:00 AM – 06:00 PM)' : 'Full Day Master Tour (10:00 AM – 06:00 PM)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                  {isHindi ? 'विशेष आवश्यकताएं (भूखंड आकार, बजट, विशिष्ट खसरा)' : 'Special Requirements (Plot Size, Budget, Specific Khasra)'}
                </label>
                <textarea
                  rows="3"
                  placeholder={isHindi ? 'विशिष्ट आयाम (उदा. 200 गज कॉर्नर) अथवा पटवारी नक्शे जो आप साइट पर देखना चाहते हैं...' : 'Mention any specific plot dimensions (e.g. 200 Gaj corner) or patwari survey maps you want ready during the visit...'}
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
                <span>{isHindi ? 'वीआईपी साइट विजिट बुक करें' : 'Confirm VIP Chauffeur Booking'}</span>
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
              {isHindi ? 'वीआईपी निरीक्षण प्रोटोकॉल' : 'VIP Inspection Protocol'}
            </span>
            <h3 className="text-xl font-serif font-bold text-theme-primary">
              {isHindi ? 'आपके दौरे में क्या शामिल है' : 'What Is Included in Your Guided Tour'}
            </h3>

            <div className="space-y-3.5 text-xs text-theme-secondary font-light">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>{isHindi ? 'अनुभवी चालक के साथ निजी लक्जरी एसी वाहन (इनोवा क्रिस्टा / फॉर्च्यूनर)।' : 'Private luxury AC vehicle (Innova Crysta / Fortuner) with experienced chauffeur.'}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>{isHindi ? 'सड़क की चौड़ाई और सीमा स्तंभों का फीता (इंच-टेप) द्वारा भौतिक सत्यापन।' : 'Physical measuring tape verification of road width and boundary pillars.'}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>{isHindi ? 'धारा 90-ए आदेश एवं जेडीए ब्लूप्रिंट की सत्यापित हार्ड-कॉपी प्रति।' : 'Hard-copy handover of certified Section 90-A orders and sanctioned JDA blueprints.'}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>{isHindi ? 'हमारे 52+ समन्वयकों में से स्थानीय क्षेत्रीय समन्वयक के साथ सीधा मार्गदर्शन।' : 'Direct interaction with local territory coordinator from our 52+ coordinator roster.'}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-luxury-emerald/20 border border-theme-gold/30 text-xs text-theme-primary">
              <p className="font-semibold text-luxury-goldLight mb-1">
                {isHindi ? 'शून्य बिक्री दबाव गारंटी:' : 'Zero Sales Pressure Guarantee:'}
              </p>
              <p className="font-light opacity-90 text-[11px] leading-relaxed">
                {isHindi
                  ? 'यह पूर्णतः निष्पक्ष ड्यू-डिलिजेंस ग्राउंड दौरा है। आपको साइट पर टोकन देने का कभी दबाव नहीं बनाया जाता। आप दस्तावेज घर ले जाकर स्वतंत्र कानूनी जांच करा सकते हैं।'
                  : 'This is an objective due-diligence ground tour. You are never pushed to book or transfer tokens on site. Take all verified documents home for independent legal audit.'}
              </p>
            </div>
          </div>

          <div className="rounded-3xl p-6 sm:p-8 bg-theme-surface border border-theme-gold/40 shadow-xl flex items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-theme-muted block font-semibold">
                {isHindi ? 'त्वरित समन्वयक सहायता' : 'Instant Coordinator Dispatch'}
              </span>
              <span className="text-sm sm:text-base font-serif font-bold text-theme-primary">
                {isHindi ? 'फोन पर बुकिंग पसंद करते हैं?' : 'Prefer Booking over Phone?'}
              </span>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-0.5">
                +91 99283-65001
              </p>
            </div>
            <a
              href="tel:9928365001"
              className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-sm hover:scale-105 transition-all"
            >
              {isHindi ? 'कॉल करें' : 'Call Now'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
