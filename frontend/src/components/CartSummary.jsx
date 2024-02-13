import React from "react";
import "../style/CartSummary.css";

export default function CartSummary({ total }) {
  console.log(total);
  return (
    <div className="cart-summary-main">
      <p>
        SubTotal(8 items): <strong>₹ {total}</strong>
      </p>
      <button className="cart-submit-button">Continue To Buy</button>
    </div>
  );
}
