import axios from "axios";
import {
  all_Product_Request_Action,
  all_ProductRequest_Success_Action,
  all_ProductRequest_Fail_Action,
  loading_False_Action,
  get_Single_Product_Details_action,
  
} from "../../Redux/Reducers/ProductReducer";




//product request form server / back-end
export const getProducts =
  (
    slideValue = [0, 10000],
    ratingValue = 0,
    pageValue = 1,
    cegoriesValues,
    keywords = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch(all_Product_Request_Action());

      let link = `/api/v1/products?keyword=${keywords}&page=${pageValue}&price[gte]=${slideValue[0]}&price[lte]=${slideValue[1]}&ratings[gte]=${ratingValue}`;

      if (cegoriesValues === "Reset") {
        link = `/api/v1/products?keyword=${keywords}&page=${pageValue}&price[gte]=${slideValue[0]}&price[lte]=${slideValue[1]}&ratings[gte]=${ratingValue}`;
      } else if (cegoriesValues) {
        link = `/api/v1/products?keyword=${keywords}&page=${pageValue}&price[gte]=${slideValue[0]}&price[lte]=${slideValue[1]}&ratings[gte]=${ratingValue}&category=${cegoriesValues}`;
      }

      const { data } = await axios.get(link);
      dispatch(all_ProductRequest_Success_Action(data));
      dispatch(loading_False_Action());
    } catch (error) {
      dispatch(all_ProductRequest_Fail_Action(error.response.data));
    }
  };


export const getSingleProduct =
  (id = "") =>
  async (dispatch) => {
    try {
      dispatch(all_Product_Request_Action());
      let link = `/api/v1/product/${id}`;

      const { data } = await axios.get(link);
      dispatch(get_Single_Product_Details_action(data));
      dispatch(loading_False_Action());
    } catch (error) {
      dispatch(all_ProductRequest_Fail_Action(error.response.data));
    }
  };
