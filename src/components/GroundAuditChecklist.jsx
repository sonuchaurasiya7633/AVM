import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  RotateCcw, 
  MapPin, 
  Compass, 
  Layers, 
  Droplets, 
  Zap, 
  Scale, 
  FileCheck, 
  Sliders, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

const AUDIT_CATEGORIES = [
  { id: 'all', nameEn: 'All 18 Checkpoints', nameHi: 'सभी 18 चेकपॉइंट' },
  { id: 'demarcation', nameEn: 'Boundary & Demarcation', nameHi: 'सीमांकन एवं पत्थर सीमा' },
  { id: 'infrastructure', nameEn: 'Utilities & Grid Infra', nameHi: 'बिजली एवं जल संरचना' },
  { id: 'road', nameEn: 'ROW & Road Geometry', nameHi: 'सड़क चौड़ाई एवं पहुंच' },
  { id: 'environmental', nameEn: 'Eco & Geo-Hydrology', nameHi: 'जलभराव व पर्यावरण ऑडिट' },
];

const DEFAULT_CHECKPOINTS = [
  // 1. Boundary & Demarcation (5 items)
  {
    id: 'chk_1',
    category: 'demarcation',
    titleEn: 'RCC Boundary Stones & Khasra Corner Nails',
    titleHi: 'आरसीसी पत्थर सीमांकन व खसरा कील',
    descEn: 'All 4 plot boundary stones (burji) are physically embedded into virgin soil without tampering or dispute with adjacent plot owners.',
    descHi: 'सभी 4 प्लॉट सीमा पत्थर (बुर्जी) जमीन में गड़े हैं और पड़ोसियों के साथ कोई सीमा विवाद नहीं है।',
    weight: 7,
    critical: true
  },
  {
    id: 'chk_2',
    category: 'demarcation',
    titleEn: 'Cadastral Map (Naksha Trace) Physical Alignment',
    titleHi: 'राजस्व नक्शा (अक्स शजरा) से भौतिक मिलान',
    descEn: 'Orientation of plot north-south coordinate strictly corresponds with the certified Patwari naksha trace map.',
    descHi: 'प्लॉट की उत्तर-दक्षिण दिशा पटवारी प्रमाणित अक्स शजरा नक्शे से 100% सटीक मिल रही है।',
    weight: 6,
    critical: true
  },
  {
    id: 'chk_3',
    category: 'demarcation',
    titleEn: 'Physical Frontage & Depth Measurement with Steel Tape',
    titleHi: 'स्टील टेप से ऑन-ग्राउंड फ्रंट एवं गहराई माप',
    descEn: 'Frontage width matches exact dimensions mentioned on allotment letter (e.g., 30ft frontage × 60ft depth).',
    descHi: 'प्लॉट का फ्रंट व गहराई आवंटन पत्र पर लिखे माप (जैसे 30×60 फीट) के बराबर ऑन-साइट टेप से नापा गया है।',
    weight: 6,
    critical: true
  },
  {
    id: 'chk_4',
    category: 'demarcation',
    titleEn: 'Corner Splay & Road Visibility Offset',
    titleHi: 'कॉर्नर प्लॉट चैंफर (Splay) एवं विजिबिलिटी',
    descEn: 'For corner plots, 3-5 metre chamfer/splay is marked as per JDA Building Byelaws without encroaching into the carriage way.',
    descHi: 'कॉर्नर प्लॉट पर जेडीए बायलॉज अनुसार 3-5 मीटर चैंफर सुरक्षित है और रोड पर अतिक्रमण नहीं है।',
    weight: 5,
    critical: false
  },
  {
    id: 'chk_5',
    category: 'demarcation',
    titleEn: 'Encroachment & Possession Free Clearance',
    titleHi: 'शून्य अतिक्रमण एवं पूर्ण कब्जा',
    descEn: 'Zero temporary sheds, grazing encroachment, tree dispute, or unauthorized pathways cutting across plot boundary.',
    descHi: 'प्लॉट के ऊपर कोई अस्थाई छप्पर, मवेशी बाड़ा, पेड़ या अनाधिकृत पगडंडी नहीं है।',
    weight: 7,
    critical: true
  },

  // 2. Utilities & Grid Infra (5 items)
  {
    id: 'chk_6',
    category: 'infrastructure',
    titleEn: 'High Tension (HT) Transmission Line Clearance',
    titleHi: 'हाई टेंशन (HT) बिजली लाइन क्लीयरेंस',
    descEn: 'Plot is outside the mandatory 33kV/132kV safety corridor buffer (minimum 15-30 metre statutory clearance).',
    descHi: 'प्लॉट 33kV या 132kV हाई टेंशन लाइन के वैधानिक बफर (कम से कम 15-30 मीटर) से पूरी तरह बाहर है।',
    weight: 7,
    critical: true
  },
  {
    id: 'chk_7',
    category: 'infrastructure',
    titleEn: 'Township Transformer & Feeder Distance',
    titleHi: 'टाउनशिप डिस्ट्रीब्यूशन ट्रांसफार्मर दूरी',
    descEn: 'Dedicated township step-down transformer is within 150m, avoiding severe line voltage drops during peak residential load.',
    descHi: 'टाउनशिप का डिस्ट्रीब्यूशन ट्रांसफार्मर 150 मीटर के दायरे में है जिससे वोल्टेज ड्रॉप की समस्या न हो।',
    weight: 5,
    critical: false
  },
  {
    id: 'chk_8',
    category: 'infrastructure',
    titleEn: 'Underground Sewerage & Invert Chamber Levels',
    titleHi: 'भूमिगत सीवरेज लाइन एवं चैंबर ढलान',
    descEn: 'Chamber invert line level is deeper than the proposed plinth level, enabling gravity flow drainage without back-siphonage.',
    descHi: 'सीवरेज चैंबर का स्तर प्रस्तावित प्लिंथ लेवल से नीचे है ताकि बिना मोटर के प्राकृतिक ढलान से पानी निकले।',
    weight: 5,
    critical: false
  },
  {
    id: 'chk_9',
    category: 'infrastructure',
    titleEn: 'Potable Water Pipeline & Over-Head Tank (OHSR) Readiness',
    titleHi: 'पीने के पानी की पाइपलाइन एवं ओवरहेड टैंक (OHSR)',
    descEn: 'Underground HDPE water line is laid up to plot curb with pressure testing, connected to township central overhead reservoir.',
    descHi: 'प्लॉट के किनारे तक एचडीपीई पाइपलाइन बिछी है और मुख्य ओवरहेड पानी टंकी से जुड़ी हुई है।',
    weight: 6,
    critical: true
  },
  {
    id: 'chk_10',
    category: 'infrastructure',
    titleEn: 'Underground Optical Fiber & Conduit Sleeves',
    titleHi: 'भूमिगत ऑप्टिकल फाइबर व डक्टिंग',
    descEn: 'Pre-laid duct sleeves underneath the asphalt road so road cutting will not be required later for telecom/power connection.',
    descHi: 'रोड के नीचे टेलीकॉम/बिजली के लिए डक्ट्स पहले से मौजूद हैं जिससे भविष्य में डामर रोड तोड़नी न पड़े।',
    weight: 4,
    critical: false
  },

  // 3. ROW & Road Geometry (4 items)
  {
    id: 'chk_11',
    category: 'road',
    titleEn: 'Actual Carriage Asphalt Width vs Approved Layout Plan',
    titleHi: 'वास्तविक डामर चौड़ाई बनाम स्वीकृत लेआउट',
    descEn: 'Measured physical road width matches the minimum statutory standard (e.g. 30ft / 40ft / 60ft or 100ft sector road).',
    descHi: 'सड़क की वास्तविक भौतिक चौड़ाई लेआउट प्लान के अनुसार (30/40/60/100 फीट) पूरी उपलब्ध है।',
    weight: 6,
    critical: true
  },
  {
    id: 'chk_12',
    category: 'road',
    titleEn: 'Dedicated Approach & Public Highway ROW Connectivity',
    titleHi: 'पहुंच मार्ग एवं मुख्य हाईवे से निर्बाध कनेक्टिविटी',
    descEn: 'Direct seamless metalled approach from public revenue road; not dependent on private easement through adjacent third-party land.',
    descHi: 'राजस्व सरकारी सड़क से सीधी पक्की रोड उपलब्ध है; किसी निजी जमीन के रास्ते पर निर्भर नहीं है।',
    weight: 7,
    critical: true
  },
  {
    id: 'chk_13',
    category: 'road',
    titleEn: 'Dead-End Cul-de-sac Turnaround Circle (Min 9m Radius)',
    titleHi: 'डेड-एंड टर्निंग सर्कल (न्यूनतम 9 मीटर)',
    descEn: 'If situated on a dead-end avenue, layout contains an engineered turnaround circle for fire tenders & emergency vehicles.',
    descHi: 'यदि रोड बंद गली में है, तो फायर ब्रिगेड व इमरजेंसी वाहनों के घूमने के लिए पर्याप्त टर्निंग सर्कल मौजूद है।',
    weight: 4,
    critical: false
  },
  {
    id: 'chk_14',
    category: 'road',
    titleEn: 'Concrete Curbs, Kerb Stones & Paver Footpath',
    titleHi: 'कंक्रीट कर्ब स्टोन एवं पेवर फुटपाथ फिनिश',
    descEn: 'Interlocking concrete pavers along road borders with proper storm drains to prevent asphalt edge chipping.',
    descHi: 'सड़क के दोनों ओर इंटरलॉकिंग पेवर ब्लॉक व कर्ब स्टोन लगे हैं ताकि बारिश में सड़क के किनारे न कटें।',
    weight: 4,
    critical: false
  },

  // 4. Eco & Geo-Hydrology (4 items)
  {
    id: 'chk_15',
    category: 'environmental',
    titleEn: 'Monsoon High Flood Level (HFL) & Elevation Above Road',
    titleHi: 'हाई फ्लड लेवल (HFL) एवं रोड से प्लॉट की ऊंचाई',
    descEn: 'Plot elevation is at least 1.5 to 2.5 feet higher than road crown level to prevent storm drainage water back-inundation.',
    descHi: 'प्लॉट सड़क के मध्य स्तर से 1.5 से 2.5 फीट ऊंचा है ताकि बारिश का पानी प्लॉट में जमा न हो।',
    weight: 7,
    critical: true
  },
  {
    id: 'chk_16',
    category: 'environmental',
    titleEn: 'Buffer from Natural Watercourse / Nallah (50m Buffer)',
    titleHi: 'प्राकृतिक नाले / जलभराव से 50 मीटर बफर',
    descEn: 'Minimum statutory buffer maintained from government notified flood drains or drainage catchments under NGT guidelines.',
    descHi: 'एनजीटी और राजस्व नियमों के अनुसार प्राकृतिक नाले या बहाव क्षेत्र से आवश्यक न्यूनतम दूरी कायम है।',
    weight: 7,
    critical: true
  },
  {
    id: 'chk_17',
    category: 'environmental',
    titleEn: 'Soil Compaction & Bearing Capacity (SBC > 120 kN/m²)',
    titleHi: 'मिट्टी की भार क्षमता (SBC) एवं मूल भू-स्तर',
    descEn: 'Plot stands on natural firm hard murrum/loam soil, NOT loose deep landfill debris requiring exorbitant piling foundations.',
    descHi: 'प्लॉट प्राकृतिक ठोस मुरम/मिट्टी पर है, किसी गड्ढे या कचरे की कृत्रिम भराई (landfill) पर नहीं है।',
    weight: 6,
    critical: true
  },
  {
    id: 'chk_18',
    category: 'environmental',
    titleEn: 'Pollution & Industrial Buffer Clearance',
    titleHi: 'प्रदूषण मुक्त क्षेत्र एवं ग्रीन बफर',
    descEn: 'Zero adjoining stone crushers, polluting red-category chemical industrial units, slaughterhouses, or unmanaged dump yards within 500m.',
    descHi: '500 मीटर के दायरे में कोई स्टोन क्रशर, प्रदूषणकारी केमिकल फैक्ट्री, या डंपिंग यार्ड नहीं है।',
    weight: 5,
    critical: false
  },
];

