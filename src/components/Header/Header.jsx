import {
  Avatar,
  Badge,
  IconButton,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/shop.png";
import SearchIcon from "@mui/icons-material/Search";
import { AccountBox, Close, ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";

const ModalContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",

  border: "none",
  outline: "none",
  width: "100%",
  height: "100vh",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const Header = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const {cartItems} = useSelector(state=>state.cartSlice)

  return (
    <Box>
      <MenuIcon
        onClick={() => setModelOpen(!modelOpen)}
        sx={{
          fontSize: "3.6rem",
          position: "fixed",
          top: "8%",
          left: "4%",
          cursor: "pointer",
          zIndex: 10,
        }}
      />
      <Modal
        open={modelOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#67ad8d",
        }}
      >
        <ModalContainer>
          <Close
            onClick={() => setModelOpen(!modelOpen)}
            sx={{
              fontSize: "3.6rem",
              position: "fixed",
              top: "8%",
              left: "4%",
              cursor: "pointer",
              color: "white",
            }}
          />
          <NavLink to="/" onClick={() => setModelOpen(!modelOpen)}>
            <Avatar
              sx={{ width: "13vmax", height: "13vmax" }}
              alt="logo"
              src={logo}
            />
          </NavLink>
          <NavLink
            onClick={() => setModelOpen(!modelOpen)}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            <Typography sx={{ color: "white",backgroundColor:"transparent" }} variant="h6">
              Home
            </Typography>
          </NavLink>

          <NavLink
            onClick={() => setModelOpen(!modelOpen)}
            to={"/products"}
            style={{ textDecoration: "none" }}
          >
            <Typography sx={{ color: "white" }} variant="h6">
              Products
            </Typography>
          </NavLink>

          <NavLink
            onClick={() => setModelOpen(!modelOpen)}
            to={"/contact"}
            style={{ textDecoration: "none" }}
          >
            <Typography sx={{ color: "white" }} variant="h6">
              Contact
            </Typography>
          </NavLink>

          <NavLink
            onClick={() => setModelOpen(!modelOpen)}
            to={"/about"}
            style={{ textDecoration: "none" }}
          >
            <Typography sx={{ color: "white" }} variant="h6">
              About
            </Typography>
          </NavLink>

          {/* //todo icons............. */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <NavLink to={"/search"}>
              <SearchIcon
                onClick={() => setModelOpen(!modelOpen)}
                sx={{
                  fontSize: "2rem",
                  color: "white",
                  margin: "0 10px",
                  cursor: "pointer",
                }}
              />
            </NavLink>

            <NavLink to={"/Cart"}>
              <IconButton aria-label="cart">
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCart
                    onClick={() => setModelOpen(!modelOpen)}
                    sx={{
                      fontSize: "2rem",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                </Badge>
              </IconButton>
            </NavLink>

            <NavLink to={"/register"}>
              <AccountBox
                onClick={() => setModelOpen(!modelOpen)}
                sx={{
                  fontSize: "2rem",
                  color: "white",
                  margin: "0 10px",
                  cursor: "pointer",
                }}
              />
            </NavLink>
          </Box>
        </ModalContainer>
      </Modal>
    </Box>
  );
};

export default Header;
