import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../profile/profile.css";
import "../review/review.css";
import "./profile.css";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewList } from "../review/Review";

export function Profile({ authUsername }) {
  const { username: profileUsername } = useParams();
  const [profile, setProfile] = React.useState(null);

  function fetchProfile(username) {
    fetch(`/api/profile/${username}`)
      .then((response) => response.json())
      .then((profile) => {
        setProfile(profile);
      });
  }

  useEffect(() => {
    fetchProfile(profileUsername);
  }, [profileUsername]);

  return (
    <main>
      {profile ? (
        <ProfileFound authUsername={authUsername} profile={profile} />
      ) : (
        <ProfileNotFound />
      )}
    </main>
  );
}

function ProfileCard({ profile, numReviews }) {
  console.log("making card for profile.. " + JSON.stringify(profile));
  return (
    <div className="profile">
      <div className="profile-data">
        <h2 className="profile-firstLast">
          {profile.data.firstName || profile.data.lastName
            ? `${profile.data.firstName} ${profile.data.lastName}`
            : "Anonymous Movie Fan"}
        </h2>
        <h2 className="profile-username">@{profile.username}</h2>
        <h3 className="profile-quote">{profile.data.profileQuote}</h3>
        <h3>
          <span className="date-joined">Joined: {profile.data.joinDate}</span>
        </h3>
        <h3 className="profile-num-reviews">{numReviews} Reviews</h3>
      </div>
      <div className="profile-bio">
        <h3>Bio</h3>
        <p className="profile-bio-text">
          {profile.data.bioText
            ? profile.data.bioText
            : "This user has not written a bio yet."}
        </p>
      </div>
    </div>
  );
}

function ProfileFound({ authUsername, profile }) {
  const navigate = useNavigate();

  const [profileReviews, setProfileReviews] = React.useState([]);

  function fetchReviewsByUsername(username) {
    fetch(`/api/reviews/${username}`)
      .then((response) => response.json())
      .then((reviews) => {
        setProfileReviews(reviews);
      });
  }

  useEffect(() => {
    fetchReviewsByUsername(profile.username);
  }, [profile]);

  return (
    <>
      <ProfileCard profile={profile} numReviews={profileReviews.length} />

      {/* if the user is the same as the logged in user, show the edit profile button */}
      {authUsername === profile.username && (
        <Button
          variant="primary"
          onClick={() => navigate(`/profile/${profile.username}/edit`)}
        >
          Edit Profile
        </Button>
      )}

      {profileReviews.length === 0 ? (
        <h3 className="user-review-heading">
          @{profile.username} has not published a review
        </h3>
      ) : (
        <>
          <h3 className="user-review-heading">@{profile.username}'s Reviews</h3>
          <ReviewList authUsername={authUsername} reviews={profileReviews} />
        </>
      )}
    </>
  );
}

function ProfileNotFound() {
  return (
    <main className="container-fluid  text-center">404: User Not Found</main>
  );
}
