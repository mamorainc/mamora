import { Router } from 'express';
import { authMiddleware } from '../middleware';
import { callService } from '../service/call.service';
import {
  getUserDetails,
  getWalletData,
  signInService,
  signInWithGoogleService,
  signUpService,
} from '../service/user.service';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success',
  });
});

userRouter.post('/signup', async (req, res) => {
  return await callService(signUpService, req, res);
});

userRouter.post('/signin', async (req, res) => {
  await callService(signInService, req, res);
});

userRouter.post('/google-signin', async (req, res) => {
  await callService(signInWithGoogleService, req, res);
});

userRouter.get('/me', authMiddleware, async (req, res) => {
  await callService(getUserDetails, req, res);
});

userRouter.get('/wallet', authMiddleware, async (req, res) => {
  await callService(getWalletData, req, res);
});

export default userRouter;
