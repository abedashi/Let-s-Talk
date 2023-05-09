import { Router } from 'express';
export const userRouter = Router();

import {
  login,
  signup,
  verifyOtp,
  updateUser,
  getContact,
  me,
} from '../controllers/userControllers';
import { protect } from '../middlewares/protect';

userRouter.post('/update-user', protect, updateUser);
userRouter.post('/login/verify', verifyOtp);
userRouter.post('/signup', signup);
userRouter.post('/login', login);

userRouter.get('/me', protect, me);
