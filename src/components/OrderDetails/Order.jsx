import React, { Fragment, useEffect } from "react";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../MetaData/MetaData";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { orderError_null } from "../../Redux/Reducers/OrderReducer";
import { getOrderDetails } from "../../Redux/Actions/OrderActions";
import { Typography } from "@mui/material";

const Order = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { loading, error, orderDetail } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      return () => {
        dispatch(orderError_null());
      };
    }

    dispatch(getOrderDetails(orderId));
  }, [dispatch, error, orderId]);

  return (
    <Fragment>
      <MetaData title={"Order Detail"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <Typography component={"h1"}>
              Order # {orderDetail && orderDetail._id}
            </Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>{orderDetail.user && orderDetail.user.name}</span>
              </div>

              <div>
                <p>Phone:</p>
                <span>
                  {orderDetail.shippingInfo && orderDetail.shippingInfo.phone}
                </span>
              </div>

              <div>
                <p>Address:</p>
                <span>
                  {orderDetail.shippingInfo &&
                    `${orderDetail.shippingInfo.address}, ${orderDetail.shippingInfo.city},  ${orderDetail.shippingInfo.state},  ${orderDetail.shippingInfo.pinCode} `}
                </span>
              </div>
            </div>

            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    orderDetail.orderStatus &&
                    orderDetail.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {orderDetail.orderStatus &&
                  orderDetail.orderStatus === "Delivered"
                    ? "Paid"
                    : "Not Paid"}
                </p>
              </div>

              <div>
                <p>Amount</p>
                <span>{orderDetail.total && orderDetail.total}</span>
              </div>
            </div>

            <Typography>Order Status</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    orderDetail.orderStatus &&
                    orderDetail.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {orderDetail.orderStatus && orderDetail.orderStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="orderDetailsCartItems">
            <Typography>Order Items:</Typography>
            <div className="orderDetailsCartItemsContainer">
              {
                orderDetail.orderItems && orderDetail.orderItems.map((item)=>(
                  <div key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <NavLink to={`/product/${item._id}`}>{item.name} </NavLink>
                    <span>
                      {`${item.quantity} X ${item.price} = `  }
                      <b>{item.price * item.quantity}  </b>
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Order;
