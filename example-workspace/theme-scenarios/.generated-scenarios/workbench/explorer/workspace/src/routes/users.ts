import { Router } from 'express';
import { UserService } from '../services/user-service';

export const userRouter = Router();
const userService = new UserService();

userRouter.get('/', async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});