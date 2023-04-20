import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PeopleIcon from "@mui/icons-material/People";
import { NavLink } from "react-router-dom";
//css file
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
     
      <NavLink  to={"/admin/dashboard"}>
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </NavLink>

      <NavLink>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <NavLink to={"/admin/products"}>
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </NavLink>

            <NavLink to={"/admin/CreateProduct"}>
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </NavLink>
          </TreeItem>
        </TreeView>
      </NavLink>

      <NavLink to={"/admin/AllOrders"}>
        <p>
          <ListAltIcon />
          Orders
        </p>
      </NavLink>

      <NavLink to={"/admin/users"}>
        <p>
          <PeopleIcon />
          Users
        </p>
      </NavLink>

      <NavLink to={"/admin/reviews"}>
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
