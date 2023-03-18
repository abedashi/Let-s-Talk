import { Router } from 'express';
export const userRouter = Router();

import {
  login,
  signup,
  verifyOtp,
  updateUser,
  getContacts,
  getContact,
  me,
} from '../controllers/userControllers';
import { protect } from '../middlewares/protect';

userRouter.post('/update-user', protect, updateUser);
userRouter.post('/login/verify', verifyOtp);
userRouter.post('/signup', signup);
userRouter.post('/login', login);

userRouter.get('/getContact', protect, getContact);
userRouter.get('/getContacts', protect, getContacts);
userRouter.get('/me', protect, me);
