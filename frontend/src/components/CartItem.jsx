import React, { useState } from "react";
import axios from "axios";
import "../style/cart.css";

export default function CartItem(props) {
  async function increment() {
    console.log(props.id);
    const result = await axios.put(`http://localhost:5000/cart/${props.id}`);
    console.log(result);
  }

  function decrement() {}

  return (
    <div className="cart-item">
      <img
        src={`http://localhost:5000/images/${props.image}`}
        alt="product image"
        className="cart-prod-img"
      />
      <div className="cart-desc">
        <h4>{props.title}</h4>
        <p>₹{props.price}</p>
        <div className="cart-modify">
          <div className="cart-add-remove">
            <button className="cart-delete cart-remove" onClick={decrement}>
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
