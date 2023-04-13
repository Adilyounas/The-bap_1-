import { shippingInfoAction } from "../Reducers/ShippingInfoReducer";

export const saveShippingInfoFun = (data) => async (dispatch) => {
  dispatch(shippingInfoAction(data));
  localStorage.setItem("shippingInfoItems", JSON.stringify(data));
};
