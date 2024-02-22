import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import ProductItem from "./ProductItem";
import axios from "axios";
import { productContext } from "../Contexts/productContext";

export default function Products() {
  const [productsDetails, setProductsDetails] = useState();
  const { productData } = useContext(productContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (productData && productData.length > 0)
          setProductsDetails(productData);
        else {
          const res = await axios.get("http://localhost:5000/products");
          setProductsDetails(res.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [productData]);

  let productElements =
    productsDetails &&
    productsDetails.length > 0 &&
    productsDetails.map((item) => {
      return (
        <ProductItem
          key={item.product_id}
          id={item.product_id}
          image={item.image}
          brand={item.brand}
          title={item.title}
          ratingCount={item.ratingCount}
          price={item.price}
          rating={item.rating}
        />
      );
    });
  return (
    <div>
      <Header />
      {productElements}
    </div>
  );
}
