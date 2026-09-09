import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { 
  FileCheck2, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, 
  Layers, Landmark, FileText, Check, Download, Eye, Stamp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GovernmentChallanSimulator } from '../components/GovernmentChallanSimulator';
import { useLanguage } from '../context/LanguageContext';

const REGISTRY_STAGES = [
  {
    step: '01',
    title: 'Revenue Record & 30-Year Title Search',
    titleHi: 'राजस्व रिकॉर्ड व 30-वर्षीय टाइटल पड़ताल',
    badge: 'Stage 1 • Revenue Audit',
    badgeHi: 'चरण 1 • राजस्व ऑडिट',
    leadTime: '3–5 Working Days',
    leadTimeHi: '3–5 कार्यदिवस',
    authority: 'Tehsil & Sub-Registrar Record Room',
    authorityHi: 'तहसील व उप-पंजीयक रिकॉर्ड रूम',
    summary: 'Before token agreement, the 30-year lineage of the agricultural Khasra is scrutinized via official Jamabandi (RoR) and Girdawari records to verify complete unencumbered ownership.',
    summaryHi: 'बयाना अनुबंध से पूर्व, संबंधित खसरे की 30 साल पुरानी जमाबंदी और गिरदावरी की जांच की जाती है ताकि भूमि पर किसी कानूनी विवाद या बंधक का न होना सुनिश्चित किया जा सके।',
    keyChecks: [
      'Verification of Khatedari rights on Apna Khata portal (Jamabandi नकल)',
      'Confirming absence of SC/ST land ceiling restrictions under Section 42 of Rajasthan Tenancy Act',
      'No pending litigation or bank mortgage lien registered with CERSAI registry',
      'Tahsildar Girdawari harvest inspection to verify non-disputed boundary possession'
    ],
    keyChecksHi: [
      'अपना खाता पोर्टल पर खातेदारी अधिकारों और जमाबंदी नकल का सत्यापन',
      'राजस्थान काश्तकारी अधिनियम धारा 42 के तहत किसी प्रतिबंध का न होना सुनिश्चित करना',
      'CERSAI या बैंकों में कोई बंधक या कोर्ट कुर्की न होना जांचना',
      'तहसीलदार गिरदावरी द्वारा मौके पर निर्विवाद कब्जे की पुष्टि'
    ],
    statutoryDocument: 'Jamabandi RoR & 30-Year Non-Encumbrance Certificate (NEC)',
    statutoryDocumentHi: 'जमाबंदी नकल व 30-वर्षीय भारमुक्त प्रमाण पत्र (NEC)'
  },
  {
    step: '02',
    title: 'Statutory Section 90-A Agricultural Conversion',
    titleHi: 'राजस्थान भू-राजस्व धारा 90-A कृषि रूपांतरण',
    badge: 'Stage 2 • Land Use Conversion',
    badgeHi: 'चरण 2 • भू-उपयोग रूपांतरण',
    leadTime: '45–60 Working Days',
    leadTimeHi: '45–60 कार्यदिवस',
    authority: 'SDO / JDA Competent Conversion Officer',
    authorityHi: 'एसडीएम / जेडीए सक्षम रूपांतरण अधिकारी',
    summary: 'Under Section 90-A of Rajasthan Land Revenue Act 1956, raw agricultural land is officially surrendered to JDA or the Municipal Corporation for conversion into an urban residential/commercial plotted layout.',
    summaryHi: 'राजस्थान भू-राजस्व अधिनियम 1956 की धारा 90-A के तहत कृषि भूमि का जेडीए को औपचारिक समर्पण किया जाता है और आवासीय/व्यावसायिक प्लॉटिंग हेतु रूपांतरण आदेश जारी होता है।',
    keyChecks: [
      'Formal 90-A surrender order published in the Rajasthan Government Gazette',
      'Payment of prescribed Land Conversion Premiums (LCP) to the state exchequer',
      'No-Objection Certificates from Forest, Irrigation, Pollution Control, and Airport Authorities',
      'Surrender of masterplan arterial road reserves (60ft / 80ft / 100ft) without state compensation'
    ],
    keyChecksHi: [
      'राजस्थान राजपत्र (गजट) में प्रकाशित धारा 90-A का विधिवत आदेश',
      'सरकारी कोष में निर्धारित भूमि रूपांतरण प्रीमियम (LCP) का चालान भुगतान',
      'वन विभाग, सिंचाई विभाग और प्रदूषण नियंत्रण मंडल से अनापत्ति प्रमाण पत्र (NOC)',
      'मास्टर प्लान की मुख्य सड़कों (60/80/100 फीट) का जेडीए को बिना मुआवजे समर्पण'
    ],
    statutoryDocument: 'Sanctioned Section 90-A Order & Conversion Challan',
    statutoryDocumentHi: 'स्वीकृत धारा 90-A आदेश व रूपांतरण चालान'
  },
  {
    step: '03',
    title: 'JDA Master Layout Sanction & RERA Escrow',
    titleHi: 'जेडीए मास्टर लेआउट अनुमोदन व रेरा एस्क्रो',
    badge: 'Stage 3 • Blueprint Sanction',
    badgeHi: 'चरण 3 • लेआउट नक्शा अनुमोदन',
    leadTime: '30 Working Days',
    leadTimeHi: '30 कार्यदिवस',
    authority: 'Jaipur Development Authority (BPC) & RERA',
    authorityHi: 'जयपुर विकास प्राधिकरण (BPC) एवं रेरा',
    summary: 'The layout blueprint is scrutinized by the Building Plan Committee (BPC). Plots, internal 30ft/40ft/60ft bitumen roads, open green parks, community facility zones, and transformer substations are frozen into the master ledger.',
    summaryHi: 'बिल्डिंग प्लान कमेटी (BPC) द्वारा टाउनशिप नक्शे की बारीकी से जांच की जाती है। प्लॉट नंबर, 30/40/60 फीट चौड़ी सड़कें, पार्क और जन-सुविधा क्षेत्र मास्टर रिकॉर्ड में सील किए जाते हैं।',
    keyChecks: [
      'Sanctioned JDA Layout Map bearing official seal and BPC resolution number',
      'Reservation of mandatory 5% Facility Area & 5% Parks/Greenery dedicated to public',
      'Registration with RERA Rajasthan with unique RERA Project Registration Number',
      '70% buyer funds locked in statutory RERA Escrow Account dedicated for site execution'
    ],
    keyChecksHi: [
      'आधिकारिक बीपीसी मुहर और अनुमोदन संख्या युक्त स्वीकृत जेडीए लेआउट नक्शा',
      'सार्वजनिक पार्क और जन-सुविधाओं के लिए अनिवार्य 5%-5% आरक्षित क्षेत्र',
      'रेरा राजस्थान में विधिवत पंजीकृत विशिष्ट रेरा प्रोजेक्ट रजिस्ट्रेशन नंबर',
      'विकास कार्यों के लिए समर्पित बैंक एस्क्रो खाते में 70% राशि जमा करने की बाध्यता'
    ],
    statutoryDocument: 'Approved JDA Layout Plan & RERA Registration Certificate',
    statutoryDocumentHi: 'स्वीकृत जेडीए लेआउट प्लान व रेरा पंजीकरण प्रमाण पत्र'
  },
  {
    step: '04',
    title: 'Sub-Registrar Sale Deed & e-Grass Stamp Payment',
    titleHi: 'उप-पंजीयक विक्रय विलेख (रजिस्ट्री) व ई-ग्रास स्टाम्प',
    badge: 'Stage 4 • Registry Execution',
    badgeHi: 'चरण 4 • रजिस्ट्री निष्पादन',
    leadTime: '1 Working Day (By Appointment)',
    leadTimeHi: '1 कार्यदिवस (अपॉइंटमेंट द्वारा)',
    authority: 'Office of the Sub-Registrar (Jaipur)',
    authorityHi: 'संबंधित उप-पंजीयक कार्यालय (जयपुर)',
    summary: 'The formal conveyance/sale deed is presented before the Sub-Registrar. Both buyer and seller execute the deed in presence of two verified witnesses, biometric fingerprints, and government treasury e-Grass stamp duty challans.',
    summaryHi: 'उप-पंजीयक के समक्ष मूल विक्रय विलेख प्रस्तुत किया जाता है। दो गवाहों, बायोमेट्रिक उंगलियों के निशान और ई-ग्रास स्टाम्प ड्यूटी चालान के साथ रजिस्ट्री निष्पादित होती है।',
    keyChecks: [
      'e-Grass Treasury Challan payment for 6% (Male) or 5% (Female) Stamp Duty + 1% Reg Fee',
      '20% Surcharge payment on stamp duty for infrastructure and cow conservation funds',
      'High-resolution biometric thumb scanning & live webcam photo capture of all parties',
      'Verification of original JDA Lease Deed (Patta) chain and power of attorney validity'
    ],
    keyChecksHi: [
      'ई-ग्रास चालान द्वारा स्टाम्प ड्यूटी (पुरुष 6%, महिला 5%) और 1% रजिस्ट्रेशन फीस भुगतान',
      'स्टाम्प ड्यूटी पर 20% विकास एवं गौ-संरक्षण अधिभार (सरचार्ज) की अदायगी',
      'क्रेता, विक्रेता और गवाहों की लाइव वेबकैम फोटो और बायोमेट्रिक अंगूठा स्कैनिंग',
      'मूल जेडीए लीज डीड (पट्टा) श्रृंखला और पावर ऑफ अटॉर्नी का सत्यापन'
    ],
    statutoryDocument: 'Executed Registered Sale Deed (पंजीकृत विक्रय विलेख)',
    statutoryDocumentHi: 'पंजीकृत विक्रय विलेख (रजिस्ट्री दस्तावेज)'
  },
  {
    step: '05',
    title: 'Mutation (Dakhil Kharij) & JDA Patta Transfer',
    titleHi: 'दाखिल-खारिज (नामांतरण) व जेडीए पट्टा नाम हस्तांतरण',
    badge: 'Stage 5 • Municipal Title Transfer',
    badgeHi: 'चरण 5 • नगर निकाय नामांतरण',
    leadTime: '15–21 Working Days',
    leadTimeHi: '15–21 कार्यदिवस',
    authority: 'JDA Citizen Service Centre (CSC) / Municipal Zone',
    authorityHi: 'जेडीए नागरिक सेवा केंद्र / संबंधित नगर निगम जोन',
    summary: 'The final critical milestone: recording the new owner’s name in the JDA and Tehsil municipal mutation ledger (दाखिल खारिज). This formalizes complete municipal tax liability and future resale/building permission rights.',
    summaryHi: 'अंतिम महत्वपूर्ण चरण: जेडीए और तहसील के सरकारी लेजर में नए स्वामी का नाम दर्ज कराना। इसके बाद ही भवन निर्माण अनुमति और भविष्य के कानूनी अधिकार पूर्ण होते हैं।',
    keyChecks: [
      'Application submission on JDA e-Mitra citizen portal with registered deed copy',
      'Public notice period (15 days) inviting any municipal objections',
      'Issuance of official JDA Name Transfer Order / Sub-division Patta',
      'Updating online property tax and electricity meter records to buyer’s name'
    ],
    keyChecksHi: [
      'जेडीए ई-मित्र पोर्टल पर पंजीकृत विलेख प्रति के साथ नामांतरण आवेदन',
      'किसी भी आपत्ति के लिए 15-दिवसीय वैधानिक सार्वजनिक सूचना अवधि',
      'जेडीए द्वारा अधिकृत नाम हस्तांतरण आदेश / उप-विभाजन पट्टा जारी होना',
      'बिजली मीटर और नगर निगम टैक्स रिकॉर्ड में खरीदार का नाम अद्यतन होना'
    ],
    statutoryDocument: 'Official JDA Mutation Order & Updated Name Patta',
    statutoryDocumentHi: 'आधिकारिक जेडीए नामांतरण आदेश व नाम अद्यतन पट्टा'
  }
];

