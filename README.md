# split_ler ⚡💧

A clean, responsive single-page utility bill split calculator tailored for 4 housemates using the **30/70 Hybrid Model**.

Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

---

## 💡 Why the 30/70 Hybrid Model?

Traditional utility bill splitting methods often cause house disputes:
- **100% Equal Split Flaw:** If a housemate visits family or travels for 3 weeks, they still pay for everyone else's 16°C overnight air-conditioning.
- **100% Days Split Flaw:** If a housemate is away for the full month, they pay RM 0. Yet their groceries were chilled in the refrigerator, the Wi-Fi router was running, and TNB/meter base charges accrued.

### The 30/70 Solution:
1. **Fixed Base Overhead (30% default, configurable):**
   - Covers 24/7 background usage (refrigerator, Wi-Fi router, water heater standby, base meter charges).
   - Split equally across all housemates regardless of days present.
   - `Base Pool = Total Bill × 0.30`
   - `Base Share per Person = Base Pool / Number of Housemates`

2. **Variable Active Consumption (70% default, configurable):**
   - Covers active personal usage (air conditioning, lighting, fans, cooking, chargers).
   - Calculated proportionally based on recorded person-days stayed.
   - `Variable Pool = Total Bill × 0.70`
   - `Total Person-Days = Sum of all individual days stayed`
   - `Daily Variable Rate = Variable Pool / Total Person-Days`
   - `Variable Share per Person = Individual Days Stayed × Daily Variable Rate`

3. **Guaranteed Penny Balancing:**
   - Rounds each person's electricity share to 2 decimal places.
   - Any 1-cent discrepancy caused by rounding is automatically attributed to the highest payer, ensuring the individual shares strictly equal the master bill down to the last cent.

4. **Optional Flat Water Split:**
   - Input for water bill total with a configurable divisor (**divides equally by 5 by default**).
   - Toggle to combine electricity + water into one total per person or view them side-by-side.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## ✨ Features

- **Utility Bill Inputs:** Total Electricity Bill, optional Water Bill with divisor pill selector (÷5 default, ÷4, custom).
- **Billing Cycle / Month Selector:** Date picker that automatically detects the days in the selected month (e.g. 31 days for October, 30 for September) with a 1-click button to sync all housemates.
- **Housemates Manager:** 4 editable housemates with quick buttons:
  - `Full (30)`
  - `Full (31)`
  - `Half (15)`
  - `Away (0)`
  - Custom days with `+` / `-` steppers.
- **Model Ratio Slider & Presets:** Dual range slider from 0% to 100% with quick presets (30/70 Standard, 20/80 Low Standby, 40/60 High Fixed, 50/50, 0/100).
- **Summary Cards:** Total Person-Days, Daily Variable Rate (RM/day), Base Cost per Person, and Master Total.
- **Detailed Settlement Table:** Housemate name, days stayed, base share, variable share, water share, and total payable, with visual proportion bars.
- **Instant WhatsApp & Telegram Summary:** One-click copy button with confetti celebration, live message preview, and direct WhatsApp / Telegram deep links with optional payment details (DuitNow, Bank Account, due date).
- **Local Persistence:** Automatically saves your inputs, names, and bank details in `localStorage`.
