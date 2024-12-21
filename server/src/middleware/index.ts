import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the userId property
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.authorization;


  if (!token) {
    res.status(403).json({
      message: 'Warning: No Bearer token provided in cookies. Access denied.',
    });
    return; // Ensure the function ends here
  }

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    res.status(500).json({
      message: 'Server error: JWT secret key is not configured.',
    });
    return; // Ensure the function ends here
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { id: string };

    if (decoded.id) {
      req.userId = decoded.id;
      next(); // Proceed to the next middleware
    } else {
      res.status(403).json({
        message: 'Warning: Invalid token. Access denied.',
      });
    }
  } catch (error) {
    res.status(403).json({
      message: 'Warning: Invalid token. Access denied.',
    });
  }
};

export { authMiddleware };
