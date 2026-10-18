'use strict';
// Ilustrative calculation only; not proof of real mining revenue.
function calculateDailyProfit({ hashrateTH = 0, dailyRatePerTH = 0, uptime = 1 } = {}) {
  const h = Number(hashrateTH), r = Number(dailyRatePerTH), u = Number(uptime);
  if (![h, r, u].every(Number.isFinite) || h < 0 || r < 0 || u < 0 || u > 1) {
    throw new RangeError('Invalid hashrate, rate, or uptime.');
  }
  return Number((h * r * u).toFixed(8));
}
module.exports = { calculateDailyProfit };