const STATUTORY_CHECKLIST = [
  { id: 'c1', label: 'Section 90-A Conversion Order published in State Gazette', labelHi: 'राजस्थान राजपत्र में प्रकाशित धारा 90-A रूपांतरण आदेश', mandatory: true },
  { id: 'c2', label: 'Sanctioned JDA Layout Map with BPC seal and plot demarcation', labelHi: 'बीपीसी मुहर और प्लॉट सीमांकन सहित स्वीकृत जेडीए लेआउट नक्शा', mandatory: true },
  { id: 'c3', label: 'Active RERA Rajasthan Registration Number & Escrow Account', labelHi: 'सक्रिय रेरा राजस्थान रजिस्ट्रेशन नंबर एवं समर्पित एस्क्रो खाता', mandatory: true },
  { id: 'c4', label: '30-Year Non-Encumbrance Certificate (NEC) from Sub-Registrar', labelHi: 'उप-पंजीयक से प्राप्त 30-वर्षीय भारमुक्त प्रमाण पत्र (NEC)', mandatory: true },
  { id: 'c5', label: 'Physical site boundary pillared with verified asphalt road width', labelHi: 'मौके पर पक्के पिलर सीमांकन और डामर सड़क की वास्तविक चौड़ाई की पुष्टि', mandatory: true },
  { id: 'c6', label: 'NOC from Airport Authority & High-Tension Transmission clearance', labelHi: 'विमानपत्तन प्राधिकरण व हाई-टेंशन बिजली लाइन की एनओसी', mandatory: false },
  { id: 'c7', label: 'Nationalized Bank Project Approval (SBI / HDFC / ICICI)', labelHi: 'राष्ट्रीयकृत बैंक प्रोजेक्ट अप्रूवल (SBI / HDFC / ICICI आदि)', mandatory: true },
  { id: 'c8', label: 'Direct approach road minimum 30-feet wide connected to public sector road', labelHi: 'मुख्य सेक्टर रोड से जुड़ी न्यूनतम 30-फुट चौड़ी सीधी पक्की एप्रोच रोड', mandatory: true }
];

