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
import { useEffect } from "react";
import { authenticated } from "./Redux/Actions/UserActions";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Orders from "./components/Orders/Orders";
// import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Shipping/Shipping";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";
import ProcessPayment from "./components/Process_Payment/ProcessPayment";
import MyOrders from "./components/MyOrders/MyOrders";
import OrderDetails from "./components/OrderDetails/Order";

//admin routes start from here
import YouJerk from "./components/Admin/NotForYou/YouJerk.jsx";
import ProductList from "./components/Admin/ProductList/ProductList.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct/UpdateProduct.jsx";
import Orderz from "./components/Admin/Orders/Orders";
import SingleOrder from "./components/Admin/SingleOrder/SingleOrder";

//stripe error part
import PaymentSuccess from "./components/paymentSuccess/PaymentSuccess";

import "./App.css";
import CreateProduct from "./components/Admin/CreateProduct/CreateProduct";

function App() {
  const dispatch = useDispatch();
  const { Authenticated, error, user } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    dispatch(authenticated());
  }, [Authenticated, error, dispatch]);

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
        {Authenticated && <Route path="/me/update" element={<UpdatedUser />} />}
        {Authenticated && (
          <Route path="/password/update" element={<UpdatePassword />} />
        )}
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/api/v1/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/process/payment" element={<ProcessPayment />} />
        <Route path="/paymentuccess" element={<PaymentSuccess />} />
        <Route
          path="/myOrders"
          element={Authenticated === false ? <Login /> : <MyOrders />}
        />

        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route
          path="/order/:orderId"
          element={Authenticated === false ? <Login /> : <OrderDetails />}
        />

        {/* //! admin routes */}

        <Route //Route No 1
          path="/admin/dashboard"
          element={
            Authenticated === false && user ? (
              <Login />
            ) : user.userRole === "admin" ? (
              <Dashboard />
            ) : (
              <YouJerk />
            )
          }
        />

        <Route //Route No 2
          path="/admin/products"
          element={
            Authenticated === false && user ? (
              <Login />
            ) : user.userRole === "admin" ? (
              <ProductList />
            ) : (
              <YouJerk />
            )
          }
        />

        <Route //Route No 3
          path="/admin/createProduct"
          element={
            Authenticated === false && user ? (
              <Login />
            ) : user.userRole === "admin" ? (
              <CreateProduct />
            ) : (
              <YouJerk />
            )
          }
        />

        <Route //Route No 4
          path="/admin/product/:id"
          element={
            Authenticated === false && user ? (
              <Login />
            ) : user.userRole === "admin" ? (
              <UpdateProduct />
            ) : (
              <YouJerk />
            )
          }
        />

        <Route //Route No 5
          path="/admin/AllOrders"
          element={
            Authenticated === false && user ? (
              <Login />
            ) : user.userRole === "admin" ? (
              <Orderz />
            ) : (
              <YouJerk />
            )
          }
        />

        <Route //Route No 6
          path="/admin/Order/:orderId"
          element={
            Authenticated === false && user ? (
              <Login />
            ) : user.userRole === "admin" ? (
              <SingleOrder />
            ) : (
              <YouJerk />
            )
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
