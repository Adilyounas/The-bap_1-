import React, { useEffect } from "react";
import "./account.css";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { useSelector } from "react-redux";

const Account = () => {
  const navigate = useNavigate()
  const { loading, user,Authenticated } = useSelector((state) => state.userSlice);


  useEffect(()=>{
    if (!Authenticated) {
      navigate("/register")
    }
  })
  return (
    <>
      {loading && loading ? (
        <Loader />
      ) : Authenticated ? (
        <div className="profileContainer">
          <div>
            <h1>My profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <NavLink to={"/me/update"}>Edit Profile</NavLink>
          </div>

          {/* second div */}

          <div>
            <div>
              <h4>Full name</h4>
              <p>{user.name}</p>
            </div>

            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>

            <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>
            </div>
            <div>
              <NavLink to={"/orders"}> My Orders</NavLink>
              <NavLink to={"/password/update"}>Change Password</NavLink>
            </div>
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </>
  );
};

export default Account;
