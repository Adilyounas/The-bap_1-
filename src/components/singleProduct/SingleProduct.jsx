import React, { useEffect, useState } from "react";
import "./singleProduct.css";
import Carousel from "react-material-ui-carousel";
import { getSingleProduct } from "../../Redux/Actions/ProductActions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { toast } from "react-hot-toast";
import { null_Error } from "../../Redux/Reducers/ProductReducer";
import { Rating } from "@mui/material";
import { addToCart } from "../../Redux/Reducers/CartReducer";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error } = useSelector((state) => state.productSlice);
  const [quantity, setQuantity] = useState(1);

  const { product } = useSelector(
    (state) => state.productSlice.single_Product_Details
  );

  const increment = () => {
    if (product.stock <= quantity){
      toast.error("Stock Limit",{duration:700})
      return
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decrement = () => {
    if (quantity < 2){
      toast.error("Minimum 1 Product",{duration:700})
      return
    }

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        quantity,
        image: product.images[0].url,
      })
    );

    toast.success("Add To Cart")
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 5000,
      });
      return () => {
        dispatch(null_Error());
      };
    }
    dispatch(getSingleProduct(id));
  }, [dispatch, id, error]);
  return (
    <>
      {loading && loading ? (
        <Loader />
      ) : (
        <div className="singleProduct_container">
          <div className="singleProduct_Inner_Container">
            <div className="box_1">
              <Carousel>
                {product &&
                  product.images.map((item) => (
                    <img
                      className="carouselImage"
                      key={item._id}
                      src={item.url}
                      alt={item.public_id}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="box_2">
              <h1
                className="margin"
                style={{
                  fontSize: "5vmax",
                  fontWeight: "100",
                }}
              >
                Blue shirt
              </h1>
              <span className="margin">Product #45445521545445</span>
              <Rating className="margin" name="read-only" value={2} readOnly />
              <span className="margin">(4 Reviews)</span>
              <h2 className="margin">$1550</h2>

              <div>
                <button onClick={decrement}>-</button>
                <span
                  style={{
                    padding: "0 1vmax",
                  }}
                >
                  {quantity}
                </span>
                <button onClick={increment}>+</button>
              </div>
              <span className="margin">Status: </span>
              <span className="margin">Description: </span>
              <span className="margin">Status: </span>
              <button className="margin" onClick={addToCartHandler}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
