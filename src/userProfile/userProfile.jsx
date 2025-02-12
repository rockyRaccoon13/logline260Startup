import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../profile/profile.css";
import "../review/review.css";

export function UserProfile() {
  return (
    <main>
      <div class="profile">
        <div class="profile-data">
          <h2 id="profile-firstLast">Cosmo Cougar</h2>
          <h2 class="profile-username">@byuMascot</h2>
          <h3 id="profile-quote">Rise and Shout!</h3>
          <h3>
            <date id="date-joined">Joined: 12/25/2002</date>
          </h3>
          <h3 id="profile-user-num-reviews">2 Reviews</h3>
        </div>
        <div class="profile-bio">
          <h3>Bio</h3>
          <p class="profile-bio-text">
            BYU's number one film critic. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus egestas scelerisque urna, sed
            lacinia est congue at. Cras gravida vehicula eros. Suspendisse ac
            blandit felis. Integer neque neque, faucibus ac enim eu, tristique
            blandit lacus. Curabitur non libero ac est porta pretium. Aenean a
            eleifend eros.
          </p>
        </div>
      </div>

      <h3 class="user-review-heading">@byuMascot's Reviews</h3>

      <div class="review-list">
        {/* <!-- Sample review entry for review page. Review data and --> */}
        <div class="review">
          <div class="review-data">
            <div class="review-movie-title">Movie Title</div>
            <time class="review-watch-date">11/12/2024</time>
            <div class="review-user">
              <a href="viewProfile.html">publisherUsername</a>
            </div>
            <div class="review-likes">
              <span class="review-likes-emoji">❤️ </span>
              <span class="review-likes-num">13</span>
            </div>
          </div>
          <div class="review-text">Short char limited review of the movie.</div>
        </div>

        {/* <!-- end sample review. Sample repeats for showing layout.--> */}
        <div class="review">
          <div class="review-data">
            <div class="review-movie-title">Movie Title</div>
            <time class="review-watch-date">11/12/2024</time>
            <div class="review-user">
              <a href="viewProfile.html">publisherUsername</a>
            </div>
            <div class="review-likes">
              <span class="review-likes-emoji">❤️ </span>
              <span class="review-likes-num">13</span>
            </div>
          </div>

          <div class="review-text">
            Review data and text comes from database. Num likes (clickable
            heart) potentially update live and/or notify review publisher via
            web socket."
          </div>
        </div>
      </div>
    </main>
  );
}
