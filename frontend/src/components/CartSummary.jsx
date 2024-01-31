import React from "react";
import "../style/CartSummary.css";

export default function CartSummary() {
  return (
    <div className="cart-summary-main">
      <p>SubTotal(8 items): <strong>₹ 3,401.90</strong></p>
      <button className="cart-submit-button">Continue To Buy</button>
    </div>
  );
}
