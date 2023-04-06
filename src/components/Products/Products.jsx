import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "./CardItem";
import "./products.css";
import { null_Error } from "../../Redux/Reducers/ProductReducer";
import { getProducts } from "../../Redux/Actions/ProductActions";
import Loader from "../../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
const Categories = ["Laptop", "Mobile", "Toys", "Jewellery"];

const Products = () => {

  const [slideValue, setSlideValue] = useState([0, 10000]);
  const [ratingValue, setRatingValue] = useState(0);
  const [cegoriesValues, setCegoriesValues] = useState("");
  const [pageValue, setPageValue] = useState(1);

 const Navigate = useNavigate()




  // !important log
  // console.log(Object.fromEntries([...searchParams]).name );

  const dispatch = useDispatch();
  
  const { loading, error, total_Products_Count, result_Per_Page, products,filtered_Product } =
  useSelector((state) => state.productSlice);
  const sliderHandler = (e) => {
    setSlideValue(e.target.value);
  };

  const handleChange = (e) => {
    setCegoriesValues(e.target.value);
  };

  const paginationHandler = (e, value) => {
    setPageValue(value);
  };

  const resetAllFilters =()=>{
    setSlideValue([0,10000]);
    setCegoriesValues("");
    setPageValue(1);
    setRatingValue(0)
    Navigate("/products")
  }

  let { keywords } = useParams();
  
  
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 5000,
      });
      return () => {
        dispatch(null_Error());
      };
    }



    dispatch(
      getProducts(
        slideValue,
        ratingValue,
        pageValue,
        cegoriesValues,
        keywords,
      )
    );

    
  }, [
    dispatch,
    error,
    slideValue,
    ratingValue,
    pageValue,
    cegoriesValues,
    keywords,
  ]);




  return (
    <>
    
      <div className="filters">
        <div>
          <fieldset>
            <Typography
              component="legend"
              fontSize={"large"}
            >{`${slideValue[0]}-------${slideValue[1]}`}</Typography>

            <Slider
              size="small"
              color="secondary"
              min={0}
              max={10000}
              value={slideValue}
              onChange={sliderHandler}
              valueLabelDisplay="auto"
              // disableSwap
            />
          </fieldset>
        </div>

        {/* //rating */}
        <div>
          <fieldset>
            <Typography component="legend" fontSize={"large"}>
              Ratings
            </Typography>

            <Rating
              className="ratings"
              size="large"
              name="simple-controlled"
              value={ratingValue}
              onChange={(event, newValue) => {

                if(Boolean(newValue)){
                setRatingValue(newValue);

                }else{
                setRatingValue(0);

                }

              }}
            />
          </fieldset>
        </div>

        {/*//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Category section */}

        <div>
          <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="Category"
              value={cegoriesValues}
              label="Age"
              onChange={handleChange}
              variant="standard"
            >
                {/* <MenuItem  value={"Reset"}  /> */}
                <MenuItem  value={"Reset"} sx={{color:"red" }}  >Reset</MenuItem>

              {Categories.map((cat, index) => (
                <MenuItem key={index} value={cat}  >
                  {" "}
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button onClick={resetAllFilters}>Reset</Button>
   
        
      </div>
      {/*//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Category section */}
      {loading ? (
        <Loader />
      ) : (
        <div className="products_Main_Container">
          <div className="products_div">
          {
            filtered_Product?(
             
              products.map((product) => (
                <CardItem key={product._id} product={product} />
              ))
            ):(
              <p>No Product Found</p>
            )
          }
            
          </div>
        </div>
      )}

      {filtered_Product >= result_Per_Page ? (
        <div className="pagination_div">
          <Pagination
            size="large"
            count={total_Products_Count ?Math.ceil(total_Products_Count / result_Per_Page):1 }
            variant="outlined"
            page={pageValue}
            color="primary"
            onChange={paginationHandler}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Products;
