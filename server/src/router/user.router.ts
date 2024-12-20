import { Router } from 'express';
import { signUpService } from '../service/user.service';
import { callService } from '../service/call.service';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success',
  });
});

userRouter.post('/signup', async (req, res) => {
   callService(signUpService, req, res);
});

userRouter.post('/signin', async (req, res) => {
  const { email, username } = req.body;


});

export default userRouter;
