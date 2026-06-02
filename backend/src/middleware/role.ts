import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

/**
 * Middleware factory that ensures the authenticated user has one of the allowed roles.
 * Usage: `app.use('/admin', requireRole('admin'))`
 */
export function requireRole(...allowedRoles: string[]) {
  return function (req: AuthRequest, res: Response, next: NextFunction) {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
}

// Convenience shortcut for admin‑only routes
export const requireAdmin = requireRole('admin');
