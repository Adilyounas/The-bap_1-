import React, { useEffect, useRef, useState } from "react";
import "./registerAndLogin.css";
import Avatar from "@mui/material/Avatar";
import { register } from "../../Redux/Actions/UserActions";
import { null_Error, readyToUpload } from "../../Redux/Reducers/UserReducer";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const inputFile = useRef()
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState("");
  const [hideAndShowValue, setHideAndShowValue] = useState(true);

  

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

     dispatch(register(myForm));
    setUser({
      name: "",
      email: "",
      password: "",
    });
    setAvatarPreview("")
    
  };

  const onChangeUserDataHandler = (e, value) => {

    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (e.target.files[0].size < 1000000) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
            dispatch(readyToUpload());

            console.log("Image uploaded", e.target.files[0].size);
          } else {
            toast.error("Picture Size must be less than 900kbs", {
              duration: 5000,
            });
            console.log("Image Size limit", e.target.files[0].size);
          }
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const passwordHideAndShow = (e)=>{
    setHideAndShowValue(!hideAndShowValue)
    console.log(hideAndShowValue);
    if (hideAndShowValue ===true) {
      inputFile.current.type ="text"
    }else{
      inputFile.current.type ="password"

    }
  }

  const { loading, error, readyToRegister,Authenticated } = useSelector(
    (state) => state.userSlice
  );
  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 1000 });
      return () => {
        dispatch(null_Error());
      };
    }

    if (Authenticated) {
      navigate("/account")
    }
  }, [dispatch, error, readyToRegister, avatarPreview,Authenticated,navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="registerAndLogin_main_div">
          <div className="fixed_div">
            <div className="register_div">
              <form onSubmit={registerSubmitHandler}>
                <input
                  type="name"
                  placeholder="Enter Your Name"
                  name="name"
                  required
                  value={name}
                  title="Name"
                  onChange={onChangeUserDataHandler}
                />

                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={onChangeUserDataHandler}
                  name="email"
                  required
                />

                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  ref={inputFile}
                  required
                  value={password}
                  onChange={onChangeUserDataHandler}
                />

                <div>
                  <Avatar
                    className="registerAvatar"
                    alt="Remy Sharp"
                    src={avatarPreview}
                    sx={{width:70,height:70}}
                  />

                  <input
                    type="file"
                    
                    accept="image/*"
                    name="avatar"
                    id="img"
                    onChange={onChangeUserDataHandler}
                  />
                </div>
                <input type="checkbox" value={hideAndShowValue} onClick={passwordHideAndShow}/>

                <button
                  disabled={readyToRegister}
                  className={!readyToRegister ? "disabled" : ""}
                  type="submit"
                >
                  Submit
                </button>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/forgotPassword"}>Forgot password</NavLink>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
