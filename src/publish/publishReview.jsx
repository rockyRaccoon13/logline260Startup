import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../review/review.css";
import "./publishReview.css";
import { useNavigate } from "react-router-dom";
import { MessageDialog } from "../login/messageDialog";
import { RatingInputStarArray } from "../review/RatingStars";

const maxLength = 400;
const maxRating = 5;

export function PublishReview({ username }) {
  const [displayError, setDisplayError] = React.useState(null);
  const [rating, setRating] = React.useState(2.5);

  const [reviewData, setReviewData] = React.useState({
    movieTitle: "",
    date: "",
    text: "",
    posterURL: "/filmStrip.jpg",
  });

  function setPosterUrl(url) {
    setReviewData((prevData) => ({
      ...prevData,
      posterURL: url,
    }));
  }

  const navigate = useNavigate();

  async function onPublishReview() {
    const response = await fetch("api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ ...reviewData, rating }),
    });
    if (response?.status === 200) {
      navigate("/reviews");
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error Publishing: ${body.msg}`);
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

        <br />
        <div className="publish-review-form">
          <PosterSearch
            movieTitle={reviewData?.movieTitle}
            setUpTreeValue={setPosterUrl}
          />
          <div className="review">
            <div className="review-poster">
              <img src={reviewData.posterURL} alt="movie poster" width="30px" />
            </div>
            <div className="review-data mb-3">
              <label htmlFor="review-movie-title-input">Movie:</label>
              <div style={{ fontSize: "0.5em" }}>
                After entering a title, you may search for and select a poster
                above
              </div>
              <input
                id="review-movie-title-input"
                type="text"
                className="review-movie-title"
                name="movieTitle"
                placeholder="movie title"
                required
                onChange={handleChange}
              />
              <label htmlFor="review-star-input"> Rating:</label>

              <div style={{ fontSize: "0.5em" }}>
                Select a rating from 0 to {maxRating} stars
              </div>
              <RatingInputStarArray
                id="review-star-input"
                rating={rating}
                setRating={setRating}
                maxRating={maxRating}
              ></RatingInputStarArray>
              <label htmlFor="review-date-input">Date watched: </label>
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
          <div className="user-instruction">
            <span>All fields are required (except poster).</span>
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

function PosterSearch({ movieTitle, setUpTreeValue }) {
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedPoster, setSelectedPoster] = React.useState(null);

  async function searchForPoster() {
    if (!movieTitle) {
      return;
    }
    const baseUrl = "https://imdb.iamidiotareyoutoo.com";
    const uri = encodeURI(`${baseUrl}/search?q=${movieTitle}`);
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.description);
      });
  }

  return (
    <div className="poster-search">
      <div className="poster-results">
        {searchResults.slice(0, 4).map((result) => (
          <img
            src={result["#IMG_POSTER"]}
            alt={`POSTER: ${result["#TITLE"]}-(${result["#YEAR"]})`}
            key={result["#IMDB_ID"]}
            onClick={() => {
              setSelectedPoster(result["#IMG_POSTER"]);
              console.log(result["#IMG_POSTER"]);
              setUpTreeValue(result["#IMG_POSTER"]);
            }}
            className={
              selectedPoster === result["#IMG_POSTER"] ? "selected" : ""
            }
          />
        ))}
      </div>

      <button
        className="btn btn-secondary"
        type="button"
        disabled={!movieTitle}
        onClick={searchForPoster}
      >
        Search for Poster
      </button>

      {!movieTitle && (
        <div style={{ fontSize: "0.5em" }}>
          To use, enter a movie title below
        </div>
      )}
    </div>
  );
}
