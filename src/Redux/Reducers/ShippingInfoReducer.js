import { createSlice } from "@reduxjs/toolkit";
let localStorageInitialState = JSON.parse(
  localStorage.getItem("shippingInfoItems")
);

let initialState = {
  address:"",
  pinCode:"",
  phoneNo:"",
  state:"",
  country:"",
  city:""

};
if (localStorageInitialState) {
  initialState = localStorageInitialState;
}

const shippingInfoSlice = createSlice({
  name: "ShippingIno",
  initialState,
  reducers: {
    shippingInfoAction: (state, action) => {
      state.ShippingInfo = action.payload;
    },
  },
});

export default shippingInfoSlice.reducer;

export const { shippingInfoAction } = shippingInfoSlice.actions;
