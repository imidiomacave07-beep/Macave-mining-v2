'use strict';
// Example only. Compare with the repository's existing Plan.js before replacing it.
const mongoose = require('mongoose');
const planSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 1000, default: '' },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, uppercase: true, trim: true, default: 'USDT' },
  hashrateTH: { type: Number, min: 0, default: 0 },
  durationDays: { type: Number, required: true, min: 1 },
  active: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.models.Plan || mongoose.model('Plan', planSchema);
