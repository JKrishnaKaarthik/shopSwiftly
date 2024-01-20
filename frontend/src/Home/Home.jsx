import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import Footer from "../components/Footer";
import "./Home.css";

export default function Home(props) {
  return (
    <div className="home">
      <Header username={props.username} />
      <Category />
      <Footer />
    </div>
  );
}
