import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  null_All_Admin_Products,
  false_The_success,
} from "../../../Redux/Reducers/Admin/Products";
import { createProduct } from "../../../Redux/Actions/Admin/AdminActions";
import Loader from "../../../Loader/Loader";
import MetaData from "../../../MetaData/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "../../Admin/Dashboard/Sidebar";
import "./createProduct.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { error, loading, success2 } = useSelector(
    (state) => state.AdminProducts
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const Category = [
    "Laptop",
    "Footwear",
    "Botton",
    "Tops",
    "Camera",
    "SmartPhone",
  ];

  const createSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createProduct(formData));
  };

  const imageStorageHandler = (e) => {
    //This array contains all images
    const files = Array.from(e.target.files);
    
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagesPreview( (old) => [...old, reader.result] );
        }
      };

      reader.readAsDataURL(file);
    });
  };



  useEffect(() => {
    if (error) {
      console.log(error);
      return () => {
        dispatch(null_All_Admin_Products());
      };
    }
    if (success2) {
      Navigate("/admin/dashboard");
      dispatch(false_The_success());
    }


  }, [error, dispatch, success2, Navigate]);

  return (
    <Fragment>
      <MetaData title={"Create Product --Admin"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createSubmitHandler}
            >
              <h1>Create Product</h1>
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <DescriptionIcon />
                <textarea
                  placeholder="Product Description"
                  cols={"10"}
                  rows={"1"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <AccountTreeIcon />
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Chose Category</option>
                  {Category.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div id="createProductFormFile">
                <input type="file" multiple onChange={imageStorageHandler} name="avatar" accept="image/*" />
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt={`Avatar preve ${image}`} />
                ))}
              </div>
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Create
              </Button>
             
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CreateProduct;
