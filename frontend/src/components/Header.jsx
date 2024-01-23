import React from "react";
import cart from "../assets/images/cart-img.png";
import profile from "../assets/images/profile.png";
import "../style/header.css";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  function cartHandleClick(){
    //in case if there is a page reload necessary
    // window.location.reload(false);
    navigate("/cart")
  }
  return (
    <div className="header">
      <h1 className="logo">AMAZIN</h1>
      <div className="header-items">
        <input type="text" placeholder="search" className="search" />
        <img src={cart} alt="image of cart" className="cart-img" onClick={cartHandleClick}/>
        <button className="your-orders">your orders</button>
        <button className="header-hello">Hello {props.username}</button>
        <img src={profile} alt="profile icon" className="header-profile-icon" />
      </div>
    </div>
  );
}
