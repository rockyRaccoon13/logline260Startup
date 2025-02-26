import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../profile/profile.css";
import "../review/review.css";

export function UserProfile() {
  return (
    <main>
      <div className="profile">
        <div className="profile-data">
          <h2 id="profile-firstLast">Cosmo Cougar</h2>
          <h2 className="profile-username">@byuMascot</h2>
          <h3 id="profile-quote">Rise and Shout!</h3>
          <h3>
            <date id="date-joined">Joined: 12/25/2002</date>
          </h3>
          <h3 id="profile-user-num-reviews">2 Reviews</h3>
        </div>
        <div className="profile-bio">
          <h3>Bio</h3>
          <p className="profile-bio-text">
            BYU's number one film critic. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus egestas scelerisque urna, sed
            lacinia est congue at. Cras gravida vehicula eros. Suspendisse ac
            blandit felis. Integer neque neque, faucibus ac enim eu, tristique
            blandit lacus. Curabitur non libero ac est porta pretium. Aenean a
            eleifend eros.
          </p>
        </div>
      </div>

      <h3 className="user-review-heading">@byuMascot's Reviews</h3>

      <div className="review-list">
        {/* <!-- Sample review entry for review page. Review data and --> */}
        <div className="review">
          <div className="review-data">
            <div className="review-movie-title">Movie Title</div>
            <time className="review-watch-date">11/12/2024</time>
            <div className="review-user">
              <a href="viewProfile">publisherUsername</a>
            </div>
            <div className="review-likes">
              <span className="review-likes-emoji">❤️ </span>
              <span className="review-likes-num">13</span>
            </div>
          </div>
          <div className="review-text">
            Short char limited review of the movie.
          </div>
        </div>

        {/* <!-- end sample review. Sample repeats for showing layout.--> */}
        <div className="review">
          <div className="review-data">
            <div className="review-movie-title">Movie Title</div>
            <time className="review-watch-date">11/12/2024</time>
            <div className="review-user">
              <a href="viewProfile">publisherUsername</a>
            </div>
            <div className="review-likes">
              <span className="review-likes-emoji">❤️ </span>
              <span className="review-likes-num">13</span>
            </div>
          </div>

          <div className="review-text">
            Review data and text comes from database. Num likes (clickable
            heart) potentially update live and/or notify review publisher via
            web socket."
          </div>
        </div>
      </div>
    </main>
  );
}
