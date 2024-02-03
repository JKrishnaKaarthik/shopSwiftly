import React, { useState } from "react";
import "../style/cart.css";
import img1 from "../cartImages/image1.jpg";

export default function CartItem(props) {
  const [quantity, setQuantity] = useState(0);
  function increment() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }
  function decrement() {
    setQuantity((prevQuantity) =>
      prevQuantity > 0 ? prevQuantity - 1 : prevQuantity
    );
  }

  // console.log(props);
  // console.log(`/src/cartImages/${props.url}`)
  return (
    <div className="cart-item">
      <img src={`/src/cartImages/${props.url}`} alt="product image" className="cart-prod-img" />
      <div className="cart-desc">
        <h4>
          {props.title}
        </h4>
        <p>in Stock</p>
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
          <button className="cart-delete">delete</button>
        </div>
      </div>
    </div>
  );
}
