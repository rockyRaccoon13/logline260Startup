import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../review/review.css";
import "./publishReview.css";
import { useNavigate } from "react-router-dom";
import { MessageDialog } from "../login/messageDialog";

export function PublishReview({ username }) {
  const [displayError, setDisplayError] = React.useState(null);
  const [reviewData, setReviewData] = React.useState({
    movieTitle: "",
    date: "",
    text: "",
  });

  const navigate = useNavigate();

  async function onPublishReview() {
    const response = await fetch("api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ ...reviewData }),
    });
    if (response?.status === 200) {
      navigate("/reviews");
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "date") {
      value = reformattedDate(value);
    }
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

  const reformattedDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };

  return (
    username && (
      <main>
        <h1>New Review</h1>
        <div className="user-instruction">All fields are required.</div>

        <br />
        <div className="publish-review-form">
          <div className="review">
            <div className="review-data mb-3">
              <input
                type="text"
                className="review-movie-title"
                name="movieTitle"
                placeholder="movie title"
                required
                onChange={handleChange}
              />
              <br />

              <input
                type="date"
                className="review-date"
                name="date"
                required
                onChange={handleChange}
              />

              <div
                className="review-username"
                onClick={() => navigate(`/profile/${username}`)}
              >
                @{username}
              </div>
            </div>

            <div className="review-text">
              <label htmlFor="review-text-input">Review: </label>
              <br />
              <textarea
                id="review-text-input"
                name="text"
                rows="6"
                cols="50"
                maxLength="300"
                required
                placeholder="300 character limit"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            onClick={onPublishReview}
            disabled={
              !reviewData.movieTitle || !reviewData.date || !reviewData.text
            }
          >
            Publish
          </button>
        </div>

        <MessageDialog
          message={displayError}
          onHide={() => setDisplayError(null)}
        />
      </main>
    )
  );
}
