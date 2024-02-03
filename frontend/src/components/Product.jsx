import React from "react";
import Header from "./Header";
import img1 from "../productsImages/image1.jpg";
import { productData } from "../data/productData";
import StarRating from "./StarRating";
import "../style/product.css";
// import axios from "axios";

export default function product() {
  // const [product, setProduct] = useState();
  let pragarphElem;
  // if (product) {
  const res = productData[0].description.split("\n");
  pragarphElem = res.map((item, id) => (
    <li className="product-desc-list" key={id}>
      {item}
    </li>
  ));
  // }
  // console.log(product);
  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await axios.get("http://localhost:5000/products");
  //     setProduct(res.data[0][0].description);
  //   };
  //   getProducts();
  // }, []);
  return (
    <div>
      <Header />
      <div className="product-main">
        <span className="product-image-container">
          <img src={img1} alt="product image" className="product-image" />
        </span>
        <div className="product-details">
          <h2 className="product-title">{productData[0].title}</h2>
          <p className="product-brand">brand:{productData[0].brand}</p>
          <span className="product-rating-span">
            <span className="product-rating-value">
              {productData[0].rating}
            </span>
            <StarRating />
            <span className="product-rating-count">
              {productData[0].ratingCount}
            </span>
          </span>
          <h3 className="product-in-stock">In stock</h3>
          <h3 className="product-price">₹{productData[0].price}</h3>
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
