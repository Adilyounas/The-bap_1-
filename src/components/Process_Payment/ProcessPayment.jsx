import React, { Fragment, useRef } from "react";
import StepperComponent from "../Stepper/Stepper";
import MetaData from "../../MetaData/MetaData";
import axios from "axios";
import "./processPayment.css";
//icons
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";




import { Typography } from "@mui/material";

const ProcessPayment = () => {
  const payBtn = useRef(null);



  const orderInfo = JSON.parse(sessionStorage.getItem("OrderInfoItems"));


  const amountobj = {
    amount: Math.round(orderInfo.Total * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;


    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //type 1 data demand fullfilling

      const {
        data: { key_secret },
      } = await axios.get("/api/v1/razorApiKey");
      //type 2 data demand fullfilling
      const {
        data: { order },
      } = await axios.post("/api/v1/payment/process", amountobj, config);


      var options = {
        key: key_secret, // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: "PKR",
        name: "Adil younas",
        description: "Testing the Razor pay for project on 4/12/2023",
        image:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        order_id: order.id,
        callback_url: "http://localhost:5000/api/v1/paymentVerification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error.response);
    }
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <StepperComponent activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Infor</Typography>
          <div>
            <CreditCardIcon />
          </div>

          <div>
            <EventIcon />
          </div>

          <div>
            <VpnKeyIcon />
          </div>

          <input
            type="submit"
            value={`Pay - ${orderInfo && orderInfo.Total}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default ProcessPayment;
