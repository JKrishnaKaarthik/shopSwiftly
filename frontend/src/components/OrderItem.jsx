import React from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import "../style/orderItem.css";

export default function OrderItem(props) {
  console.log(props);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("productId", props.productId);
    navigate("/product");
  };

  // const timestamp = "2024-02-21T16:57:37.000Z";
  const date = new Date(props.orderDate);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return (
    <div className="order-item">
      <div className="order-item-image">
        <img
          onClick={handleClick}
          src={`/api//images/${props.image}`}
          alt="product"
        />
      </div>
      <div className="order-item-details">
        <h3 className="order-item-title" onClick={handleClick}>
          {props.title}
        </h3>
        <h4 className="order-item-brand">Brand: {props.brand}</h4>
        <div className="order-rating">
          {props.rating}
          <StarRating rating={props.rating} />
        </div>
        <h4 className="order-item-price">Price: ₹{props.price}</h4>
        <span className="order-item-date">
          Ordered on: <span className="order-date">{formattedDate}</span>
        </span>
      </div>
    </div>
  );
}
