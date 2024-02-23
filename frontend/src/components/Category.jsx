import React from "react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { productContext } from "../Contexts/productContext";
import "../style/category.css";

export default function Category(props) {
  const navigate = useNavigate();
  const { setProdcutData } = useContext(productContext);
  const handleClick = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/search/category/${props.name}`
      );
      setProdcutData(res.data);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="box" onClick={handleClick}>
      <div className="box-content">
        <h2>{props.name}</h2>
        <img
          src={`/src/categoryImages/images/${props.img}`}
          className="box-img"
          alt="category img"
        />
      </div>
    </div>
  );
}