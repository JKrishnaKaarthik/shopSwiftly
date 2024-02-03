import React from "react";
import StarRating from "./StarRating";
import "../style/ProductItem.css";
import { useNavigate } from "react-router-dom";

export default function ProductItem(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    props.setProductId(props.id)
    navigate("/product");
  };
  return (
    <div className="products-item-main">
      <span className="products-image-container" onClick={handleClick}>
        <img
          src={`http://localhost:5000/images/${props.url}`}
          alt="products image"
          className="products-image"
        />
      </span>
      <div className="products-details">
        <p className="products-brand">
          <strong>{props.brand}</strong>
        </p>
        <p className="products-title">{props.title}</p>
        {/* {props.ratingCount > 0 && (
          <div className="products-rating">
            <StarRating />
            <h5 className="products-rating-count">{props.ratingCount}</h5>
          </div>
        )} */}
        <div className="products-rating">
          <StarRating />
          <h5 className="products-rating-count">{props.ratingCount}</h5>
        </div>
        <p className="products-price">₹{props.price}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}
