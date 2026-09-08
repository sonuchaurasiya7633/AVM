import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AGENTS_DATA } from '../data/agents';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Search, 
  Navigation, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Sparkles,
  ChevronRight,
  Send,
  UserCheck
} from 'lucide-react';

const JAIPUR_ZONES = [
  {
    id: 'all',
    nameEn: 'All Greater Jaipur Zones',
    nameHi: 'सभी ग्रेटर जयपुर जोन',
    subTitleEn: '52+ Verified Field Coordinators',
    subTitleHi: '52+ सत्यापित फील्ड कॉर्डिनेटर',
    pincodes: ['302026', '302012', '302020', '302029', '302033', '303007'],
  },
  {
    id: 'zone-11',
    nameEn: 'JDA Zone 11 — Ajmer Road & Bhankrota',
    nameHi: 'जेडीए जोन 11 — अजमेर रोड व भांकरोटा',
    subTitleEn: 'Bhankrota, Bagru, Mahapura, Omaxe City, DMIC Hub',
    subTitleHi: 'भांकरोटा, बगरू, महापुरा, ओमैक्स सिटी, डीएमआईसी',
    pincodes: ['302026', '303007', '302043'],
    matchKeywords: ['ajmer', 'bhankrota', 'bagru', 'mahapura', 'omaxe', 'dmc', 'dmic']
  },
  {
    id: 'zone-12',
    nameEn: 'JDA Zone 12 — Sirsi & Kalwar Axis',
    nameHi: 'जेडीए जोन 12 — सिरसी व कालवाड़ रोड',
    subTitleEn: 'Sirsi Road, Kalwar Road, Bindayaka, Hathoj, Govindpura',
    subTitleHi: 'सिरसी रोड, कालवाड़ रोड, बिन्दायका, हाथोज',
    pincodes: ['302012', '302044', '302041'],
    matchKeywords: ['sirsi', 'kalwar', 'bindayaka', 'hathoj', 'govindpura']
  },
  {
    id: 'zone-8',
    nameEn: 'JDA Zone 8 — Mansarovar & Sanganer',
    nameHi: 'जेडीए जोन 8 — मानसरोवर व सांगानेर',
    subTitleEn: 'Mansarovar Ext, Muhana Mandi, Vande Mataram, New Sanganer',
    subTitleHi: 'मानसरोवर एक्सटेंशन, मुहाना मंडी, वंदे मातरम',
    pincodes: ['302020', '302029'],
    matchKeywords: ['mansarovar', 'sanganer', 'muhana', 'vande']
  },
  {
    id: 'zone-10',
    nameEn: 'JDA Zone 10 — Jagatpura & Ring Road East',
    nameHi: 'जेडीए जोन 10 — जगतपुरा व रिंग रोड ईस्ट',
    subTitleEn: 'Mahal Road, Ramnagariya, Bombay Hospital Axis, Ring Road East',
    subTitleHi: 'महल रोड, रामनगरिया, रिंग रोड ईस्ट, खोह-नागोरियान',
    pincodes: ['302017', '302025', '302033'],
    matchKeywords: ['jagatpura', 'ring road', 'mahal', 'ramnagariya']
  },
  {
    id: 'zone-14',
    nameEn: 'JDA Zone 14 — Tonk Road & Diggi Malpura',
    nameHi: 'जेडीए जोन 14 — टोंक रोड व डिग्गी मालपुरा',
    subTitleEn: 'Watika, Shivdaspura, Bilwa, Sitapura South, Ring Road Junction',
    subTitleHi: 'वाटिका, शिवदासपुरा, बिलवा, सीतापुरा साउथ',
    pincodes: ['302022', '303903', '303905'],
    matchKeywords: ['tonk', 'watika', 'shivdaspura', 'bilwa', 'diggi']
  },
];

