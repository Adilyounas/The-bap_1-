import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
};

const updateProduct = createSlice({
  name: "update product",
  initialState,
  reducers: {
    updateProductLoading_False_Request: (state, action) => {
      state.loading = true;
    },
    updateProduct_Success: (state, action) => {
      state.success = true;
      state.loading = false;
    },
    updateProduct_Fail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    updateProduct_Error_null: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    false_The_success: (state, action) => {
      state.success = false;
    },
    
  },
});

export default updateProduct.reducer;
export const {
    updateProductLoading_False_Request,
    updateProduct_Success,
    updateProduct_Fail,
    updateProduct_Error_null,
    false_The_success,
} = updateProduct.actions
