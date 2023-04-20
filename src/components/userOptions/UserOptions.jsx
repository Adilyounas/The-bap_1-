import { Dashboard, ExitToApp, ListAlt, Person } from "@mui/icons-material";
import { Avatar, Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userOptions.css";
import { toast } from "react-hot-toast";
import { logout } from "../../Redux/Actions/UserActions";
import { useDispatch } from "react-redux";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const account = () => {
    navigate("/account");
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");

    toast.success("Logout Successfully");
  };

  const orders = () => {
    navigate("/myOrders");
  };

  const dashboard = () => {
    navigate("/admin/dashboard");
  };

  const actions = [
    { icon: <Person />, name: "Person", fun: account },
    { icon: <ListAlt />, name: "ListAlt", fun: orders },
    { icon: <ExitToApp />, name: "ExitTo", fun: logoutUser },
  ];
  if (user.userRole === "admin") {
    actions.unshift({ icon: <Dashboard />, name: "Dashboard", fun: dashboard });
  }

  return (
    <Fragment>
    <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : <Avatar />}
            alt={user.name}
          />
        }
      >
        {actions.map((item, index) => (
          <SpeedDialAction
            key={index}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.fun}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
