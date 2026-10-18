'use strict';
function buildAdminStats({ users = [], payments = [], withdrawals = [], plans = [] } = {}) {
  const amount = p => Math.max(0, Number.isFinite(Number(p.amount)) ? Number(p.amount) : 0);
  const confirmed = payments.filter(p => ['confirmed','completed','paid'].includes(String(p.status || '').toLowerCase()));
  return {
    totalUsers: users.length, totalPlans: plans.length, totalPayments: payments.length,
    confirmedPaymentAmount: confirmed.reduce((s, p) => s + amount(p), 0),
    pendingPayments: payments.filter(p => String(p.status || '').toLowerCase() === 'pending').length,
    totalWithdrawals: withdrawals.length,
    pendingWithdrawals: withdrawals.filter(w => String(w.status || '').toLowerCase() === 'pending').length,
    generatedAt: new Date().toISOString()
  };
}
module.exports = { buildAdminStats };
