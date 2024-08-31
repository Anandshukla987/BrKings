import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    openLogin: false,
    openSignup: false,
    isLoggedin: false,
    user: null,
  },
  reducers: {
    loggedin: (state, action) => {
      state.isLoggedin = true;
      state.user = action.payload;
    },
    login: (state) => {
      state.openLogin = true;
    },
    signup: (state) => {
      state.openSignup = true;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.user = null;
    },
    closeLog: (state) => {
      state.openLogin = false;
    },
    closeSign: (state) => {
      state.openSignup = false;
    },
  },
});

export const { loggedin, login, logout, signup, closeLog, closeSign } =
  UserSlice.actions;
export const selectUser = (state) => state.user;

export default UserSlice.reducer;