export const GroundAuditChecklist = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [checkedItems, setCheckedItems] = useState({
    chk_1: true,
    chk_2: true,
    chk_3: true,
    chk_6: true,
    chk_11: true,
    chk_12: true,
    chk_15: true,
    chk_17: true,
  });

  const [plotDetails, setPlotDetails] = useState({
    townshipName: 'Platinum Royale Avenue',
    plotNumber: 'P-104',
    khasraNumber: '342/1, Gram Bhankrota',
    auditorName: 'Er. Rajesh S. (Civil Auditor)',
    auditDate: new Date().toISOString().split('T')[0],
  });

  const [inspectorNotes, setInspectorNotes] = useState(
    'Ground inspection verified: RCC stones intact. Crown road level sits 2ft below plot datum. Recommended for legal registration.'
  );

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = (status) => {
    const updated = {};
    DEFAULT_CHECKPOINTS.forEach((chk) => {
      updated[chk.id] = status;
    });
    setCheckedItems(updated);
  };

  // Calculate Safety Score
  const scoreData = useMemo(() => {
    const totalPossibleWeight = DEFAULT_CHECKPOINTS.reduce((acc, curr) => acc + curr.weight, 0);
    const checkedWeight = DEFAULT_CHECKPOINTS.reduce((acc, curr) => {
      return checkedItems[curr.id] ? acc + curr.weight : acc;
    }, 0);

    const percentage = Math.round((checkedWeight / totalPossibleWeight) * 100);

    // Critical failures
    const failedCritical = DEFAULT_CHECKPOINTS.filter(
      (chk) => chk.critical && !checkedItems[chk.id]
    );

    let grade = 'A+ Institutional Grade';
    let gradeColor = 'text-emerald-400';
    let riskStatus = isHi ? 'अत्यंत सुरक्षित - रजिस्ट्री योग्य' : 'Extremely Safe - Safe to Register';

    if (failedCritical.length > 0 || percentage < 70) {
      if (failedCritical.length >= 3 || percentage < 50) {
        grade = 'High Risk - Demarcation Warning';
        gradeColor = 'text-red-400';
        riskStatus = isHi ? 'उच्च जोखिम - सत्यापन आवश्यक' : 'Critical Hazard - Immediate Due Diligence Required';
      } else {
        grade = 'Moderate Caution';
        gradeColor = 'text-amber-400';
        riskStatus = isHi ? 'सावधानी - कुछ बिंदु असत्यापित' : 'Caution Advised - Resolve Discrepancies';
      }
    }

    return {
      percentage,
      failedCriticalCount: failedCritical.length,
      grade,
      gradeColor,
      riskStatus,
      totalChecked: Object.values(checkedItems).filter(Boolean).length,
      totalCount: DEFAULT_CHECKPOINTS.length,
    };
  }, [checkedItems, isHi]);

  const filteredCheckpoints = useMemo(() => {
    if (selectedCategory === 'all') return DEFAULT_CHECKPOINTS;
    return DEFAULT_CHECKPOINTS.filter((chk) => chk.category === selectedCategory);
  }, [selectedCategory]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-12 font-sans">
      {/* Container with Stitched Luxury Leather and 4 Corner Brass Screws */}
      <div className="leather-badge-container p-6 sm:p-10 rounded-3xl border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline bg-leather-deep">
        {/* Corner Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-theme-gold/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] border border-theme-gold bg-luxury-emerald/30 text-luxury-goldLight mb-3">
              <Scale className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{isHi ? '18-बिंदु ऑन-साइट भौतिक निरीक्षण' : '18-Point Ground Diligence Standard'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-theme-primary">
              {isHi ? 'ऑन-ग्राउंड प्लॉट ऑडिट एवं सुरक्षा स्कोरकार्ड' : 'Physical Plot Demarcation & Field Safety Audit'}
            </h2>
            <p className="text-xs sm:text-sm text-theme-secondary mt-1 max-w-2xl font-light">
              {isHi
                ? 'कागजी पट्टे से आगे बढ़कर जमीन पर 18 आवश्यक भौतिक जांच करें: आरसीसी बुर्जी, डामर सड़क चौड़ाई, एचटी लाइन क्लीयरेंस और जलभराव सुरक्षा।'
                : 'Move beyond desk title checks. Conduct on-ground physical inspection before executing registry: stone pillars, asphalt road width, HT clearance, and monsoon inundation levels.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold hover:scale-105 transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{isHi ? 'ऑडिट रिपोर्ट प्रिंट करें' : 'Print Audit Dossier'}</span>
            </button>
            <button
              onClick={() => handleSelectAll(true)}
              className="px-3.5 py-2.5 rounded-xl bg-theme-card border border-theme-gold/40 text-xs text-theme-primary hover:border-luxury-gold transition-colors"
            >
              {isHi ? 'सभी टिक करें' : 'Check All'}
            </button>
            <button
              onClick={() => handleSelectAll(false)}
              className="px-3.5 py-2.5 rounded-xl bg-theme-card border border-theme-gold/40 text-xs text-theme-secondary hover:text-red-400 hover:border-red-400/40 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isHi ? 'रीसेट' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Live Safety Scorecard Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-8 p-6 rounded-2xl bg-luxury-darker/70 border border-theme-gold/40 shadow-inner">
          {/* Gauge & Score */}
          <div className="md:col-span-4 flex items-center gap-5 border-b md:border-b-0 md:border-r border-theme-gold/30 pb-4 md:pb-0 md:pr-6">
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={scoreData.percentage >= 70 ? 'text-luxury-gold' : 'text-amber-500'}
                  strokeDasharray={`${scoreData.percentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xl font-bold font-mono text-theme-primary">
                {scoreData.percentage}%
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block">
                {isHi ? 'ग्राउंड सुरक्षा इंडेक्स' : 'Ground Safety Index'}
              </span>
              <div className={`text-base font-serif font-bold ${scoreData.gradeColor}`}>
                {scoreData.grade}
              </div>
              <p className="text-xs text-theme-secondary mt-0.5 font-mono">
                {scoreData.totalChecked} / {scoreData.totalCount} {isHi ? 'जांच पूर्ण' : 'Checks Passed'}
              </p>
            </div>
          </div>

          {/* Diligence Assessment Summary */}
          <div className="md:col-span-8 flex flex-col justify-center space-y-2">
            <div className="flex items-center gap-2">
              {scoreData.failedCriticalCount === 0 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              )}
              <span className="text-sm font-bold text-theme-primary">
                {scoreData.riskStatus}
              </span>
            </div>
            <p className="text-xs text-theme-secondary font-light leading-relaxed">
              {scoreData.failedCriticalCount > 0
                ? isHi
                  ? `चेतावनी: ${scoreData.failedCriticalCount} क्रिटिकल वैधानिक बिंदु अभी अप्रमाणित हैं। कृपया इन बिंदुओं के समाधान से पूर्व टोकन या रजिस्ट्री न करें।`
                  : `Action Required: ${scoreData.failedCriticalCount} high-risk statutory checkpoints failed or unchecked. Rectify before dispatching registry funds.`
                : isHi
                  ? 'सभी महत्वपूर्ण ऑन-ग्राउंड चेकपॉइंट सत्यापित हैं। भूखंड भौतिक एवं तकनीकी रूप से निर्माण व रजिस्ट्री हेतु उपयुक्त है।'
                  : 'All primary demarcations, infrastructure clearances, and road geometry comply with certified JDA town-planning standards.'}
            </p>
          </div>
        </div>

        {/* Plot & Audit Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-xs">
          <div className="p-3.5 rounded-xl bg-theme-card border border-theme-gold/30">
            <label className="text-[10px] uppercase tracking-wider text-theme-secondary font-semibold block mb-1">
              {isHi ? 'टाउनशिप / कॉलोनी का नाम' : 'Township / Scheme Name'}
            </label>
            <input
              type="text"
              value={plotDetails.townshipName}
              onChange={(e) => setPlotDetails({ ...plotDetails, townshipName: e.target.value })}
              className="w-full bg-transparent font-medium text-theme-primary focus:outline-none border-b border-theme-gold/30 pb-0.5"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-theme-card border border-theme-gold/30">
            <label className="text-[10px] uppercase tracking-wider text-theme-secondary font-semibold block mb-1">
              {isHi ? 'प्लॉट संख्या' : 'Plot Demarcation ID'}
            </label>
            <input
              type="text"
              value={plotDetails.plotNumber}
              onChange={(e) => setPlotDetails({ ...plotDetails, plotNumber: e.target.value })}
              className="w-full bg-transparent font-medium text-theme-primary focus:outline-none border-b border-theme-gold/30 pb-0.5"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-theme-card border border-theme-gold/30">
            <label className="text-[10px] uppercase tracking-wider text-theme-secondary font-semibold block mb-1">
              {isHi ? 'खसरा / मौजा विवरण' : 'Khasra / Mauza Details'}
            </label>
            <input
              type="text"
              value={plotDetails.khasraNumber}
              onChange={(e) => setPlotDetails({ ...plotDetails, khasraNumber: e.target.value })}
              className="w-full bg-transparent font-medium text-theme-primary focus:outline-none border-b border-theme-gold/30 pb-0.5"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-theme-card border border-theme-gold/30">
            <label className="text-[10px] uppercase tracking-wider text-theme-secondary font-semibold block mb-1">
              {isHi ? 'ऑडिट दिनांक' : 'Audit Inspection Date'}
            </label>
            <input
              type="date"
              value={plotDetails.auditDate}
              onChange={(e) => setPlotDetails({ ...plotDetails, auditDate: e.target.value })}
              className="w-full bg-transparent font-medium text-theme-primary focus:outline-none border-b border-theme-gold/30 pb-0.5"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {AUDIT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedCategory === cat.id
                  ? 'bg-luxury-gold text-luxury-darker shadow-luxury-gold scale-[1.02]'
                  : 'bg-theme-card text-theme-secondary hover:text-luxury-gold border border-theme-gold/20'
              }`}
            >
              {isHi ? cat.nameHi : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Checkpoints Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {filteredCheckpoints.map((chk) => {
            const isChecked = !!checkedItems[chk.id];
            return (
              <div
                key={chk.id}
                onClick={() => toggleCheck(chk.id)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                  isChecked
                    ? 'bg-luxury-darker/60 border-luxury-gold/50 shadow-md'
                    : 'bg-theme-card/40 border-red-500/20 hover:border-theme-gold/40 opacity-75'
                }`}
              >
                {/* Custom Checkbox */}
                <div
                  className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-luxury-gold text-luxury-darker shadow-sm'
                      : 'border-2 border-theme-gold/40'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4
                      className={`text-sm font-semibold ${
                        isChecked ? 'text-theme-primary' : 'text-theme-secondary'
                      }`}
                    >
                      {isHi ? chk.titleHi : chk.titleEn}
                    </h4>
                    {chk.critical && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                        {isHi ? 'अनिवार्य' : 'Mandatory'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-theme-muted font-light leading-relaxed">
                    {isHi ? chk.descHi : chk.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Auditor Findings & Memo */}
        <div className="p-4 sm:p-5 rounded-2xl bg-theme-card border border-theme-gold/30">
          <label className="text-[11px] uppercase tracking-wider text-theme-secondary font-bold block mb-2">
            {isHi ? 'ऑन-साइट फील्ड सर्वेक्षक टिप्पणी / अवलोकन' : 'Field Auditor Special Observations & Notes'}
          </label>
          <textarea
            rows="3"
            value={inspectorNotes}
            onChange={(e) => setInspectorNotes(e.target.value)}
            className="w-full p-3 rounded-xl bg-luxury-darker/60 border border-theme-gold/30 text-xs text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
            placeholder={isHi ? 'यहां प्लॉट से जुड़े विशिष्ट भौतिक अवलोकन दर्ज करें...' : 'Enter specific boundary measurements, neighbor consent, soil observation...'}
          />
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 pt-6 border-t border-theme-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-theme-primary">
                {isHi ? 'AVM टॉक्स 100% भौतिक सत्यापन प्रोटोकॉल' : 'AVM Talks Physical Due Diligence Protocol'}
              </p>
              <p className="text-[11px] text-theme-secondary font-light">
                {isHi ? 'जयपुर टाउनशिप बायलॉज 2020 एवं रेरा राजस्थान मानकों के अनुरूप' : 'Calibrated strictly under JDA Township Policy 2020 & RERA Rajasthan Guidelines'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">
            CODE: AVM-GRND-18P-2026
          </span>
        </div>
      </div>
    </div>
  );
};
