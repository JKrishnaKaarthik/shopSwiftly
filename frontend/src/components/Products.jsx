import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProductItem from "./ProductItem";
import { productData } from "../data/productData";
import axios from "axios";

export default function Products(props) {
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get("http://localhost:5000/products");
      console.log(res.data[0]);
      setProductDetails(res.data[0]);
      console.log("getting data");
    };
    getProduct();
  }, []);

  let productElements;

  if (productDetails) {
    productElements = productDetails.map((item) => {
      return (
        <ProductItem
          key={item.product_id}
          id={item.product_id}
          url={item.image}
          brand={item.brand}
          title={item.title}
          ratingCount={item.ratingCount}
          price={item.price}
          setProductId={props.setProductId}
        />
      );
    });
  }
  return (
    <div>
      <Header />
      {productElements}
    </div>
  );
}
