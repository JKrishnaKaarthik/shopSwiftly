import React from "react";
import Header from "./Header";
import ProductItem from "./ProductItem";
import { productData } from "../data/productData";

export default function Products() {
  console.log(productData);
  return (
    <div>
      <Header />
      <ProductItem />
    </div>
  );
}
