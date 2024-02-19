import React from "react";
import cart from "../assets/images/cart-img.png";
import profile from "../assets/images/profile.png";
import "../style/header.css";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleYourOrders = () => {
    navigate("/orders");
  };

  const cartHandleClick = () => {
    //in case if there is a page reload necessary
    // window.location.reload(false);
    navigate("/cart");
  };
  return (
    <div className="header">
      <h1 className="logo" onClick={handleLogoClick}>
        AMAZIN
      </h1>
      <div className="header-items">
        <input type="text" placeholder="search" className="search" />
        <FaCartShopping size={45} color="grey" onClick={cartHandleClick} />
        <button className="your-orders" onClick={handleYourOrders}>
          your orders
        </button>
        <button className="header-hello">
          Hello {localStorage.getItem("username")}
        </button>
        <img src={profile} alt="profile icon" className="header-profile-icon" />
      </div>
    </div>
  );
}
