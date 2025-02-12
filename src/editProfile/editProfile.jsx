import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../profile/profile.css";
import "./editProfile.css";

export function EditProfile() {
  return (
    <main>
      <h1>Edit Profile</h1>
      <form id="edit-profile-form" action="/viewProfile.html" method="put">
        <div class="profile">
          <div class="profile-data">
            <h2>
              <input
                type="text"
                id="profile-first-name"
                name="firstName"
                placeholder="first name"
              />

              <input
                type="text"
                id="profile-last-name"
                name="lastName"
                placeholder="last name"
              />
            </h2>

            <h2 id="profile-username">@byuMascot</h2>
            <h3>
              <input
                type="text"
                id="profile-quote-input"
                name="profileQuote"
                placeholder="quote"
              />
            </h3>
            <h3>
              <date id="date-joined">Joined: 12/25/2002</date>
            </h3>
            <h3 id="profile-user-num-reviews">3 Reviews</h3>
          </div>

          <div class="profile-bio">
            <h3>Bio</h3>
            <textarea
              id="bio-text-input"
              name="bioText"
              maxlength="500"
              row="3"
              placeholder="optional - 500 character limit"
            ></textarea>
          </div>
        </div>
        <button class="btn btn-primary" type="submit">
          Submit Changes
        </button>
      </form>
    </main>
  );
}
