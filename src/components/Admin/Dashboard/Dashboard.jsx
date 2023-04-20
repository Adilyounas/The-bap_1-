import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar";
//css file
import "./dashboard.css";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
//chart js 2
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { null_All_Admin_Products } from "../../../Redux/Reducers/Admin/Products";
import { getAllProducts_Admin } from "../../../Redux/Actions/Admin/AdminActions";

//for register before using chart js we have to register it first
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Loader from "../../../Loader/Loader";
Chart.register(CategoryScale);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { Products, error, loading } = useSelector(
    (state) => state.AdminProducts
  );

  let outOfStock = 0;

  Products &&
    Products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock++;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"], //x-axis labels
    datasets: [
      {
        label: "Total Amount", //label name
        backgroundColor: ["rgb(197,72,49)"], //lable and line dots background color
        data: [0, 4000], //line graph data on -y axis
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"], //lable name
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"], //lable and part of ring background color
        hoverBackgroundColor: ["#4B5000", "#35014F"], //part of ring background color on hover
        data: [outOfStock, Products.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    if (error) {
      return () => {
        dispatch(null_All_Admin_Products());
      };
    }

    dispatch(getAllProducts_Admin());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />

          {/* now Dashboard section is here */}
          <div className="dashboardContainer">
            <Typography component={"h1"}>Dashboard</Typography>
            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br /> $2000
                </p>
              </div>

              <div className="dashboardSummaryBox2">
                <NavLink to={"/admin/products"}>
                  <p>Product</p>
                  <p>{Products.length}</p>
                </NavLink>

                <NavLink to={"/admin/AllOrders"}>
                  <p>Orders</p>
                  <p>4</p>
                </NavLink>

                <NavLink to={"/admin/users"}>
                  <p>Users</p>
                  <p>2</p>
                </NavLink>
              </div>
            </div>

            <div className="lineChart">
              <Line data={lineState} />
            </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
