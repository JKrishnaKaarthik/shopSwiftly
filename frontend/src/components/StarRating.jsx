import React from "react";
import { FaStar } from "react-icons/fa";
import "../style/starRating.css";

export default function StarRating() {
  let count = 1;
  return (
    <span className="star-rating-main">
      {[...Array(5)].map((star) => {
        return <FaStar className="star" key={count++} size={20} />;
      })}
    </span>
  );
}
