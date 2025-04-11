import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReviewList } from "../review/Review";

export function BrowseReviewsList({ username, onSetError }) {
  let [reviews, setReviews] = useState(undefined);

  function fetchReviews() {
    fetch("/api/reviews")
      .then((response) =>
        response.json().then((data) => {
          if (response.status === 200) {
            setReviews(data);
          } else {
            onSetError({ status: response.status, message: data.msg });
          }
        })
      )
      .catch((error) =>
        onSetError({ status: 500, message: "Internal Server Error" })
      );
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <main>
        <>
          <h1>Browse Reviews</h1>
          {reviews === undefined ? (
            <div>Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div>There are no reviews yet!</div>
          ) : (
            <ReviewList reviews={reviews} />
          )}
        </>
      </main>
    </>
  );
}
