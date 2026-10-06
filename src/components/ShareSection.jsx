import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Send, CreditCard, Sparkles, CheckCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateChatSummary } from '../utils/formatters';

export function ShareSection({
  billingCycle,
  daysInCycle,
  currency,
  electricityBill,
  waterBill,
  isWaterActive,
  waterSplitDivisor,
  baseRatio,
  calculationResult,
  paymentInfo,
  setPaymentInfo,
  note,
  setNote,
}) {
  const [copied, setCopied] = useState(false);

  const formattedMessage = generateChatSummary({
    billingCycle,
    daysInCycle,
    currency,
    electricityBill,
    waterBill,
    isWaterActive,
    waterSplitDivisor,
    baseRatio,
    calculationResult,
    paymentInfo,
    note,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#06b6d4', '#6366f1'],
        });
      } catch (e) {}
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedMessage)}`;
  const telegramUrl = `https://t.me/share/url?url=&text=${encodeURIComponent(formattedMessage)}`;

  return (
    <div id="share-summary-section" className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 sm:pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0">
              5
            </span>
            House Chat Summary
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ready to paste straight into your WhatsApp / Telegram house group
          </p>
        </div>

        {/* Copy Button (Full width on mobile) */}
        <div className="w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer shadow-sm active:scale-95 touch-manipulation min-h-[44px] ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
            }`}
          >
            {copied ? (
              <>
                <CheckCheck className="w-4 h-4 stroke-[2.5]" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Summary Message</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Left column: Customizable payment info & note */}
        <div className="lg:col-span-5 space-y-3.5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              Payment Details (Optional)
            </label>
            <textarea
              rows={3}
              value={paymentInfo}
              onChange={(e) => setPaymentInfo(e.target.value)}
              placeholder="e.g. DuitNow / TNG: 012-3456789 (Alex) | Maybank: 112233445566 (Due by 10th)"
              className="w-full rounded-xl border border-slate-300 p-3 text-base sm:text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-slate-50/50 hover:bg-white transition-all font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Appended to message so housemates know where to transfer.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              Additional Note (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Please send screenshot once transferred!"
              className="w-full rounded-xl border border-slate-300 p-2.5 text-base sm:text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-slate-50/50 hover:bg-white transition-all min-h-[42px]"
            />
          </div>

          {/* Direct Send Mobile Buttons */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-600">Quick Launch Chat Apps:</span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-extrabold transition-colors cursor-pointer active:scale-95 touch-manipulation min-h-[44px]"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-extrabold transition-colors cursor-pointer active:scale-95 touch-manipulation min-h-[44px]"
              >
                <Send className="w-3.5 h-3.5 text-sky-600" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Formatted chat bubble preview */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 rounded-2xl p-3.5 sm:p-4 text-slate-100 shadow-inner relative group border border-slate-800">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Chat Preview
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer active:scale-95 touch-manipulation py-1 px-1"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-200 max-h-80 sm:max-h-96 overflow-y-auto pr-1 selection:bg-emerald-600 selection:text-white">
              {formattedMessage}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
