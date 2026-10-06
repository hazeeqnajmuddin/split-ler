import React from 'react';
import { Zap, Droplets, RotateCcw, HelpCircle, Sparkles, Share2 } from 'lucide-react';
import { CURRENCIES, PRESET_SCENARIOS } from '../constants';

export function Navbar({
  currency,
  setCurrency,
  onReset,
  onOpenWhyModal,
  onLoadScenario,
  onScrollToShare,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/20">
              <Zap className="w-5 h-5 fill-white stroke-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 bg-clip-text text-transparent">
                  split_ler
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  30/70 Hybrid
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Fair housemate utility bill calculator
              </p>
            </div>
          </div>

          {/* Actions & Currency */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency selector */}
            <div className="flex items-center">
              <label htmlFor="currency-select" className="sr-only">Currency</label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Presets Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-200 rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
                title="Load example scenario"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">Examples</span>
              </button>
              <div className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 hidden group-hover:block hover:block z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Test Scenarios
                </div>
                {PRESET_SCENARIOS.map((sc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onLoadScenario(sc)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 hover:text-emerald-700 flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="font-semibold">{sc.name}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{sc.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* "Why 30/70" Guide Modal Button */}
            <button
              type="button"
              onClick={onOpenWhyModal}
              className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-200 rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
              title="Learn how the 30/70 formula works"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Why 30/70?</span>
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={onReset}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Reset to default 4 housemates"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Quick Share Anchor */}
            <button
              type="button"
              onClick={onScrollToShare}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 py-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Copy Summary</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
