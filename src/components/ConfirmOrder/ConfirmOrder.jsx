import "./confirmOrder.css";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "./confirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import StepperComponent from "../Stepper/Stepper";
import { Typography } from "@mui/material";

const ConfirmOrder = () => {
  const Navigate = useNavigate()
  const { user } = useSelector((state) => state.userSlice);
  const { cartItems, tax, subTotal, shippingTax, Total } = useSelector(
    (state) => state.cartSlice
  );

  const { addressState, phoneNOState } = useSelector(
    (state) => state.shippingInfoSlice
  );

  const proceedToPayment = () => {
  
    const data = {
      tax,
      subTotal,
      shippingTax,
      Total,
    };
    sessionStorage.setItem("OrderInfoItems", JSON.stringify(data));
    Navigate("/process/payment")
  };

  return (
    <Fragment>
      <StepperComponent activeStep={1} />
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
                cartItems.map((item) => (
                  <div key={item.product}>
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
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingTax}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{Total}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
