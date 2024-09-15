import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slices/authSlice";
import CartReducer from "./Slices/CartSlice";
import itemSlice from "./Slices/itemSlice";
import PaginationReducer from "./Slices/Pagination";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    item: itemSlice,
    pagination: PaginationReducer,
    cart: CartReducer,
  },
});

export default store;
