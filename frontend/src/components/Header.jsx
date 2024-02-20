import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useState } from "react";
import "../style/header.css";

export default function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search/${search}`
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSerachChange = (e) => {
    setSearch(e.target.value);
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleYourOrders = () => {
    navigate("/orders");
  };

  const cartHandleClick = () => {
    // window.location.reload(false);
    navigate("/cart");
  };
  return (
    <div className="header">
      <h1 className="logo" onClick={handleLogoClick}>
        AMAZIN
      </h1>
      <div className="header-items">
        <input
          type="text"
          placeholder="search"
          className="search"
          value={search}
          onChange={handleSerachChange}
        />
        <button onClick={handleSearch}>search</button>
        <FaCartShopping size={45} color="grey" onClick={cartHandleClick} />
        <button className="your-orders" onClick={handleYourOrders}>
          your orders
        </button>
        <button className="header-hello">
          Hello {localStorage.getItem("username")}
        </button>
        <CgProfile size={45} color="#e18826" />
      </div>
    </div>
  );
}
