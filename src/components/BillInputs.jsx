import React, { useState } from 'react';
import { Zap, Droplets, Calendar, Plus, Minus, Check, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function BillInputs({
  currency,
  electricityBill,
  setElectricityBill,
  waterBill,
  setWaterBill,
  isWaterActive,
  setIsWaterActive,
  waterSplitDivisor,
  setWaterSplitDivisor,
  combineWater,
  setCombineWater,
  billingCycle,
  setBillingCycle,
  daysInCycle,
  setDaysInCycle,
  onApplyCycleDaysToAll,
  numHousemates = 4,
}) {
  const [showWaterDetails, setShowWaterDetails] = useState(false);

  // Quick increments for electricity
  const quickAddElec = (amount) => {
    const current = parseFloat(electricityBill) || 0;
    setElectricityBill(Math.max(0, current + amount).toFixed(2));
  };

  const handleMonthChange = (e) => {
    const val = e.target.value; // e.g. "2026-10"
    setBillingCycle(val);

    if (val) {
      const [yearStr, monthStr] = val.split('-');
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10);
      // Days in that month: new Date(year, month, 0).getDate()
      const days = new Date(year, month, 0).getDate();
      setDaysInCycle(days);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
              1
            </span>
            Utility Bill Inputs
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter master bill amounts and select your billing period
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Electricity Bill Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Total Electricity Bill
            </label>
            <span className="text-[11px] text-slate-400">Master Meter</span>
          </div>

          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <span className="text-slate-500 font-bold text-sm sm:text-base">{currency}</span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              value={electricityBill}
              onChange={(e) => setElectricityBill(e.target.value)}
              placeholder="0.00"
              className="block w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 text-slate-900 font-extrabold text-lg sm:text-xl placeholder:text-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden transition-all bg-slate-50/50 hover:bg-white"
            />
          </div>

          {/* Quick Increment Buttons */}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-400 font-medium">Quick add:</span>
            {[+10, +50, +100].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => quickAddElec(amt)}
                className="text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-2 py-0.5 rounded-md border border-slate-200 transition-colors cursor-pointer"
              >
                +{amt}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setElectricityBill('300.00')}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 ml-auto underline cursor-pointer"
            >
              Demo: 300
            </button>
          </div>
        </div>

        {/* Billing Cycle / Month Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              Billing Cycle / Month
            </label>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {daysInCycle} Days Total
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="month"
                value={billingCycle}
                onChange={handleMonthChange}
                className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-slate-50/50 hover:bg-white transition-all cursor-pointer"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="31"
                value={daysInCycle}
                onChange={(e) => setDaysInCycle(Math.max(1, Math.min(31, parseInt(e.target.value, 10) || 30)))}
                className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-slate-50/50 hover:bg-white"
                placeholder="Days"
              />
              <span className="pointer-events-none absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                days in mo.
              </span>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={onApplyCycleDaysToAll}
              className="text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 px-2.5 py-1 rounded-md border border-indigo-200/60 transition-colors flex items-center gap-1 cursor-pointer"
              title={`Set all ${numHousemates} housemates to ${daysInCycle} days`}
            >
              <span>Apply {daysInCycle} days to all housemates</span>
            </button>
          </div>
        </div>
      </div>

      {/* Optional Water Bill Section */}
      <div className="border border-slate-200/90 rounded-xl bg-slate-50/50 p-4 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5 fill-cyan-500/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Optional Flat Water Split</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-100/70 text-cyan-800">
                  Equal Share
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Divides flat water bill equally by {waterSplitDivisor} by default
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isWaterActive}
                onChange={(e) => setIsWaterActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              <span className="ml-2 text-xs font-semibold text-slate-700">
                {isWaterActive ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>
        </div>

        {/* Water Bill Expanded Options */}
        {isWaterActive && (
          <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
            {/* Water Bill Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Total Water Bill Amount
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-slate-500 font-bold text-xs">{currency}</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={waterBill}
                  onChange={(e) => setWaterBill(e.target.value)}
                  placeholder="0.00"
                  className="block w-full rounded-xl border border-slate-300 py-2 pl-10 pr-3 text-slate-900 font-bold text-sm focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-hidden bg-white"
                />
              </div>
            </div>

            {/* Divisor Selector (Default 5) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Split Divisor</span>
                <span className="text-[11px] text-cyan-700 font-medium">Default: 5 shares</span>
              </label>
              <div className="flex items-center gap-1.5">
                {[5, 4].map((div) => (
                  <button
                    key={div}
                    type="button"
                    onClick={() => setWaterSplitDivisor(div)}
                    className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      waterSplitDivisor === div
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    ÷ {div} {div === 5 ? '(Default)' : `(${numHousemates} pax)`}
                  </button>
                ))}
                <div className="w-16">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={waterSplitDivisor}
                    onChange={(e) => setWaterSplitDivisor(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    title="Custom number of shares"
                    className="w-full py-2 px-2 text-center text-xs font-bold rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Combine with Electricity Option */}
            <div className="flex flex-col justify-center">
              <label className="text-xs font-bold text-slate-700 mb-1.5">
                Total Presentation
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-300 hover:border-cyan-400 transition-colors">
                <input
                  type="checkbox"
                  checked={combineWater}
                  onChange={(e) => setCombineWater(e.target.checked)}
                  className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Combine Electricity + Water into One Total
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
