import React, { useState } from 'react';
import { ShieldCheck, FileCheck2, Award, Stamp, CheckCircle2, ChevronRight, Eye, X, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TITLE_MILESTONES = [
  {
    year: '1995',
    title: 'Khatedari Agricultural Title & Jamabandi',
    authority: 'Office of the Tehsildar, Revenue Board of Rajasthan',
    instrument: 'Form P-21 Jamabandi (Khasra No. 412/1 & 412/2)',
    status: 'Verified Original Title',
    summary: 'Single uninterrupted family ownership with clear inheritance succession (Namantaran P-12) and zero ancestral mortgage liens.',
    legalProof: 'Rajasthan Land Revenue Act 1956 • Section 88 Verified',
    clauses: [
      'Zero ceiling land excess under Rajasthan Imposition of Ceilings Act 1973',
      'No pending litigation under Revenue Board Ajmer records',
      'Khatedari rights verified through 30-year archived tehsil registers'
    ]
  },
  {
    year: '2014',
    title: 'Jaipur Master Plan 2025 Zonal Inscription',
    authority: 'Jaipur Development Authority (JDA) Planning Directorate',
    instrument: 'Zonal Development Plan (ZDP) Sector Inscription Order',
    status: 'Statutory Land Use Permitted',
    summary: 'Land parcel earmarked for High-Density Plotted Residential Township. No reservation for green buffer or forest department eco-zones.',
    legalProof: 'JDA Act 1982 • Master Development Plan 2025 Conforming',
    clauses: [
      'Designated Residential Use under Sector Master Circulation Matrix',
      '80-ft master arterial boulevard alignment confirmed without slicing',
      'Groundwater depth and hydrological clearance from CGWB certified'
    ]
  },
  {
    year: '2021',
    title: 'Section 90-A Surrender & Conversion Order',
    authority: 'Authorized Officer & Zonal Commissioner, JDA Jaipur',
    instrument: 'Section 90-A Revenue Surrender Order No. JDA/Z-11/2021/4891',
    status: '100% Non-Agricultural Surrendered',
    summary: 'Landowner formally surrendered agricultural tenure rights to the State Government (JDA) for planned layout regularization and conversion premiums.',
    legalProof: 'Rajasthan Land Revenue Act 1956 • Section 90-A Complete',
    clauses: [
      'Conversion premium paid under Rajasthan Urban Area Land Rules 2012',
      'Internal 40-ft and 30-ft road reserves handed over unconditionally to JDA',
      'Mutation in Revenue Jamabandi updated from Khatedar to JDA Jaipur'
    ]
  },
  {
    year: '2023',
    title: 'Sanctioned Layout Blueprint & Patta Allotment',
    authority: 'Building Plan Committee (BPC), Jaipur Development Authority',
    instrument: 'Sanctioned Engineering Masterplan CAD/JDA/DP/2023/1029',
    status: 'Sanctioned Township Layout',
    summary: 'Formal demarcation of numbered residential plots, community park with water fountain, electrical substation land, and commercial boulevard.',
    legalProof: 'Township Policy 2010 • JDA Section 54 Demarcation',
    clauses: [
      'All plots numbered and DGPS geo-referenced with Total Station Survey',
      'Underground cabling NOC issued by Jaipur Discom (JVVNL)',
      'Individual JDA Patta issuance eligibility granted per plot'
    ]
  },
  {
    year: '2024',
    title: 'RERA Rajasthan Dedicated Escrow Registration',
    authority: 'Rajasthan Real Estate Regulatory Authority (RERA)',
    instrument: 'RERA Registration No. RAJ/P/2024/2891',
    status: 'State Regulatory Sanction Active',
    summary: 'Mandatory 70% escrow bank account opened with Punjab National Bank to safeguard buyer advance payments solely for on-site infrastructure development.',
    legalProof: 'Real Estate (Regulation and Development) Act 2016 • Section 4(2)(l)(D)',
    clauses: [
      'Quarterly progress reports (QPR) uploaded on RERA public portal',
      'Timely completion bond under statutory penal provisions',
      'Developer prohibited from mortgaging plotted inventory to third-party NBFCs'
    ]
  },
  {
    year: '2026',
    title: 'Sub-Registrar 30-Year Clean Non-Encumbrance Deed',
    authority: 'Sub-Registrar Office Sanganer / Bassi, Registration Dept.',
    instrument: '30-Year Non-Encumbrance Certificate (Baradari Nil Liability)',
    status: 'Zero Encumbrance • Freehold Registry Ready',
    summary: 'Exhaustive title search confirming zero bank mortgages, court attachments, revenue arrears, or civil dispute stays across 3 decades.',
    legalProof: 'Registration Act 1908 • Certified Non-Encumbrance Record',
    clauses: [
      '30-year search from 1996 to 2026 confirms 100% clear title chain',
      'Pre-approved by SBI, HDFC, ICICI for up to 80% plot loans',
      'Ready for instant same-day biometric deed registration at Tehsil'
    ]
  }
];

export const ForensicTitleChainTimeline = () => {
  const { t } = useLanguage();
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  return (
    <div className="royal-obsidian-card rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
      {/* 4 Corner Brass Screws */}
      <div className="brass-screw absolute top-3.5 left-3.5" />
      <div className="brass-screw absolute top-3.5 right-3.5" />
      <div className="brass-screw absolute bottom-3.5 left-3.5" />
      <div className="brass-screw absolute bottom-3.5 right-3.5" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-luxury-emerald/30 text-luxury-goldLight border border-luxury-gold/40 mb-3">
          <FileCheck2 className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Fiduciary Legal Mastery</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-white leading-tight">
          30-Year Forensic Title Chain & Revenue Deed Inspector
        </h2>
        <p className="text-xs sm:text-sm text-theme-secondary font-light mt-2">
          Track the chronological statutory chain from 1995 Khatedari agricultural tenancy to 2026 JDA Approved, RERA Sanctioned, and Sub-Registrar clear non-encumbrance title deeds.
        </p>
      </div>

      {/* Chronological Milestone Timeline Grid */}
      <div className="relative">
        {/* Horizontal Gold Line for Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-luxury-gold/20 via-luxury-gold to-luxury-gold/20 -translate-y-8 z-0 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
          {TITLE_MILESTONES.map((m, idx) => (
            <div
              key={m.year}
              onClick={() => setSelectedMilestone(m)}
              className="p-4 rounded-2xl bg-black/60 border border-luxury-gold/30 hover:border-luxury-gold hover:scale-[1.03] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Year Medallion */}
                <div className="w-10 h-10 rounded-full bg-luxury-emerald/50 border-2 border-luxury-gold flex items-center justify-center text-xs font-mono font-bold text-luxury-goldLight shadow-luxury-gold mb-3 group-hover:bg-gold-gradient group-hover:text-luxury-darker transition-colors">
                  {m.year}
                </div>

                <span className="text-[10px] font-mono text-emerald-400 block mb-1 font-bold">
                  ✓ {m.status}
                </span>

                <h4 className="text-xs font-serif font-bold text-white group-hover:text-luxury-gold transition-colors leading-tight mb-2">
                  {m.title}
                </h4>

                <p className="text-[11px] text-theme-muted line-clamp-2 leading-relaxed">
                  {m.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-luxury-gold/15 mt-3 flex items-center justify-between">
                <span className="text-[10px] font-mono text-luxury-goldLight">Inspect Deed</span>
                <ChevronRight className="w-3.5 h-3.5 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Deed Specimen Inspector Drawer */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl royal-obsidian-card p-6 sm:p-8 border-2 border-luxury-gold shadow-2xl leather-stitch-outline">
            <div className="brass-screw absolute top-3 left-3" />
            <div className="brass-screw absolute top-3 right-3" />
            <div className="brass-screw absolute bottom-3 left-3" />
            <div className="brass-screw absolute bottom-3 right-3" />

            <div className="flex items-center justify-between pb-4 border-b border-luxury-gold/30 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-luxury-emerald/40 border border-luxury-gold flex items-center justify-center text-luxury-gold font-mono font-bold">
                  {selectedMilestone.year}
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    {selectedMilestone.title}
                  </h3>
                  <p className="text-xs font-mono text-luxury-goldLight">
                    {selectedMilestone.authority}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMilestone(null)}
                className="p-1.5 rounded-full bg-black/50 text-luxury-gold hover:text-white border border-luxury-gold/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono mb-6">
              <div className="p-3.5 rounded-xl bg-black/50 border border-luxury-gold/20">
                <span className="text-[10px] uppercase text-theme-muted block mb-1">
                  Statutory Legal Instrument
                </span>
                <span className="text-luxury-ivory font-bold block">
                  {selectedMilestone.instrument}
                </span>
                <span className="text-emerald-400 text-[11px] block mt-0.5">
                  Statutory Rule: {selectedMilestone.legalProof}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-card border border-luxury-gold/20">
                <span className="text-[10px] uppercase text-theme-muted block mb-1">
                  Executive Legal Summary
                </span>
                <p className="text-theme-secondary font-light leading-relaxed font-sans text-xs">
                  {selectedMilestone.summary}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase text-luxury-goldLight font-bold block mb-2">
                  Forensic Examination Clauses & Certifications:
                </span>
                <ul className="space-y-1.5 font-sans text-xs text-theme-secondary font-light">
                  {selectedMilestone.clauses.map((clause, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{clause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-luxury-gold/20">
              <span className="text-[10px] font-mono text-theme-muted">
                Archival Record ID: RAJ-REV-{selectedMilestone.year}-SEC90A
              </span>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
              >
                Close Deed Specimen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
