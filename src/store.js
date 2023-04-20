import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Redux/Reducers/ProductReducer";
import userSlice from "./Redux/Reducers/UserReducer";
import cartSlice from "./Redux/Reducers/CartReducer";
import shippingInfoSlice from "./Redux/Reducers/ShippingInfoReducer";
import order from "./Redux/Reducers/OrderReducer";
import AdminProducts from "./Redux/Reducers/Admin/Products";
import DeleteProduct_Admin from "./Redux/Reducers/Admin/DeleteProduct";
import updateProduct from "./Redux/Reducers/Admin/UpdataProduct";
import singleProductDetails from "./Redux/Reducers/Admin/SingleProductDetails";
import AllOrders from "./Redux/Reducers/Admin/AllOrders";






const store = configureStore({
  reducer: {
    productSlice,
    userSlice,
    cartSlice,
    shippingInfoSlice,
    order,
    AdminProducts,
    DeleteProduct_Admin,
    updateProduct,
    singleProductDetails,
    AllOrders,
  },
});

export default store;
