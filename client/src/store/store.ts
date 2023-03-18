import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contactsReducer from '../features/contacts/contactsSlice';
import storysReducer from '../features/storys/storysSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    storys: storysReducer,
  },
});
