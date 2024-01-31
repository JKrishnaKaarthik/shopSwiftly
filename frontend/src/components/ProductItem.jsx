import React from "react";
import "../style/ProductItem.css";
import img1 from "../productsImages/image1.jpg";
import StarRating from "./StarRating";
import { productData } from "../data/productData";

export default function ProductItem() {
  return (
    <div className="product-item-main">
      <span className="product-image-container">
        <img
          src={`src/productsImages/${productData[0].url}`}
          alt="product image"
          className="product-image"
        />
      </span>
      <div className="product-details">
        <p className="product-brand">
          <strong>{productData[0].brand}</strong>
        </p>
        <p className="product-title">{productData[0].title}</p>
        <div className="product-rating">
          <StarRating />
          <h5 className="product-rating-count">{productData[0].ratingCount}</h5>
        </div>
        <p className="product-price">₹{productData[0].price}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}
