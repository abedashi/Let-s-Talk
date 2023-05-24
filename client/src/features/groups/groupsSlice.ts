// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import groupsService from './groupsService'

type initialStateType = {
  groups: []
  group: []
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string | {}
}

const initialState: initialStateType = {
  groups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getGroups = createAsyncThunk(
  'groups/getGroups',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await groupsService.getGroups(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getGroup = createAsyncThunk(
  'groups/getGroup',
  async (id: string, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await groupsService.getGroup(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    addMessage: (state, action) => {
      state.group.group_messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.groups = action.payload
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.group = action.payload
      })
      .addCase(getGroup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, addMessage } = groupSlice.actions
export default groupSlice.reducer
