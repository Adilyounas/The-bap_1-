import axios from "axios";
import {
  orderRequest,
  orderSuccess,
  orderFail,
} from "../Reducers/ProductReview";

//put request or submit a review
export const submitReview = () => async (dispatch) => {
  try {
    dispatch(orderRequest());
    const { data } = await axios.put(`/api/v1/create/Review`);
    dispatch(orderSuccess(data));
  } catch (error) {
    dispatch(orderFail(error));
  }
};
