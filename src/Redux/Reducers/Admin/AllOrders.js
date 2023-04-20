import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  loading: false,
  success: false,
  error: null,
  OrdersTotalAmount: 0,
  orderLength: 0,
  Orders: [],
};

const AllOrders = createSlice({
  name: "AllOrders for admin",
  initialState,
  reducers: {
    adminAllOrdersRequest: (state, action) => {
      state.loading = true;
    },
    loadingFalse: (state) => {
      state.loading = false;
    },
    adminAllOrdersRequest_Success: (state, action) => {
      state.success = action.payload.success;
      state.OrdersTotalAmount = action.payload.totalAmount;
      state.orderLength = action.payload.length;
      state.Orders = action.payload.orders;

      state.loading = false;
    },
    adminAllOrdersRequest_Fail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    null_All_Admin_AllOrders: (state, action) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export default AllOrders.reducer;
export const {
  adminAllOrdersRequest,
  loadingFalse,
  adminAllOrdersRequest_Success,
  adminAllOrdersRequest_Fail,
  null_All_Admin_AllOrders,
} = AllOrders.actions;
