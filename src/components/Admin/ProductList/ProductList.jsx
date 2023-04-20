import React, { Fragment, useEffect } from "react";
// {<----------------CSS FILE ------------------>}
import "./productList.css";

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
import { getAllProducts_Admin,deleteProduct } from "../../../Redux/Actions/Admin/AdminActions";

/// {<----------------Other components ------------------>}
import Loader from "../../../Loader/Loader";
import Sidebar from "../../Admin/Dashboard/Sidebar";
import MetaData from "../../../MetaData/MetaData";

const ProductList = () => {
  // {<----------------Hooks ------------------>}
  const dispatch = useDispatch();

  // {<----------------recieving data from state ------------------>}
  const { loading, error, Products } = useSelector(
    (state) => state.AdminProducts
  );

  
  // {<----------------Creating Functions------------------>}

  const alertHandler = (e) => {
    dispatch(deleteProduct(e))
    
  };

  // {<----------------Delaring variable ------------------>}
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      type: "number",
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
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
            <NavLink to={`/admin/product/${param.row.id}`}>
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
  Products &&
    Products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });


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
      <MetaData title={`All Products --Admin`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            <h1 id="productListHeading">All Products</h1>
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

export default ProductList;
