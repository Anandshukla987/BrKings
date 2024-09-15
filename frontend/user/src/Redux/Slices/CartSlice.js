import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Axios } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

// Define initial state for the cart
const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

// Fetch the user's cart items from the server
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ _, rejectWithValue }) => {
    try {
      const response = await Axios.get(`${base_url}cart`);
      // console.log(response.data.cart.products);
      return response.data.cart.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a product to the cart
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${base_url}cart/add`, {
        productId,
        quantity,
      });
      if (response.data) {
        toast.success("Product added to Cart");
      }
      return response.data.cartItem;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`${base_url}cart/update`, {
        productId,
        quantity,
      });
      // console.log(typeof response.data.cart.products?.[0].product);
      return response.data.cart.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/// Remove a product from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(`${base_url}cart/remove`, {
        data: { productId },
      });
      toast.warn(response.data.message);
      // console.log(response.data.cart.products);
      return response.data.cart.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// pune to wasai - indor

// Clear the cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(`${base_url}cart/clear/${userId}`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.cartItems.findIndex(
          (item) => item.product._id === action.payload?.[0].product
        );
        // console.log("indx", index);
        if (index !== -1) {
          state.cartItems[index].quantity = action.payload?.[0].quantity;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
