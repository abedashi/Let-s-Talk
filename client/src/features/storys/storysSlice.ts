// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storysService from './storysService';

type initialStateType = {
  storys: [] | null;
  images: [] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | {};
};

const initialState: initialStateType = {
  storys: [],
  images: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getStorys = createAsyncThunk(
  'storys/get-storys',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await storysService.getStorys(token);
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

export const getMyStorys = createAsyncThunk(
  'storys/get-my-storys',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await storysService.getMyStorys(token);
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

export const getStoryImages = createAsyncThunk(
  'storys/get-story-images',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await storysService.getStoryImages(id, token);
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

export const addStory = createAsyncThunk(
  'storys/add-story',
  async (storyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await storysService.addStory(storyData, token);
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

export const storysSlice = createSlice({
  name: 'storys',
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
      .addCase(getStorys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStorys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.storys = action.payload;
      })
      .addCase(getStorys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStoryImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoryImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload;
      })
      .addCase(getStoryImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyStorys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyStorys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload;
      })
      .addCase(getMyStorys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(addStory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = storysSlice.actions;
export default storysSlice.reducer;
