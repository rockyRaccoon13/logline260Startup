import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Likes } from "./likes";
import { ReviewList } from "../review/Review";

export function BrowseReviews({ username }) {
  let [reviews, setReviews] = useState([]);

  useEffect(() => {
    const allReviewsText = localStorage.getItem("allReviews");
    if (allReviewsText) {
      setReviews(JSON.parse(allReviewsText));
    }
    // console.log(reviews);
  }, []);

  const doLikeReview = (reviewId) => {
    if (!username) {
      return;
    }
    const allReviews = JSON.parse(localStorage.getItem("allReviews"));
    const review = allReviews.find((r) => r.id === reviewId);
    if (!review.likedBy.includes(username)) {
      review.likedBy.push(username);
    } else {
      review.likedBy = review.likedBy.filter((u) => u !== username);
    }
    localStorage.setItem("allReviews", JSON.stringify(allReviews));
    setReviews(allReviews);
  };

  return (
    <>
      {username && <Likes />}
      <main>
        <h1>Browse Reviews</h1>
        {reviews.length === 0 ? (
          <div>There are no reviews yet!</div>
        ) : (
          <ReviewList
            username={username}
            reviews={reviews}
            doLikeReview={doLikeReview}
          />
        )}
      </main>
    </>
  );
}
