import React, { useState } from "react";
import StarRating from "./StarRating";
import { useContext } from "react";
import { productContext } from "../Contexts/productContext";
import axios from "axios";
import "../style/productFilter.css";

export default function ProductFilter(props) {
  const { productData, setProdcutData } = useContext(productContext);
  const [searchRating, setSearchRating] = useState(0);
  const [searchBrands, setSearchBrands] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [searchPrice, setSearchPrice] = useState({
    startPrice: 0,
    endPrice: 0,
  });

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

  const handleProductFilter = async () => {
    try {
      const result = await axios.post("/api//search/productFilter", {
        productData,
        searchRating,
        searchPrice,
        searchBrands,
      });
      setProdcutData(result.data);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  let brandOptions;
  brandOptions = props.productsBrands?.map(
    (brand, index) =>
      brand && (
        <label className="brand-filter" key={index}>
          <input
            type="checkbox"
            value={brand}
            onChange={handleBrandSelection}
            className="filter-brands-selection"
          />
          {brand}
        </label>
      )
  );

  const handleSearchPrice = (e) => {
    const { name, value } = e.target;
    setSearchPrice((prevSearchPrice) => ({
      ...prevSearchPrice,
      [name]: value,
    }));
  };
  const handleSearchRating = (id) => {
    setSearchRating(id);
    if (selectedItemIndex === id) {
      setSelectedItemIndex(null);
    } else {
      setSelectedItemIndex(id);
    }
  };

  const filterByRating = [...Array(4)].map((_, index) => {
    const currIndex = index + 1;
    const isSelected = currIndex === selectedItemIndex;
    const borderStyleOfRating = isSelected ? { border: "2px solid black" } : {};
    return (
      <span
        className="search-rating-select"
        key={index}
        onClick={() => handleSearchRating(currIndex)}
        style={borderStyleOfRating}
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
      <button className="product-filter-apply" onClick={handleProductFilter}>
        Apply
      </button>
    </div>
  );
}
