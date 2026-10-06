import React from 'react';
import { Zap, Droplets, Calendar, Plus, Minus, Check, ChevronRight } from 'lucide-react';
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
  const quickAddElec = (amount) => {
    const current = parseFloat(electricityBill) || 0;
    setElectricityBill(Math.max(0, current + amount).toFixed(2));
  };

  const handleMonthChange = (e) => {
    const val = e.target.value;
    setBillingCycle(val);

    if (val) {
      const [yearStr, monthStr] = val.split('-');
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10);
      const days = new Date(year, month, 0).getDate();
      setDaysInCycle(days);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0">
              1
            </span>
            Utility Bill Inputs
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter master bills and select cycle
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Electricity Bill Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Electricity Bill
            </label>
            <span className="text-[11px] text-slate-400">Master Meter</span>
          </div>

          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <span className="text-slate-500 font-bold text-base">{currency}</span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              inputMode="decimal"
              value={electricityBill}
              onChange={(e) => setElectricityBill(e.target.value)}
              placeholder="0.00"
              className="block w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 text-slate-900 font-extrabold text-lg sm:text-xl placeholder:text-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden transition-all bg-slate-50/50 hover:bg-white"
            />
          </div>

          {/* Quick Increment Buttons (Touch-friendly on mobile) */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span className="text-[11px] text-slate-400 font-medium">Quick add:</span>
            {[+10, +50, +100].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => quickAddElec(amt)}
                className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer active:scale-95 touch-manipulation"
              >
                +{amt}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setElectricityBill('300.00')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 ml-auto py-1 px-1 underline cursor-pointer active:text-emerald-700"
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
              Billing Cycle
            </label>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {daysInCycle} Days
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="month"
                value={billingCycle}
                onChange={handleMonthChange}
                className="w-full rounded-xl border border-slate-300 py-2.5 px-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-slate-50/50 hover:bg-white transition-all cursor-pointer min-h-[42px]"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="31"
                inputMode="numeric"
                value={daysInCycle}
                onChange={(e) => setDaysInCycle(Math.max(1, Math.min(31, parseInt(e.target.value, 10) || 30)))}
                className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm font-bold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-slate-50/50 hover:bg-white min-h-[42px]"
                placeholder="Days"
              />
              <span className="pointer-events-none absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                days
              </span>
            </div>
          </div>

          <div className="pt-0.5">
            <button
              type="button"
              onClick={onApplyCycleDaysToAll}
              className="w-full sm:w-auto text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl border border-indigo-200/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 touch-manipulation"
              title={`Set all ${numHousemates} housemates to ${daysInCycle} days`}
            >
              <span>Sync {daysInCycle} days to all housemates</span>
            </button>
          </div>
        </div>
      </div>

      {/* Optional Water Bill Section */}
      <div className="border border-slate-200/90 rounded-2xl bg-slate-50/60 p-3.5 sm:p-4 transition-all">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5 fill-cyan-500/20" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">Optional Water Split</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 shrink-0">
                  Equal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                Divides flat water bill (default: ÷ 5)
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer shrink-0 touch-manipulation">
            <input
              type="checkbox"
              checked={isWaterActive}
              onChange={(e) => setIsWaterActive(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>

        {/* Water Bill Expanded Options */}
        {isWaterActive && (
          <div className="mt-3.5 pt-3.5 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-150">
            {/* Water Bill Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Total Water Amount
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-slate-500 font-bold text-xs">{currency}</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  inputMode="decimal"
                  value={waterBill}
                  onChange={(e) => setWaterBill(e.target.value)}
                  placeholder="0.00"
                  className="block w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 font-bold text-sm sm:text-base focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-hidden bg-white"
                />
              </div>
            </div>

            {/* Divisor Selector (Default 5) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Split Divisor</span>
                <span className="text-[10px] text-cyan-700 font-semibold">Default: ÷5</span>
              </label>
              <div className="flex items-center gap-1.5">
                {[5, 4].map((div) => (
                  <button
                    key={div}
                    type="button"
                    onClick={() => setWaterSplitDivisor(div)}
                    className={`flex-1 py-2 px-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer active:scale-95 touch-manipulation min-h-[40px] ${
                      waterSplitDivisor === div
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    ÷{div} {div === 5 ? '(Default)' : `(${numHousemates}pax)`}
                  </button>
                ))}
                <div className="w-14">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    inputMode="numeric"
                    value={waterSplitDivisor}
                    onChange={(e) => setWaterSplitDivisor(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    title="Custom shares"
                    className="w-full py-2 px-1 text-center text-xs font-extrabold rounded-xl border border-slate-300 bg-white min-h-[40px]"
                  />
                </div>
              </div>
            </div>

            {/* Combine with Electricity Option */}
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2.5 cursor-pointer bg-white px-3 py-2.5 rounded-xl border border-slate-300 hover:border-cyan-400 transition-colors touch-manipulation min-h-[40px]">
                <input
                  type="checkbox"
                  checked={combineWater}
                  onChange={(e) => setCombineWater(e.target.checked)}
                  className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-700">
                  Combine with Electricity in Total
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
