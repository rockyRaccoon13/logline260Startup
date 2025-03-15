import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { RatingInputStarArray } from "./RatingStars";
import "./review.css";

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

export function Review({ review }) {
  const navigate = useNavigate();

  return (
    <div className="review">
      {review.posterURL && review.posterURL != "" && (
        <div className="review-poster">
          <img src={review.posterURL} alt="movie poster" />
        </div>
      )}
      <div className="review-data">
        <div className="review-info">
          <div className="review-movie-title">{review.movieTitle}</div>

          <RatingInputStarArray rating={review.rating} />
          <div
            className="review-username"
            onClick={() => navigate(`/profile/${review.username}`)}
          >
            @{review.username}
          </div>

          <time className="review-watch-date" date={review.date}>
            {review.date}
          </time>

          <ReviewLikes review={review} />
        </div>

        <div className="review-text">{review.text}</div>
      </div>
    </div>
  );
}

function ReviewLikes({ review }) {
  const [isLikedByCurUser, setIsLikedByCurUser] = React.useState(
    review.isLikedByCurUser
  );
  const [likes, setLikes] = React.useState(review.numLikes);

  const handleLike = () => {
    fetch("/api/review/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ reviewId: review.id }),
    })
      .then((response) => response.json())
      .then((likes) => {
        setLikes(likes.num);
        setIsLikedByCurUser(likes.userHasLiked);
      });
  };

  return (
    <div className="review-likes" onClick={handleLike}>
      <span className="review-likes-emoji">
        {isLikedByCurUser ? "❤️" : "🤍 "}
      </span>
      <span className="review-likes-num"> {likes}</span>
    </div>
  );
}
