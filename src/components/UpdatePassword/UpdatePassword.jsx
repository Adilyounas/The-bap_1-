import React, { useRef } from "react";
import "./UpdatePassword.css";

import { updatePass } from "../../Redux/Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { null_Error } from "../../Redux/Reducers/UserReducer";
import { NavLink } from "react-router-dom";

const UpdatePassword = () => {
    const oldpassRef =useRef()
    const passRef =useRef()
    const confirmPassRef =useRef()

  const dispatch = useDispatch();
  const { loading, Authenticated, error, user } = useSelector(
    (state) => state.userSlice
  );

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordState, setShowPasswordState] = useState(true);


  const updateUserSubmitHandler = (e) => {
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(updatePass(formData));
  };

  const onChangeDataHandler = (e) => {
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }

    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const showPassword = (e)=>{
    setShowPasswordState(!showPasswordState)
    if (showPasswordState) {
        oldpassRef.current.type ="text"
        passRef.current.type ="text"
        confirmPassRef.current.type ="text"
        
    }else{
        oldpassRef.current.type ="password"
        passRef.current.type ="password"
        confirmPassRef.current.type ="password"
    }

  }

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 5000 });
      return () => {
        dispatch(null_Error());
      };
    }
  }, [error, dispatch, Authenticated, user.avatar.url, user.name, user.email]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="updateUser_container">
          <div className="form_Box">
            <form className="form" onSubmit={updateUserSubmitHandler}>
              <input
              ref={oldpassRef}
                type="password"
                placeholder="old Password"
                name="oldPassword"
                onChange={onChangeDataHandler}
              />
              <input
              ref={passRef}
              placeholder="Password"

                type="password"
                name="password"
                onChange={onChangeDataHandler}
              />
              <input
              ref={confirmPassRef}
              placeholder="Confirm Password"

                type="password"
                name="confirmPassword"
                onChange={onChangeDataHandler}
              />
              <input type="checkBox" onClick={showPassword}/>
              <button type="submit">Submit</button>
              <NavLink to={"/forgotPassword"}>Forgot Password</NavLink>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
