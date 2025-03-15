import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { AuthState } from "./authState";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";

import "./login.css";

export function Login({ username, authState, onAuthChange }) {
  const [apiQuote, setApiQuote] = React.useState("random quote");
  const [apiMovie, setApiMovie] = React.useState("random author");

  const [apiPoster, setApiPoster] = React.useState("/filmStrip.jpg");

  function getMoviePoster(movieTitle) {
    const baseUrl = "https://imdb.iamidiotareyoutoo.com";
    const uri = encodeURI(`${baseUrl}/search?q=${movieTitle}`);
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        if (data.description && data.description.length > 0) {
          setApiPoster(data.description[0]["#IMG_POSTER"]);
        }
      });
  }

  function fetchMovieQuote() {
    fetch("/api/quote")
      .then((response) => response.json())
      .then((data) => {
        setApiQuote(data.quote);
        setApiMovie(data.movie);
        getMoviePoster(data.movie);
      });
  }

  React.useEffect(() => {
    fetchMovieQuote();
  }, []);

  return (
    <main className="container-fluid text-center">
      <h1>Welcome to Logline</h1>
      {authState === AuthState.Authenticated && (
        <>
          <img alt={`${apiMovie} poster`} src={apiPoster} width="300" />

          <MovieQuoteDisplay quote={apiQuote} movie={apiMovie} />
          <Authenticated
            username={username}
            onLogout={() => onAuthChange(username, AuthState.Unauthenticated)}
          />
        </>
      )}

      {authState === AuthState.Unauthenticated && (
        <>
          <img alt="filmStrip" src="/filmStrip.jpg" width="300" />
          <MovieQuoteDisplay quote={apiQuote} movie={apiMovie} />

          <div id="welcome">
            <p className="description-text">
              Logline is a web app that allows users to log, share, and read
              short 1-2 line film reviews.
            </p>
          </div>

          <Unauthenticated
            username={username}
            onLogin={(loginUsername) => {
              onAuthChange(loginUsername, AuthState.Authenticated);
            }}
          />
        </>
      )}
    </main>
  );
}

function MovieQuoteDisplay({ quote, movie }) {
  return (
    <p id="api-quote-text">
      <span className="movie-quote-text">"{quote}"</span>
      <span> - </span>
      <span className="movie-quote-movie"> {movie}</span>
    </p>
  );
}
