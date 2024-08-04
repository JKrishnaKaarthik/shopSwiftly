import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import ProductItem from "./ProductItem";
import ProductFilter from "./ProductFilter";
import { productContext } from "../Contexts/productContext";
import axios from "axios";
import "../style/products.css";

export default function Products() {
  const [productsDetails, setProductsDetails] = useState();
  const [productsBrands, setProductsBrands] = useState();
  const { productData } = useContext(productContext);
  console.log(productData);

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (productData.productData && productData.productData.length > 0) {
          setProductsDetails(productData.productData);
          setProductsBrands(productData.brands);
        } else {
          const res = await axios.get("/api//products");
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
      <Header isProductPage={true} />
      <div className="products-main">
        <span className="product-items">{productElements}</span>
        <span className="product-filter">
          <ProductFilter productsBrands={productsBrands} />
        </span>
      </div>
    </div>
  );
}
