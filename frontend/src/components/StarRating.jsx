import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "../style/starRating.css";

export default function StarRating(props) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(Math.round(props.rating));
  }, []);
  let count = 1;
  return (
    <span className="star-rating-main">
      {[...Array(5)].map((_, index) => {
        const currIndex = index + 1;
        return (
          <div key={index} className="star-rating-main">
            <FaStar
              className="star"
              size={20}
              color={currIndex <= rating ? "yellow" : "grey"}
            />
          </div>
        );
      })}
    </span>
  );
}
