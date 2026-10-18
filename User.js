'use strict';
// Example only. Compare with the repository's existing User.js before replacing it.
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, maxlength: 120, default: '' },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  balance: { type: Number, min: 0, default: 0 },
  referralCode: { type: String, trim: true, unique: true, sparse: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
