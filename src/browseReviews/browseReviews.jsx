import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "../review/review.css";

export function BrowseReviews() {
  return (
    <main>
      <h1>Reviews</h1>
      <div class="review-list">
        {/* <!-- Sample review entry for review page. Review data and --> */}
        <div class="review">
          <div class="review-data">
            <div class="review-movie-title">Movie Title</div>
            <time class="review-watch-date">11/12/2024</time>
            <div class="review-user">
              <a href="viewProfile">publisherUsername</a>

              <div class="review-likes">
                <span class="review-likes-emoji">❤️ </span>
                <span class="review-likes-num">13</span>
              </div>
            </div>
          </div>
          <br />
          <div class="review-text">Short char limited review of the movie.</div>
        </div>

        {/* <!-- end sample review. Sample repeats for showing layout.--> */}

        <div class="review">
          <div class="review-data">
            <div class="review-movie-title">Movie Title</div>
            <time class="review-watch-date">11/12/2024</time>
            <div class="review-user">
              <a href="viewProfile">publisherUsername</a>

              <div class="review-likes">
                <span class="review-likes-emoji">❤️ </span>
                <span class="review-likes-num">13</span>
              </div>
            </div>
          </div>
          <br />
          <div class="review-text">
            Review data and text comes from database. Num likes (clickable
            heart) potentially update live and/or notify review publisher via
            web socket."
          </div>
        </div>

        <div class="review">
          <div class="review-data">
            <div class="review-movie-title">Lion King</div>
            <time class="review-watch-date">06/24/1994</time>
            <div class="review-user">
              <a href="viewProfile">mufasa94</a>

              <div class="review-likes">
                <span class="review-likes-emoji">❤️ </span>
                <span class="review-likes-num">300</span>
              </div>
            </div>
          </div>
          <br />
          <div class="review-text">
            Opening night! Basically Hamlet for babies. 10/10. Loved it
          </div>
        </div>
      </div>
    </main>
  );
}
