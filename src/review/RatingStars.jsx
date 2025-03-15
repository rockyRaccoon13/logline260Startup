import React from "react";

export function RatingInputStarArray({
  rating = 0,
  setRating = null,
  maxRating = 5,
}) {
  function create(n) {
    return Array.from({ length: n }, (_, index) => index + 1);
  }

  return (
    <div className="rating">
      {create(maxRating).map((num) => (
        <RatingStar
          key={num}
          num={num}
          rating={rating}
          setRating={setRating}
          showEmptyStar={true}
        ></RatingStar>
      ))}
    </div>
  );
}

function RatingStar({ num, rating, showEmptyStar = false, setRating = null }) {
  const handleClick = () => {
    let newRating = num;
    if (rating === num) {
      newRating = num - 0.5;
    }
    setRating && setRating(newRating);
  };
  const fill = num <= rating ? 1 : rating === num - 0.5 ? 0.5 : 0;
  return (
    <span onClick={handleClick} style={setRating && { cursor: "pointer" }}>
      {fill === 0 ? (
        showEmptyStar && <Star fill={fill}></Star>
      ) : (
        <Star fill={fill}></Star>
      )}
    </span>
  );
}

function Star({ fill }) {
  let src;
  if (fill === 0) {
    src = "/icons8-star-outline-100.png";
  } else if (fill === 0.5) {
    src = "/icons8-star-half-filled-100.png";
  } else if (fill === 1) {
    src = "/icons8-star-filled-100.png";
  }

  return <img src={src} alt="Star" width="20vh" />;
}
