import React from 'react';
import { Calendar, Flame, ShieldCheck, DollarSign, Droplets, Users, ArrowUpRight } from 'lucide-react';
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* 1. Base Cost per Person */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Base Cost / Pax
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(baseSharePerPerson, currency)}
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Fixed Overhead ({baseRatio}%)</span>
          <span className="font-semibold text-emerald-700">{formatCurrency(basePool, currency)} pool</span>
        </div>
      </div>

      {/* 2. Daily Variable Rate (RM/day) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Daily Variable Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-100/80 text-indigo-700 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(dailyVariableRate, currency)}
            <span className="text-xs font-semibold text-slate-400 ml-1">/day</span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Active Usage ({variableRatio}%)</span>
          <span className="font-semibold text-indigo-700">{formatCurrency(variablePool, currency)} pool</span>
        </div>
      </div>

      {/* 3. Total Person-Days */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Person-Days
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalPersonDays}
            <span className="text-xs font-semibold text-slate-400 ml-1.5">days</span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Housemates Stayed</span>
          <span className="font-semibold text-amber-700">{results.length} people</span>
        </div>
      </div>

      {/* 4. Grand Total Master */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Master Total Payable
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {formatCurrency(totalGrandPayable, currency)}
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
          <span>Elec: {formatCurrency(totalElecPayable, currency)}</span>
          {isWaterActive && (
            <span className="text-cyan-400 font-medium">
              + Water {formatCurrency(waterSharePerPerson * results.length, currency)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
