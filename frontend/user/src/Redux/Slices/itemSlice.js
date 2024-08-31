import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../API/ProductApi";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productApi.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductByIdAsync = createAsyncThunk(
  "product/get-product-by-id",
  async (id, thunkAPI) => {
    try {
      return await productApi.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  "productCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await productApi.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState: {
    isLoading: false,
    products: [],
    productCategories: [],
    error: null,
    selectedProduct: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.error.message;
      })
      // Handling getProductByIdAsync actions
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null; // Reset error when a new request starts
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(getProductByIdAsync.rejected, (state, action) => {
        state.status = "error";
        state.selectedProduct = null;
        state.error = action.error.message; // Capture the error message
      })
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.productCategories = action.payload;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "error";
        state.productCategories = null;
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectAllProducts = (state) => state.item.products;
export const selectProductById = (state) => state.item.selectedProduct;
export const selectProductStatus = (state) => state.item.status;
export const selectProductError = (state) => state.item.error;

export default itemSlice.reducer;
