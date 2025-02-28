import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./editProfile.css";
import "../profile/profile.css";

import { useNavigate, useParams } from "react-router-dom";

export function EditProfile({ authUsername }) {
  const { username: editUsername } = useParams();

  return (
    <main>
      <h1>Editing {editUsername}'s Profile</h1>
      {editUsername === authUsername ? (
        <>
          <p>Make changes to your profile below.</p>
          <EditProfileForm username={editUsername} />
        </>
      ) : (
        <p>405: Unauthorized to make changes to {editUsername}'s profile.</p>
      )}
    </main>
  );
}

export function EditProfileForm({ username }) {
  const navigate = useNavigate();
  const [profileUser] = React.useState(
    JSON.parse(localStorage.getItem("users")).find(
      (u) => u.username === username
    )
  );

  const [formData, setFormData] = React.useState({
    firstName: profileUser.data.firstName || "",
    lastName: profileUser.data.lastName || "",
    profileQuote: profileUser.data.profileQuote || "",
    bioText: profileUser.data.bioText || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

  const handleSubmit = () => {
    let allUsers = JSON.parse(localStorage.getItem("users"));
    const curUserIndex = allUsers.findIndex((u) => u.username === username);
    // console.log(username + "  " + curUserIndex + " " + allUsers[curUserIndex]);

    allUsers[curUserIndex].data = {
      ...allUsers[curUserIndex].data,
      ...formData,
    };
    // console.log(allUsers);
    localStorage.setItem("users", JSON.stringify(allUsers));
    navigate(`/profile/${username}`);
  };

  return (
    <div id="edit-profile-form">
      <div className="profile">
        <div className="profile-data">
          <h2>
            <input
              type="text"
              id="profile-first-name"
              name="firstName"
              placeholder="first name"
              value={formData.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              id="profile-last-name"
              name="lastName"
              placeholder="last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </h2>

          <h2 id="profile-username">@{username}</h2>
          <h3>
            <input
              type="text"
              className="profile-quote"
              name="profileQuote"
              placeholder="quote"
              value={formData.profileQuote}
              onChange={handleChange}
            />
          </h3>
          <h3 id="date-joined">Joined: {profileUser.data.joinDate}</h3>
        </div>

        <div className="profile-bio">
          <h3>Bio</h3>
          <textarea
            id="bio-text-input"
            name="bioText"
            maxLength="500"
            rows="3"
            placeholder="optional - 500 character limit"
            value={formData.bioText}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="button-group mt-3">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Submit Changes
        </button>
        <button
          className="btn btn-danger"
          type="submit"
          onClick={() => navigate(`/profile/${username}`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
