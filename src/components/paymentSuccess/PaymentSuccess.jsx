import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./paymentSuccess.css";
import axios from "axios";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  //for cart items
  const {cartItems,Total,shippingTax,subTotal,tax  } = JSON.parse(localStorage.getItem("cartItems"))
  //for shipping information
  const {addressState,cityState,countryState,phoneNOState,pinCodeState,stateState   } = JSON.parse(localStorage.getItem("shippingInfoItems"))
  
  //data binding
  const dataBinding = {
    orderItems:cartItems,
    referenceNum,
    shippingInfo:{
      address:addressState,
      country:countryState,
      state:stateState,
      city:cityState,
      phone:phoneNOState,
      pinCode:pinCodeState,
    },
    subTotal:subTotal,
    tax:tax,
    shippingTax:shippingTax,
    total:Total,

  }

  // const jsonData = JSON.stringify(dataBinding)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
 async function placeOrder () {
    try {
      await axios.put("/api/v1/placeOrder",dataBinding,  config);
      
    } catch (error) {
      console.log(error);
    }
  };

useEffect(()=>{
  placeOrder()
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])


  return (
    <div className="success_Main_div">
      <div>Reference Number: {referenceNum}</div>
      <button onClick={placeOrder}>Click me</button>
    </div>
  );
};

export default PaymentSuccess;
