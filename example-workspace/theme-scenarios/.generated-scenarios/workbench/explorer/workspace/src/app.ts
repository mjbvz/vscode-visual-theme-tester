import express from 'express';
import { userRouter } from './routes/users';
import { authMiddleware } from './middleware/auth';

export async function createApp() {
  const app = express();
  
  app.use(express.json());
  app.use(authMiddleware);
  app.use('/api/users', userRouter);
  
  return app;
}