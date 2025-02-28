import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../profile/profile.css";
import "../review/review.css";
import "./profile.css";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewList } from "../review/Review";

export function UserProfile({ authUsername: curUsername }) {
  const { username: profileUsername } = useParams();
  const [profileUser, setProfileUser] = React.useState(null);

  useEffect(() => {
    // fetch user data

    const users = JSON.parse(localStorage.getItem("users"));

    setProfileUser(users.find((u) => u.username === profileUsername));
  }, [profileUsername]);

  return (
    <main>
      {profileUser ? (
        <UserProfileFound curUsername={curUsername} profileUser={profileUser} />
      ) : (
        <UserProfileNotFound />
      )}
    </main>
  );
}

function ProfileCard({ user, numReviews }) {
  // console.log("making card for user.. " + JSON.stringify(user));
  return (
    <div className="profile">
      <div className="profile-data">
        <h2 className="profile-firstLast">
          {user.data.firstName || user.data.lastName
            ? `${user.data.firstName} ${user.data.lastName}`
            : "Anonymous Movie Fan"}
        </h2>
        <h2 className="profile-username">@{user.username}</h2>
        <h3 className="profile-quote">{user.data.profileQuote}</h3>
        <h3>
          <span className="date-joined">Joined: {user.data.joinDate}</span>
        </h3>
        <h3 className="profile-num-reviews">{numReviews} Reviews</h3>
      </div>
      <div className="profile-bio">
        <h3>Bio</h3>
        <p className="profile-bio-text">
          {user.data.bioText
            ? user.data.bioText
            : "This user has not written a bio yet."}
        </p>
      </div>
    </div>
  );
}

function UserProfileFound({ curUsername, profileUser }) {
  const navigate = useNavigate();

  const [userReviews, setUserReviews] = React.useState([]);

  function fetchUserReviews(username) {
    if (username) {
      const allReviews = JSON.parse(localStorage.getItem("allReviews"));
      if (allReviews) {
        return allReviews.filter((review) => review.username === username);
      }
    }
  }

  useEffect(() => {
    setUserReviews(fetchUserReviews(profileUser.username));
  }, [profileUser]);

  const doLikeReview = (reviewId) => {
    if (!curUsername) {
      return;
    }
    const allReviews = JSON.parse(localStorage.getItem("allReviews"));
    const review = allReviews.find((r) => r.id === reviewId);
    if (!review.likedBy.includes(curUsername)) {
      review.likedBy.push(curUsername);
    } else {
      review.likedBy = review.likedBy.filter((u) => u !== curUsername);
    }
    localStorage.setItem("allReviews", JSON.stringify(allReviews));
  };

  return (
    <>
      <ProfileCard user={profileUser} numReviews={userReviews.length} />

      {/* if the user is the same as the logged in user, show the edit profile button */}
      {curUsername === profileUser.username && (
        <Button
          variant="primary"
          onClick={() => navigate(`/profile/${profileUser.username}/edit`)}
        >
          Edit Profile
        </Button>
      )}

      {userReviews.length === 0 ? (
        <h3 className="user-review-heading">
          @{profileUser.username} has not published a review
        </h3>
      ) : (
        <>
          <h3 className="user-review-heading">
            @{profileUser.username}'s Reviews
          </h3>
          <ReviewList
            username={curUsername}
            reviews={userReviews}
            doLikeReview={doLikeReview}
          />
        </>
      )}
    </>
  );
}

function UserProfileNotFound() {
  return (
    <main className="container-fluid  text-center">404: User Not Found</main>
  );
}