export const RegistryProcess = () => {
  const { isHindi } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [checkedItems, setCheckedItems] = useState({ c1: true, c2: true, c3: true });

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const currentStage = REGISTRY_STAGES[activeStep];
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / STATUTORY_CHECKLIST.length) * 100);

  const stageTitle = isHindi ? currentStage.titleHi : currentStage.title;
  const stageBadge = isHindi ? currentStage.badgeHi : currentStage.badge;
  const stageLeadTime = isHindi ? currentStage.leadTimeHi : currentStage.leadTime;
  const stageAuthority = isHindi ? currentStage.authorityHi : currentStage.authority;
  const stageSummary = isHindi ? currentStage.summaryHi : currentStage.summary;
  const stageChecks = isHindi ? currentStage.keyChecksHi : currentStage.keyChecks;
  const stageDoc = isHindi ? currentStage.statutoryDocumentHi : currentStage.statutoryDocument;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <Landmark className="w-3.5 h-3.5" />
          <span>{isHindi ? 'वैधानिक भूमि अर्जन वास्तुकला' : 'Statutory Land Acquisition Architecture'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          {isHindi ? 'राजस्थान 5-फेज ' : 'The 5-Phase Rajasthan '}
          <br />
          <span className="text-gold-gradient italic">
            {isHindi ? '90-A व रजिस्ट्री रोडमैप।' : '90-A & Registry Roadmap.'}
          </span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          {isHindi
            ? 'कच्ची कृषि भूमि की पड़ताल से लेकर अंतिम जेडीए दाखिल-खारिज (नामांतरण) तक। जयपुर में 100% निर्विवाद प्लॉटेड जमीन का मालिकाना हक प्राप्त करने के सभी वैधानिक चरणों को समझें।'
            : 'From agricultural revenue search to the final JDA Mutation (Dakhil Kharij). Understand the exact legal milestones required to secure 100% indisputable plotted land ownership in Jaipur.'}
        </p>
      </div>

      {/* Interactive 5 Stages Step Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {REGISTRY_STAGES.map((s, idx) => {
          const isActive = activeStep === idx;
          const title = isHindi ? s.titleHi : s.title;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                isActive
                  ? 'bg-theme-surface border-luxury-gold shadow-luxury-gold'
                  : 'bg-theme-card border-theme-gold/20 hover:border-theme-gold/50 opacity-85'
              }`}
            >
              <span className={`text-2xl font-mono font-extrabold block mb-1 ${isActive ? 'text-luxury-gold' : 'text-theme-muted'}`}>
                {s.step}
              </span>
              <p className={`text-xs font-serif font-bold line-clamp-2 ${isActive ? 'text-theme-primary' : 'text-theme-secondary'}`}>
                {title}
              </p>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient" />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Detail Showcase Leather Folio */}
      <div className="leather-badge-container rounded-3xl p-6 sm:p-10 border-2 border-luxury-gold shadow-2xl mb-16 relative overflow-hidden leather-stitch-outline">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-theme-gold/20 mb-8">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-luxury-emerald/30 text-luxury-goldLight border border-luxury-gold/40 mb-3 inline-block">
              {stageBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-theme-primary">
              {stageTitle}
            </h2>
            <p className="text-xs sm:text-sm text-theme-muted mt-1">
              {isHindi ? 'सक्षम प्राधिकारी:' : 'Statutory Authority:'} <span className="text-luxury-gold font-semibold">{stageAuthority}</span> • {isHindi ? 'अनुमानित समय:' : 'Typical Lead Time:'} <span className="text-theme-primary font-mono">{stageLeadTime}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((p) => p - 1)}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-theme-gold/40 text-theme-secondary disabled:opacity-30 hover:border-luxury-gold cursor-pointer"
            >
              {isHindi ? 'पिछला' : 'Previous'}
            </button>
            <button
              disabled={activeStep === REGISTRY_STAGES.length - 1}
              onClick={() => setActiveStep((p) => p + 1)}
              className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-sm disabled:opacity-30 hover:scale-105 transition-all cursor-pointer"
            >
              {isHindi ? 'अगला चरण' : 'Next Milestone'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Description & Action Checklist */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
              {stageSummary}
            </p>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-gold mb-3 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-luxury-gold" />
                <span>{isHindi ? 'इस चरण की अनिवार्य वैधानिक जांच सूची:' : 'Statutory Mandatory Checks for This Stage:'}</span>
              </h3>
              <div className="space-y-2.5">
                {stageChecks.map((check, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-theme-card border border-theme-gold/20 flex items-start gap-3 text-xs sm:text-sm text-theme-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statutory Deliverable Pill Dossier */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-theme-card border border-theme-gold shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold block mb-2">
                {isHindi ? 'प्रमाणित वैधानिक दस्तावेज' : 'Certified Legal Deliverable'}
              </span>
              <div className="p-4 rounded-xl bg-luxury-emerald/20 border border-theme-gold/40 mb-4">
                <FileText className="w-8 h-8 text-luxury-gold mb-2" />
                <h4 className="text-sm font-serif font-bold text-theme-primary leading-tight">
                  {stageDoc}
                </h4>
              </div>
              <p className="text-xs text-theme-secondary font-light leading-relaxed">
                {isHindi
                  ? 'अगली भुगतान किस्त जारी करने से पहले सुनिश्चित करें कि इस दस्तावेज की मूल प्रमाणित प्रति आपके पास उपलब्ध है।'
                  : 'Ensure original certified copies of this document are in your possession before advancing to subsequent payment tranches.'}
              </p>
            </div>

            <div className="pt-6 border-t border-theme-gold/20 mt-6">
              <Link
                to="/contact"
                className="w-full py-3 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <span>{isHindi ? 'टाइटल सत्यापन का अनुरोध करें' : 'Request Title Verification'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rajasthan e-Grass Stamp Duty & Registration Challan Simulator */}
      <GovernmentChallanSimulator />

      {/* Interactive Pre-Purchase Document Checklist Leather Folio */}
      <div className="leather-badge-container rounded-3xl p-6 sm:p-10 border-2 border-luxury-gold shadow-2xl mb-14 relative overflow-hidden leather-stitch-outline">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-theme-gold/20 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-luxury-emerald/30 text-luxury-goldLight border border-luxury-gold/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{isHindi ? 'स्व-ऑडिट चेकलिस्ट' : 'Self-Audit Checklist'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-primary">
              {isHindi ? 'टोकन भुगतान से पूर्व आवश्यक दस्तावेज चेकलिस्ट' : 'Pre-Token Statutory Document Checklist'}
            </h2>
            <p className="text-xs sm:text-sm text-theme-secondary font-light">
              {isHindi
                ? 'टोकन बयाना राशि देने से पहले उन सभी प्रमाणित दस्तावेजों पर सही का निशान लगाएं जिनकी आपने स्वयं जांच की है।'
                : 'Tick off the certified papers you have physically inspected before transferring earnest token money.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/40 text-center min-w-[140px]">
            <span className="text-2xl font-mono font-extrabold text-luxury-gold block">
              {progressPercent}%
            </span>
            <span className="text-[10px] uppercase font-bold text-theme-muted">
              {isHindi ? `${STATUTORY_CHECKLIST.length} में से ${checkedCount} सत्यापित` : `${checkedCount} of ${STATUTORY_CHECKLIST.length} Verified`}
            </span>
          </div>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {STATUTORY_CHECKLIST.map((item) => {
            const isChecked = !!checkedItems[item.id];
            const label = isHindi ? item.labelHi : item.label;
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isChecked
                    ? 'bg-luxury-emerald/20 border-luxury-gold text-theme-primary'
                    : 'bg-theme-card border-theme-gold/20 text-theme-secondary hover:border-theme-gold/40'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? 'bg-luxury-gold border-luxury-gold text-luxury-darker'
                      : 'border-theme-gold/40 bg-theme-base'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {label}
                  </p>
                  {item.mandatory && (
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-400 mt-1 inline-block">
                      {isHindi ? '* अनिवार्य वैधानिक आवश्यकता' : '* Mandatory Statutory Requirement'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Readiness Verdict */}
        <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
          progressPercent >= 80
            ? 'dark:bg-cyan-950/40 bg-emerald-50 dark:border-cyan-500/30 border-emerald-300 dark:text-slate-200 text-emerald-950 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
            : 'dark:bg-amber-950/40 bg-amber-50 dark:border-amber-500/50 border-amber-300 dark:text-amber-200 text-amber-950 shadow-sm'
        }`}>
          {progressPercent >= 80 ? (
            <ShieldCheck className="w-8 h-8 text-luxury-gold flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          )}
          <div>
            <h4 className="text-sm font-bold">
              {progressPercent >= 80
                ? (isHindi ? 'उच्च वैधानिक तैयारी: टोकन एग्रीमेंट के साथ आगे बढ़ना सुरक्षित है' : 'High Statutory Readiness: Safe to Proceed with Advance Token Draft')
                : (isHindi ? 'सावधानी: कुछ अनिवार्य वैधानिक मंजूरियां अभी बाकी हैं' : 'Caution: Essential Statutory Clearances Missing')}
            </h4>
            <p className="text-xs font-light opacity-90 mt-0.5">
              {progressPercent >= 80
                ? (isHindi
                    ? 'सुनिश्चित करें कि आपके वकील ने एग्रीमेंट में धारा 90-A गजट अधिसूचना संख्या का स्पष्ट उल्लेख किया है।'
                    : 'Ensure your advocate drafts an explicit indemnity clause in the agreement to sell referencing the verified Section 90-A gazette notification number.')
                : (isHindi
                    ? 'जब तक डेवलपर गजट 90-A आदेश और स्वीकृत जेडीए नक्शा न दे, तब तक टोकन राशि का भुगतान न करें। सहायता के लिए हमारे सलाहकारों से संपर्क करें।'
                    : 'Do not transfer token funds until the developer provides the gazette 90-A order and approved JDA layout map. Connect with our coordinators for guidance.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
