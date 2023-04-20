import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  false_The_success,
  updateProduct_Error_null,
} from "../../../Redux/Reducers/Admin/UpdataProduct";

import {
  singleProductDetailsReq,
  updateProductRequest,
} from "../../../Redux/Actions/Admin/AdminActions";
import Loader from "../../../Loader/Loader";
import MetaData from "../../../MetaData/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "../../Admin/Dashboard/Sidebar";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.updateProduct
  );

  const { singlePDLoadings, singleProductDetails } = useSelector(
    (state) => state.singleProductDetails
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const Category = [
    "Laptop",
    "Footwear",
    "Botton",
    "Tops",
    "Camera",
    "SmartPhone",
  ];

  const updateSubmitHandler = (e) => {
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
    dispatch(updateProductRequest(id, formData));
  };

  const imageStorageHandler = (e) => {
    //This array contains all images
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      return () => {
        dispatch(updateProduct_Error_null());
      };
    }
    if (success) {
      Navigate("/admin/products");
      dispatch(false_The_success());
    }

    if (singleProductDetails && singleProductDetails._id !== id) {
      dispatch(singleProductDetailsReq(id));
    } else {
      setName(singleProductDetails.name);
      setDescription(singleProductDetails.description);
      setPrice(singleProductDetails.price);
      setCategory(singleProductDetails.category);
      setStock(singleProductDetails.stock);
      setOldImages(singleProductDetails.images);
    }
  }, [error, dispatch, success, Navigate, id, singleProductDetails]);

  return (
    <Fragment>
      <MetaData title={"Create Product --Admin"} />
      {loading || singlePDLoadings ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateSubmitHandler}
            >
              <h1>Update Product</h1>
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
                  <option >{category}</option>
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
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div id="createProductFormFile">
                <input
                  type="file"
                  multiple
                  onChange={imageStorageHandler}
                  name="avatar"
                  accept="image/*"
                />
              </div>

              <div id="createProductFormImage">
                {oldImages && oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt={`Avatar preve ${image}`} />
                ))}
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
                Update
              </Button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProduct;
