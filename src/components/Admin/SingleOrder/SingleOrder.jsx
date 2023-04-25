import "../../ConfirmOrder/confirmOrder.css";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { upDateOrder } from "../../../Redux/Actions/Admin/AdminActions";

const SingleOrder = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const { user } = useSelector((state) => state.userSlice);
  const { cartItems } = useSelector((state) => state.cartSlice);

  const { addressState, phoneNOState } = useSelector(
    (state) => state.shippingInfoSlice
  );

  const onSubmitStatusHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("status", status);
    dispatch(upDateOrder(myform, orderId));
  };

  return (
    <Fragment>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{phoneNOState}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{addressState}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item, index) => (
                  <div key={index}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <form action="" onSubmit={onSubmitStatusHandler}>
              <select onChange={(e) => setStatus(e.target.value)}>
                <option value="">Chose Category</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button disabled={status === "" ? true : false} type="submit">
                Process
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SingleOrder;
