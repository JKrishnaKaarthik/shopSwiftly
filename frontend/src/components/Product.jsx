import React from "react";
import Header from "./Header";
import { productData } from "../data/productData";
import StarRating from "./StarRating";
import "../style/product.css";
import { useState } from "react";
// import axios from "axios";

export default function product(props) {
  const item_id = props.productId - 1;
  // const [productDetails, setProductDetails] = useState(productData[item_id]);
  const productDetails = productData[item_id];
  // const [product, setProduct] = useState();
  // if (product) {
  const res = productDetails.description.split("\n");
  const pragarphElem = res.map((item, id) => (
    <li className="product-desc-list" key={id}>
      {item}
    </li>
  ));
  // }
  // console.log(product);
  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await axios.get("http://localhost:5000/products");
  //     setProduct(res.data[id][id].description);
  //   };
  //   getProducts();
  // }, []);
  return (
    <div>
      <Header />
      <div className="product-main">
        <span className="product-image-container">
          <img
            src={`src/productsImages/${productDetails.url}`}
            alt="product image"
            className="product-image"
          />
        </span>
        <div className="product-details">
          <h2 className="product-title">{productDetails.title}</h2>
          <p className="product-brand">brand:{productDetails.brand}</p>
          <span className="product-rating-span">
            <span className="product-rating-value">
              {productDetails.rating}
            </span>
            <StarRating />
            <span className="product-rating-count">
              {productDetails.ratingCount}
            </span>
          </span>
          <h3 className="product-in-stock">In stock</h3>
          <h3 className="product-price">₹{productDetails.price}</h3>
          <div className="product-buttons">
            <button className="product-buy-buttons">Add to Cart</button>
            <button className="product-buy-buttons">Buy Now</button>
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
