import axios from "axios";
import {
  adminProductRequest,
  adminProductRequest_Success,
  adminProductRequest_Fail,
  createProduct_Action,
} from "../../Reducers/Admin/Products";
import { toast } from "react-hot-toast";

import {
  adminProductDeleteRequest,
  deletedSuccessfully,
  productDeleting_Fail,
} from "../../Reducers/Admin/DeleteProduct";



//update product reducers
import {
  updateProductLoading_False_Request,
  updateProduct_Success,
  updateProduct_Fail,
} from "../../Reducers/Admin/UpdataProduct"

//single product details
import {
  singleProductDetailsLoading_False_Request,
  singleProductDetails_Success,
  singleProductDetails_Fail,

} from "../../Reducers/Admin/SingleProductDetails"

//All orders for admin
import {
  adminAllOrdersRequest,
  adminAllOrdersRequest_Success,
  adminAllOrdersRequest_Fail,
  loadingFalse,
} from "../../Reducers/Admin/AllOrders"




////////////////////////////////////////////////////////////////////////////////
export const getAllProducts_Admin = () => async (dispatch) => {
  try {
    dispatch(adminProductRequest());
    const { data } = await axios.get(`/api/v1/productAll`);
    dispatch(adminProductRequest_Success(data));
  } catch (error) {
    console.log(error);
    dispatch(adminProductRequest_Fail());
  }
};

//create a product --admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    dispatch(adminProductRequest());
    await axios.post(`/api/v1/admin/createProduct`, productData, config);
    dispatch(createProduct_Action());
    toast.success(`Create Product Successfully ✔`);
  } catch (error) {
    console.log(error);
    dispatch(adminProductRequest_Fail());
  }
};

//Delete the  product --admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    //delete main config na use krna

    dispatch(adminProductDeleteRequest());
    await axios.delete(`/api/v1/admin/deleteProduct/${id}`);
    dispatch(deletedSuccessfully());
    toast(`Product Deleted Successfully ✔`, {
      icon: "😔",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } catch (error) {
    console.log(error);
    dispatch(productDeleting_Fail());
  }
};

//single product details --admin
export const singleProductDetailsReq = (id) => async (dispatch) => {
  try {
    

    dispatch(singleProductDetailsLoading_False_Request());
   const {data} =  await axios.get(`/api/v1/product/${id}`);
    dispatch(singleProductDetails_Success(data));
   toast.success("Single Product Details Request")
  } catch (error) {
    console.log(error);
    dispatch(singleProductDetails_Fail());
  }
};


//updata the product the  product --admin
export const updateProductRequest = (id, updateData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    dispatch(updateProductLoading_False_Request());
    await axios.put(`/api/v1/admin/updateProduct/${id}`, updateData, config);
    dispatch(updateProduct_Success());
    toast(`Product Updated Successfully ✔`, {
      icon: "😎",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } catch (error) {
    console.log(error);
    dispatch(updateProduct_Fail(error));
  }
};



//get all orders --admin
export const getAllOrder = () => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());
    const { data } = await axios.get(`/api/v1/admin/getAllOrders`);
    dispatch(adminAllOrdersRequest_Success(data));
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch(adminAllOrdersRequest_Fail(error));
  }
};


//delete Single order  --admin
export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());
    await axios.delete(`/api/v1/admin/deleteOrder/${orderId}`);
    dispatch(loadingFalse())
  } catch (error) {
    console.log(error);
    dispatch(adminAllOrdersRequest_Fail(error));
  }
};



//update order
export const upDateOrder = (myForm,orderId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    dispatch(adminAllOrdersRequest());
    await axios.put(`/api/v1/admin/updateOrder/${orderId}`,myForm, config);
    dispatch(loadingFalse())
  } catch (error) {
    console.log(error);
    dispatch(adminAllOrdersRequest_Fail(error));
  }
};