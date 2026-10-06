/**
 * 30/70 Hybrid Model Calculation Engine for split_ler
 */

export function calculateBillSplit({
  electricityBill = 0,
  baseRatio = 30, // in percent, e.g. 30
  housemates = [],
  waterBill = 0,
  isWaterActive = false,
  waterSplitDivisor = 5,
  combineWater = true,
}) {
  const numHousemates = housemates.length || 1;
  const parsedElecBill = Math.max(0, parseFloat(electricityBill) || 0);
  const parsedWaterBill = isWaterActive ? Math.max(0, parseFloat(waterBill) || 0) : 0;
  const parsedBaseRatio = Math.min(100, Math.max(0, parseFloat(baseRatio) || 0));
  const variableRatio = 100 - parsedBaseRatio;

  // 1. Fixed Base Overhead Pool & Share
  const basePool = (parsedElecBill * parsedBaseRatio) / 100;
  const rawBaseSharePerPerson = numHousemates > 0 ? basePool / numHousemates : 0;

  // 2. Variable Active Consumption Pool & Person-Days
  const variablePool = (parsedElecBill * variableRatio) / 100;
  const totalPersonDays = housemates.reduce((sum, h) => sum + (Math.max(0, parseInt(h.daysStayed, 10)) || 0), 0);

  const dailyVariableRate = totalPersonDays > 0 ? variablePool / totalPersonDays : 0;

  // 3. Water Split
  const waterDivisor = Math.max(1, parseInt(waterSplitDivisor, 10) || 5);
  const rawWaterSharePerPerson = isWaterActive ? parsedWaterBill / waterDivisor : 0;
  const roundedWaterSharePerPerson = Math.round(rawWaterSharePerPerson * 100) / 100;

  // 4. Calculate raw & rounded electricity shares for each person
  let highestIdx = 0;
  let maxShare = -Infinity;

  const preliminaryResults = housemates.map((h, index) => {
    const days = Math.max(0, parseInt(h.daysStayed, 10)) || 0;
    const rawVariableShare = totalPersonDays > 0 
      ? days * dailyVariableRate 
      : (variablePool / numHousemates); // Fallback: if all 0 days, split variable equally

    const rawElecShare = rawBaseSharePerPerson + rawVariableShare;
    const roundedElecShare = Math.round(rawElecShare * 100) / 100;

    if (rawElecShare > maxShare) {
      maxShare = rawElecShare;
      highestIdx = index;
    }

    return {
      id: h.id,
      name: h.name || `Housemate ${index + 1}`,
      daysStayed: days,
      rawBaseShare: rawBaseSharePerPerson,
      rawVariableShare,
      rawElecShare,
      roundedElecShare,
      centAdjustment: 0,
      finalElecShare: roundedElecShare,
      waterShare: roundedWaterSharePerPerson,
      finalTotal: 0,
    };
  });

  // 5. Penny balancing against the highest electricity payer
  const sumPreliminaryElec = preliminaryResults.reduce((acc, curr) => acc + curr.roundedElecShare, 0);
  const elecDiscrepancy = Math.round((parsedElecBill - sumPreliminaryElec) * 100) / 100;

  if (Math.abs(elecDiscrepancy) > 0.0001 && preliminaryResults.length > 0) {
    preliminaryResults[highestIdx].centAdjustment = elecDiscrepancy;
    preliminaryResults[highestIdx].finalElecShare = Math.round((preliminaryResults[highestIdx].roundedElecShare + elecDiscrepancy) * 100) / 100;
  }

  // 6. Compute final total per person
  const finalResults = preliminaryResults.map((item) => {
    const total = combineWater 
      ? Math.round((item.finalElecShare + item.waterShare) * 100) / 100 
      : item.finalElecShare;

    return {
      ...item,
      finalTotal: total,
    };
  });

  // Summary Metrics
  const totalElecPayable = finalResults.reduce((acc, curr) => acc + curr.finalElecShare, 0);
  const totalWaterPayableForHousemates = finalResults.reduce((acc, curr) => acc + curr.waterShare, 0);
  const totalGrandPayable = finalResults.reduce((acc, curr) => acc + curr.finalTotal, 0);

  return {
    basePool,
    variablePool,
    baseSharePerPerson: Math.round(rawBaseSharePerPerson * 100) / 100,
    totalPersonDays,
    dailyVariableRate: Math.round(dailyVariableRate * 1000) / 1000,
    dailyVariableRateRounded: Math.round(dailyVariableRate * 100) / 100,
    waterSharePerPerson: roundedWaterSharePerPerson,
    results: finalResults,
    totalElecPayable: Math.round(totalElecPayable * 100) / 100,
    totalWaterPayableForHousemates: Math.round(totalWaterPayableForHousemates * 100) / 100,
    totalGrandPayable: Math.round(totalGrandPayable * 100) / 100,
    elecDiscrepancyBalanced: elecDiscrepancy,
    highestPayerId: preliminaryResults.length > 0 ? preliminaryResults[highestIdx]?.id : null,
  };
}
