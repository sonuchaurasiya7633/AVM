import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { 
  Calculator, TrendingUp, DollarSign, PieChart, ShieldCheck, 
  ArrowRight, Sparkles, Percent, Calendar, Landmark, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AssetBenchmarkEngine } from '../components/AssetBenchmarkEngine';

export const WealthCalculator = () => {
  const [activeTab, setActiveTab] = useState('appreciation'); // 'appreciation' | 'stampDuty' | 'emi'

  // Tab 1: Compounding Land Appreciation Simulator
  const [initialInvestmentLakhs, setInitialInvestmentLakhs] = useState(35); // in Lakhs
  const [holdingYears, setHoldingYears] = useState(7);
  const [expectedCAGR, setExpectedCAGR] = useState(14); // % annual growth

  // Tab 2: Rajasthan Stamp Duty & Registry Expenses
  const [plotAreaGaj, setPlotAreaGaj] = useState(200);
  const [ratePerGaj, setRatePerGaj] = useState(28000);
  const [buyerGender, setBuyerGender] = useState('male'); // 'male' | 'female' | 'joint'

  // Tab 3: Plot Loan EMI Planner
  const [loanAmountLakhs, setLoanAmountLakhs] = useState(30);
  const [interestRate, setInterestRate] = useState(8.5); // %
  const [loanTenureYears, setLoanTenureYears] = useState(15);

  // Compounding calculation: A = P * (1 + r/100)^t
  const appreciationResults = useMemo(() => {
    const P = initialInvestmentLakhs * 100000;
    const r = expectedCAGR / 100;
    const t = holdingYears;
    const futureValue = P * Math.pow(1 + r, t);
    const wealthGain = futureValue - P;
    const multiple = (futureValue / P).toFixed(2);

    return {
      futureValue: Math.round(futureValue),
      wealthGain: Math.round(wealthGain),
      multiple,
    };
  }, [initialInvestmentLakhs, holdingYears, expectedCAGR]);

  // Stamp Duty Calculation (Rajasthan 2026 norms)
  const stampDutyResults = useMemo(() => {
    const plotValue = plotAreaGaj * ratePerGaj;
    // Male: 6%, Female: 5%, Joint: 5.5%
    const stampDutyRate = buyerGender === 'male' ? 0.06 : buyerGender === 'female' ? 0.05 : 0.055;
    const basicStampDuty = plotValue * stampDutyRate;
    const surcharge = basicStampDuty * 0.20; // 20% infrastructure & welfare surcharge
    const totalStampDuty = basicStampDuty + surcharge;
    const regFee = Math.min(plotValue * 0.01, 50000); // 1% registration fee (capped as per slab)
    const miscLegal = 15000; // e-challan, typing, advocate stamp duty affidavit
    const totalGovernmentOutlay = totalStampDuty + regFee + miscLegal;
    const totalAcquisitionCost = plotValue + totalGovernmentOutlay;

    return {
      plotValue,
      basicStampDuty: Math.round(basicStampDuty),
      surcharge: Math.round(surcharge),
      totalStampDuty: Math.round(totalStampDuty),
      regFee: Math.round(regFee),
      totalGovernmentOutlay: Math.round(totalGovernmentOutlay),
      totalAcquisitionCost: Math.round(totalAcquisitionCost),
      effectiveTaxPercent: ((totalGovernmentOutlay / plotValue) * 100).toFixed(2),
    };
  }, [plotAreaGaj, ratePerGaj, buyerGender]);

  // Loan EMI Calculation
  const emiResults = useMemo(() => {
    const principal = loanAmountLakhs * 100000;
    const monthlyRate = interestRate / (12 * 100);
    const months = loanTenureYears * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalRepayment = emi * months;
    const totalInterest = totalRepayment - principal;

    return {
      monthlyEMI: Math.round(emi),
      totalRepayment: Math.round(totalRepayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [loanAmountLakhs, interestRate, loanTenureYears]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <Calculator className="w-3.5 h-3.5" />
          <span>Institutional Financial Modeling</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          VIP Land Wealth & <br />
          <span className="text-gold-gradient italic">Financial Compounding Hub.</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          Simulate 5–15 year land value compounding across Jaipur highway corridors, compute statutory Rajasthan stamp duty & registration expenses, and calculate monthly bank loan amortisation.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
          onClick={() => setActiveTab('appreciation')}
          className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'appreciation'
              ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold'
              : 'bg-theme-surface border border-theme-gold/30 text-theme-secondary hover:text-luxury-gold'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Land Appreciation & ROI (CAGR)</span>
        </button>

        <button
          onClick={() => setActiveTab('stampDuty')}
          className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'stampDuty'
              ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold'
              : 'bg-theme-surface border border-theme-gold/30 text-theme-secondary hover:text-luxury-gold'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Rajasthan Stamp Duty & Registry Fees</span>
        </button>

        <button
          onClick={() => setActiveTab('emi')}
          className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'emi'
              ? 'bg-gold-gradient text-luxury-darker shadow-luxury-gold'
              : 'bg-theme-surface border border-theme-gold/30 text-theme-secondary hover:text-luxury-gold'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Bank Loan & EMI Outlay</span>
        </button>
      </div>

      {/* TAB 1: COMPOUNDING APPRECIATION SIMULATOR */}
      {activeTab === 'appreciation' && (
        <div className="leather-badge-container rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-7">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold">
                    Initial Plot Investment
                  </label>
                  <span className="font-mono font-bold text-lg text-theme-primary">
                    ₹{initialInvestmentLakhs} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="150"
                  step="1"
                  value={initialInvestmentLakhs}
                  onChange={(e) => setInitialInvestmentLakhs(Number(e.target.value))}
                  className="w-full accent-luxury-gold cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-theme-muted font-mono mt-1">
                  <span>₹15 L (Budget)</span>
                  <span>₹75 L (Prime Sector)</span>
                  <span>₹1.5 Cr (Commercial / Boulevard)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold">
                    Holding Horizon (Tenure)
                  </label>
                  <span className="font-mono font-bold text-lg text-theme-primary">
                    {holdingYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  step="1"
                  value={holdingYears}
                  onChange={(e) => setHoldingYears(Number(e.target.value))}
                  className="w-full accent-luxury-gold cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-theme-muted font-mono mt-1">
                  <span>3 Years</span>
                  <span>7 Years (Recommended)</span>
                  <span>15 Years (Generational)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold">
                    Projected Annual Appreciation Rate (CAGR)
                  </label>
                  <span className="font-mono font-bold text-lg text-emerald-400">
                    {expectedCAGR}% Per Annum
                  </span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="22"
                  step="0.5"
                  value={expectedCAGR}
                  onChange={(e) => setExpectedCAGR(Number(e.target.value))}
                  className="w-full accent-luxury-gold cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-theme-muted font-mono mt-1">
                  <span>8% (Conservative)</span>
                  <span>14% (Ajmer Rd / SEZ Trend)</span>
                  <span>22% (Ring Road Boom)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/20 text-xs text-theme-secondary font-light">
                <p>
                  * Projections benchmarked against actual 10-year circle rate escalations along Ajmer Road, Mahindra SEZ & 47-KM Ring Road corridors.
                </p>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-theme-card border border-theme-gold shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold block mb-1">
                  Projected Portfolio Valuation in {holdingYears} Years
                </span>
                <h3 className="text-3xl sm:text-5xl font-mono font-extrabold text-gold-gradient mb-6">
                  ₹{(appreciationResults.futureValue / 100000).toFixed(2)} Lakhs
                </h3>

                <div className="space-y-4 pt-4 border-t border-theme-gold/20 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-theme-muted">Initial Capital Invested:</span>
                    <span className="font-mono font-bold text-theme-primary">₹{initialInvestmentLakhs} Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-theme-muted">Net Wealth Creation (Gains):</span>
                    <span className="font-mono font-bold text-emerald-400">
                      +₹{(appreciationResults.wealthGain / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-theme-muted">Wealth Multiple:</span>
                    <span className="font-mono font-bold text-luxury-goldLight text-base">
                      {appreciationResults.multiple}x Investment Multiple
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-theme-gold/20 mt-8">
                <Link
                  to="/plots"
                  className="w-full py-4 rounded-2xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Inspect High-Appreciation Townships</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RAJASTHAN STAMP DUTY & REGISTRY CALCULATOR */}
      {activeTab === 'stampDuty' && (
        <div className="leather-badge-container rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Inputs */}
            <div className="lg:col-span-6 space-y-7">
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                  Plot Area in Gaj (Square Yards)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={plotAreaGaj}
                    onChange={(e) => setPlotAreaGaj(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-theme-primary font-mono text-base focus:outline-none focus:border-luxury-gold"
                  />
                  <span className="text-xs text-theme-muted font-mono whitespace-nowrap">
                    ≈ {(plotAreaGaj * 9).toFixed(0)} Sq.Ft
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                  Sanctioned Rate Per Gaj (₹)
                </label>
                <input
                  type="number"
                  value={ratePerGaj}
                  onChange={(e) => setRatePerGaj(Math.max(1000, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/40 text-theme-primary font-mono text-base focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold block mb-2">
                  Buyer Title Ownership Category (For Stamp Duty Concessions)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'male', label: 'Male Buyer (6%)' },
                    { id: 'female', label: 'Female Buyer (5%)' },
                    { id: 'joint', label: 'Joint / Co-Owner (5.5%)' }
                  ].map((gender) => (
                    <button
                      key={gender.id}
                      onClick={() => setBuyerGender(gender.id)}
                      className={`p-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                        buyerGender === gender.id
                          ? 'bg-gold-gradient text-luxury-darker border-transparent font-bold'
                          : 'bg-theme-card border-theme-gold/20 text-theme-secondary hover:border-theme-gold/40'
                      }`}
                    >
                      {gender.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/20 text-xs text-theme-secondary font-light">
                <p>
                  * Rajasthan Stamp Act 1998 mandates an additional 20% surcharge on stamp duty earmarked for infrastructure and cow conservation.
                </p>
              </div>
            </div>

            {/* Statutory Expense Breakdown */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-theme-card border border-theme-gold shadow-2xl">
              <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold block mb-1">
                Sub-Registrar Registry Outlay Estimate
              </span>
              <h3 className="text-2xl sm:text-3xl font-mono font-extrabold text-theme-primary mb-6">
                ₹{stampDutyResults.totalGovernmentOutlay.toLocaleString('en-IN')}
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-theme-gold/10">
                  <span className="text-theme-muted">Plot Agreement Consideration:</span>
                  <span className="font-mono font-bold text-theme-primary">
                    ₹{stampDutyResults.plotValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-theme-muted">Basic Stamp Duty ({buyerGender === 'male' ? '6%' : buyerGender === 'female' ? '5%' : '5.5%'}):</span>
                  <span className="font-mono text-theme-primary">
                    ₹{stampDutyResults.basicStampDuty.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-theme-muted">Statutory Surcharge (20% on duty):</span>
                  <span className="font-mono text-theme-primary">
                    ₹{stampDutyResults.surcharge.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-theme-muted">Registration Fee (1%):</span>
                  <span className="font-mono text-theme-primary">
                    ₹{stampDutyResults.regFee.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-theme-muted">e-Challan & Advocate Franking:</span>
                  <span className="font-mono text-theme-primary">₹15,000</span>
                </div>

                <div className="pt-4 border-t-2 border-theme-gold/30 flex justify-between items-center">
                  <span className="font-serif font-bold text-luxury-gold text-sm sm:text-base">
                    Total All-Inclusive Acquisition Cost:
                  </span>
                  <span className="font-mono font-extrabold text-luxury-goldLight text-lg sm:text-xl">
                    ₹{stampDutyResults.totalAcquisitionCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/registry-process"
                  className="w-full py-3.5 rounded-2xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Landmark className="w-4 h-4" />
                  <span>View Full 5-Step Registry Workflow</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PLOT LOAN EMI PLANNER */}
      {activeTab === 'emi' && (
        <div className="leather-badge-container rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Inputs */}
            <div className="lg:col-span-6 space-y-7">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold">
                    Target Bank Loan Amount
                  </label>
                  <span className="font-mono font-bold text-lg text-theme-primary">
                    ₹{loanAmountLakhs} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={loanAmountLakhs}
                  onChange={(e) => setLoanAmountLakhs(Number(e.target.value))}
                  className="w-full accent-luxury-gold cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold">
                    Annual Bank Interest Rate
                  </label>
                  <span className="font-mono font-bold text-lg text-theme-primary">
                    {interestRate}% P.A.
                  </span>
                </div>
                <input
                  type="range"
                  min="7.5"
                  max="12.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-luxury-gold cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-luxury-gold">
                    Loan Tenure
                  </label>
                  <span className="font-mono font-bold text-lg text-theme-primary">
                    {loanTenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full accent-luxury-gold cursor-pointer"
                />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-theme-card border border-theme-gold shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold block mb-1">
                  Estimated Monthly EMI
                </span>
                <h3 className="text-3xl sm:text-5xl font-mono font-extrabold text-gold-gradient mb-6">
                  ₹{emiResults.monthlyEMI.toLocaleString('en-IN')}
                </h3>

                <div className="space-y-4 pt-4 border-t border-theme-gold/20 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-theme-muted">Principal Borrowed:</span>
                    <span className="font-mono font-bold text-theme-primary">₹{loanAmountLakhs} Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-theme-muted">Total Interest Payable:</span>
                    <span className="font-mono font-bold text-amber-400">
                      ₹{(emiResults.totalInterest / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-theme-muted">Total Amount Repaid:</span>
                    <span className="font-mono font-bold text-luxury-goldLight">
                      ₹{(emiResults.totalRepayment / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-theme-gold/20 mt-8">
                <Link
                  to="/contact"
                  className="w-full py-4 rounded-2xl bg-gold-gradient text-luxury-darker font-bold text-xs uppercase tracking-wider shadow-luxury-gold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Landmark className="w-4 h-4" />
                  <span>Check Nationalized Bank Loan Eligibility</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10-Year Multi-Asset Benchmark Engine & JDA Freehold Calculator */}
      <AssetBenchmarkEngine />
    </div>
  );
};
