import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProductItem from "./ProductItem";
import axios from "axios";

export default function Products(props) {
  const [productsDetails, setProductsDetails] = useState();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProductsDetails(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  let productElements;

  if (productsDetails) {
    productElements = productsDetails.map((item) => {
      return (
        <ProductItem
          key={item.product_id}
          id={item.product_id}
          image={item.image}
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
