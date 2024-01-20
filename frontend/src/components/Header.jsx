import React from "react";
import "./header.css";

export default function Header(props) {
  return (
    <div className="header">
      <h1 className="logo">AMAZIN</h1>
      <div className="header-items">
        <input type="text" placeholder="search" className="search" />
        <img src="../assets/images/cart-img.png" alt="" />
      </div>
    </div>
  );
}
