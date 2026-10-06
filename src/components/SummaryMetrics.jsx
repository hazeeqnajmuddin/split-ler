import React from 'react';
import { Calendar, Flame, ShieldCheck, DollarSign, Droplets } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';

export function SummaryMetrics({
  currency,
  electricityBill,
  waterBill,
  isWaterActive,
  calculationResult,
  baseRatio,
}) {
  const {
    basePool = 0,
    variablePool = 0,
    baseSharePerPerson = 0,
    totalPersonDays = 0,
    dailyVariableRate = 0,
    waterSharePerPerson = 0,
    totalElecPayable = 0,
    totalGrandPayable = 0,
    results = [],
  } = calculationResult || {};

  const variableRatio = 100 - baseRatio;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {/* 1. Base Cost per Person */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Base / Pax
            </span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight truncate">
            {formatCurrency(baseSharePerPerson, currency)}
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="truncate">Fixed ({baseRatio}%)</span>
          <span className="font-bold text-emerald-700 shrink-0 ml-1">{formatCurrency(basePool, currency)}</span>
        </div>
      </div>

      {/* 2. Daily Variable Rate (RM/day) */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Variable Rate
            </span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-indigo-100/80 text-indigo-700 flex items-center justify-center">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight truncate">
            {formatCurrency(dailyVariableRate, currency)}
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 ml-0.5">/d</span>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="truncate">Active ({variableRatio}%)</span>
          <span className="font-bold text-indigo-700 shrink-0 ml-1">{formatCurrency(variablePool, currency)}</span>
        </div>
      </div>

      {/* 3. Total Person-Days */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Person-Days
            </span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            {totalPersonDays}
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 ml-1">days</span>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Housemates</span>
          <span className="font-bold text-amber-700">{results.length} pax</span>
        </div>
      </div>

      {/* 4. Grand Total Master */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-3.5 sm:p-5 shadow-md flex flex-col justify-between relative overflow-hidden group">
        <div>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
              Total Payable
            </span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight truncate">
            {formatCurrency(totalGrandPayable, currency)}
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300">
          <span className="truncate">Elec {formatCurrency(totalElecPayable, currency)}</span>
          {isWaterActive && (
            <span className="text-cyan-400 font-bold shrink-0 ml-1">
              +Water {formatCurrency(waterSharePerPerson * results.length, currency)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
