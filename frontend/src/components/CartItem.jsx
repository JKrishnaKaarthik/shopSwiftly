import React, { useState } from "react";
import "../style/cart.css";
import { useNavigate } from "react-router-dom";

export default function CartItem(props) {
  const navigate = useNavigate();

  const handleCartProductClick = () => {
    console.log(props.productId);
    localStorage.setItem("productId", props.productId);
    navigate("/product");
  };

  return (
    <div className="cart-item">
      <img
        onClick={handleCartProductClick}
        src={`/api//images/${props.image}`}
        alt="product image"
        className="cart-prod-img product-redirect"
      />
      <div className="cart-desc">
        <h4 onClick={handleCartProductClick} className="product-redirect">
          {props.title}
        </h4>
        <p>₹{props.price}</p>
        <div className="cart-modify">
          <div className="cart-add-remove">
            <button
              className="cart-delete cart-remove"
              onClick={() => props.decrementCartItem(props.id)}
            >
              -
            </button>
            <h5>{props.itemcount}</h5>
            <button
              className="cart-delete cart-add"
              onClick={() => props.incrementCartItem(props.id)}
            >
              +
            </button>
          </div>
          <button
            className="cart-delete"
            onClick={() => props.deleteCartItem(props.id)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
