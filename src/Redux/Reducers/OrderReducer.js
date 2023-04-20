import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  myOrders: [],
  loading: false,
  error: null,
  success: null,
  orderDetail:{},
};

const order = createSlice({
  name: "orders",
  initialState,
  reducers: {
    orderRequest: (state, action) => {
      state.loading = true;
    },
    orderSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.myOrders = action.payload.orders;
      state.success = action.payload.success;
    },
    singleOrderRequestSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.orderDetail = action.payload.order;
      state.success = action.payload.success;
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

export default order.reducer;
export const { orderRequest, orderSuccess,singleOrderRequestSuccess, orderFail, orderError_null } =
  order.actions;
