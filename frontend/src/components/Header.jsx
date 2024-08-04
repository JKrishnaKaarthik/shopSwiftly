import React, { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useState, useContext } from "react";
import { productContext } from "../Contexts/productContext";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "../style/header.css";

export default function Header(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const { setProdcutData } = useContext(productContext);

  const handleSearch = async () => {
    try {
      localStorage.setItem("search", search);
      const response = await axios.get(`/api/search/${search}`);
      setProdcutData(response.data);
      console.log("search clicked");
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSerachChange = (e) => {
    if (e.target.value === "") {
      localStorage.removeItem("search");
    }
    setSearch(e.target.value);
  };

  const handleLogoClick = () => {
    localStorage.removeItem("search");
    navigate("/home");
  };

  const handleYourOrders = () => {
    setSearch("");
    navigate("/orders");
  };

  const cartHandleClick = () => {
    // window.location.reload(false);
    navigate("/cart");
  };
  return (
    <div className="header">
      <h2 className="logo" onClick={handleLogoClick}>
        Shop Swiftly
      </h2>
      <div className="header-items">
        <div className="search-bar">
          <input
            type="text"
            placeholder="search"
            className="search"
            value={search}
            onChange={handleSerachChange}
            onKeyDown={handleKeyDown}
          />
          <div
            style={{
              backgroundColor: "rgb(255, 115, 0)",
              borderRadius: "15%",
              padding: "3px",
            }}
          >
            <FaSearch
              size={20}
              color="black"
              cursor="pointer"
              onClick={handleSearch}
            />
          </div>
        </div>
        <FaCartShopping
          cursor="pointer"
          size={45}
          color="rgb(199, 199, 199)"
          onClick={cartHandleClick}
        />
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
