import { Router } from 'express';
import { authMiddleware } from '../middleware';
import { requireVerification } from '../middleware/auth.middleware';
import userRouter from './user.router';
import { authRouter } from './auth.router';
import chatRouter from './chat.router';
// import paymentRouter from './payment.router';

const apiRouter = Router();

// Public routes
apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);

// Protected routes (require authentication)
apiRouter.use('/chat', authMiddleware, requireVerification, chatRouter);
// apiRouter.use('/payment', authMiddleware, requireVerification, paymentRouter);

export default apiRouter;
