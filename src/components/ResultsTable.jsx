import React, { useState } from 'react';
import { Table, CheckCircle2, AlertCircle, Info, Sparkles, Scale, Droplets, Zap, LayoutGrid, List } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';

export function ResultsTable({
  calculationResult,
  currency,
  electricityBill,
  waterBill,
  isWaterActive,
  combineWater,
  waterSplitDivisor,
  baseRatio,
}) {
  const [viewMode, setViewMode] = useState('auto'); // 'auto', 'cards', 'table'

  if (!calculationResult || !calculationResult.results) {
    return null;
  }

  const {
    results,
    totalElecPayable,
    totalWaterPayableForHousemates,
    totalGrandPayable,
    elecDiscrepancyBalanced,
    highestPayerId,
    baseSharePerPerson,
  } = calculationResult;

  const parsedElecBill = parseFloat(electricityBill) || 0;
  const isExactElecMatch = Math.abs(totalElecPayable - parsedElecBill) < 0.009;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 sm:pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0">
              4
            </span>
            Final Settlement Results
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Balanced to the exact last cent against master bill
          </p>
        </div>

        {/* Badges & View Switcher */}
        <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
          {/* Exact Match Status Badge */}
          {isExactElecMatch && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Exact Cent Match</span>
            </span>
          )}

          {/* Mobile view toggle (Cards vs Table) */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 sm:hidden">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all ${
                viewMode === 'cards' || viewMode === 'auto'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-500'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-500'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Visual Percentage Distribution Bar */}
      {totalGrandPayable > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500 font-semibold">
            <span>Bill Proportions</span>
            <span>Total: {formatCurrency(totalGrandPayable, currency)}</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
            {results.map((r, i) => {
              const pct = totalGrandPayable > 0 ? (r.finalTotal / totalGrandPayable) * 100 : 0;
              const bgColors = [
                'bg-emerald-500',
                'bg-sky-500',
                'bg-violet-500',
                'bg-amber-500',
                'bg-rose-500',
                'bg-teal-500',
              ];
              const color = bgColors[i % bgColors.length];
              return (
                <div
                  key={r.id}
                  style={{ width: `${Math.max(3, pct)}%` }}
                  title={`${r.name}: ${pct.toFixed(1)}% (${formatCurrency(r.finalTotal, currency)})`}
                  className={`${color} transition-all duration-300`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-[11px] text-slate-600">
            {results.map((r, i) => {
              const pct = totalGrandPayable > 0 ? (r.finalTotal / totalGrandPayable) * 100 : 0;
              const bgColors = [
                'bg-emerald-500',
                'bg-sky-500',
                'bg-violet-500',
                'bg-amber-500',
                'bg-rose-500',
                'bg-teal-500',
              ];
              const color = bgColors[i % bgColors.length];
              return (
                <div key={r.id} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="font-semibold text-slate-800">{r.name}:</span>
                  <span className="text-slate-500">{pct.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MOBILE CARD VIEW: Rendered on mobile screens (< md) unless user selected 'table' */}
      <div className={`space-y-3 ${viewMode === 'table' ? 'hidden' : 'block md:hidden'}`}>
        {results.map((r) => {
          const isHighest = r.id === highestPayerId && results.length > 1;
          const hasPennyAdjustment = Math.abs(r.centAdjustment) > 0.001;

          return (
            <div
              key={r.id}
              className={`rounded-2xl border p-4 transition-all ${
                isHighest
                  ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {/* Header: Name + Avatar + Total Payable */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-black text-slate-700 shrink-0">
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-base text-slate-900 truncate">
                      {r.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span>{r.daysStayed} days stayed</span>
                      {isHighest && (
                        <>
                          <span>•</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded">
                            Highest Payer
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Payable:</div>
                  <div className="text-lg font-black text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-xl shadow-2xs">
                    {formatCurrency(r.finalTotal, currency)}
                  </div>
                </div>
              </div>

              {/* Sub-breakdown 2x2 grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    Fixed Base ({baseRatio}%)
                  </span>
                  <span className="font-extrabold text-slate-700 text-sm">
                    {formatCurrency(r.rawBaseShare, currency)}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    Variable Usage ({100 - baseRatio}%)
                  </span>
                  <span className="font-extrabold text-slate-700 text-sm">
                    {formatCurrency(r.rawVariableShare, currency)}
                  </span>
                  {hasPennyAdjustment && (
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      ({r.centAdjustment > 0 ? '+' : ''}{formatCurrency(r.centAdjustment, currency)} balanced)
                    </span>
                  )}
                </div>

                {isWaterActive && (
                  <div className="col-span-2 p-2 rounded-xl bg-cyan-50/60 border border-cyan-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-cyan-800">
                      Water Share (÷{waterSplitDivisor}):
                    </span>
                    <span className="font-extrabold text-cyan-900 text-sm">
                      {formatCurrency(r.waterShare, currency)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Mobile Master Total Card */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-md">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Master Settlement Total
            </div>
            <div className="text-xs text-slate-300">
              {results.reduce((s, r) => s + r.daysStayed, 0)} total person-days
            </div>
          </div>
          <div className="text-xl font-black text-emerald-400">
            {formatCurrency(totalGrandPayable, currency)}
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE VIEW (or when forced via toggle) */}
      <div className={`overflow-x-auto rounded-xl border border-slate-200 ${viewMode === 'cards' ? 'hidden' : 'hidden md:block'}`}>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Housemate</th>
              <th className="py-3 px-3 text-center">Days Stayed</th>
              <th className="py-3 px-3 text-right">Base Share ({baseRatio}%)</th>
              <th className="py-3 px-3 text-right">Variable Share ({100 - baseRatio}%)</th>
              {isWaterActive && (
                <th className="py-3 px-3 text-right">Water (÷{waterSplitDivisor})</th>
              )}
              <th className="py-3 px-4 text-right font-black text-slate-800">Total Payable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((r) => {
              const isHighest = r.id === highestPayerId && results.length > 1;
              const hasPennyAdjustment = Math.abs(r.centAdjustment) > 0.001;

              return (
                <tr
                  key={r.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isHighest ? 'bg-emerald-50/15' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-700">
                      {r.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span>{r.name}</span>
                      {isHighest && (
                        <span className="ml-2 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded">
                          Highest Payer
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-xs bg-slate-100 text-slate-700">
                      {r.daysStayed} days
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-medium text-slate-600">
                    {formatCurrency(r.rawBaseShare, currency)}
                  </td>

                  <td className="py-3.5 px-3 text-right font-medium text-slate-600">
                    <div className="flex flex-col items-end">
                      <span>{formatCurrency(r.rawVariableShare, currency)}</span>
                      {hasPennyAdjustment && (
                        <span
                          className="text-[10px] text-emerald-700 font-semibold"
                          title="1-cent rounding adjustment applied to match master bill"
                        >
                          ({r.centAdjustment > 0 ? `+${currency} ` : `-${currency} `}
                          {Math.abs(r.centAdjustment).toFixed(2)} balancing)
                        </span>
                      )}
                    </div>
                  </td>

                  {isWaterActive && (
                    <td className="py-3.5 px-3 text-right font-medium text-cyan-700">
                      {formatCurrency(r.waterShare, currency)}
                    </td>
                  )}

                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-xl font-extrabold text-base bg-emerald-100/90 text-emerald-900 shadow-2xs">
                      {formatCurrency(r.finalTotal, currency)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot className="bg-slate-50/90 font-bold border-t-2 border-slate-200 text-slate-800">
            <tr>
              <td className="py-3.5 px-4">Master Total</td>
              <td className="py-3.5 px-3 text-center font-bold text-slate-700">
                {results.reduce((s, r) => s + r.daysStayed, 0)} days
              </td>
              <td className="py-3.5 px-3 text-right text-slate-600">
                {formatCurrency(calculationResult.basePool, currency)}
              </td>
              <td className="py-3.5 px-3 text-right text-slate-600">
                {formatCurrency(calculationResult.variablePool, currency)}
              </td>
              {isWaterActive && (
                <td className="py-3.5 px-3 text-right text-cyan-800">
                  {formatCurrency(totalWaterPayableForHousemates, currency)}
                </td>
              )}
              <td className="py-3.5 px-4 text-right font-black text-lg text-emerald-900">
                {formatCurrency(totalGrandPayable, currency)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Discrepancy & Verification Notice */}
      <div className="bg-slate-50 rounded-xl p-3 sm:p-3.5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Cent Discrepancy Guarantee:</strong> Any ±RM 0.01 discrepancy is balanced to the highest payer ({results.find(r => r.id === highestPayerId)?.name || 'highest payer'}).
          </span>
        </div>
        <div className="shrink-0 font-bold text-emerald-700">
          Matched: {formatCurrency(totalElecPayable, currency)} / {formatCurrency(parsedElecBill, currency)}
        </div>
      </div>
    </div>
  );
}
