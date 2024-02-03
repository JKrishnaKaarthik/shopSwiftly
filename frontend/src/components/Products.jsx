import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProductItem from "./ProductItem";
import { productData } from "../data/productData";


export default function Products(props) {

  const productElements = productData.map((item) => {
    return (
      <ProductItem
        key={item.id}
        id={item.id}
        url={item.url}
        brand={item.brand}
        title={item.title}
        ratingCount={item.ratingCount}
        price={item.price}
        setProductId={props.setProductId}
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
