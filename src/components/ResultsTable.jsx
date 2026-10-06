import React from 'react';
import { Table, CheckCircle2, AlertCircle, Info, Sparkles, Scale, Droplets, Zap } from 'lucide-react';
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
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
              4
            </span>
            Final Settlement Results
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Individual shares balanced to the exact last cent against master bill
          </p>
        </div>

        {/* Cent-balancing status badge */}
        <div className="flex items-center gap-2">
          {isExactElecMatch ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Balanced to Master Bill
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              Calculating...
            </span>
          )}
        </div>
      </div>

      {/* Visual Percentage Distribution Bar */}
      {totalGrandPayable > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500 font-semibold">
            <span>Bill Distribution Proportions</span>
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
                  style={{ width: `${Math.max(2, pct)}%` }}
                  title={`${r.name}: ${pct.toFixed(1)}% (${formatCurrency(r.finalTotal, currency)})`}
                  className={`${color} transition-all duration-300 relative group`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600">
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

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Housemate</th>
              <th className="py-3 px-3 text-center">Days Stayed</th>
              <th className="py-3 px-3 text-right">
                Base Share ({baseRatio}%)
              </th>
              <th className="py-3 px-3 text-right">
                Variable Share ({100 - baseRatio}%)
              </th>
              {isWaterActive && (
                <th className="py-3 px-3 text-right">
                  Water (÷{waterSplitDivisor})
                </th>
              )}
              <th className="py-3 px-4 text-right font-black text-slate-800">
                Total Payable
              </th>
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
                  {/* Name */}
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

                  {/* Days */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-xs bg-slate-100 text-slate-700">
                      {r.daysStayed} days
                    </span>
                  </td>

                  {/* Base Share */}
                  <td className="py-3.5 px-3 text-right font-medium text-slate-600">
                    {formatCurrency(r.rawBaseShare, currency)}
                  </td>

                  {/* Variable Share */}
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

                  {/* Water Share */}
                  {isWaterActive && (
                    <td className="py-3.5 px-3 text-right font-medium text-cyan-700">
                      {formatCurrency(r.waterShare, currency)}
                    </td>
                  )}

                  {/* Total Payable */}
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-xl font-extrabold text-base bg-emerald-100/90 text-emerald-900 shadow-2xs">
                      {formatCurrency(r.finalTotal, currency)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Master Total Footer */}
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
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Cent-Discrepancy Guarantee:</strong> If the 2-decimal rounded shares sum to ±0.01 vs the master bill, the exact cent is automatically balanced against the highest payer ({results.find(r => r.id === highestPayerId)?.name || 'highest payer'}) so the sum matches the exact master bill.
          </span>
        </div>
        <div className="shrink-0 font-bold text-emerald-700">
          Match: {formatCurrency(totalElecPayable, currency)} / {formatCurrency(parsedElecBill, currency)}
        </div>
      </div>
    </div>
  );
}
