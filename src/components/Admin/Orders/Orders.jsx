import React, { Fragment, useEffect } from "react";
// {<----------------CSS FILE ------------------>}
// {<----------------React router dom ------------------>}
import { NavLink } from "react-router-dom";

// {<----------------use selector and use dispatch ------------------>}
import { useDispatch, useSelector } from "react-redux";

// {<----------------Material Ui ------------------>}
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

// {<----------------Admin/reducer for null error ------------------>}
import { null_All_Admin_Products } from "../../../Redux/Reducers/Admin/Products";

// {<----------------Admin functions action  ------------------>}
import { getAllOrder ,deleteOrder} from "../../../Redux/Actions/Admin/AdminActions";

/// {<----------------Other components ------------------>}
import Loader from "../../../Loader/Loader";
import Sidebar from "../../Admin/Dashboard/Sidebar";
import MetaData from "../../../MetaData/MetaData";






const Orders = () => {
  // {<----------------Hooks ------------------>}
  const dispatch = useDispatch();

  // {<----------------recieving data from state ------------------>}
  const { loading, error, Orders } = useSelector(
    (state) => state.AllOrders
  );

  
  // {<----------------Creating Functions------------------>}

  const alertHandler = (e) => {
    dispatch(deleteOrder(e))
    
  };

  // {<----------------Delaring variable ------------------>}
  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 200, flex: 0.5 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "qts",
      headerName: "Item QTY",
      minWidth: 150,
      type: "number",
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 270,
      type: "number",
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      flex: 0.3,
      renderCell: (param) => {
        return (
          <Fragment>
            <NavLink to={`/admin/Order/${param.row.id}`}>
              <EditIcon />
            </NavLink>
            <Button onClick={()=>alertHandler(param.row.id)} >
              <DeleteIcon  />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  // {<----------------Feed data to rows ------------------>}
  Orders &&
  Orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        qts: item.orderItems.length,
        amount: item.total,
      });
    });


  useEffect(() => {
    if (error) {
      return () => {
        dispatch(null_All_Admin_Products());
      };
    }

    dispatch(getAllOrder());
  }, [dispatch, error]);
  return (
    <Fragment>
      <MetaData title={`All Products --Admin`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            <h1 id="productListHeading">All Orders</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              autoHeight
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              // pageSizeOptions={[5, 10, 15,20,25,30]}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Orders;
