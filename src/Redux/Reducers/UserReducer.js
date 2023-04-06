import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  Authenticated: false,
  readyToRegister:true,
  user: {},
  resetStatus:""

};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    user_Request_action: (state) => {
      state.loading = true;
    },
    user_Request_Success_Action: (state, action) => {
      state.user = action.payload.user;
      state.Authenticated = true;
    },
    loading_False_Action: (state, action) => {
      state.loading = false;
    },
    user_Fail_Action: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    null_Error: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    readyToUpload: (state, action) => {
      state.readyToRegister = false
    },
    loggedInUser: (state, action) => {
      state.user = action.payload.user;
      state.Authenticated = true;
    },
    loggedOutUser: (state, action) => {
      state.user = {};
      state.Authenticated = false;
    },
    reset_Success: (state, action) => {
      state.resetStatus = action.payload
    },
   

    
    
  },
});

export default userSlice.reducer;
export const {
  user_Request_action,
  user_Request_Success_Action,
  loading_False_Action,
  user_Fail_Action,
  null_Error,
  readyToUpload,
  loggedInUser,
  loggedOutUser,
  reset_Success
} = userSlice.actions;
