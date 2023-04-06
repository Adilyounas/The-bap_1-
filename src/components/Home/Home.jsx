import React, { useEffect } from "react";
import MetaData from "../../MetaData/MetaData";
import CardItem from "./CardItem";
import "./home.css";
import { getProducts } from "../../Redux/Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { null_Error } from "../../Redux/Reducers/ProductReducer";
import Loader from "../../Loader/Loader";

const Home = () => {
  const { error, loading,products } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 5000,
      });
      return () => {
        dispatch(null_Error());
      };
    }
    dispatch(getProducts());
  }, [dispatch, error]);
  return (
    <>
      {loading && loading ? (
        <Loader />
      ) : (
        <div className="Home_Container">
          <MetaData title={"Home"} />
          <div className="Home_box1">
          {
            products && products.map((product)=>(
            <CardItem key={product._id} product={product} />

            ))
          }
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
