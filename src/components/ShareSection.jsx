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
      // Trigger subtle confetti burst
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#06b6d4', '#6366f1'],
        });
      } catch (e) {
        // Ignore confetti if not supported
      }
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedMessage)}`;
  const telegramUrl = `https://t.me/share/url?url=&text=${encodeURIComponent(formattedMessage)}`;

  return (
    <div id="share-summary-section" className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
              5
            </span>
            House Chat Summary (WhatsApp / Telegram)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Formatted with clear breakdowns, ready to paste straight into your group chat
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20 active:scale-95'
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left column: Customizable payment info & note */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              Payment Details (Optional)
            </label>
            <textarea
              rows={3}
              value={paymentInfo}
              onChange={(e) => setPaymentInfo(e.target.value)}
              placeholder="e.g. DuitNow / TNG: 012-3456789 (Alex) | Maybank: 112233445566 (Due by 10th)"
              className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-slate-50/50 hover:bg-white transition-all font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Will be appended to the message so housemates know where to transfer.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              Additional Note (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Please send screenshot once transferred!"
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-slate-50/50 hover:bg-white transition-all"
            />
          </div>

          {/* Direct Send Links */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-500">Quick Launch Apps:</span>
            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open in WhatsApp</span>
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-sky-600" />
                <span>Open in Telegram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Formatted chat bubble preview */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 rounded-2xl p-4 text-slate-100 shadow-inner relative group border border-slate-800">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Message Preview
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer"
              >
                {copied ? 'Copied!' : 'Click to Copy'}
              </button>
            </div>

            <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-200 max-h-96 overflow-y-auto pr-2 selection:bg-emerald-600 selection:text-white">
              {formattedMessage}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
