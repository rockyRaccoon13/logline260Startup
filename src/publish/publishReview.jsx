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

  //   console.log(reviewData.movieTitle, reviewData.date, reviewData.text);
  //   if (!reviewData.movieTitle || !reviewData.date || !reviewData.text) {
  //     setDisplayError("All fields are required.");
  //     return;
  //   }
  //   const newReview = new ReviewObject(
  //     username,
  //     reviewData.movieTitle,
  //     reviewData.date,
  //     reviewData.text
  //   );
  //   console.log(newReview);
  //   let allReviews = JSON.parse(localStorage.getItem("allReviews"));
  //   if (!allReviews) {
  //     allReviews = [];
  //   }
  //   allReviews.push(newReview);
  //   localStorage.setItem("allReviews", JSON.stringify(allReviews));

  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
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
