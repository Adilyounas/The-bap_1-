import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Redux/Reducers/ProductReducer";
import userSlice from "./Redux/Reducers/UserReducer";
import cartSlice from "./Redux/Reducers/CartReducer";
import shippingInfoSlice from "./Redux/Reducers/ShippingInfoReducer";


const store = configureStore({
  reducer: {
    productSlice,
    userSlice,
    cartSlice,
    shippingInfoSlice
  },
});

export default store;
