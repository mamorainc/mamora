import { Router } from 'express';

import { authMiddleware } from '../middleware';
import { callService } from '../service/call.service';
import { sendSol, swapService, userBlance } from '../service/action.service';

const actionRouter = Router();

actionRouter.post('/send', authMiddleware, async (req, res) => {
  await callService(sendSol, req, res);
});

actionRouter.get('/balance', authMiddleware, async (req, res) => {
  await callService(userBlance, req, res);
});

actionRouter.post('/swap', authMiddleware, async (req, res) => {
  await callService(swapService, req, res);
});

export default actionRouter;
