import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
let localStorageInitialState = JSON.parse(localStorage.getItem("cartItems"));

let initialState = {
  cartItems: [],
  tax: 0,
  subTotal: 0,
  shippingTax: 0,
  Total: 0,
  presentSomeThing: false,
};
if (localStorageInitialState) {
  initialState = localStorageInitialState;
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.presentSomeThing = true;
      const { _id, name, price, stock, quantity, image } = action.payload;
      const isExist = state.cartItems.find(
        (item) => item._id === _id
      );
      if (isExist) {
        return;
      } else {
        state.cartItems.push({ _id, name, price, stock, quantity, image });
      }
    },

    incrementReducer: (state, action) => {
      const _id = action.payload;

      const isExist = state.cartItems.find((item) => item._id === _id);
      if (isExist) {
        state.cartItems.forEach((item) => {
          if (item._id === _id) {
            if (item.stock <= item.quantity) {
              toast.error("Stock Limit", { duration: 1000 });
            } else {
              item.quantity++;
            }
          }
        });
      }
    },

    decrementReducer: (state, action) => {
      const _id = action.payload;

      const isExist = state.cartItems.find((item) => item._id === _id);
      if (isExist) {
        state.cartItems.forEach((item) => {
          if (item._id === _id) {
            if (1 >= item.quantity) {
              toast.error("Minimum 1 Product", { duration: 1000 });
            } else {
              item.quantity--;
            }
          }
        });
      }
    },
    deleteItemFromCart: (state, action) => {
      const _id = action.payload;

      const isExist = state.cartItems.filter(
        (item) => item._id.toString() !== _id.toString()
      );
      if (isExist) {
        state.cartItems = isExist;
      }

      if (state.cartItems.length === 0) {
        state.presentSomeThing = false;
      }
    },
    calculate: (state, action) => {
      let sum = 0;

      state.cartItems.forEach((item) => {
        sum += item.price * item.quantity;
      });
      state.subTotal = sum
      state.shippingTax = state.subTotal > 2000 ? 0 : state.subTotal === 0 ? 0 : 150;
      state.tax = +(state.subTotal * 0.18).toFixed(); //important coz to fix give you string

      state.Total = state.subTotal + state.shippingTax + state.tax

    },
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  incrementReducer,
  decrementReducer,
  getAllProductsAllRequest,
  deleteItemFromCart,
  calculate,
} = cartSlice.actions;
