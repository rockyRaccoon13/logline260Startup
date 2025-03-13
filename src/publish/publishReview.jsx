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

              {/* TODO add Rating capability */}
              {/* <label>Rating:</label>
              <RatingInputStarArray></RatingInputStarArray> */}

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

function RatingInputStarArray({ maxRating = 5 }) {
  const [rating, setRating] = React.useState(Math.floor(maxRating / 2) + 0.5);

  function create(n) {
    return Array.from({ length: n }, (_, index) => index + 1);
  }

  return (
    <div className="rating">
      {create(maxRating).map((num) => (
        <RatingStar
          key={num}
          num={num}
          rating={rating}
          setRating={setRating}
          showEmptyStar={true}
        ></RatingStar>
      ))}
    </div>
  );
}

function RatingStar({ num, rating, showEmptyStar = false, setRating = null }) {
  const handleClick = () => {
    let newRating = num;
    if (rating === num) {
      newRating = num - 0.5;
    }
    setRating && setRating(newRating);
  };
  const fill = num <= rating ? 1 : rating === num - 0.5 ? 0.5 : 0;
  return (
    <span onClick={handleClick}>
      {fill === 0 ? (
        showEmptyStar && <Star fill={fill}></Star>
      ) : (
        <Star fill={fill}></Star>
      )}
    </span>
  );
  // return (
  //   <span>
  //     {Math.ceil(num) <= rating && <Star fill={1}></Star>}
  //     {rating === num - 0.5 && <Star fill={0.5}></Star>}
  //     {num > Math.ceil(rating) && showEmptyStar && <Star fill={0}></Star>}
  //   </span>
  // );
}

function Star({ fill }) {
  let src;
  if (fill === 0) {
    src = "/icons8-star-outline-100.png";
  } else if (fill === 0.5) {
    src = "/icons8-star-half-filled-100.png";
  } else if (fill === 1) {
    src = "/icons8-star-filled-100.png";
  }

  return <img src={src} alt="Star" width="20vh" />;
}

<Star></Star>;
