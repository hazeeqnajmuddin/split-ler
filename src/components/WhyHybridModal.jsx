import React from 'react';
import { X, ShieldCheck, Flame, Scale, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export function WhyHybridModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-7 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer active:scale-95 touch-manipulation"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3.5 pr-8">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              Why the 30/70 Hybrid Model?
            </h3>
            <p className="text-xs text-slate-500">
              The fairest utility split for housemates
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/80">
              <div className="flex items-center gap-1.5 font-bold text-rose-800 text-xs mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                Problem with 100% Equal Split
              </div>
              <p className="text-xs text-rose-900/80">
                A housemate away for 3 weeks still subsidizes others' 16°C overnight air-conditioning. Causes resentment.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 text-xs mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Problem with 100% Days Split
              </div>
              <p className="text-xs text-amber-900/80">
                A housemate away pays RM 0, yet their groceries stayed cold in the fridge, Wi-Fi stayed powered, and base meter fees accrued.
              </p>
            </div>
          </div>

          {/* Solution: 30/70 Hybrid */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
            <div className="flex items-center gap-2 font-black text-emerald-950 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              The Solution: 30/70 Hybrid Formula
            </div>
            <ul className="space-y-2 text-xs text-emerald-900">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Fixed Overhead (30%):</strong> Refrigerator, Wi-Fi router, water heater standby, and base meter charges run 24/7. Split equally among everyone.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Active Usage (70%):</strong> Air conditioning, fans, cooking, and room lighting scale with presence. Calculated by recorded person-days.
                </span>
              </li>
            </ul>
          </div>

          {/* Cent Balancing */}
          <div className="border-t border-slate-200 pt-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">
              Zero Penny Discrepancy Rule
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Rounding shares to 2 decimals can cause a ±RM 0.01 gap.
              <code className="mx-1 px-1 py-0.5 rounded bg-slate-100 font-mono text-[11px] text-slate-800">split_ler</code> automatically balances this exact cent against the highest payer so the group chat summary perfectly matches the TNB/utility bill.
            </p>
          </div>

          {/* Close button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors cursor-pointer active:scale-98 touch-manipulation min-h-[44px]"
            >
              Got it, let's calculate!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
