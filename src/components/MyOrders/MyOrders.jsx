import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../../MetaData/MetaData";
import { Typography } from "@mui/material";
import { orderError_null } from "../../Redux/Reducers/OrderReducer";
import { toast } from "react-hot-toast";
import { getMyOrders } from "../../Redux/Actions/OrderActions";
import { NavLink } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, myOrders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userSlice);

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 300,
      flex: 1,
      headerClassName: "headerBgColor",
    },
    {
      field: "Status",
      headerClassName: "headerBgColor",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.Status === "Processing" ? "redColor" : "greenColor";
      },
    },

    {
      field: "itewmQty",
      headerClassName: "headerBgColor",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "amount",
      headerClassName: "headerBgColor",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerClassName: "headerBgColor",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <NavLink to={`/order/${params.row.id}`}>
            <LaunchIcon className="launchIcon" />
          </NavLink>
        );
      },
    },
  ];

  let rows = [];

  myOrders && myOrders.forEach((item, index) => {
    rows.push({
      id: item._id,
      Status: item.orderStatus,
      itewmQty: item.orderItems.length,
      amount: item.total,
    });
  });

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 5000 });
      return () => {
        dispatch(orderError_null());
      };
    }

    dispatch(getMyOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            className="myOrdersTable"
            autoHeight
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
          />
          <Typography id="myOrdersHeading">{user.name}' Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
