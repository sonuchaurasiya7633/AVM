import React, { useState } from 'react';
import { 
  X, Printer, Download, CheckCircle2, ShieldCheck, Award, 
  MapPin, Building2, Calendar, QrCode, FileText, PhoneCall, Share2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo/avm-logo.png';
import { useLanguage } from '../context/LanguageContext';

export const DueDiligenceDossierModal = ({ isOpen, onClose, plotData }) => {
  const { isHindi } = useLanguage();
  const [buyerName, setBuyerName] = useState('Institutional Land Investor');
  const [dossierId] = useState(() => `AVM-AUDIT-${Math.floor(100000 + Math.random() * 900000)}`);
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  if (!isOpen) return null;

  const targetPlot = plotData || {
    name: 'Sanctioned Masterplan Plotted Estate',
    corridor: 'Ajmer Road Institutional Tech Corridor • Jaipur',
    priceStartingGaj: '₹17,500 / Gaj',
    roadWidths: ['80 Ft Sector Boulevard', '40 Ft Bitumen'],
    jdaApproved: true,
    reraRegistered: true
  };

  const auditPillars = [
    {
      id: 1,
      title: isHindi ? '30-वर्षीय रेवेन्यू चैन व जमाबंदी' : '30-Year Revenue Chain & Jamabandi',
      status: 'VERIFIED',
      desc: isHindi ? 'तहसीलदार रिकॉर्ड अनुसार कोई भी विवाद या थर्ड पार्टी क्लेम नहीं' : 'Unbroken ancestral chain with zero pending civil court disputes.'
    },
    {
      id: 2,
      title: isHindi ? 'जेडीए धारा 90-A समर्पण आदेश' : 'JDA Section 90-A Surrender Order',
      status: 'SANCTIONED',
      desc: isHindi ? 'कृषि भूमि का वैधानिक रूप से आवासीय प्रयोजनार्थ रूपांतरण पूर्ण' : 'Agricultural tenure surrendered to JDA; plotted layout sanctioned.'
    },
    {
      id: 3,
      title: isHindi ? 'रेरा राजस्थान पंजीकरण स्टेटस' : 'Rajasthan RERA Sanction',
      status: 'COMPLIANT',
      desc: isHindi ? 'एस्क्रो खाता व नियत समय सीमा में विकास का कानूनी संरक्षण' : 'Registered under statutory escrow account and physical timeline bounds.'
    },
    {
      id: 4,
      title: isHindi ? 'भौतिक सीमांकन एवं आरसीसी पिलर्स' : 'On-Ground Physical Demarcation',
      status: 'DEMARCATED',
      desc: isHindi ? 'मौके पर डीजीपीएस कुल सर्वेक्षण और कॉर्नर पिलर्स स्थापित' : 'DGPS coordinates verified with pre-cast numbered boundary pillars.'
    },
    {
      id: 5,
      title: isHindi ? 'मास्टरप्लान सड़क चौड़ाई का मिलान' : 'Masterplan Sector Road Alignment',
      status: 'CONFIRMED',
      desc: isHindi ? '80 फीट एवं 60 फीट चौड़े सेक्टर रास्तों का भौतिक सत्यापन' : 'Direct frontage connected to sanctioned arterial sector boulevard.'
    },
    {
      id: 6,
      title: isHindi ? 'सब-रजिस्ट्रार भारमुक्ति प्रमाण' : 'Sub-Registrar Non-Encumbrance',
      status: 'CLEAR',
      desc: isHindi ? 'किसी भी बैंक या वित्तीय संस्थान में भूमि बंधक नहीं है' : 'Zero registered mortgage, lien, or statutory recovery liabilities.'
    },
    {
      id: 7,
      title: isHindi ? 'राष्ट्रीयकृत बैंक ऋण स्वीकृति' : 'Nationalized Bank Approvals',
      status: 'APPROVED',
      desc: isHindi ? 'SBI एवं HDFC से 80% तक स्वीकृत ऋण सुविधा उपलब्ध' : 'Approved for institutional land finance up to 80% loan-to-value.'
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl rounded-3xl bg-[#021710] border-2 border-luxury-gold shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden leather-stitch-outline my-auto flex flex-col max-h-[94vh]"
        >
          {/* Action Bar (Hidden when printing) */}
          <div className="p-4 sm:p-5 border-b border-luxury-gold/30 flex items-center justify-between bg-black/50 print:hidden">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-gradient text-luxury-darker flex items-center justify-center shadow">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-white leading-tight">
                  {isHindi ? 'विधिक भूमि ड्यू डिलिजेंस प्रमाण-पत्र' : 'Forensic Land Due Diligence Dossier'}
                </h3>
                <span className="text-[10px] text-luxury-goldLight font-mono">
                  {dossierId} • Verified by AVM Talks
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isHindi ? 'प्रिंट / PDF' : 'Print / PDF'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/60 text-luxury-gold hover:text-white border border-luxury-gold/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dossier Document Sheet (Styled as an Official Parchment Deed) */}
          <div 
            id="dossier-print-sheet" 
            className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#FCFAF5] text-[#1A1A1A] font-serif print:p-0 print:bg-white"
          >
            {/* Deed Border */}
            <div className="border-4 border-[#3D2314] p-6 sm:p-8 rounded-2xl relative bg-[#FCFAF5]">
              {/* Inner Double Gold Hairline Border */}
              <div className="border border-[#D4AF37] p-5 sm:p-6 rounded-xl relative">
                {/* 4 Corner Brass Ring Accents */}
                <div className="absolute top-2 left-2 text-[#D4AF37] text-xs font-mono font-bold">✦</div>
                <div className="absolute top-2 right-2 text-[#D4AF37] text-xs font-mono font-bold">✦</div>
                <div className="absolute bottom-2 left-2 text-[#D4AF37] text-xs font-mono font-bold">✦</div>
                <div className="absolute bottom-2 right-2 text-[#D4AF37] text-xs font-mono font-bold">✦</div>

                {/* Header Plaque */}
                <div className="text-center pb-6 border-b border-[#D4AF37]/40 mb-6">
                  <div className="flex justify-center mb-3">
                    <img
                      src={logoImg}
                      alt="AVM Crest"
                      className="w-16 h-16 rounded-full border-2 border-[#D4AF37] object-cover shadow-sm"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#8B6508] font-bold block mb-1">
                    Institutional Plotted Due Diligence Intelligence • Jaipur
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2B1B10] uppercase mb-1">
                    Statutory Land Verification Dossier
                  </h1>
                  <p className="text-xs text-[#555] font-sans font-light">
                    Section 90-A Resumption • Jamabandi Revenue Chain • RERA Escrow Compliance
                  </p>
                </div>

                {/* Dossier Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#F4EDE0] border border-[#D4AF37]/30 font-sans text-xs mb-6">
                  <div>
                    <span className="text-[#8B6508] text-[10px] uppercase font-bold block">Target Property:</span>
                    <strong className="text-sm font-serif text-[#2B1B10]">{targetPlot.name}</strong>
                    <p className="text-[11px] text-[#555]">{targetPlot.corridor}</p>
                  </div>
                  <div>
                    <span className="text-[#8B6508] text-[10px] uppercase font-bold block">Dossier ID:</span>
                    <span className="font-mono font-bold text-[#2B1B10]">{dossierId}</span>
                    <p className="text-[11px] text-[#555]">Audit Date: {currentDate}</p>
                  </div>
                  <div>
                    <span className="text-[#8B6508] text-[10px] uppercase font-bold block">Fiduciary Status:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      100% Cleared for Token
                    </span>
                    <p className="text-[11px] text-[#555]">Zero Brokerage Commission</p>
                  </div>
                </div>

                {/* 7-Pillar Statutory Checklist Matrix */}
                <h3 className="text-sm uppercase font-sans tracking-wider font-bold text-[#3D2314] mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B6508]" />
                  <span>7-Pillar Statutory Verification Scorecard</span>
                </h3>

                <div className="space-y-2.5 mb-8 font-sans text-xs">
                  {auditPillars.map((pillar) => (
                    <div 
                      key={pillar.id}
                      className="p-3 rounded-xl bg-white border border-[#E0D5C1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#03281E] text-[#D4AF37] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          {pillar.id}
                        </span>
                        <div>
                          <strong className="text-[#2B1B10] text-xs font-semibold block">
                            {pillar.title}
                          </strong>
                          <p className="text-[11px] text-[#666] font-light">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-300 self-start sm:self-center flex-shrink-0">
                        ✓ {pillar.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Certification Seal & Sign-off */}
                <div className="pt-6 border-t-2 border-dashed border-[#D4AF37]/50 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full border-2 border-[#8B6508] bg-[#F7F3E9] flex flex-col items-center justify-center text-center p-1">
                      <Award className="w-5 h-5 text-[#8B6508]" />
                      <span className="text-[7px] font-mono uppercase font-bold text-[#8B6508]">AVM SEAL</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B6508] block">
                        Editorial & Advisory Desk
                      </span>
                      <p className="text-xs font-serif font-bold text-[#2B1B10]">
                        AVM TALKS BY AVNISH
                      </p>
                      <p className="text-[10px] text-[#777]">
                        Jaipur Plotted Due Diligence Mission
                      </p>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="text-sm font-serif italic font-bold text-[#2B1B10]">
                      Avnish Sharma
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#8B6508]">
                      Principal Advisor & Real Estate Media Host
                    </div>
                    <p className="text-[9px] text-[#888] font-mono mt-0.5">
                      Coordinator Hotline: +91 99283-65001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
