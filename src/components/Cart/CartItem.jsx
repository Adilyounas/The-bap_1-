import React, { useEffect } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  incrementReducer,
  decrementReducer,
  deleteItemFromCart,
  calculate,
} from "../../Redux/Reducers/CartReducer";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  //**cart increment
  const cartIncrement = (_id) => {
    dispatch(incrementReducer(_id));
    dispatch(calculate())
  };

  //**cart decremenet

  const cartDecrement = (_id) => {
    dispatch(decrementReducer(_id));
    dispatch(calculate())

  };




  //delete item
  const deleteItem = (_id) => {
    console.log(_id);
    dispatch(deleteItemFromCart(_id));
    dispatch(calculate())

  };

useEffect(()=>{
  dispatch(calculate())
},[dispatch])


  return (
    <div className="cartItem_div">
      <div>
        <img src={product.image} alt={`${product.name} /img`} />
        <div className="details_div">
          <h3>{product.name}</h3>
          <span>${product.price}</span>
        </div>
      </div>

      {/* nth:child(2) */}
      <div>
        <Button
          variant="standard"
          size="small"
          onClick={() => cartDecrement(product._id)}
        >
          -
        </Button>
        <span>{product.quantity}</span>
        <Button
          variant="standard"
          size="small"
          onClick={() => cartIncrement(product._id)}
        >
          +
        </Button>
        <div className="icon_div">
          <DeleteIcon className="deleteIcon" onClick={() => deleteItem(product._id)} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
