import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

const ProductReview = createSlice({
  name: "create the product review",
  initialState,
  reducers: {
    orderRequest: (state, action) => {
      state.loading = true;
    },
    orderSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },

    orderFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    orderError_null: (state, action) => {
      state.error = null;
      state.loading = false;
    },
  },
});

export default ProductReview.reducer;
export const { orderRequest, orderSuccess, orderFail, orderError_null } =
  ProductReview.actions;
