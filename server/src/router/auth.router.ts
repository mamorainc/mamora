import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db';
import { z } from 'zod';

const router = Router();

// Validation schema for query parameters
const verifyEmailSchema = z.object({
  token: z.string({
    required_error: 'Verification token is required',
    invalid_type_error: 'Token must be a string',
  }),
});

// Type for decoded JWT token
interface VerificationToken {
  userId: string;
  purpose: string;
  iat: number;
  exp: number;
}

router.get(
  '/verify-email',
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate query parameters
      const result = verifyEmailSchema.safeParse(req.query);
      if (!result.success) {
        res.status(400).json({
          message: 'Invalid verification token',
          errors: result.error.errors,
        });
        return;
      }

      const { token } = result.data;

      // Verify and decode token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as VerificationToken;

      if (decoded.purpose !== 'email_verification') {
        res.status(400).json({
          message: 'Invalid token purpose',
          error: 'Token is not meant for email verification',
        });
        return;
      }

      // Update user verification status
      const user = await prisma.user.update({
        where: { id: decoded.userId },
        data: { is_verified: true },
        select: {
          email: true,
          username: true,
          is_verified: true,
        },
      });

      if (!user) {
        res.status(404).json({
          message: 'User not found',
          error: 'The user associated with this token no longer exists',
        });
        return;
      }

      // Redirect to frontend with success status
      res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(400).json({
          message: 'Invalid or expired verification token',
          error: error.message,
        });
        return;
      }

      // Handle other errors
      console.error('Email verification error:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: 'Failed to verify email',
      });
    }
  }
);

export const authRouter = router;
