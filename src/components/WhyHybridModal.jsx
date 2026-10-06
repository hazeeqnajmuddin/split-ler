import React from 'react';
import { X, ShieldCheck, Flame, Scale, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export function WhyHybridModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Why the 30/70 Hybrid Model?
            </h3>
            <p className="text-xs text-slate-500">
              The fairest, dispute-free utility splitting formula for shared housing
            </p>
          </div>
        </div>

        <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80">
              <div className="flex items-center gap-1.5 font-bold text-rose-800 text-xs mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Problem with 100% Equal Split
              </div>
              <p className="text-xs text-rose-900/80">
                If someone goes home for 3 weeks, they still pay for everyone else's 16°C overnight air-conditioning. Causes resentment.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 text-xs mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Problem with 100% Days Split
              </div>
              <p className="text-xs text-amber-900/80">
                If someone is away the whole month, they pay RM 0. Yet their food was running in the fridge, router Wi-Fi was on, and base meter charges accrued.
              </p>
            </div>
          </div>

          {/* Solution: 30/70 Hybrid */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
            <div className="flex items-center gap-2 font-extrabold text-emerald-950 text-sm mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              The Solution: 30/70 Hybrid Split
            </div>
            <ul className="space-y-2 text-xs text-emerald-900">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Fixed Base Overhead (30%):</strong> Refrigerator, Wi-Fi router, water heater standby, and TNB/meter base charges operate 24/7 regardless of who is physically in the house. This is split strictly equally.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Variable Active Consumption (70%):</strong> Air conditioning, personal lighting, fans, laptops, and cooking scale with daily presence. Each person pays according to their recorded person-days.
                </span>
              </li>
            </ul>
          </div>

          {/* Cent Balancing */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1.5">
              Exact Penny Balancing Rule
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              When dividing cents among 4 housemates, rounding can cause a ±RM 0.01 discrepancy.
              <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[11px] text-slate-800">split_ler</code> automatically attributes any 1-cent difference to the highest payer so the sum of individual shares precisely equals the master bill down to the last cent.
            </p>
          </div>

          {/* Close button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Got it, let's calculate!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
