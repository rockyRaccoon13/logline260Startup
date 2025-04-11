import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./editProfile.css";
import "../profile/profile.css";
import { ErrorPage } from "../ErrorPage";

import { useNavigate, useParams } from "react-router-dom";

const maxBioTextLength = 500;

export function EditProfile({ authUsername }) {
  const { username: profileUsername } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authUsername !== profileUsername) {
      setError({ status: 409, message: "Unauthorized" });
    }
  }, [authUsername, profileUsername]);

  return (
    <main>
      <h1>Editing {profileUsername}'s Profile</h1>
      {!!error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <p>Make changes to your profile below.</p>
          <EditProfileForm
            profileUsername={profileUsername}
            setError={setError}
          />
        </>
      )}
    </main>
  );
}

export function EditProfileForm({ profileUsername, setError }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(undefined);

  const [formData, setFormData] = React.useState(undefined);

  function fetchProfile(username) {
    fetch(`/api/profile/${username}`)
      .then((response) =>
        response.json().then((data) => {
          if (response.status === 200) {
            setProfile(data);
          } else {
            setError({ status: response.status, message: data.msg });
          }
        })
      )
      .catch((error) =>
        setError({ status: 500, message: "Internal Server Error" })
      );
  }

  useEffect(() => {
    fetchProfile(profileUsername);
  }, [profileUsername]);

  useEffect(() => {
    setFormData({
      firstName: profile?.data.firstName,
      lastName: profile?.data.lastName,
      profileQuote: profile?.data.profileQuote,
      bioText: profile?.data.bioText,
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

  const handleSubmit = () => {
    fetch(`/api/profile/${profileUsername}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ data: { ...formData } }),
    });

    navigate(`/profile/${profileUsername}`);
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
              value={formData?.firstName || ""}
              onChange={handleChange}
            />

            <input
              type="text"
              id="profile-last-name"
              name="lastName"
              placeholder="last name"
              value={formData?.lastName || ""}
              onChange={handleChange}
            />
          </h2>

          <h2 id="profile-username">@{profile?.username}</h2>
          <h3>
            <input
              type="text"
              className="profile-quote"
              name="profileQuote"
              placeholder="quote"
              value={formData?.profileQuote || ""}
              onChange={handleChange}
            />
          </h3>
          <h3 id="date-joined">Joined: {profile?.data.joinDate}</h3>
        </div>

        <div className="profile-bio">
          <h3>Bio</h3>
          <textarea
            id="bio-text-input"
            name="bioText"
            maxLength="500"
            rows="3"
            placeholder="optional - 500 character limit"
            value={formData?.bioText || ""}
            onChange={handleChange}
          ></textarea>
          {formData?.bioText && (
            <div
              className="char-count"
              style={{
                color:
                  formData?.bioText.length === maxBioTextLength
                    ? "rgb(227, 115, 115)"
                    : formData?.bioText.length >= maxBioTextLength * 0.9
                    ? "rgb(211, 217, 89)"
                    : "inherit",
              }}
            >
              {`${formData?.bioText.length}/${maxBioTextLength}`}
            </div>
          )}
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
          onClick={() => navigate(`/profile/${profileUsername}`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
