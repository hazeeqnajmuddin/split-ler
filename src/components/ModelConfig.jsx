import React from 'react';
import { Sliders, ShieldCheck, Flame, Info, Check } from 'lucide-react';
import { RATIO_PRESETS } from '../constants';
import { formatCurrency } from '../utils/formatters';

export function ModelConfig({
  baseRatio,
  setBaseRatio,
  currency,
  electricityBill,
  numHousemates,
  calculationResult,
}) {
  const variableRatio = 100 - baseRatio;
  const { basePool = 0, variablePool = 0, baseSharePerPerson = 0, dailyVariableRate = 0 } = calculationResult || {};

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
              2
            </span>
            Hybrid Split Model Ratio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure the balance between 24/7 fixed standby overhead and active stay days
          </p>
        </div>

        {/* Current Ratio Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-2 text-xs font-extrabold text-slate-800">
            <span className="text-emerald-700">{baseRatio}% Base</span>
            <span className="text-slate-300">/</span>
            <span className="text-indigo-700">{variableRatio}% Variable</span>
          </div>
        </div>
      </div>

      {/* Interactive Dual Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            Fixed Base Pool: {baseRatio}% ({formatCurrency(basePool, currency)})
          </span>
          <span className="flex items-center gap-1.5 text-indigo-700">
            <Flame className="w-4 h-4" />
            Variable Active Pool: {variableRatio}% ({formatCurrency(variablePool, currency)})
          </span>
        </div>

        {/* Visual Progress Bar / Slider Container */}
        <div className="relative pt-1">
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={baseRatio}
            onChange={(e) => setBaseRatio(parseInt(e.target.value, 10))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-hidden"
          />
          {/* Tick marks */}
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1 mt-1">
            <span>0% (Pure Days)</span>
            <span>20%</span>
            <span className="font-bold text-emerald-700">30% (Default)</span>
            <span>50%</span>
            <span>70%</span>
            <span>100% (Pure Flat)</span>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
        {RATIO_PRESETS.map((preset) => {
          const isSelected = baseRatio === preset.base;
          return (
            <button
              key={preset.base}
              type="button"
              onClick={() => setBaseRatio(preset.base)}
              className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                  {preset.base} / {preset.variable}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
              </div>
              <div className="text-[10px] font-semibold text-slate-500 mt-0.5 truncate">
                {preset.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* Appliance & Logic Explainer Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Fixed Overhead Pool ({baseRatio}%)
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Covers 24/7 background usage: <strong>Refrigerator</strong>, <strong>Wi-Fi router</strong>, <strong>water heater standby</strong>, and meter base charge.
            Split equally across all {numHousemates} housemates (<strong>{formatCurrency(baseSharePerPerson, currency)} / pax</strong>) regardless of days away.
          </p>
        </div>

        <div className="bg-indigo-50/60 border border-indigo-200/60 rounded-xl p-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
            <Flame className="w-3.5 h-3.5 text-indigo-700" />
            Active Consumption Pool ({variableRatio}%)
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Covers individual consumption: <strong>Air conditioning</strong>, personal room lighting, laptops, fans, and cooking.
            Calculated as <strong>{formatCurrency(dailyVariableRate, currency)} / person-day</strong> based on actual days stayed.
          </p>
        </div>
      </div>
    </div>
  );
}
