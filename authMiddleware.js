'use strict';
// Example JWT middleware. Configure JWT_SECRET in server environment; never commit secrets.
const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next) {
  const [scheme, token] = String(req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ error: 'Authentication required.' });
  if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'Authentication is not configured.' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); return next(); }
  catch { return res.status(401).json({ error: 'Invalid or expired token.' }); }
}
module.exports = authMiddleware;
