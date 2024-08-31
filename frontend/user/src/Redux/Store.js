import { configureStore } from "@reduxjs/toolkit";
import itemSlice from './Slices/itemSlice';
import PaginationReducer from "./Slices/Pagination";
import CartReducer from "./Slices/Cart";
import AuthReducer from "./Slices/authSlice";

const store = configureStore({
    reducer: {
        auth : AuthReducer,
        item: itemSlice,
        pagination: PaginationReducer,
        cart: CartReducer,
    },
});

export default store;
