import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReviewList } from "../review/Review";

export function BrowseReviews() {
  let [reviews, setReviews] = useState([]);

  useEffect(() => {
    const allReviewsText = localStorage.getItem("allReviews");
    if (allReviewsText) {
      setReviews(JSON.parse(allReviewsText));
    }
    // console.log(reviews);
  }, []);

  return (
    <main>
      <h1>Browse Reviews</h1>
      {reviews.length === 0 ? (
        <div>There are no reviews yet!</div>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </main>
  );
}
