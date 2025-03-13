import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../review/review.css";
import "./publishReview.css";
import { useNavigate } from "react-router-dom";
import { MessageDialog } from "../login/messageDialog";

const maxLength = 200;

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
              <label htmlFor="review-movie-title-input">Movie:</label>
              <input
                id="review-movie-title-input"
                type="text"
                className="review-movie-title"
                name="movieTitle"
                placeholder="movie title"
                required
                onChange={handleChange}
              />
              <br />
              <label htmlFor="review-date-input">Date watched:</label>
              <input
                id="review-date-input"
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
                maxLength={maxLength}
                required
                placeholder={`${maxLength} character limit`}
                onChange={handleChange}
              ></textarea>
              <div
                className="char-count"
                style={{
                  color:
                    reviewData.text.length === maxLength
                      ? "rgb(227, 115, 115)"
                      : reviewData.text.length >= maxLength * 0.8
                      ? "rgb(211, 217, 89)"
                      : "inherit",
                }}
              >
                {`${reviewData.text.length}/${maxLength}`}
              </div>
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
