import { NextFunction, Request, Response } from 'express';

// Extend the Request interface to include the userId property
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = req.headers['x-user-id'];

  try {
    if (userId) {
      req.userId = userId as string;
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
