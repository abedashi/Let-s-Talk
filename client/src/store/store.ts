import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import chatsReducer from '../features/chats/chatsSlice';
import storysReducer from '../features/storys/storysSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
    storys: storysReducer,
  },
});
