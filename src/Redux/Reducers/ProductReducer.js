import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  loading: false,
  error: null,
  total_Products_Count: 0,
  filtered_Product: 0,
  result_Per_Page: 0,
  single_Product_Details:{},
  products: [],
  
};

const productSlice = createSlice(
  {
    name: "Products&Product",
    initialState,
    reducers: {
      all_Product_Request_Action:(state, action) =>{
        state.loading = true;
      },
      all_ProductRequest_Success_Action:(state, action)=> {
        state.products = action.payload.product;
        state.total_Products_Count = action.payload.totalProductsCount;
        state.filtered_Product = action.payload.filtered;
        state.result_Per_Page = action.payload.resultPerPage;
      },
      loading_False_Action:(state,)=> {
        state.loading = false;
      },
      all_ProductRequest_Fail_Action:(state, action)=> {
        state.loading = false;
        state.error = action.payload;
      },
      get_Single_Product_Details_action:(state, action)=> {
        state.loading = false;
        state.single_Product_Details = action.payload;
      },
      null_Error:(state, action) =>{
        state.loading = false;
        state.error = null;
      },
     
    },
  }


);

//for personal use
export const {all_Product_Request_Action,all_ProductRequest_Success_Action,all_ProductRequest_Fail_Action,null_Error,loading_False_Action,get_Single_Product_Details_action} = productSlice.actions

//for store
export default productSlice.reducer
