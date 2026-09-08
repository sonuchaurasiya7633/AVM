import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { 
  FileCheck2, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, 
  Layers, Landmark, FileText, Check, Download, Eye, Stamp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GovernmentChallanSimulator } from '../components/GovernmentChallanSimulator';

const REGISTRY_STAGES = [
  {
    step: '01',
    title: 'Revenue Record & 30-Year Title Search',
    badge: 'Stage 1 • Revenue Audit',
    leadTime: '3–5 Working Days',
    authority: 'Tehsil & Sub-Registrar Record Room',
    summary: 'Before token agreement, the 30-year lineage of the agricultural Khasra is scrutinized via official Jamabandi (RoR) and Girdawari records to verify complete unencumbered ownership.',
    keyChecks: [
      'Verification of Khatedari rights on Apna Khata portal (Jamabandi नकल)',
      'Confirming absence of SC/ST land ceiling restrictions under Section 42 of Rajasthan Tenancy Act',
      'No pending litigation or bank mortgage lien registered with CERSAI registry',
      'Tahsildar Girdawari harvest inspection to verify non-disputed boundary possession'
    ],
    statutoryDocument: 'Jamabandi RoR & 30-Year Non-Encumbrance Certificate (NEC)'
  },
  {
    step: '02',
    title: 'Statutory Section 90-A Agricultural Conversion',
    badge: 'Stage 2 • Land Use Conversion',
    leadTime: '45–60 Working Days',
    authority: 'SDO / JDA Competent Conversion Officer',
    summary: 'Under Section 90-A of Rajasthan Land Revenue Act 1956, raw agricultural land is officially surrendered to JDA or the Municipal Corporation for conversion into an urban residential/commercial plotted layout.',
    keyChecks: [
      'Formal 90-A surrender order published in the Rajasthan Government Gazette',
      'Payment of prescribed Land Conversion Premiums (LCP) to the state exchequer',
      'No-Objection Certificates from Forest, Irrigation, Pollution Control, and Airport Authorities',
      'Surrender of masterplan arterial road reserves (60ft / 80ft / 100ft) without state compensation'
    ],
    statutoryDocument: 'Sanctioned Section 90-A Order & Conversion Challan'
  },
  {
    step: '03',
    title: 'JDA Master Layout Sanction & RERA Escrow',
    badge: 'Stage 3 • Blueprint Sanction',
    leadTime: '30 Working Days',
    authority: 'Jaipur Development Authority (BPC) & RERA',
    summary: 'The layout blueprint is scrutinized by the Building Plan Committee (BPC). Plots, internal 30ft/40ft/60ft bitumen roads, open green parks, community facility zones, and transformer substations are frozen into the master ledger.',
    keyChecks: [
      'Sanctioned JDA Layout Map bearing official seal and BPC resolution number',
      'Reservation of mandatory 5% Facility Area & 5% Parks/Greenery dedicated to public',
      'Registration with RERA Rajasthan with unique RERA Project Registration Number',
      '70% buyer funds locked in statutory RERA Escrow Account dedicated for site execution'
    ],
    statutoryDocument: 'Approved JDA Layout Plan & RERA Registration Certificate'
  },
  {
    step: '04',
    title: 'Sub-Registrar Sale Deed & e-Grass Stamp Payment',
    badge: 'Stage 4 • Registry Execution',
    leadTime: '1 Working Day (By Appointment)',
    authority: 'Office of the Sub-Registrar (Jaipur)',
    summary: 'The formal conveyance/sale deed is presented before the Sub-Registrar. Both buyer and seller execute the deed in presence of two verified witnesses, biometric fingerprints, and government treasury e-Grass stamp duty challans.',
    keyChecks: [
      'e-Grass Treasury Challan payment for 6% (Male) or 5% (Female) Stamp Duty + 1% Reg Fee',
      '20% Surcharge payment on stamp duty for infrastructure and cow conservation funds',
      'High-resolution biometric thumb scanning & live webcam photo capture of all parties',
      'Verification of original JDA Lease Deed (Patta) chain and power of attorney validity'
    ],
    statutoryDocument: 'Executed Registered Sale Deed (पंजीकृत विक्रय विलेख)'
  },
  {
    step: '05',
    title: 'Mutation (Dakhil Kharij) & JDA Patta Transfer',
    badge: 'Stage 5 • Municipal Title Transfer',
    leadTime: '15–21 Working Days',
    authority: 'JDA Citizen Service Centre (CSC) / Municipal Zone',
    summary: 'The final critical milestone: recording the new owner’s name in the JDA and Tehsil municipal mutation ledger (दाखिल खारिज). This formalizes complete municipal tax liability and future resale/building permission rights.',
    keyChecks: [
      'Application submission on JDA e-Mitra citizen portal with registered deed copy',
      'Public notice period (15 days) inviting any municipal objections',
      'Issuance of official JDA Name Transfer Order / Sub-division Patta',
      'Updating online property tax and electricity meter records to buyer’s name'
    ],
    statutoryDocument: 'Official JDA Mutation Order & Updated Name Patta'
  }
];

