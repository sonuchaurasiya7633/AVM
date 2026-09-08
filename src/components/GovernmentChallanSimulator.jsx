import React, { useState, useMemo } from 'react';
import { Landmark, Stamp, CheckCircle2, FileText, Download, ShieldCheck, Calculator, ArrowRight, Printer } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

export const GovernmentChallanSimulator = () => {
  const { formatPrice } = useCurrency();
  const { t, isHindi } = useLanguage();

  const [plotValueLakhs, setPlotValueLakhs] = useState(35); // ₹35 Lakhs default
  const [buyerType, setBuyerType] = useState('male'); // 'male' | 'female' | 'joint'
  const [isChallanModalOpen, setIsChallanModalOpen] = useState(false);

  // Rajasthan Stamp Act & Registration Rules 2026 calculations
  const challanData = useMemo(() => {
    const rawPlotVal = plotValueLakhs * 100000;
    
    // Male: 6%, Female: 5%, Joint: 5.5%
    const stampRate = buyerType === 'male' ? 0.06 : buyerType === 'female' ? 0.05 : 0.055;
    const baseStampDuty = rawPlotVal * stampRate;
    
    // 20% Surcharge for Infrastructure Development & Gaushala Protection
    const surcharge = baseStampDuty * 0.20;
    const totalStampDuty = baseStampDuty + surcharge;

    // 1% Registration Fee (capped as per state slab)
    const regFee = Math.min(rawPlotVal * 0.01, 50000);
    const csiCharges = 1500; // Computer scanning & CSI charges
    const advocateAffidavitFee = 3500;

    const grandTotalChallan = totalStampDuty + regFee + csiCharges + advocateAffidavitFee;

    return {
      rawPlotVal,
      stampRatePct: (stampRate * 100).toFixed(1),
      baseStampDuty,
      surcharge,
      totalStampDuty,
      regFee,
      csiCharges,
      advocateAffidavitFee,
      grandTotalChallan,
      grnNumber: `RJ-EGRASS-${Date.now().toString().slice(-8)}`,
      challanDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };
  }, [plotValueLakhs, buyerType]);

  return (
    <div className="royal-obsidian-card rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
      {/* 4 Corner Brass Screws */}
      <div className="brass-screw absolute top-3.5 left-3.5" />
      <div className="brass-screw absolute top-3.5 right-3.5" />
      <div className="brass-screw absolute bottom-3.5 left-3.5" />
      <div className="brass-screw absolute bottom-3.5 right-3.5" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-luxury-gold/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-luxury-emerald/30 text-luxury-goldLight border border-luxury-gold/40 mb-3">
            <Landmark className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Official Rajasthan e-Grass / e-Panjiyan Utility</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white leading-tight">
            Government Stamp Duty & e-Challan Simulator
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary font-light mt-1">
            Compute statutory e-Grass treasury stamp duties, 20% infrastructure surcharges, and Sub-Registrar biometric registration fees in real time.
          </p>
        </div>

        {/* Gender Rebate Selector */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-luxury-gold/30">
          {[
            { id: 'male', label: 'Male Buyer (6%)' },
            { id: 'female', label: 'Female Buyer (5%)' },
            { id: 'joint', label: 'Joint Co-owner (5.5%)' }
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setBuyerType(b.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                buyerType === b.id
                  ? 'bg-gold-gradient text-luxury-darker shadow-md'
                  : 'text-luxury-ivory hover:text-luxury-gold'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Controls vs Specimen Challan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left: Input Parameters */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-5 rounded-2xl bg-black/40 border border-luxury-gold/25">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-theme-muted">
                Target Registry Agreement Value
              </span>
              <span className="text-base font-serif font-bold text-luxury-gold font-tabular">
                {formatPrice(challanData.rawPlotVal)}
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="150"
              step="5"
              value={plotValueLakhs}
              onChange={(e) => setPlotValueLakhs(parseInt(e.target.value))}
              className="w-full h-2 bg-luxury-emerald/40 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex justify-between text-[10px] font-mono text-theme-muted mt-2">
              <span>₹15 Lakhs (Suburban Enclave)</span>
              <span>₹35 Lakhs (Aura Sovereign)</span>
              <span>₹1.50 Cr (Arterial Commercial)</span>
            </div>
          </div>

          {/* Statutory Fee Breakdown Cards */}
          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-theme-card border border-luxury-gold/20 flex items-center justify-between">
              <div>
                <span className="text-white block font-bold">Basic Stamp Duty ({challanData.stampRatePct}%)</span>
                <span className="text-[10px] text-theme-muted">Schedule 1-B Rajasthan Stamp Act</span>
              </div>
              <span className="text-luxury-goldLight font-bold font-tabular">
                {formatPrice(challanData.baseStampDuty)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-theme-card border border-luxury-gold/20 flex items-center justify-between">
              <div>
                <span className="text-white block font-bold">Statutory Surcharge (20%)</span>
                <span className="text-[10px] text-theme-muted">Infrastructure & Gaushala Conservation</span>
              </div>
              <span className="text-amber-400 font-bold font-tabular">
                +{formatPrice(challanData.surcharge)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-theme-card border border-luxury-gold/20 flex items-center justify-between">
              <div>
                <span className="text-white block font-bold">Sub-Registrar Registration Fee (1%)</span>
                <span className="text-[10px] text-theme-muted">Official ceiling-capped processing</span>
              </div>
              <span className="text-luxury-ivory font-bold font-tabular">
                +{formatPrice(challanData.regFee)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-theme-card border border-luxury-gold/20 flex items-center justify-between">
              <div>
                <span className="text-white block font-bold">CSI Computer & Biometric Token Fee</span>
                <span className="text-[10px] text-theme-muted">e-Panjiyan digital scanning charge</span>
              </div>
              <span className="text-luxury-ivory font-bold font-tabular">
                +{formatPrice(challanData.csiCharges)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Official e-Grass Government Challan Specimen */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="p-6 rounded-2xl bg-white text-gray-900 border-2 border-luxury-gold shadow-2xl relative font-mono text-xs">
            {/* Government Emblem Header */}
            <div className="text-center pb-3 border-b-2 border-gray-900 mb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-600 block">
                GOVERNMENT OF RAJASTHAN • FINANCE DEPARTMENT
              </span>
              <h4 className="text-sm font-serif font-black uppercase text-gray-900 mt-0.5">
                e-GRASS TREASURY CHALLAN SPECIMEN
              </h4>
              <span className="text-[10px] text-gray-500 block">
                Office of the Sub-Registrar (Registration & Stamps Directorate)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
              <div>
                <span className="text-gray-500 block text-[9px] uppercase">GRN (Challan ID)</span>
                <span className="font-bold text-gray-900">{challanData.grnNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-500 block text-[9px] uppercase">Transaction Date</span>
                <span className="font-bold text-gray-900">{challanData.challanDate}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] py-2 border-t border-b border-gray-300 mb-3">
              <div className="flex justify-between">
                <span>Major Head: 0030 (Stamps & Reg.)</span>
                <span className="font-bold">{formatPrice(challanData.totalStampDuty)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sub-Registrar Reg. Fee (1%):</span>
                <span className="font-bold">{formatPrice(challanData.regFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>CSI / Scanning & Token:</span>
                <span className="font-bold">{formatPrice(challanData.csiCharges)}</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="font-bold uppercase text-xs">Net Treasury Payable:</span>
              <span className="text-xl font-serif font-black text-emerald-800 font-tabular">
                {formatPrice(challanData.grandTotalChallan)}
              </span>
            </div>

            {/* Barcode representation */}
            <div className="mt-4 pt-3 border-t border-gray-300 text-center">
              <div className="h-6 w-3/4 mx-auto bg-[repeating-linear-gradient(90deg,#111,#111_2px,#fff_2px,#fff_4px)] mb-1" />
              <span className="text-[9px] tracking-widest text-gray-500 font-mono">
                *RJ-{challanData.grnNumber}*
              </span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official e-Challan Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

