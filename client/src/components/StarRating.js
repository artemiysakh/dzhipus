import React, { useState } from 'react';
import { FaStar } from "react-icons/fa6";

const StarRating = ({ totalStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);          
  const [hover, setHover] = useState(0);             

  return (
    <div style={{ display: 'flex', cursor: 'pointer' }}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => {
              setRating(starValue);
              if(onRatingChange) onRatingChange(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
           <FaStar style={{ 
              fontSize: '1.5rem', 
              color: starValue <= (hover || rating) ? '#ffc107' : '#e4e5e9' 
            }}/>

          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
