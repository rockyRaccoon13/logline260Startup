import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../profile/profile.css";
import "../review/review.css";
import "./profile.css";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewList } from "../review/Review";

function ProfileCard({ user, numReviews }) {
  return (
    <div className="profile">
      <div className="profile-data">
        <h2 className="profile-firstLast">
          {user.data.first || user.data.last
            ? `${user.data.first} ${user.data.last}`
            : "Anonymous Movie Fan"}
        </h2>
        <h2 className="profile-username">@{user.username}</h2>
        <h3 className="profile-quote">quote: {user.quote}</h3>
        <h3>
          <span className="date-joined">Joined: {user.data.joinDate}</span>
        </h3>
        <h3 className="profile-num-reviews">{numReviews} Reviews</h3>
      </div>
      <div className="profile-bio">
        <h3>Bio</h3>
        <p className="profile-bio-text">
          {user.data.bio
            ? user.data.bio
            : "This user has not written a bio yet."}
        </p>
      </div>
    </div>
  );
}

export function UserProfile({ authUsername: curUsername }) {
  const { username: profileUsername } = useParams();
  const [userReviews, setUserReviews] = React.useState([]);
  const [profileUser] = React.useState(
    JSON.parse(localStorage.getItem("users")).find(
      (u) => u.username === profileUsername
    )
  );

  useEffect(() => {
    // fetch user data
    console.log("userparam" + profileUsername);

    if (profileUser) {
      const allReviews = JSON.parse(localStorage.getItem("allReviews"));
      if (allReviews) {
        setUserReviews(
          allReviews.filter(
            (review) => review.username === profileUser.username
          )
        );
      }
    }
  }, [profileUsername]);
  return (
    <main>
      {profileUser ? (
        <UserProfileFound
          curUsername={curUsername}
          profileUser={profileUser}
          userReviews={userReviews}
        />
      ) : (
        <UserProfileNotFound />
      )}
    </main>
  );
}

function UserProfileFound({ curUsername, profileUser, userReviews }) {
  const navigate = useNavigate();

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
          <ReviewList reviews={userReviews} />
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
