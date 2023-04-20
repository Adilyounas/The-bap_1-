import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singlePDLoadings: false,
  singlePDError: null,
  singleProductDetails: {},
  success: null,
};

const singleProductDetails = createSlice({
  name: "update product",
  initialState,
  reducers: {
    singleProductDetailsLoading_False_Request: (state, action) => {
      state.singlePDLoadings = true;
    },
    singleProductDetails_Success: (state, action) => {
      state.singleProductDetails = action.payload.product;
      state.success = true;
      state.singlePDLoadings = false;
    },
    singleProductDetails_Fail: (state, action) => {
      state.success = false;
      state.singlePDLoadings = false;
      state.singlePDError = action.payload;
    },
    singleProductDetails_Error_null: (state, action) => {
      state.singlePDLoadings = false;
      state.singlePDError = null;
    },
    false_The_success: (state, action) => {
      state.success = false;
    },
  },
});

export default singleProductDetails.reducer;
export const {
  singleProductDetailsLoading_False_Request,
  singleProductDetails_Success,
  singleProductDetails_Fail,
  singleProductDetails_Error_null,
  false_The_success,
} = singleProductDetails.actions;
