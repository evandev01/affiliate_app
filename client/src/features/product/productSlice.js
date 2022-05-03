import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
  products: [],
  error: false,
  success: false,
  loading: false,
  message: '',
}

// Create new product
export const addProduct = createAsyncThunk(
  'products/create',
  async (product, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.addProduct(product, token)
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

// Get user products
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.getProducts(token)
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

// Get user products
export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.getProductById(id, token)
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

// Get user products
export const updateProduct = createAsyncThunk(
  'products/update',
  async (product, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.updateProduct(product, token)
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

// Delete user product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.deleteProduct(id, token)
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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(addProduct.pending, state => {
        state.loading = true
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false
        state.successCreate = true
        state.products.push(action.payload)
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false
        state.errorCreate = true
        state.message = action.payload
      })
      .addCase(getProducts.pending, state => {
        state.loading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })
      .addCase(getProductById.pending, state => {
        state.loading = true
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false
        state.successProduct = true
        state.product = action.payload
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false
        state.errorProduct = true
        state.message = action.payload
      })
      .addCase(updateProduct.pending, state => {
        state.loading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.successUpdate = true
        state.product = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.errorUpdate = true
        state.message = action.payload
      })
      .addCase(deleteProduct.pending, state => {
        state.loading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.successDelete = true
        state.message = action.payload
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.errorDelete = true
        state.message = action.payload
      })
  },
})

export const { reset } = productSlice.actions
export default productSlice.reducer
