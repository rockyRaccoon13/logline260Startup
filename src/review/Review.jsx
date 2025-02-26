import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./review.css";

export function Review({ review }) {
  console.log(review);
  return (
    <div className="review">
      <div className="review-data">
        <div className="review-movie-title">{review.movieTitle}</div>
        <time className="review-watch-date" date={review.date}>
          {review.date}
        </time>
        <div className="review-user">
          <a href="viewProfile">@{review.username}</a>
        </div>
        <div className="review-likes">
          <span className="review-likes-emoji">❤️ </span>
          <span className="review-likes-num">{review.likes}</span>
        </div>
      </div>
      <br />
      <div className="review-text">{review.text}</div>
    </div>
  );
}

export function ReviewList({ reviews }) {
  let key = 0;
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <Review review={review} key={key++} />
      ))}
    </div>
  );
}
