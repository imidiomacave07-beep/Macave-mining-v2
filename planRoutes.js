'use strict';
const express = require('express');
function createPlanRoutes({ planController, authMiddleware, adminMiddleware } = {}) {
  if (!planController) throw new Error('planController is required');
  const router = express.Router();
  const list = planController.listPlans || planController.getPlans || planController.list;
  const get = planController.getPlan || planController.getById;
  const create = planController.createPlan || planController.create;
  const update = planController.updatePlan || planController.update;
  const remove = planController.deletePlan || planController.remove;
  if (typeof list === 'function') router.get('/', list);
  if (typeof get === 'function') router.get('/:id', get);
  if (adminMiddleware && authMiddleware && typeof create === 'function') router.post('/', authMiddleware, adminMiddleware, create);
  if (adminMiddleware && authMiddleware && typeof update === 'function') router.put('/:id', authMiddleware, adminMiddleware, update);
  if (adminMiddleware && authMiddleware && typeof remove === 'function') router.delete('/:id', authMiddleware, adminMiddleware, remove);
  if (!router.stack.length) throw new Error('No compatible plan handlers supplied.');
  return router;
}
module.exports = { createPlanRoutes };
