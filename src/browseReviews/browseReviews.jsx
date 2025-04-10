import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReviewList } from "../review/Review";

export function BrowseReviews({ username }) {
  let [reviews, setReviews] = useState([]);

  function fetchReviews() {
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((reviews) => {
        setReviews(reviews);
      });
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <main>
        <h1>Browse Reviews</h1>
        {reviews.length === 0 ? (
          <div>There are no reviews yet!</div>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </main>
    </>
  );
}
