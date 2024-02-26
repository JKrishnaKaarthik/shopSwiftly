import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import "../style/productFilter.css";

export default function ProductFilter(props) {
  const [searchRating, setSearchRating] = useState(0);
  const [searchPrice, setSearchPrice] = useState({
    startPrice: 0,
    endPrice: 0,
  });
  const [searchBrands, setSearchBrands] = useState([]);

  const handleBrandSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSearchBrands((prevSearchBrands) => [...prevSearchBrands, value]);
    } else {
      setSearchBrands((prevSearchBrands) =>
        prevSearchBrands.filter((brand) => brand !== value)
      );
    }
  };

  console.log(props.productsBrands);

  let brandOptions;
  brandOptions = props.productsBrands?.map((brand, index) => (
   brand && <label className="brand-filter" key={index}>
      <input
        type="checkbox"
        value={brand}
        onChange={handleBrandSelection}
        className="filter-brands-selection"
      />
      {brand}
    </label>
  ));

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
      {brandOptions}
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
      <button className="product-filter-apply">Apply</button>
    </div>
  );
}
