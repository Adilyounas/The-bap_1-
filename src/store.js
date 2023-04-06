import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Redux/Reducers/ProductReducer";
import userSlice from "./Redux/Reducers/UserReducer";
import cartSlice from "./Redux/Reducers/CartReducer";

const store = configureStore({
  reducer: {
    productSlice,
    userSlice,
    cartSlice,
  },
});

export default store;
