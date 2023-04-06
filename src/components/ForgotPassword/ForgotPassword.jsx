import React, { useState } from "react";
import "./forgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import {forgotPass} from "../../Redux/Actions/UserActions";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.userSlice);
  const [email, setemail] = useState("");
  const dispatch = useDispatch()

  const submitHandler =()=>{
    const formData = new FormData()
    formData.set("email",email)
    dispatch(forgotPass(formData))
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="forgotPassword_Container">
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
