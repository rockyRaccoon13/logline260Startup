import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./review.css";

export function ReviewList({ username, reviews, doLikeReview }) {
  let key = 0;
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <Review
          username={username}
          review={review}
          doLikeReview={doLikeReview}
          key={key++}
        />
      ))}
    </div>
  );
}

export function Review({ username, review, doLikeReview }) {
  const navigate = useNavigate();
  // console.log(review);
  return (
    <div className="review">
      <div className="review-data">
        <div className="review-movie-title">{review.movieTitle}</div>
        <time className="review-watch-date" date={review.date}>
          {review.date}
        </time>
        <div
          className="review-username"
          onClick={() => navigate(`/profile/${review.username}`)}
        >
          @{review.username}
        </div>
        <ReviewLikes
          username={username}
          review={review}
          doLikeReview={doLikeReview}
        />
      </div>
      <br />
      <div className="review-text">{review.text}</div>
    </div>
  );
}

function ReviewLikes({ username: curUsername, review, doLikeReview }) {
  const [isLikedByCurUser, setIsLikedByCurUser] = React.useState(false);
  const [likes, setLikes] = React.useState(review.likedBy.length);

  React.useEffect(() => {
    if (review.likedBy.includes(curUsername)) {
      setIsLikedByCurUser(true);
    }
  }, [curUsername]);

  const handleLike = () => {
    if (!curUsername) {
      return;
    }
    if (isLikedByCurUser) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLikedByCurUser(!isLikedByCurUser);
    doLikeReview(review.id);
  };

  return (
    <div className="review-likes" onClick={handleLike}>
      <span className="review-likes-emoji">
        {isLikedByCurUser ? "❤️" : "🤍"}
      </span>
      <span className="review-likes-num">{likes}</span>
    </div>
  );
}
