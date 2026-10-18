'use strict';
const express = require('express');
// Inject the existing controller/middleware to avoid duplicating business logic.
function createAuthRoutes({ authController, authMiddleware } = {}) {
  if (!authController) throw new Error('authController is required');
  const router = express.Router();
  if (typeof authController.register === 'function') router.post('/register', authController.register);
  if (typeof authController.login === 'function') router.post('/login', authController.login);
  if (authMiddleware && typeof authController.me === 'function') router.get('/me', authMiddleware, authController.me);
  if (!router.stack.length) throw new Error('No compatible auth controller methods supplied.');
  return router;
}
module.exports = { createAuthRoutes };
