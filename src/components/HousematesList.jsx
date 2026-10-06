import React from 'react';
import { Users, User, UserPlus, Trash2, Calendar, Check, Plane, Home } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function HousematesList({
  housemates,
  setHousemates,
  daysInCycle,
  currency,
  calculationResult,
}) {
  const handleNameChange = (id, newName) => {
    setHousemates((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name: newName } : h))
    );
  };

  const handleDaysChange = (id, newDays) => {
    const val = Math.max(0, parseInt(newDays, 10) || 0);
    setHousemates((prev) =>
      prev.map((h) => (h.id === id ? { ...h, daysStayed: val } : h))
    );
  };

  const addHousemate = () => {
    const newId = String(Date.now());
    const colors = ['bg-emerald-500', 'bg-sky-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-teal-500'];
    const color = colors[housemates.length % colors.length];
    setHousemates((prev) => [
      ...prev,
      {
        id: newId,
        name: `Housemate ${prev.length + 1}`,
        room: `Room ${prev.length + 1}`,
        daysStayed: daysInCycle,
        avatarColor: color,
      },
    ]);
  };

  const removeHousemate = (id) => {
    if (housemates.length <= 2) {
      alert('You need at least 2 housemates to split bills!');
      return;
    }
    setHousemates((prev) => prev.filter((h) => h.id !== id));
  };

  const setAllDays = (days) => {
    setHousemates((prev) =>
      prev.map((h) => ({ ...h, daysStayed: days }))
    );
  };

  // Quick lookup for calculated values
  const resultMap = {};
  if (calculationResult && calculationResult.results) {
    calculationResult.results.forEach((r) => {
      resultMap[r.id] = r;
    });
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
              3
            </span>
            Housemates & Days Stayed
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {housemates.length} People
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Customize names and enter how many days each housemate stayed this billing cycle
          </p>
        </div>

        {/* Global Batch Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400 font-medium">Batch set:</span>
          <button
            type="button"
            onClick={() => setAllDays(30)}
            className="text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            All 30
          </button>
          <button
            type="button"
            onClick={() => setAllDays(31)}
            className="text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            All 31
          </button>
          <button
            type="button"
            onClick={() => setAllDays(daysInCycle)}
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
          >
            All Cycle ({daysInCycle}d)
          </button>
          <button
            type="button"
            onClick={addHousemate}
            className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
            title="Add another housemate"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Pax</span>
          </button>
        </div>
      </div>

      {/* Housemates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {housemates.map((h, index) => {
          const res = resultMap[h.id];
          const daysNum = Math.max(0, parseInt(h.daysStayed, 10) || 0);
          const attendancePercent = daysInCycle > 0 ? Math.min(100, Math.round((daysNum / daysInCycle) * 100)) : 0;
          const isHighest = calculationResult?.highestPayerId === h.id && (calculationResult?.results?.length ?? 0) > 1;

          return (
            <div
              key={h.id}
              className={`rounded-2xl border transition-all p-4 relative ${
                isHighest
                  ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              {/* Header: Name input & Avatar & Delete */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-xs shrink-0 ${
                      h.avatarColor || 'bg-emerald-600'
                    }`}
                  >
                    {h.name.charAt(0).toUpperCase() || 'H'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={h.name}
                      onChange={(e) => handleNameChange(h.id, e.target.value)}
                      placeholder={`Housemate ${index + 1}`}
                      className="text-sm sm:text-base font-extrabold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-hidden px-1 py-0.5 w-full rounded transition-colors"
                    />
                    <div className="text-[11px] text-slate-400 px-1 font-medium flex items-center gap-1.5">
                      <span>Room {index + 1}</span>
                      <span>•</span>
                      <span className={daysNum === 0 ? 'text-amber-600 font-semibold' : 'text-slate-500'}>
                        {daysNum === 0 ? 'Away (0 days)' : `${attendancePercent}% attendance`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Estimated Payable Badge */}
                {res && (
                  <div className="text-right shrink-0">
                    <div className="text-xs text-slate-400 font-medium">Estimated:</div>
                    <div className="text-sm font-extrabold text-emerald-700">
                      {formatCurrency(res.finalTotal, currency)}
                    </div>
                  </div>
                )}

                {/* Delete button (only if > 2 housemates) */}
                {housemates.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeHousemate(h.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove housemate"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Days Stayed Input & Quick Buttons */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Days Stayed:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDaysChange(h.id, Math.max(0, daysNum - 1))}
                      className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={h.daysStayed}
                      onChange={(e) => handleDaysChange(h.id, e.target.value)}
                      className="w-14 text-center font-extrabold text-sm py-1 px-1 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleDaysChange(h.id, daysNum + 1)}
                      className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs transition-colors cursor-pointer"
                    >
                      +
                    </button>
                    <span className="text-xs text-slate-400 font-medium">days</span>
                  </div>
                </div>

                {/* Quick Presets: Full Month (30), Full Month (31), Half (15), Away (0) */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleDaysChange(h.id, 30)}
                    className={`py-1.5 px-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer text-center ${
                      daysNum === 30
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    Full (30)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDaysChange(h.id, 31)}
                    className={`py-1.5 px-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer text-center ${
                      daysNum === 31
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    Full (31)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDaysChange(h.id, 15)}
                    className={`py-1.5 px-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer text-center ${
                      daysNum === 15
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    Half (15)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDaysChange(h.id, 0)}
                    className={`py-1.5 px-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer text-center ${
                      daysNum === 0
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    Away (0)
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
