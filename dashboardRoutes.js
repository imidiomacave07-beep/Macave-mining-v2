'use strict';
const express = require('express');
function createDashboardRoutes({ dashboardController, authMiddleware } = {}) {
  if (!dashboardController || !authMiddleware) throw new Error('Controller and authMiddleware are required');
  const handler = dashboardController.getDashboard || dashboardController.dashboard || dashboardController.get;
  if (typeof handler !== 'function') throw new Error('No compatible dashboard handler found.');
  const router = express.Router();
  router.get('/', authMiddleware, handler);
  return router;
}
module.exports = { createDashboardRoutes };
