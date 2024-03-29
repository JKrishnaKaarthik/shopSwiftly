import React from "react";
import Header from "./Header";
import Category from "./Category";
import Footer from "./Footer";
import "../style/home.css";
import { categoryData } from "../data/categoryData";

export default function Home() {
  const categoryElements = categoryData.map((item) => (
    <Category img={item.url} name={item.name} key={item.id} />
  ));

  return (
    <div className="home">
      <Header />
      <div className="category-items">{categoryElements}</div>
      <Footer />
    </div>
  );
}
