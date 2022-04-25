import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from './userService'

const user = JSON.parse(localStorage.getItem('user'))

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.getUsers(token)
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

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.getUserById(id, token)
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService().updateUser(id, token)
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

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService().deleteUser(id, token)
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

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
        state.users = null
      })
      .addCase(getUserById.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
        state.user = null
      })
      .addCase(updateUser.pending, state => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
        state.user = null
      })
      .addCase(deleteUser.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, state => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
