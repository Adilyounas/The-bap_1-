import axios from "axios";
import {
  user_Request_action,
  user_Request_Success_Action,
  loading_False_Action,
  user_Fail_Action,
  loggedInUser,
  loggedOutUser,
  reset_Success
} from "../Reducers/UserReducer";
import { toast } from "react-hot-toast";

//register user
export const register = (formData) => async (dispatch) => {
  try {
    // const config = {headers:{"Content-Type":"application/json"}}
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    dispatch(user_Request_action());
    const { data } = await axios.post(`/api/v1/register`, formData, config);
    dispatch(user_Request_Success_Action(data));

    dispatch(loading_False_Action());
    toast.success("Register Successfully");
  } catch (error) {
    toast.error(error.response.data.error.errors.password.message);

    dispatch(user_Fail_Action(error.response.data));
  }
};

//login user
export const login = (user) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    // const config = { headers: { "Content-Type": "multipart/form-data" } };

    dispatch(user_Request_action());
    const { data } = await axios.post(`/api/v1/login`, user, config);
    dispatch(user_Request_Success_Action(data));

    dispatch(loading_False_Action());
    toast.success("Login Successfully");
  } catch (error) {
    dispatch(user_Fail_Action(error.response.data));
  }
};

//logged / Authenticated user action

export const authenticated = () => async (dispatch) => {
  try {
    dispatch(user_Request_action());
    const { data } = await axios.get(`/api/v1/profile`);

   await dispatch(loggedInUser(data));

    dispatch(loading_False_Action());
  } catch (error) {
    dispatch(user_Fail_Action(error.response.data));
  }
};

//logout user

export const logout = () => async (dispatch) => {
  try {
    dispatch(user_Request_action());
    await axios.get(`/api/v1/logout`);
    dispatch(loggedOutUser());
    dispatch(loading_False_Action());
  } catch (error) {
    dispatch(user_Fail_Action(error.response.data));
  }
};

//update user

export const updateUser = (formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    dispatch(user_Request_action()); //loading true
    const { data } = await axios.put(`/api/v1/updateProfile`, formData, config);

    dispatch(loading_False_Action());
    toast.success(data.message);
  } catch (error) {
    dispatch(user_Fail_Action(error.response.data));
  }
};


//update password
export const updatePass = (formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    dispatch(user_Request_action()); //loading true
    const { data } = await axios.put(`/api/v1/updatePassword`, formData, config);
    dispatch(loading_False_Action());
    toast.success(data.message);
  } catch (error) {
    dispatch(user_Fail_Action(error.response.data));
  }
};


//update password
export const forgotPass = (formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    dispatch(user_Request_action()); //loading true

   await axios.post(`/api/v1/forgot`, formData, config);
    dispatch(loading_False_Action());
    toast.success("Send Email");
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(user_Fail_Action(error.response.data));
  }
};


//update password
export const resetPass = (formData,token) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    dispatch(user_Request_action()); //loading true

    const { data } = await axios.put(`/api/v1/reset/${token}`, formData, config);
    dispatch(loading_False_Action());
    console.log(data.message);
    dispatch(reset_Success(data.message));

    toast.success(data.message);
  } catch (error) {
 
    dispatch(user_Fail_Action(error.response.data));
  }
};
