// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatsService from './chatsService';

type initialStateType = {
  room: [];
  chats: [];
  contacts: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | {};
};

const initialState: initialStateType = {
  room: [],
  chats: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getChats = createAsyncThunk(
  'chats/getChats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await chatsService.getChats(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChat = createAsyncThunk(
  'chats/getChat',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await chatsService.getChat(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getContacts = createAsyncThunk(
  'chats/getContacts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await chatsService.getContacts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addChatRoom = createAsyncThunk(
  'chats/addChatRoom',
  async (contact, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await chatsService.addChatRoom(contact, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.room = action.payload;
      })
      .addCase(getChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addChatRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addChatRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = [action.payload, ...state.chats];
      })
      .addCase(addChatRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = chatsSlice.actions;
export default chatsSlice.reducer;
