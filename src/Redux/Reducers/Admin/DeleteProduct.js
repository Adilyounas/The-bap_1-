import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  loading: false,
  success: false,
  success2: false,
  error: null,
  Products: [],
};

const DeleteProduct_Admin = createSlice({
  name: "Products for admin",
  initialState,
  reducers: {
    adminProductDeleteRequest: (state, action) => {
      state.loading = true;
    },
    deletedSuccessfully: (state, action) => {
      state.success = true
      state.loading = false;
    },
    productDeleting_Fail: (state, action) => {
      state.Products = action.payload.product;
      state.loading = false;
    },
    null_deleteProduct_Error: (state, action) => {
      state.loading = false;
      state.error = null;
    },  
  },
});

export default DeleteProduct_Admin.reducer;
export const {adminProductDeleteRequest,deletedSuccessfully,productDeleting_Fail,null_deleteProduct_Error  } = DeleteProduct_Admin.actions
