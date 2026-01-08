import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      // Si no hay token, continuar (las rutas protegidas verificarán)
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key') as { sub: number };
    req.user = { id: decoded.sub };
    next();
  } catch (error: any) {
    // Token inválido o expirado, continuar sin usuario
    console.error('JWT Error:', error.message);
    next();
  }
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  next();
};