export const CoordinatorZoneFinder = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [selectedZone, setSelectedZone] = useState('zone-11');
  const [searchQuery, setSearchQuery] = useState('');
  const [pincodeQuery, setPincodeQuery] = useState('');
  const [activeTab, setActiveTab] = useState('coordinators'); // coordinators | request
  const [requestSent, setRequestSent] = useState(false);

  // Form state for instant escort request
  const [escortForm, setEscortForm] = useState({
    clientName: '',
    clientPhone: '',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    inspectionLocation: 'Ajmer Road (Zone 11)',
  });

  // Filtered coordinators based on zone and search
  const filteredCoordinators = useMemo(() => {
    const cleanSearch = searchQuery.toLowerCase().trim();
    const cleanPin = pincodeQuery.trim();

    const currentZoneObj = JAIPUR_ZONES.find((z) => z.id === selectedZone);

    return AGENTS_DATA.filter((agent, idx) => {
      // Pin code match
      if (cleanPin) {
        const matchesPin = currentZoneObj?.pincodes.some((pin) => pin.includes(cleanPin));
        if (!matchesPin && selectedZone !== 'all') return false;
      }

      // Zone filter matching
      let matchesZone = selectedZone === 'all';
      if (!matchesZone && currentZoneObj) {
        const roleLower = (agent.role || '').toLowerCase();
        const nameLower = agent.name.toLowerCase();

        // Check explicit match keywords
        const hasKeywordMatch = currentZoneObj.matchKeywords?.some(
          (kw) => roleLower.includes(kw) || nameLower.includes(kw)
        );

        // Deterministic fallback partition so each zone has designated active officers
        const assignedZoneIdx = idx % (JAIPUR_ZONES.length - 1);
        const currentZoneIndex = JAIPUR_ZONES.findIndex((z) => z.id === selectedZone) - 1;

        matchesZone = hasKeywordMatch || assignedZoneIdx === currentZoneIndex;
      }

      // Text search
      const matchesSearch =
        !cleanSearch ||
        agent.name.toLowerCase().includes(cleanSearch) ||
        agent.role.toLowerCase().includes(cleanSearch) ||
        agent.phone.includes(cleanSearch);

      return matchesZone && matchesSearch;
    });
  }, [selectedZone, searchQuery, pincodeQuery]);

  const handleEscortSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setEscortForm({
        clientName: '',
        clientPhone: '',
        preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        inspectionLocation: 'Ajmer Road (Zone 11)',
      });
      setActiveTab('coordinators');
    }, 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-12 font-sans">
      <div className="leather-badge-container p-6 sm:p-10 rounded-3xl border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline bg-leather-deep">
        {/* Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-theme-gold/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] border border-theme-gold bg-luxury-emerald/30 text-luxury-goldLight mb-3">
              <Navigation className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{isHi ? 'जेडीए जोन-वार ऑन-ग्राउंड नेटवर्क' : 'JDA Zone Field Coordination Grid'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-theme-primary">
              {isHi ? 'जयपुर टेरिटरी कोऑर्डिनेटर एवं ऑन-साइट एस्कॉर्ट' : 'Territory Coordinator Zone Finder & Field Escort'}
            </h2>
            <p className="text-xs sm:text-sm text-theme-secondary mt-1 max-w-2xl font-light">
              {isHi
                ? 'अपने लक्षित जेडीए जोन अथवा पिन कोड का चयन करें। सीधे ऑन-ड्यूटी फील्ड कोऑर्डिनेटर से संपर्क करें अथवा 15 मिनट में ऑन-साइट विजिट असाइन करवाएं।'
                : 'Select your target JDA Zone or PIN code. Connect immediately with on-duty field officers for plot demarcation, revenue record verification, and physical inspection.'}
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-luxury-darker/60 border border-theme-gold/30">
            <button
              onClick={() => setActiveTab('coordinators')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                activeTab === 'coordinators'
                  ? 'bg-gold-gradient text-luxury-darker font-bold shadow-luxury-gold'
                  : 'text-theme-secondary hover:text-luxury-gold'
              }`}
            >
              {isHi ? 'जोन कोऑर्डिनेटर सूची' : 'Active Field Officers'}
            </button>
            <button
              onClick={() => setActiveTab('request')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                activeTab === 'request'
                  ? 'bg-gold-gradient text-luxury-darker font-bold shadow-luxury-gold'
                  : 'text-theme-secondary hover:text-luxury-gold'
              }`}
            >
              {isHi ? 'ऑन-साइट एस्कॉर्ट बुक करें' : 'Dispatch Field Escort'}
            </button>
          </div>
        </div>

        {activeTab === 'coordinators' ? (
          <div>
            {/* Zone Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 my-6">
              {JAIPUR_ZONES.map((zone) => {
                const isSelected = selectedZone === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`p-3 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-luxury-gold text-luxury-darker border-luxury-gold shadow-luxury-gold font-bold scale-[1.02]'
                        : 'bg-theme-card text-theme-secondary hover:text-luxury-gold border-theme-gold/20 hover:border-theme-gold/40'
                    }`}
                  >
                    <div className="text-xs leading-snug line-clamp-1">
                      {isHi ? zone.nameHi : zone.nameEn}
                    </div>
                    <div
                      className={`text-[10px] mt-1 line-clamp-1 ${
                        isSelected ? 'text-luxury-darker/80' : 'text-theme-muted'
                      }`}
                    >
                      {isHi ? zone.subTitleHi : zone.subTitleEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isHi ? 'अधिकारी का नाम, पद या फोन नंबर से खोजें...' : 'Search coordinator by name, specialization, or phone...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/40 text-xs text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="relative w-full sm:w-60">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold" />
                <input
                  type="text"
                  value={pincodeQuery}
                  onChange={(e) => setPincodeQuery(e.target.value)}
                  placeholder={isHi ? 'पिन कोड (उदा. 302026)' : 'Filter PIN Code (e.g. 302026)'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/40 text-xs text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold font-mono"
                />
              </div>
            </div>

            {/* Coordinators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredCoordinators.length > 0 ? (
                filteredCoordinators.map((coordinator, idx) => {
                  const whatsappMessage = encodeURIComponent(
                    `Namaste ${coordinator.name}, I am reaching out via AVM Talks by Avnish. I require on-ground plot inspection and title verification in ${
                      JAIPUR_ZONES.find((z) => z.id === selectedZone)?.nameEn || 'Jaipur'
                    }. Please connect at your earliest.`
                  );

                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-luxury-darker/70 border border-theme-gold/30 hover:border-luxury-gold transition-all duration-200 flex flex-col justify-between shadow-md"
                    >
                      <div>
                        {/* Status Beacon & Zone Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {isHi ? 'ऑन-ड्यूटी फील्ड' : 'On-Duty Active'}
                          </span>
                          <span className="text-[10px] font-mono text-luxury-gold/80 border border-luxury-gold/20 px-2 py-0.5 rounded-md">
                            {selectedZone === 'all' ? 'Jaipur Corridor' : selectedZone.toUpperCase()}
                          </span>
                        </div>

                        {/* Name & Role */}
                        <h4 className="text-base font-serif font-bold text-theme-primary mb-1">
                          {coordinator.name}
                        </h4>
                        <p className="text-xs text-luxury-gold font-medium mb-3">
                          {coordinator.role}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-theme-secondary font-light mb-4">
                          <Clock className="w-3.5 h-3.5 text-luxury-gold" />
                          <span>{isHi ? 'औसत ऑन-साइट पहुंच: 15 मिनट' : 'Average Response: <15 mins'}</span>
                        </div>
                      </div>

                      {/* Direct Connect Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-theme-gold/20">
                        <a
                          href={`tel:+91${coordinator.phone.replace(/[^0-9]/g, '')}`}
                          className="py-2 px-3 rounded-xl bg-theme-card border border-theme-gold/40 text-xs font-semibold text-theme-primary hover:border-luxury-gold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                          <span>{coordinator.phone}</span>
                        </a>

                        <a
                          href={`https://wa.me/91${coordinator.phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-theme-secondary">
                  <p className="text-sm">
                    {isHi ? 'कोई समन्वयक इस खोज से मेल नहीं खाता।' : 'No territory coordinators matched your search criteria.'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedZone('all');
                      setSearchQuery('');
                      setPincodeQuery('');
                    }}
                    className="mt-3 px-4 py-2 rounded-xl bg-theme-card border border-theme-gold text-xs text-luxury-gold"
                  >
                    {isHi ? 'सभी 52+ समन्वयक देखें' : 'View All 52+ Field Coordinators'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Instant Field Escort Dispatch Form */
          <div className="my-8 max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-luxury-darker/70 border border-theme-gold/40 shadow-inner">
            {requestSent ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-theme-primary">
                  {isHi ? 'फील्ड एस्कॉर्ट अनुरोध प्रेषित!' : 'Field Escort Request Dispatched!'}
                </h3>
                <p className="text-xs sm:text-sm text-theme-secondary max-w-md mx-auto">
                  {isHi
                    ? 'संबंधित जेडीए जोन अधिकारी को आपका विवरण भेज दिया गया है। 15 मिनट के भीतर पुष्टि कॉल प्राप्त होगी।'
                    : 'The on-duty JDA Territory Coordinator has received your demarcation dossier request. A priority confirmation call will arrive shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleEscortSubmit} className="space-y-4">
                <div className="text-center mb-6">
                  <span className="text-[11px] uppercase tracking-widest text-luxury-gold font-bold block">
                    VIP Site Inspection Protocol
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-theme-primary">
                    {isHi ? 'निजी फील्ड इंजीनियर व राजस्व अधिकारी असाइन करें' : 'Request Dedicated Field Demarcation Escort'}
                  </h3>
                  <p className="text-xs text-theme-secondary mt-1">
                    {isHi ? 'प्लॉट नाप, सीमा पत्थर जांच और मौके पर चौड़ाई सत्यापन हेतु' : 'For on-site steel-tape measurement, boundary pillar inspection, and Patwari verification.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-1.5">
                      {isHi ? 'आपका पूरा नाम *' : 'Investor / Buyer Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={escortForm.clientName}
                      onChange={(e) => setEscortForm({ ...escortForm, clientName: e.target.value })}
                      placeholder="e.g. Vikramaditya Singh"
                      className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-xs text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-1.5">
                      {isHi ? 'व्हाट्सएप मोबाइल नंबर *' : 'WhatsApp Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={escortForm.clientPhone}
                      onChange={(e) => setEscortForm({ ...escortForm, clientPhone: e.target.value })}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-xs text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-1.5">
                      {isHi ? 'लक्षित जेडीए जोन / क्षेत्र' : 'Target JDA Zone & Corridor'}
                    </label>
                    <select
                      value={escortForm.inspectionLocation}
                      onChange={(e) => setEscortForm({ ...escortForm, inspectionLocation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-xs text-theme-primary focus:outline-none focus:border-luxury-gold"
                    >
                      <option value="Ajmer Road (Zone 11)">Ajmer Road & Bhankrota (Zone 11)</option>
                      <option value="Sirsi & Kalwar (Zone 12)">Sirsi & Kalwar Axis (Zone 12)</option>
                      <option value="Mansarovar Ext (Zone 8)">Mansarovar & Sanganer (Zone 8)</option>
                      <option value="Jagatpura & Ring Road (Zone 10)">Jagatpura & Ring Road (Zone 10)</option>
                      <option value="Tonk Road (Zone 14)">Tonk Road & Watika (Zone 14)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-secondary font-semibold mb-1.5">
                      {isHi ? 'प्रस्तावित निरीक्षण दिनांक' : 'Preferred Inspection Date'}
                    </label>
                    <input
                      type="date"
                      value={escortForm.preferredDate}
                      onChange={(e) => setEscortForm({ ...escortForm, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-xs text-theme-primary focus:outline-none focus:border-luxury-gold font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>{isHi ? 'ऑन-ड्यूटी अधिकारी असाइन करें' : 'Dispatch JDA Zone Coordinator'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Authority Badge */}
        <div className="pt-6 border-t border-theme-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-theme-primary">
                {isHi ? 'AVM टॉक्स अधिकृत फील्ड समन्वय नेटवर्क' : 'AVM Talks Authorized Field Ground Network'}
              </p>
              <p className="text-[11px] text-theme-secondary font-light">
                {isHi ? 'प्रत्येक अधिकारी राजस्व दस्तावेजों व स्थानीय क्षेत्र विशेषज्ञता में प्रमाणित है' : 'Every coordinator is pre-vetted with certified land records verification training'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">
            NETWORK DISPATCH v2.6
          </span>
        </div>
      </div>
    </div>
  );
};
