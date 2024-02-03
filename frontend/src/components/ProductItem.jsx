import React from "react";
import "../style/ProductItem.css";
import StarRating from "./StarRating";

export default function ProductItem(props) {
  return (
    <div className="product-item-main">
      <span className="product-image-container">
        <img
          src={`http://localhost:5000/images/${props.url}`}
          alt="product image"
          className="product-image"
        />
      </span>
      <div className="product-details">
        <p className="product-brand">
          <strong>{props.brand}</strong>
        </p>
        <p className="product-title">{props.title}</p>
        {/* {props.ratingCount > 0 && (
          <div className="product-rating">
            <StarRating />
            <h5 className="product-rating-count">{props.ratingCount}</h5>
          </div>
        )} */}
        <div className="product-rating">
          <StarRating />
          <h5 className="product-rating-count">{props.ratingCount}</h5>
        </div>
        <p className="product-price">₹{props.price}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}
