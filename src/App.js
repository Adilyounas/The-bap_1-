import Header from "./components/Header/Header";
import About from "./components/About/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Contact from "./components/Contact/Contact";
import Search from "./components/Search/Search";
import SingleProduct from "./components/singleProduct/SingleProduct";
import PageNotFound from "./components/404/PageNotFound";
import Register from "./components/Register&Login/Register_Login";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import UserOptions from "./components/userOptions/UserOptions";
import UpdatedUser from "./components/updateMe/UpdateMe.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./Loader/loader.css";
import {  useEffect, useState } from "react";
import { authenticated } from "./Redux/Actions/UserActions";
import Dashboard from "./components/Dashboard/Dashboard";
import Orders from "./components/Orders/Orders";
// import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Shipping/Shipping";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";
import ProcessPayment from "./components/Process_Payment/ProcessPayment";
import axios from "axios";
//stripe error part
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js"
import PaymentSuccess from "./components/paymentSuccess/PaymentSuccess";




function App() {
  const dispatch = useDispatch();
  const [stripeKey, setStripeKey] = useState()
  const { Authenticated, error, user } = useSelector(
    (state) => state.userSlice
  );
  const { name } = useSelector((state) => state.userSlice.user);

  //stripe part
  // const getStripeApiKey = async () => {
  //   const { data } = await axios.get("/api/v1/stripeKey")
  //   console.log(data.stripeApiKey);
  //   setStripeKey(data.stripeApiKey)
  // }

  useEffect(() => {
    dispatch(authenticated());
    // getStripeApiKey()
  }, [Authenticated, error, dispatch, name]);

  return (
    <BrowserRouter>
      <Header />
      {Authenticated && <UserOptions user={user} />}





      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keywords" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {Authenticated && <Route path="/account" element={<Account />} />}
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {Authenticated && <Route path="/me/update" element={<UpdatedUser />} />}
        {Authenticated && <Route path="/password/update" element={<UpdatePassword />} />}
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/api/v1/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/paymentuccess" element={<PaymentSuccess />} />






  
    
      <Route path="/process/payment" element={ <ProcessPayment />  } />
    
  








      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
