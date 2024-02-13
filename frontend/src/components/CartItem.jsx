import React, { useState } from "react";
import "../style/cart.css";

export default function CartItem(props) {
  const [quantity, setQuantity] = useState(1);

  // if (quantity === 0) {
  //   props.deleteCartItem(props.id);
  // }

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
            <h5>{quantity}</h5>
            <button className="cart-delete cart-add" onClick={increment}>
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
