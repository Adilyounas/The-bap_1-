import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  loading: false,
  success: false,
  success2: false,
  error: null,
  Products: [],
};

const AdminProducts = createSlice({
  name: "Products for admin",
  initialState,
  reducers: {
    adminProductRequest: (state, action) => {
      state.loading = true;
    },
    adminProductRequest_Success: (state, action) => {
      state.success = action.payload.success;
      state.Products = action.payload.product;
      state.loading = false;
    },
    adminProductRequest_Fail: (state, action) => {
      state.Products = action.payload.product;
      state.loading = false;
    },
    null_All_Admin_Products: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    createProduct_Action: (state, action) => {
      state.loading = false;
      state.success2 = true
    },
    false_The_success: (state, action) => {
      state.success2 = false
    },
  },
});

export default AdminProducts.reducer;
export const {adminProductRequest,createProduct_Action,adminProductRequest_Success,adminProductRequest_Fail,null_All_Admin_Products ,false_The_success  } = AdminProducts.actions
