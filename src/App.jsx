import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { SummaryMetrics } from './components/SummaryMetrics';
import { BillInputs } from './components/BillInputs';
import { ModelConfig } from './components/ModelConfig';
import { HousematesList } from './components/HousematesList';
import { ResultsTable } from './components/ResultsTable';
import { ShareSection } from './components/ShareSection';
import { WhyHybridModal } from './components/WhyHybridModal';
import { DEFAULT_HOUSEMATES } from './constants';
import { calculateBillSplit } from './utils/calculator';
import { formatCurrency } from './utils/formatters';
import { Zap, HelpCircle, Share2, ArrowDown } from 'lucide-react';

const STORAGE_KEY = 'split_ler_app_state_v1';

export default function App() {
  const today = new Date();
  const defaultYearMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const defaultDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const [currency, setCurrency] = useState('RM');
  const [electricityBill, setElectricityBill] = useState('300.00');
  const [waterBill, setWaterBill] = useState('35.00');
  const [isWaterActive, setIsWaterActive] = useState(true);
  const [waterSplitDivisor, setWaterSplitDivisor] = useState(5);
  const [combineWater, setCombineWater] = useState(true);
  const [baseRatio, setBaseRatio] = useState(30);
  const [billingCycle, setBillingCycle] = useState(defaultYearMonth);
  const [daysInCycle, setDaysInCycle] = useState(defaultDays);
  const [housemates, setHousemates] = useState(DEFAULT_HOUSEMATES);
  const [paymentInfo, setPaymentInfo] = useState('');
  const [note, setNote] = useState('');
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);

  // Restore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currency) setCurrency(parsed.currency);
        if (parsed.electricityBill !== undefined) setElectricityBill(parsed.electricityBill);
        if (parsed.waterBill !== undefined) setWaterBill(parsed.waterBill);
        if (parsed.isWaterActive !== undefined) setIsWaterActive(parsed.isWaterActive);
        if (parsed.waterSplitDivisor !== undefined) setWaterSplitDivisor(parsed.waterSplitDivisor);
        if (parsed.combineWater !== undefined) setCombineWater(parsed.combineWater);
        if (parsed.baseRatio !== undefined) setBaseRatio(parsed.baseRatio);
        if (parsed.housemates && Array.isArray(parsed.housemates) && parsed.housemates.length > 0) {
          setHousemates(parsed.housemates);
        }
        if (parsed.paymentInfo !== undefined) setPaymentInfo(parsed.paymentInfo);
      }
    } catch (e) {
      console.warn('Failed to load saved state', e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      const toSave = {
        currency,
        electricityBill,
        waterBill,
        isWaterActive,
        waterSplitDivisor,
        combineWater,
        baseRatio,
        housemates,
        paymentInfo,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Failed to persist state', e);
    }
  }, [currency, electricityBill, waterBill, isWaterActive, waterSplitDivisor, combineWater, baseRatio, housemates, paymentInfo]);

  // Core Calculation Result
  const calculationResult = useMemo(() => {
    return calculateBillSplit({
      electricityBill,
      baseRatio,
      housemates,
      waterBill,
      isWaterActive,
      waterSplitDivisor,
      combineWater,
    });
  }, [electricityBill, baseRatio, housemates, waterBill, isWaterActive, waterSplitDivisor, combineWater]);

  const handleApplyCycleDaysToAll = () => {
    setHousemates((prev) =>
      prev.map((h) => ({ ...h, daysStayed: daysInCycle }))
    );
  };

  const handleReset = () => {
    if (confirm('Reset calculator to default 4 housemates and standard settings?')) {
      setCurrency('RM');
      setElectricityBill('300.00');
      setWaterBill('35.00');
      setIsWaterActive(true);
      setWaterSplitDivisor(5);
      setCombineWater(true);
      setBaseRatio(30);
      setDaysInCycle(defaultDays);
      setHousemates(DEFAULT_HOUSEMATES);
      setNote('');
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }
  };

  const handleLoadScenario = (scenario) => {
    if (scenario.elec !== undefined) setElectricityBill(String(scenario.elec));
    if (scenario.water !== undefined) setWaterBill(String(scenario.water));
    if (scenario.waterActive !== undefined) setIsWaterActive(scenario.waterActive);
    if (scenario.waterDivisor !== undefined) setWaterSplitDivisor(scenario.waterDivisor);
    if (scenario.baseRatio !== undefined) setBaseRatio(scenario.baseRatio);
    if (scenario.days && Array.isArray(scenario.days)) {
      setHousemates((prev) =>
        prev.map((h, idx) => ({
          ...h,
          daysStayed: scenario.days[idx] !== undefined ? scenario.days[idx] : h.daysStayed,
        }))
      );
    }
  };

  const scrollToShare = () => {
    const el = document.getElementById('share-summary-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formattedCycleName = useMemo(() => {
    if (!billingCycle) return 'Current Billing Period';
    const [year, month] = billingCycle.split('-');
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [billingCycle]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 sm:pb-16 flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      {/* Sticky Navbar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onReset={handleReset}
        onOpenWhyModal={() => setIsWhyModalOpen(true)}
        onLoadScenario={handleLoadScenario}
        onScrollToShare={scrollToShare}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 space-y-4 sm:space-y-6 flex-1 w-full">
        {/* Hero Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-4 sm:p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Fair Utility Splitting
              </span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">
                {formattedCycleName} ({daysInCycle}d)
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
              30/70 Hybrid Utility Bill Splitter
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              30% fixed overhead (fridge, router, base fee) split equally, and 70% active usage split by stay days. Zero cent discrepancy.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsWhyModalOpen(true)}
            className="relative z-10 shrink-0 self-start sm:self-center px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-xs active:scale-95 touch-manipulation"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>How it works</span>
          </button>
        </div>

        {/* 4 Summary Cards */}
        <SummaryMetrics
          currency={currency}
          electricityBill={electricityBill}
          waterBill={waterBill}
          isWaterActive={isWaterActive}
          calculationResult={calculationResult}
          baseRatio={baseRatio}
        />

        {/* Inputs: Bill Inputs & Model Config */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-6">
            <BillInputs
              currency={currency}
              electricityBill={electricityBill}
              setElectricityBill={setElectricityBill}
              waterBill={waterBill}
              setWaterBill={setWaterBill}
              isWaterActive={isWaterActive}
              setIsWaterActive={setIsWaterActive}
              waterSplitDivisor={waterSplitDivisor}
              setWaterSplitDivisor={setWaterSplitDivisor}
              combineWater={combineWater}
              setCombineWater={setCombineWater}
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
              daysInCycle={daysInCycle}
              setDaysInCycle={setDaysInCycle}
              onApplyCycleDaysToAll={handleApplyCycleDaysToAll}
              numHousemates={housemates.length}
            />
          </div>

          <div className="lg:col-span-6">
            <ModelConfig
              baseRatio={baseRatio}
              setBaseRatio={setBaseRatio}
              currency={currency}
              electricityBill={electricityBill}
              numHousemates={housemates.length}
              calculationResult={calculationResult}
            />
          </div>
        </div>

        {/* Housemates List */}
        <HousematesList
          housemates={housemates}
          setHousemates={setHousemates}
          daysInCycle={daysInCycle}
          currency={currency}
          calculationResult={calculationResult}
        />

        {/* Final Results Table / Cards */}
        <ResultsTable
          calculationResult={calculationResult}
          currency={currency}
          electricityBill={electricityBill}
          waterBill={waterBill}
          isWaterActive={isWaterActive}
          combineWater={combineWater}
          waterSplitDivisor={waterSplitDivisor}
          baseRatio={baseRatio}
        />

        {/* WhatsApp & Telegram Summary Sharing */}
        <ShareSection
          billingCycle={formattedCycleName}
          daysInCycle={daysInCycle}
          currency={currency}
          electricityBill={parseFloat(electricityBill) || 0}
          waterBill={parseFloat(waterBill) || 0}
          isWaterActive={isWaterActive}
          waterSplitDivisor={waterSplitDivisor}
          baseRatio={baseRatio}
          calculationResult={calculationResult}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
          note={note}
          setNote={setNote}
        />
      </main>

      {/* Footer */}
      <footer className="mt-10 sm:mt-12 border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>split_ler</span>
            <span className="text-slate-400 font-normal">• 30/70 Hybrid Model</span>
          </div>
          <div>
            Tailored for housemates • Mobile friendly • Zero cent discrepancies
          </div>
        </div>
      </footer>

      {/* Floating Bottom Quick-Action Bar for Mobile Screens */}
      <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-lg">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Master Total:</div>
            <div className="text-base font-black text-slate-900">
              {formatCurrency(calculationResult?.totalGrandPayable || 0, currency)}
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 active:scale-95 touch-manipulation cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Summary</span>
          </button>
        </div>
      </div>

      {/* Educational Guide Modal */}
      <WhyHybridModal
        isOpen={isWhyModalOpen}
        onClose={() => setIsWhyModalOpen(false)}
      />
    </div>
  );
}
