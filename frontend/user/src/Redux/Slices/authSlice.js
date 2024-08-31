import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../API/authServices";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  openLogin: false,
  openSignup: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk(
    "auth/signin",
    async (userData, thunkAPI) => {
      try {
        return await authService.signin(userData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// export const getOrders = createAsyncThunk(
//   "order/get-orders",
//   async (thunkAPI) => {
//     try {
//       return await authService.getOrders();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// export const getOrderByUser = createAsyncThunk(
//   "order/get-order",
//   async (id, thunkAPI) => {
//     try {
//       return await authService.getOrder(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginBox: (state) => {
      state.openLogin = true;
    },
    signupBox: (state) => {
      state.openSignup = true;
    },
    closeLog: (state) => {
      state.openLogin = false;
    },
    closeSign: (state) => {
      state.openSignup = false;
    },
  },
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Login successfully";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = "Success";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
        state.message = "Register successfully";
      })
      .addCase(signin.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
    //   .addCase(getOrderByUser.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getOrderByUser.fulfilled, (state, action) => {
    //     state.isError = false;
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.orderbyuser = action.payload;
    //     state.message = "success";
    //   })
    //   .addCase(getOrderByUser.rejected, (state, action) => {
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.error;
    //     state.isLoading = false;
    //   });
  },
});

export const { loginBox, signupBox, closeLog, closeSign } = authSlice.actions;
export const selectAuthUser = (state) => state.auth;
export default authSlice.reducer;
