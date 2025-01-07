import cookieParser from 'cookie-parser';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import { authMiddleware } from './middleware';
import actionRouter from './router/action.router';
import chatRouter from './router/chat.router';
import userRouter from './router/user.router';
import { authRouter } from './router/auth.router';

configDotenv();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Hello welcome to mamora world!',
  });
});

app.use('/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/action', actionRouter);
app.use('/api/v1/chat', authMiddleware, chatRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'API route not found',
  });
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`app listening on http://localhost:9000`);
});
