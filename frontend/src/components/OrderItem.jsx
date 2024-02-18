import React from "react";

export default function OrderItem() {

  

  return (
    <div className="order-item-main">
      <div className="order-item">
        <div className="order-item-image">
          <img src="http://localhost:5000/images/image3.jpg" alt="product" />
        </div>
        <div className="order-item-details">
          <p className="order-item-title">Product Title</p>
          <p className="order-item-brand">Brand</p>
          <p className="order-item-price">Price: $100</p>
          <p className="order-item-rating">Rating: 4.5</p>
        </div>
      </div>
    </div>
  );
}
