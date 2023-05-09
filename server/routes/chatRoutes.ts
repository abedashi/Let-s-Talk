import { Router } from 'express';
export const chatRouter = Router();

import {
  getChat,
  getChats,
  getContacts,
  addChatRoom,
} from '../controllers/chatController';
import { protect } from '../middlewares/protect';

chatRouter.get('/get-chat/:id', protect, getChat);
chatRouter.get('/get-chats', protect, getChats);

// userRouter.get('/getContact', protect, getContact);
chatRouter.get('/get-contacts', protect, getContacts);
chatRouter.post('/add-chat-room', protect, addChatRoom);
