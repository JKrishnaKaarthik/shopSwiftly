import React, { useState } from "react";
import "../style/cart.css";
import img1 from "../cartImages/image1.jpg";

export default function CartItem() {
  const [quantity, setQuantity] = useState(0);
  function increment() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }
  function decrement() {
    setQuantity((prevQuantity) =>
      prevQuantity > 0 ? prevQuantity - 1 : prevQuantity
    );
  }
  return (
    <div className="cart-item">
      <img src={img1} alt="product image" className="cart-prod-img" />
      <div className="cart-desc">
        <h4>
          Amazon Brand - Symactive Full Graphite High Performance Badminton
          Racquet - Intermediate, S5500 (with Cover) - Black
        </h4>
        <p>in Stock</p>
        <p>1,196.80</p>
        <div className="cart-modify">
            <div className="cart-add-remove">
              <button className="cart-delete cart-remove" onClick={decrement}>
                -
              </button>
              <h5>{quantity}</h5>
              <button className="cart-delete cart-add" onClick={increment}>
                +
              </button>
            </div>
            <button className="cart-delete">delete</button>
        </div>
      </div>
    </div>
  );
}
