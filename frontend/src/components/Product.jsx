import React from "react";
import Header from "./Header";
import img1 from "../productsImages/image1.jpg";
import { productData } from "../data/productData";
import StarRating from "./StarRating";

export default function product() {
  return (
    <div>
      <Header />
      <div>
        <span className="product-image-container">
          <img src={img1} alt="product image" className="product-image"/>
        </span>
        <div>
          <h2>{productData[0].title}</h2>
          <p>brand:{productData[0].brand}</p>
          <span>
            <StarRating />
            <span>{productData[0].ratingCount}</span>
          </span>
          <h3>In stock</h3>
          <h3>₹{productData[0].price}</h3>
          <div>
            <button>Add to Cart</button>
            <button>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
