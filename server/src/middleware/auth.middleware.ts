import prisma from '../db';
import { Request, Response, NextFunction } from 'express';

export const requireVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  if (!user?.is_verified) {
    res.status(403).json({
      message: 'Please verify your email address to access this feature',
    });
    return;
  }

  next();
};
