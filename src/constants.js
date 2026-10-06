export const CURRENCIES = [
  { code: 'RM', label: 'RM (Ringgit)', symbol: 'RM' },
  { code: 'SGD', label: 'SGD (S$)', symbol: 'S$' },
  { code: 'USD', label: 'USD ($)', symbol: '$' },
  { code: 'EUR', label: 'EUR (€)', symbol: '€' },
  { code: 'GBP', label: 'GBP (£)', symbol: '£' },
  { code: 'IDR', label: 'IDR (Rp)', symbol: 'Rp' },
  { code: 'PHP', label: 'PHP (₱)', symbol: '₱' },
  { code: 'THB', label: 'THB (฿)', symbol: '฿' },
];

export const DEFAULT_HOUSEMATES = [
  { id: '1', name: 'Alex', room: 'Room 1 (Master)', daysStayed: 31, avatarColor: 'bg-emerald-500' },
  { id: '2', name: 'Bryan', room: 'Room 2 (Middle)', daysStayed: 31, avatarColor: 'bg-sky-500' },
  { id: '3', name: 'Chris', room: 'Room 3 (Balcony)', daysStayed: 24, avatarColor: 'bg-violet-500' },
  { id: '4', name: 'Daniel', room: 'Room 4 (Small)', daysStayed: 12, avatarColor: 'bg-amber-500' },
];

export const RATIO_PRESETS = [
  {
    base: 30,
    variable: 70,
    label: '30 / 70 (Standard)',
    tag: 'Recommended',
    description: 'Fair standard: 30% for 24/7 fridge, router, water heater; 70% for active AC & lighting.',
  },
  {
    base: 20,
    variable: 80,
    label: '20 / 80 (Low Standby)',
    tag: 'Energy Saver',
    description: 'For houses with energy-saving appliances or high air-conditioning variance.',
  },
  {
    base: 40,
    variable: 60,
    label: '40 / 60 (High Fixed)',
    tag: 'High Standby',
    description: 'For high base-meter tariffs or houses with 24/7 central server / heavy fridge loads.',
  },
  {
    base: 50,
    variable: 50,
    label: '50 / 50 (Balanced)',
    tag: 'Half & Half',
    description: 'Equal split between fixed household overhead and active stay days.',
  },
  {
    base: 0,
    variable: 100,
    label: '0 / 100 (Strict Days)',
    tag: 'Pure Days',
    description: 'Pay purely based on days stayed with zero base overhead.',
  },
];

export const PRESET_SCENARIOS = [
  {
    name: 'Standard Month (Mixed Vacation)',
    elec: 320.00,
    water: 35.00,
    waterActive: true,
    waterDivisor: 5,
    baseRatio: 30,
    days: [31, 31, 24, 12],
    description: '2 stayed full month, 1 took a 1-week trip, 1 was away for 3 weeks.',
  },
  {
    name: 'All Full Month (Equal)',
    elec: 280.00,
    water: 30.00,
    waterActive: true,
    waterDivisor: 5,
    baseRatio: 30,
    days: [30, 30, 30, 30],
    description: 'All 4 housemates stayed the full 30 days.',
  },
  {
    name: 'Semester Break / Internship',
    elec: 195.50,
    water: 25.00,
    waterActive: true,
    waterDivisor: 5,
    baseRatio: 30,
    days: [31, 28, 7, 0],
    description: '1 housemate away for the entire month (0 days), but still fairly contributes base share.',
  },
];
