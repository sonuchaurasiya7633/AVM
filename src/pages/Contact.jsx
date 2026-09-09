import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { AgentDirectory } from '../components/AgentDirectory';
import { CoordinatorZoneFinder } from '../components/CoordinatorZoneFinder';
import { LeatherUnitCalculator } from '../components/LeatherUnitCalculator';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield, Calendar, Clock, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { t, isHindi } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Title & Land Diligence Audit',
    investmentTier: '₹50 Lakhs – ₹1.5 Cr',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      try {
        const enquiries = JSON.parse(localStorage.getItem('avm_enquiries') || '[]');
        enquiries.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('avm_enquiries', JSON.stringify(enquiries));
      } catch (err) {
        // ignore
      }
      setStatus('success');
    }, 800);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>{isHindi ? 'कार्यकारी परामर्श एवं समन्वयक निर्देशिका' : 'Executive Representation & Directory'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          {isHindi ? 'संपर्क करें' : 'Connect with the'} <br />
          <span className="text-gold-gradient italic">{isHindi ? 'एवीएम टॉक्स डेस्क एवं ग्राउंड नेटवर्क।' : 'AVM Talks Desk & Ground Network.'}</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          {isHindi
            ? 'निजी टाइटल जांच, भौतिक साइट निरीक्षण, या ग्रेटर जयपुर में हमारे 52+ अधिकृत क्षेत्रीय समन्वयकों से सीधे संपर्क के लिए।'
            : 'For private title audits, physical site inspections, or direct coordination with our 52+ authorized territory coordinators across Greater Jaipur.'}
        </p>
      </div>

      {/* Consultation Form & HQ Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
        {/* Left Col: Contact Information & Direct Touchpoints */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl space-y-6 relative overflow-hidden leather-stitch-outline">
            {/* 4 Corner Brass Screws */}
            <div className="brass-screw absolute top-3.5 left-3.5" />
            <div className="brass-screw absolute top-3.5 right-3.5" />
            <div className="brass-screw absolute bottom-3.5 left-3.5" />
            <div className="brass-screw absolute bottom-3.5 right-3.5" />

            <h3 className="text-xl font-serif font-bold text-theme-primary">
              {isHindi ? 'परामर्श मुख्यालय' : 'Advisory Headquarters'}
            </h3>
            <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
              {isHindi
                ? 'हमारी शोध टीम जयपुर और आसपास के आर्थिक गलियारों में शहरी नियोजन व राजस्व विवादों की निरंतर निगरानी करती है।'
                : 'Our research team monitors planning developments and revenue litigation trends across Jaipur and surrounding economic hubs.'}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-bold">{isHindi ? 'स्थान' : 'Location'}</h4>
                  <p className="text-xs sm:text-sm text-theme-primary font-light">
                    {isHindi ? 'सिविल लाइन्स / सी-स्कीम कॉर्पोरेट एन्क्लेव, जयपुर, राजस्थान 302001' : 'Civil Lines / C-Scheme Corporate Enclave, Jaipur, Rajasthan 302001'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-bold">{isHindi ? 'मीडिया एवं परामर्श डेस्क' : 'Media & Advisory Desk'}</h4>
                  <p className="text-xs sm:text-sm text-theme-primary font-light">
                    desk@avmtalks.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-bold">{isHindi ? 'परामर्श समय' : 'Advisory Hours'}</h4>
                  <p className="text-xs sm:text-sm text-theme-primary font-light">
                    {isHindi ? 'सोमवार – शुक्रवार: प्रातः 10:00 – सायं 6:30 बजे' : 'Monday – Friday: 10:00 AM – 6:30 PM IST'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Banner */}
          <div className="p-6 rounded-2xl bg-luxury-emerald/20 border border-theme-gold flex items-start gap-3">
            <Shield className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-bold mb-1">
                {isHindi ? 'शून्य ब्रोकरेज नीति' : 'Zero Brokerage Policy'}
              </h4>
              <p className="text-xs text-theme-secondary font-light leading-relaxed">
                {isHindi
                  ? 'एवीएम टॉक्स पूर्ण निष्पक्षता और वित्तीय स्वतंत्रता के साथ कार्य करता है। हम दलाली या कमीशन नहीं लेते। हमारी सलाह केवल आपके निवेश की सुरक्षा सुनिश्चित करती है।'
                  : 'AVM Talks operates with complete fiduciary independence. We do not broker deals or charge commissions. Our consultations protect your capital with objective revenue diligence.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Consultation Booking Form Leather Folio */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
            {/* 4 Corner Brass Screws */}
            <div className="brass-screw absolute top-3.5 left-3.5" />
            <div className="brass-screw absolute top-3.5 right-3.5" />
            <div className="brass-screw absolute bottom-3.5 left-3.5" />
            <div className="brass-screw absolute bottom-3.5 right-3.5" />

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary mb-2">
              {isHindi ? 'कार्यकारी परामर्श बुक करें' : 'Book an Executive Consultation'}
            </h3>
            <p className="text-xs sm:text-sm text-theme-secondary font-light mb-8">
              {isHindi
                ? 'अपनी संपत्ति सत्यापन का अनुरोध सबमिट करें। अवनीश की टीम 24 घंटे के भीतर समीक्षा करेगी।'
                : 'Submit your property verification request. An associate from Avnish’s desk will review your submission within 24 hours.'}
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-theme-card border border-luxury-gold text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-950/40 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(6,182,212,0.3)] border border-cyan-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif font-bold text-theme-primary">
                  {isHindi ? 'अनुरोध सफलतापूर्वक भेजा गया' : 'Enquiry Transmitted Successfully'}
                </h4>
                <p className="text-xs sm:text-sm text-theme-secondary font-light max-w-md mx-auto">
                  {isHindi ? (
                    <>धन्यवाद, <strong className="text-luxury-gold font-bold">{formData.name}</strong>। आपका विवरण अवनीश के समीक्षा पैनल में दर्ज कर लिया गया है।</>
                  ) : (
                    <>Thank you, <strong className="text-luxury-gold font-bold">{formData.name}</strong>. Your dossier has been logged into Avnish's review queue.</>
                  )}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker"
                >
                  {isHindi ? 'अन्य अनुरोध सबमिट करें' : 'Submit Another Request'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-2">
                      {isHindi ? 'पूरा कानूनी नाम *' : 'Full Legal Name *'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isHindi ? 'उदा. विक्रमादित्य राठौड़' : 'e.g. Vikramaditya Rathore'}
                      className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-sm text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-2">
                      {isHindi ? 'ईमेल पता *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. vikram@familyoffice.in"
                      className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-sm text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-2">
                      {isHindi ? 'फोन नंबर (व्हाट्सएप) *' : 'Phone Number (WhatsApp) *'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-sm text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-2">
                      {isHindi ? 'परामर्श का उद्देश्य' : 'Consultation Purpose'}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-sm text-theme-primary focus:outline-none focus:border-luxury-gold"
                    >
                      <option value="Title & Land Diligence Audit">{isHindi ? 'टाइटल एवं भूमि ड्यू डिलिजेंस जांच' : 'Title & Land Diligence Audit'}</option>
                      <option value="Jaipur Plotted Township Advisory">{isHindi ? 'जयपुर आवासीय टाउनशिप परामर्श' : 'Jaipur Plotted Township Advisory'}</option>
                      <option value="On-Site Plot Demarcation Inspection">{isHindi ? 'ऑन-साइट भूखंड सीमांकन निरीक्षण' : 'On-Site Plot Demarcation Inspection'}</option>
                      <option value="Section 90-A Revenue Verification">{isHindi ? 'धारा 90-ए राजस्व सत्यापन' : 'Section 90-A Revenue Verification'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-2">
                    {isHindi ? 'अनुमानित बजट आवंटन' : 'Estimated Capital Allocation'}
                  </label>
                  <select
                    name="investmentTier"
                    value={formData.investmentTier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-sm text-theme-primary focus:outline-none focus:border-luxury-gold"
                  >
                    <option value="₹25 Lakhs – ₹50 Lakhs (Residential Plot)">{isHindi ? '₹25 लाख – ₹50 लाख (आवासीय भूखंड)' : '₹25 Lakhs – ₹50 Lakhs (Residential Plot)'}</option>
                    <option value="₹50 Lakhs – ₹1.5 Cr (Township / Commercial)">{isHindi ? '₹50 लाख – ₹1.5 करोड़ (टाउनशिप / व्यावसायिक)' : '₹50 Lakhs – ₹1.5 Cr (Township / Commercial)'}</option>
                    <option value="₹1.5 Cr – ₹5 Cr (Commercial Frontage)">{isHindi ? '₹1.5 करोड़ – ₹5 करोड़ (मुख्य व्यावसायिक मार्ग)' : '₹1.5 Cr – ₹5 Cr (Commercial Frontage)'}</option>
                    <option value="₹5 Cr+ (Institutional Land Parcel)">{isHindi ? '₹5 करोड़+ (संस्थागत भूमि पार्सल)' : '₹5 Cr+ (Institutional Land Parcel)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-2">
                    {isHindi ? 'आपकी भूमि से संबंधित प्रश्न अथवा विवरण *' : 'Brief Overview of Your Land Dilemma *'}
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={isHindi ? 'कॉरिडोर विवरण, खसरा नंबर या कानूनी प्रश्न दर्ज करें जिनकी आप जांच कराना चाहते हैं...' : 'Provide corridor details, khasra number, or specific legal questions you would like audited...'}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-sm text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? (isHindi ? 'अनुरोध भेजा जा रहा है...' : 'Transmitting Request...') : (isHindi ? 'परामर्श अनुरोध भेजें' : 'Dispatch Consultation Request')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Stitched Cosmic Obsidian Velvet Unit Calculator */}
      <div className="mb-20">
        <SectionHeading
          badge={isHindi ? 'इकाई रूपांतरण कैलकुलेटर' : 'Unit Conversion Badge'}
          title={isHindi ? 'त्वरित भूमि एवं मूल्य कैलकुलेटर' : 'Instant Land & Price Calculator'}
          subtitle={isHindi ? 'राजस्थान में प्रयुक्त गज, वर्ग फुट, वर्ग मीटर एवं बीघा में त्वरित गणना करें।' : 'Convert length, area and price between local Rajasthan units (Gaj, Sq.Ft, Sq.Metre, Bigha).'}
        />
        <LeatherUnitCalculator />
      </div>

      {/* JDA Territory Coordinator Zone Finder & Escort Dispatcher */}
      <CoordinatorZoneFinder />

      {/* 52+ Authorized Territory Coordinators Directory */}
      <div className="mb-10">
        <SectionHeading
          badge={isHindi ? 'ग्राउंड नेटवर्क' : 'Ground Coordination Network'}
          title={isHindi ? 'अधिकृत क्षेत्रीय समन्वयक' : 'Authorized Territory Coordinators'}
          subtitle={isHindi ? 'साइट निरीक्षण एवं टाइटल जांच के लिए जयपुर के किसी भी 52+ सत्यापित क्षेत्रीय समन्वयक से सीधे जुड़ें।' : 'Directly connect with any of our 52+ verified field coordinators across Greater Jaipur for site inspections and title checks.'}
        />
        <AgentDirectory />
      </div>
    </div>
  );
};
