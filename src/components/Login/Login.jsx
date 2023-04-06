import React, { useEffect, useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { toast } from "react-hot-toast";
import { null_Error } from "../../Redux/Reducers/UserReducer";
import {login} from "../../Redux/Actions/UserActions"
import { NavLink, useNavigate} from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const { loading, error,Authenticated } = useSelector(
    (state) => state.userSlice
  );
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const loginSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(login(user));
  };

  const loginHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 5000 });
      return () => {
        dispatch(null_Error());
      };
    }

    if (Authenticated) {
      navigate("/account")
    }

  }, [error, dispatch,Authenticated,navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login_main_Container">
          <div className="inner_div">
            <h1>Login</h1>
            <div>
              <form action="" onSubmit={loginSubmitHandler}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={loginHandler}
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={loginHandler}
                  required
                />
              <button type="submit"  >Login</button>
              </form>
              <NavLink to={"/register"}>Register</NavLink>
              <NavLink to={"/forgotPassword"}>Forgot Passsword</NavLink>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
