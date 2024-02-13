import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";
import PurchaseCompletion from "./components/PurchaseCompletion";

export default function App() {
  const [productId, setProductId] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/products"
          element={<Products setProductId={setProductId} />}
        ></Route>
        <Route
          path="/product"
          element={<Product productId={productId} />}
        ></Route>
        <Route path="/completePurchase" element={<PurchaseCompletion />} />
      </Routes>
    </BrowserRouter>
  );
}
