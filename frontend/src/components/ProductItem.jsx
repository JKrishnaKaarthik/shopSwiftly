import React from "react";
import StarRating from "./StarRating";
import "../style/ProductItem.css";
import { useNavigate } from "react-router-dom";

export default function ProductItem(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("productId", props.id);
    navigate("/product");
  };

  return (
    <div className="products-item-main">
      <span className="products-image-container" onClick={handleClick}>
        <img
          src={`http://localhost:5000/images/${props.image}`}
          alt="products image"
          className="products-image"
        />
      </span>
      <div className="products-details">
        <p className="products-brand">
          <strong>{props.brand}</strong>
        </p>
        <p className="products-title" onClick={handleClick}>
          {props.title}
        </p>
        <div className="products-rating">
          <p>{props.rating}</p>
          <StarRating />
          <h5 className="products-rating-count">
            {props.ratingCount?.toLocaleString()}
          </h5>
        </div>
        <p className="products-price">₹{props.price}</p>
      </div>
    </div>
  );
}
