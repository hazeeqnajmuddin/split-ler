/**
 * Currency, text, and sharing formatters for split_ler
 */

export function formatCurrency(amount, currency = 'RM') {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  const formatted = num.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${currency} ${formatted}`;
}

export function formatNumber(val, decimals = 2) {
  const num = typeof val === 'number' ? val : parseFloat(val) || 0;
  return num.toLocaleString('en-MY', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Generate formatted WhatsApp / Telegram text message
 */
export function generateChatSummary({
  billingCycle = 'Current Month',
  daysInCycle = 30,
  currency = 'RM',
  electricityBill = 0,
  waterBill = 0,
  isWaterActive = false,
  waterSplitDivisor = 5,
  baseRatio = 30,
  calculationResult,
  paymentInfo = '',
  note = '',
}) {
  if (!calculationResult || !calculationResult.results) {
    return '';
  }

  const {
    basePool,
    variablePool,
    baseSharePerPerson,
    totalPersonDays,
    dailyVariableRate,
    waterSharePerPerson,
    results,
    totalElecPayable,
    totalGrandPayable,
    elecDiscrepancyBalanced,
  } = calculationResult;

  const varRatio = 100 - baseRatio;

  let text = `⚡ *SPLIT_LER • UTILITY BILL SUMMARY* ⚡\n`;
  text += `📅 *Billing Cycle:* ${billingCycle} (${daysInCycle} days)\n`;
  text += `────────────────────────────\n`;

  // Electricity Breakdown
  text += `💡 *Electricity Total:* ${formatCurrency(electricityBill, currency)}\n`;
  text += `   • Base Overhead (${baseRatio}%): ${formatCurrency(basePool, currency)} (${formatCurrency(baseSharePerPerson, currency)}/pax)\n`;
  text += `   • Active Usage (${varRatio}%): ${formatCurrency(variablePool, currency)} (${formatCurrency(dailyVariableRate, currency)}/day)\n`;
  text += `   • Total Person-Days: ${totalPersonDays} days\n`;

  // Water Breakdown
  if (isWaterActive && waterBill > 0) {
    text += `💧 *Water Total:* ${formatCurrency(waterBill, currency)} (Split ÷ ${waterSplitDivisor} = ${formatCurrency(waterSharePerPerson, currency)}/pax)\n`;
    const grandMaster = electricityBill + (waterSplitDivisor === results.length ? waterBill : (waterSharePerPerson * results.length));
    text += `💰 *Master Total Payable:* ${formatCurrency(totalGrandPayable, currency)}\n`;
  } else {
    text += `💰 *Master Total Payable:* ${formatCurrency(totalElecPayable, currency)}\n`;
  }

  text += `────────────────────────────\n`;
  text += `👥 *INDIVIDUAL BREAKDOWN:*\n\n`;

  results.forEach((r, idx) => {
    text += `${idx + 1}. *${r.name}* (${r.daysStayed} days stayed)\n`;
    text += `   • Electricity: ${formatCurrency(r.finalElecShare, currency)} (Base: ${formatCurrency(r.rawBaseShare, currency)} + Var: ${formatCurrency(r.rawVariableShare, currency)}${r.centAdjustment ? ` [${r.centAdjustment > 0 ? '+' : ''}${formatCurrency(r.centAdjustment, currency)}]` : ''})\n`;
    if (isWaterActive && waterBill > 0) {
      text += `   • Water: ${formatCurrency(r.waterShare, currency)}\n`;
    }
    text += `   👉 *TOTAL DUE: ${formatCurrency(r.finalTotal, currency)}*\n\n`;
  });

  text += `────────────────────────────\n`;
  text += `⚖️ *Methodology:* 30/70 Hybrid Model (Fixed standby overhead + active days)\n`;

  if (paymentInfo && paymentInfo.trim()) {
    text += `\n💳 *Payment Details:*\n${paymentInfo.trim()}\n`;
  }

  if (note && note.trim()) {
    text += `\n📝 *Note:*\n${note.trim()}\n`;
  }

  text += `\n_Generated via split_ler_`;

  return text;
}
