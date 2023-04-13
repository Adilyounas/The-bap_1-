import React, { useEffect, useRef, useState } from "react";
import "./cart.css";
import CartItem from "./CartItem.jsx";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Cart = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const scrollDiv = useRef();
  const Navigate = useNavigate()

  const { cartItems, presentSomeThing,tax,subTotal,shippingTax,Total } = useSelector(
    (state) => state.cartSlice
  );
  const { cartSlice } = useSelector((state) => state);

  const scrollHandler = (e) => {
    console.log((scrollDiv.current.style.width = `${scrollValue}%`));
    setScrollValue(
      Math.floor(
        (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) *
          100
      )
    );
    scrollDiv.current.style.width = scrollValue;
  };

  const checkoutHandler =()=>{
    Navigate("/shipping")
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartSlice));
  }, [cartSlice, presentSomeThing]);
  return (
    <div className="cart_Container">
      <div
        style={{ height: "5px", backgroundColor: "red" }}
        ref={scrollDiv}
        className="progress_div"
      ></div>

      <div className="Second_div">
        <div className="container_1" onScroll={scrollHandler}>
          {cartItems &&
            cartItems.map((item, index) => (
              <CartItem key={index} product={item} />
            ))}

          {presentSomeThing ? (
            ""
          ) : (
            <div className="notItemAdded">
              <p>No Item Added Yet</p>
              <Button
                style={{ marginTop: "2vmax" }}
                variant="contained"
                color="secondary"
              >
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/products"}
                >
                  Products Page
                </NavLink>
              </Button>
            </div>
          )}
        </div>
        <div className="container_2">
          <p>SubTotal = {subTotal} </p>
          <p>ShippingTax = {shippingTax} </p>
          <p>Tax = {tax} </p>
          <p>Total = {Total} </p>
          <button onClick={checkoutHandler}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
