import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProductItem from "./ProductItem";
import { productData } from "../data/productData";


export default function Products() {

  const productElements = productData.map((item) => {
    return (
      <ProductItem
        key={item.id}
        url={item.url}
        brand={item.brand}
        title={item.title}
        ratingCount={item.ratingCount}
        price={item.price}
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
