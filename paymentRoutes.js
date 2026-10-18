'use strict';
const express = require('express');
// Payment confirmation must be verified server-side (provider webhook/signature).
function createPaymentRoutes({ paymentController, authMiddleware, verifyWebhook } = {}) {
  if (!paymentController) throw new Error('paymentController is required');
  const router = express.Router();
  const create = paymentController.createPayment || paymentController.create;
  const list = paymentController.listPayments || paymentController.list;
  if (authMiddleware && typeof create === 'function') router.post('/', authMiddleware, create);
  if (authMiddleware && typeof list === 'function') router.get('/', authMiddleware, list);
  const webhook = paymentController.webhook || paymentController.handleWebhook;
  if (typeof webhook === 'function' && typeof verifyWebhook === 'function') router.post('/webhook', verifyWebhook, webhook);
  if (!router.stack.length) throw new Error('No compatible payment handlers supplied.');
  return router;
}
module.exports = { createPaymentRoutes };
