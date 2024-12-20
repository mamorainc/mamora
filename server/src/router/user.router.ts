import { Router } from 'express';
import { signInService, signUpService } from '../service/user.service';
import { callService } from '../service/call.service';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success',
  });
});

userRouter.post('/signup', async (req, res) => {
  await callService(signUpService, req, res);
});

userRouter.post('/signin', async (req, res) => {
  await callService(signInService, req, res);
});

export default userRouter;
