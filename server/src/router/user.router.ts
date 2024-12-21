import { Router } from 'express';
import { authMiddleware } from '../middleware';
import { callService } from '../service/call.service';
import {
  getUserDetails,
  signInService,
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

userRouter.post('/logout', async (req, res) => {
  res.clearCookie('authorization');
  res.status(200).json({
    status: 200,
    message: 'Successfully logged out',
    data: [],
  });
});

userRouter.get('/me', authMiddleware, async (req, res) => {
  await callService(getUserDetails, req, res);
});

export default userRouter;
