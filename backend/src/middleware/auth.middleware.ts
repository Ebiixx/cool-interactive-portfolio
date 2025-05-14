import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Zugriff verweigert. Kein Token vorhanden.' });
    }
    
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    
    jwt.verify(token, secret, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ error: 'Ungültiges oder abgelaufenes Token.' });
      }
      
      (req as any).user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: 'Serverfehler bei der Authentifizierung.' });
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.isAdmin !== true) {
    return res.status(403).json({ error: 'Forbidden: Admin privileges required' });
  }
  next();
};