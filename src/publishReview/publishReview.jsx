import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../review/review.css";
import "./publishReview.css";
import { useNavigate } from "react-router-dom";
import { Review } from "../review/Review";

export function PublishReview({ userName }) {
  let movieTitle = "";
  let date = "";
  let reviewText = "";

  const navigate = useNavigate();

  const onPublishReview = (movieTitle, date, reviewText) => {
    const newReview = new Review(movieTitle, date, userName, reviewText);
    let allReviews = JSON.parse(localStorage.getItem("allReviews"));
    if (!allReviews) {
      allReviews = [];
    }
    allReviews.push(newReview);
    localStorage.setItem("allReviews", JSON.stringify(allReviews));
    navigate("/reviews");
  };

  return (
    <main>
      <h1>New Review</h1>
      <div className="user-instruction">All fields are required.</div>

      <br />
      <div className="publish-review-form">
        <div className="review">
          <div className="review-data mb-3">
            <input
              type="text"
              id="review-movie-title-input"
              name="movieTitle"
              placeholder="movie title"
              required
              onChange={(e) => (movieTitle = e.target.value)}
            />
            <br />

            <input
              type="date"
              id="review-movie-title-input"
              name="date"
              required
              onChange={(e) => (date = e.target.value)}
            />

            <div className="review-user">
              <a href="viewProfile">@{userName}</a>
            </div>
          </div>

          <div className="review-text">
            <label htmlFor="review-text-input">Review: </label>
            <br />
            <textarea
              id="review-text-input"
              name="reviewText"
              rows="6"
              cols="50"
              maxLength="300"
              required
              placeholder="300 character limit"
              onChange={(e) => (reviewText = e.target.value)}
            ></textarea>
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => onPublishReview(movieTitle, date, reviewText)}
        >
          Publish
        </button>
      </div>
    </main>
  );
}
