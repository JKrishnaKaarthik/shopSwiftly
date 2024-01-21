import React from "react";
import box1 from "../categoryImages/images/box1_image.jpg";
import "./category.css";

export default function Category(props) {
  console.log(box1);
  return (
    <div className="box">
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
