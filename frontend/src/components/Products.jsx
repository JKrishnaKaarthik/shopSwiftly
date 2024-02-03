import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProductItem from "./ProductItem";
import { productData } from "../data/productData";
import axios from "axios";

export default function Products() {
  const [product, setProduct] = useState();
  let pragarphElem;
  if (product) {
    let data =
      "Display: 6.67 FHD+ pOLED (1080x2400) Ultra-narrow bezels Display with 120Hz Refresh rate; 1000nits peak brightness; Corning Gorilla Glass 5 Display Protection\n\
Processor:Mediatek Dimensity 6080 6nm Octa-core 5G processor for high performance ; Up to 2.4GHz; Upto 12GB RAM including 6GB Virtual RAM\n\
Camera: 108MP 3X in-sensor zoom AI Triple Camera with 8MP Ultra Wide sensor and 2MP Macro camera| 16MP Front camera\n\
Battery: 5000 mAh large battery with 33W fast charger in-box and Type-C connectivity\n\
Memory, Storage & SIM: 6GB RAM | 128GB UFS 2.2 | Dual SIM (nano+nano) 5G";
    const res = product.split("\n");
    pragarphElem = res.map((item) => <li>{item}</li>);
  }
  console.log(product);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:5000/products");
      setProduct(res.data[0][0].description);
    };
    getProducts();
  }, []);

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
      {/* {pragarphElem} */}
      <Header />
      {productElements}
    </div>
  );
}
