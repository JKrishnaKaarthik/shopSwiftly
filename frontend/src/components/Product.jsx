import React, { useEffect, useState } from "react";
import Header from "./Header";
import StarRating from "./StarRating";
import "../style/product.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const initalState = {
    id: 1,
    url: "",
    brand: "",
    ratingCount: 0,
    rating: 0,
    description: "",
    title: "",
    price: "",
  };
  const [productInfo, setProductInfo] = useState(initalState);
  const navigate = useNavigate();

  const res = productInfo.description.split("\n");
  const pragarphElem = res.map(
    (item, id) =>
      item !== "" && (
        <li className="product-desc-list" key={id}>
          {item}
        </li>
      )
  );

  const handleAddToCart = async () => {
    const username = localStorage.getItem("username");
    const productId = localStorage.getItem("productId");
    const res = await axios.post(`http://localhost:5000/cart`, {
      productId: productId,
      username: username,
    });
    navigate("/cart");
  };

  const handleBuyNow = async () => {
    const username = localStorage.getItem("username");
    const productId = localStorage.getItem("productId");
    const res = await axios.post(`http://localhost:5000/orders`, {
      productId: productId,
      username: username,
    });
    console.log(res.data);
    navigate("/completePurchase");
  };

  useEffect(() => {
    const getProduct = async (productId) => {
      const res = await axios.get(`http://localhost:5000/product/${productId}`);
      setProductInfo(res.data);
    };
    const productId = localStorage.getItem("productId");
    getProduct(productId);
  }, []);

  return (
    <div>
      <Header />
      <div className="product-main">
        <span className="product-image-container">
          <img
            src={`http://localhost:5000/images/${productInfo.image}`}
            alt="product image"
            className="product-image"
          />
        </span>
        <div className="product-details">
          <h2 className="product-title">{productInfo.title}</h2>
          <p className="product-brand">brand:{productInfo.brand}</p>
          <span className="product-rating-span">
            <span className="product-rating-value">{productInfo.rating}</span>
            <StarRating />
            <span className="product-rating-count">
              {productInfo.ratingCount}
            </span>
          </span>
          <h3 className="product-in-stock">In stock</h3>
          <h3 className="product-price">₹{productInfo.price}</h3>
          <div className="product-buttons">
            <button className="product-buy-buttons" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="product-buy-buttons" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
          <span className="product-description">
            <h4 className="product-about-item">About the item</h4>
            {pragarphElem}
          </span>
        </div>
      </div>
    </div>
  );
}
