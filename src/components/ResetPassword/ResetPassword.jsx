import React, { useRef } from "react";
import "./resetPassword.css";

import { resetPass } from "../../Redux/Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { null_Error } from "../../Redux/Reducers/UserReducer";
import {  useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const passRef = useRef();
  const confirmPassRef = useRef();
  const {token} = useParams()
  const Navigate = useNavigate()

  const dispatch = useDispatch();
  const { loading, error,resetStatus } = useSelector(
    (state) => state.userSlice
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordState, setShowPasswordState] = useState(true);

  const updateUserSubmitHandler = (e) => {
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPass(formData,token));
  };

  const onChangeDataHandler = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }

    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const showPassword = (e) => {
    setShowPasswordState(!showPasswordState);
    if (showPasswordState) {
      passRef.current.type = "text";
      confirmPassRef.current.type = "text";
    } else {
      passRef.current.type = "password";
      confirmPassRef.current.type = "password";
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 5000 });
      return () => {
        dispatch(null_Error());
      };
    }

    if (resetStatus) {
      toast.error(resetStatus, { duration: 3000 });
        Navigate("/login")
    }
  }, [error, dispatch,resetStatus,Navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="updateUser_container">
          <div className="form_Box">
            <form className="form" onSubmit={updateUserSubmitHandler}>
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
              <input type="checkBox" onClick={showPassword} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
