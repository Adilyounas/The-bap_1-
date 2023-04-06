import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
// import bee from "../../assets/beee.jpg";
import { NavLink } from "react-router-dom";

const CardItem = ({ product }) => {
  return (
    <NavLink to={`/product/${product._id}`} style={{
      textDecoration:"none"
    }}>
      <Card
        sx={{
          maxWidth: 300,
          "&:hover": {
            cursor: "pointer",
            transform: "translateY(-13px) ",
            transition: "all linear 0.4s",
            boxShadow: "0px 7px 20px 0px rgba(0,0,0,0.5)",
          },
        }}
      >
        <CardMedia
          component="img"
          alt={`${product.name.toUpperCase()} image`}
          height="200"
          image={product.images[0].url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Rating
            name="read-only"
            precision={0.5}
            value={product.ratings}
            readOnly
          />
          <Typography variant="body2" color="text.secondary">
            ({product.numOfReviews} Reviews) {product.price}
          </Typography>
        </CardContent>
      </Card>
    </NavLink>
  );
};

export default CardItem;
