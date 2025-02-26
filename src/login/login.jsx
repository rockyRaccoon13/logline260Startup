import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { AuthState } from "./authState";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";

import "./login.css";

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="container-fluid text-center">
      <h1>Welcome to Logline</h1>

      <img alt="filmStrip" src="/filmStrip.jpg" width="300" />

      {/* <!--Insert quote from a web api--> */}
      <p id="api-quote-text">
        "random movie quote" - some person [pull quote from API]
      </p>

      <div id="welcome">
        <p className="description-text">
          Logline is a web app that allows users to log, share, and read short
          1-2 line film reviews.
        </p>
      </div>

      {authState === AuthState.Authenticated && (
        <Authenticated
          userName={userName}
          onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
        />
      )}

      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          userName={userName}
          onLogin={(loginUserName) => {
            onAuthChange(loginUserName, AuthState.Authenticated);
          }}
        />
      )}
    </main>
  );
}
