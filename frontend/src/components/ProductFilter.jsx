import React, { useState } from "react";
import StarRating from "./StarRating";
import "../style/productFilter.css";

export default function ProductFilter() {
  const [searchRating, setSearchRating] = useState(0);
  const [searchPrice, setSearchPrice] = useState({
    startPrice: 0,
    endPrice: 0,
  });

  const handleSearchPrice = (e) => {
    const { name, value } = e.target;
    setSearchPrice((prevSearchPrice) => ({
      ...prevSearchPrice,
      [name]: value,
    }));
  };
  const handleSearchRating = (id) => {
    setSearchRating(id);
  };
  const filterByRating = [...Array(4)].map((_, index) => {
    const currIndex = index + 1;
    return (
      <span
        className="search-rating-select"
        key={index}
        onClick={() => handleSearchRating(currIndex)}
      >
        <StarRating rating={currIndex} />
        <p>& up</p>
      </span>
    );
  });

  return (
    <div className="rating-filter">
      <h3>Product Serach Filter</h3>
      <h4>Brand</h4>
      <h4>Price Range</h4>
      <label htmlFor="startPrice">Start Price</label>
      <input
        type="number"
        placeholder="Starting Price"
        name="startPrice"
        value={searchPrice.startPrice}
        onChange={handleSearchPrice}
      />
      to
      <label htmlFor="startPrice">End Price</label>
      <input
        type="number"
        placeholder="Ending Price"
        name="endPrice"
        value={searchPrice.endPrice}
        onChange={handleSearchPrice}
      />
      <h4>Avg custormer Rating</h4>
      <span className="product-filter-rating">{filterByRating}</span>
    </div>
  );
}
