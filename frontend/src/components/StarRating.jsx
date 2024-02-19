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
      {[...Array(5)].map((star, index) => {
        const currIndex = index + 1;
        return (
          <div className="star-rating-main">
            <FaStar
              className="star"
              key={count++}
              size={20}
              color={currIndex <= rating ? "yellow" : "grey"}
            />
          </div>
        );
      })}
    </span>
  );
}
