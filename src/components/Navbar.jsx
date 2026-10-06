import React, { useState, useRef, useEffect } from 'react';
import { Zap, RotateCcw, HelpCircle, Sparkles, Share2, ChevronDown } from 'lucide-react';
import { CURRENCIES, PRESET_SCENARIOS } from '../constants';

export function Navbar({
  currency,
  setCurrency,
  onReset,
  onOpenWhyModal,
  onLoadScenario,
  onScrollToShare,
}) {
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExamplesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white stroke-none" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 bg-clip-text text-transparent">
                  split_ler
                </span>
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shrink-0">
                  30/70
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block truncate">
                Fair housemate utility bill calculator
              </p>
            </div>
          </div>

          {/* Actions & Currency */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Currency selector */}
            <div className="flex items-center">
              <label htmlFor="currency-select" className="sr-only">Currency</label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 rounded-lg px-2 sm:px-2.5 py-1.5 transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer h-9"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Presets Dropdown (Mobile Touch-Friendly) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsExamplesOpen((prev) => !prev)}
                className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-200 rounded-lg px-2 sm:px-2.5 py-1.5 transition-colors cursor-pointer h-9"
                title="Load example scenario"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="hidden sm:inline">Examples</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isExamplesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isExamplesOpen && (
                <div className="absolute right-0 mt-1.5 w-64 max-w-[85vw] bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Demo Scenarios
                  </div>
                  {PRESET_SCENARIOS.map((sc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onLoadScenario(sc);
                        setIsExamplesOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 hover:text-emerald-700 flex flex-col gap-0.5 cursor-pointer active:bg-slate-100"
                    >
                      <span className="font-bold text-slate-800">{sc.name}</span>
                      <span className="text-[11px] text-slate-400 line-clamp-1">{sc.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* "Why 30/70" Guide Button */}
            <button
              type="button"
              onClick={onOpenWhyModal}
              className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-200 rounded-lg px-2 sm:px-2.5 py-1.5 transition-colors cursor-pointer h-9"
              title="Learn how 30/70 works"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden xs:inline sm:inline">Why 30/70?</span>
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer h-9 w-9 flex items-center justify-center shrink-0"
              title="Reset inputs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Desktop Quick Share Button */}
            <button
              type="button"
              onClick={onScrollToShare}
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 py-1.5 shadow-xs transition-colors cursor-pointer h-9"
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
