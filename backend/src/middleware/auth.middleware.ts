import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.utils';

export interface AuthRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Token verification failed' });
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.isAdmin !== true) {
    return res.status(403).json({ error: 'Forbidden: Admin privileges required' });
  }
  next();
};