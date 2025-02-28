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

  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomQuotes.length);
    const { quote, movie } = randomQuotes[randomIndex];
    setApiQuote(quote);
    setApiMovie(movie);
  }, []);

  return (
    <main className="container-fluid text-center">
      <h1>Welcome to Logline</h1>

      <img alt="filmStrip" src="/filmStrip.jpg" width="300" />

      {/* <!--Insert quote from a web api--> */}
      <p id="api-quote-text">
        <span className="movie-quote-text">"{apiQuote}"</span>
        <span> - </span>
        <span className="movie-quote-movie"> {apiMovie}</span>
      </p>

      <div id="welcome">
        <p className="description-text">
          Logline is a web app that allows users to log, share, and read short
          1-2 line film reviews.
        </p>
      </div>

      {authState === AuthState.Authenticated && (
        <Authenticated
          username={username}
          onLogout={() => onAuthChange(username, AuthState.Unauthenticated)}
        />
      )}

      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          username={username}
          onLogin={(loginUsername) => {
            onAuthChange(loginUsername, AuthState.Authenticated);
          }}
        />
      )}
    </main>
  );
}

var randomQuotes = [
  { quote: "You're gonna need a bigger boat.", movie: "Jaws" },
  { quote: "I'll be back.", movie: "The Terminator" },
  { quote: "May the Force be with you.", movie: "Star Wars" },
  { quote: "Here's looking at you, kid.", movie: "Casablanca" },
  { quote: "There's no place like home.", movie: "The Wizard of Oz" },
  { quote: "Carpe diem.", movie: "Dead Poets Society" },
  { quote: "You talking to me?", movie: "Taxi Driver" },
  { quote: "My precious.", movie: "The Lord of the Rings" },
];
