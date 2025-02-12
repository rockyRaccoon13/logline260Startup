import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../review/review.css";
import "./publishReview.css";

export function PublishReview() {
  return (
    <main>
      <h1>New Review</h1>
      <div class="user-instruction">All fields are required.</div>

      <br />

      <form action="/reviews" method="get">
        {/* <!--method should be put later--> */}
        <div class="review">
          <div class="review-data mb-3">
            <input
              type="text"
              id="review-movie-title-input"
              name="movieTitle"
              placeholder="movie title"
              required
            />
            <br />

            <input
              type="date"
              id="review-movie-title-input"
              name="dateWatched"
              required
            />
          </div>

          <div class="review-text">
            <label for="review-text-input">Review: </label>
            <br />
            <textarea
              id="review-text-input"
              name="reviewText"
              rows="6"
              cols="50"
              maxlength="300"
              required
              placeholder="300 character limit"
            ></textarea>
          </div>
        </div>

        <button class="btn btn-primary" type="submit">
          Publish
        </button>
      </form>
    </main>
  );
}
