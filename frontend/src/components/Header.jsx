import React from "react";
import cart from "../assets/images/cart-img.png";
import profile from "../assets/images/profile.png";
import "./header.css";

export default function Header(props) {
  return (
    <div className="header">
      <h1 className="logo">AMAZIN</h1>
      <div className="header-items">
        <input type="text" placeholder="search" className="search" />
        <img src={cart} alt="image of cart" className="cart-img" />
        <button className="your-orders">your orders</button>
        <img src={profile} alt="profile icon" className="header-profile-icon"/>
      </div>
    </div>
  );
}