const STATUTORY_CHECKLIST = [
  { id: 'c1', label: 'Section 90-A Conversion Order published in State Gazette', mandatory: true },
  { id: 'c2', label: 'Sanctioned JDA Layout Map with BPC seal and plot demarcation', mandatory: true },
  { id: 'c3', label: 'Active RERA Rajasthan Registration Number & Escrow Account', mandatory: true },
  { id: 'c4', label: '30-Year Non-Encumbrance Certificate (NEC) from Sub-Registrar', mandatory: true },
  { id: 'c5', label: 'Physical site boundary pillared with verified asphalt road width', mandatory: true },
  { id: 'c6', label: 'NOC from Airport Authority & High-Tension Transmission clearance', mandatory: false },
  { id: 'c7', label: 'Nationalized Bank Project Approval (SBI / HDFC / ICICI)', mandatory: true },
  { id: 'c8', label: 'Direct approach road minimum 30-feet wide connected to public sector road', mandatory: true }
];

export const RegistryProcess = () => {
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

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <Landmark className="w-3.5 h-3.5" />
          <span>Statutory Land Acquisition Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          The 5-Phase Rajasthan <br />
          <span className="text-gold-gradient italic">90-A & Registry Roadmap.</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          From agricultural revenue search to the final JDA Mutation (Dakhil Kharij). Understand the exact legal milestones required to secure 100% indisputable plotted land ownership in Jaipur.
        </p>
      </div>

      {/* Interactive 5 Stages Step Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {REGISTRY_STAGES.map((s, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? 'bg-theme-surface border-luxury-gold shadow-luxury-gold'
                  : 'bg-theme-card border-theme-gold/20 hover:border-theme-gold/50 opacity-85'
              }`}
            >
              <span className={`text-2xl font-mono font-extrabold block mb-1 ${isActive ? 'text-luxury-gold' : 'text-theme-muted'}`}>
                {s.step}
              </span>
              <p className={`text-xs font-serif font-bold line-clamp-2 ${isActive ? 'text-theme-primary' : 'text-theme-secondary'}`}>
                {s.title}
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
              {currentStage.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-theme-primary">
              {currentStage.title}
            </h2>
            <p className="text-xs sm:text-sm text-theme-muted mt-1">
              Statutory Authority: <span className="text-luxury-gold font-semibold">{currentStage.authority}</span> • Typical Lead Time: <span className="text-theme-primary font-mono">{currentStage.leadTime}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((p) => p - 1)}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-theme-gold/40 text-theme-secondary disabled:opacity-30 hover:border-luxury-gold"
            >
              Previous
            </button>
            <button
              disabled={activeStep === REGISTRY_STAGES.length - 1}
              onClick={() => setActiveStep((p) => p + 1)}
              className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-sm disabled:opacity-30 hover:scale-105 transition-all"
            >
              Next Milestone
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Description & Action Checklist */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
              {currentStage.summary}
            </p>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-gold mb-3 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-luxury-gold" />
                Statutory Mandatory Checks for This Stage:
              </h3>
              <div className="space-y-2.5">
                {currentStage.keyChecks.map((check, idx) => (
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
                Certified Legal Deliverable
              </span>
              <div className="p-4 rounded-xl bg-luxury-emerald/20 border border-theme-gold/40 mb-4">
                <FileText className="w-8 h-8 text-luxury-gold mb-2" />
                <h4 className="text-sm font-serif font-bold text-theme-primary leading-tight">
                  {currentStage.statutoryDocument}
                </h4>
              </div>
              <p className="text-xs text-theme-secondary font-light leading-relaxed">
                Ensure original certified copies of this document are in your possession before advancing to subsequent payment tranches.
              </p>
            </div>

            <div className="pt-6 border-t border-theme-gold/20 mt-6">
              <Link
                to="/contact"
                className="w-full py-3 rounded-xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <span>Request Title Verification</span>
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
              <span>Self-Audit Checklist</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-primary">
              Pre-Token Statutory Document Checklist
            </h2>
            <p className="text-xs sm:text-sm text-theme-secondary font-light">
              Tick off the certified papers you have physically inspected before transferring earnest token money.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/40 text-center min-w-[140px]">
            <span className="text-2xl font-mono font-extrabold text-luxury-gold block">
              {progressPercent}%
            </span>
            <span className="text-[10px] uppercase font-bold text-theme-muted">
              {checkedCount} of {STATUTORY_CHECKLIST.length} Verified
            </span>
          </div>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {STATUTORY_CHECKLIST.map((item) => {
            const isChecked = !!checkedItems[item.id];
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
                    {item.label}
                  </p>
                  {item.mandatory && (
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-400 mt-1 inline-block">
                      * Mandatory Statutory Requirement
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
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
        }`}>
          {progressPercent >= 80 ? (
            <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
          )}
          <div>
            <h4 className="text-sm font-bold">
              {progressPercent >= 80
                ? 'High Statutory Readiness: Safe to Proceed with Advance Token Draft'
                : 'Caution: Essential Statutory Clearances Missing'}
            </h4>
            <p className="text-xs font-light opacity-90 mt-0.5">
              {progressPercent >= 80
                ? 'Ensure your advocate drafts an explicit indemnity clause in the agreement to sell referencing the verified Section 90-A gazette notification number.'
                : 'Do not transfer token funds until the developer provides the gazette 90-A order and approved JDA layout map. Connect with our coordinators for guidance.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
