import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import Footer from "../components/Footer";
import "./Home.css";
import { categoryData } from "./categoryData";

export default function Home(props) {
  console.log(categoryData[0].url);
  const categoryElements = categoryData.map((item) => (
    <Category img={item.url} name={item.name} key={item.id} />
  ));
  return (
    <div className="home">
      <Header username={props.username} />
      {categoryElements}
      <Footer />
    </div>
  );
}