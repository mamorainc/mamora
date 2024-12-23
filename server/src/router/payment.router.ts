import { Router } from 'express';
import crypto from 'crypto';

const paymentRouter = Router();

paymentRouter.post('/sign-url', async (req, res) => {
  const { urlForSignature } = req.body;

  // Sign the URL using your secret key
  const signature = crypto
    .createHmac('sha256', process.env.MOONPAY_SECRET_KEY!)
    .update(urlForSignature)
    .digest('base64');

  res.json({ signature });
});

export default paymentRouter;
