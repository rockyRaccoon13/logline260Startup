import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./login.css";

export function Login() {
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

      <h2>Log In / Sign Up</h2>
      <p className="directions-text">
        In order to publish reviews you must be a registered user
      </p>
      <form className="mb-3" method="get" action="reviews.html">
        <div className="input-group mb-3" id="login-form-username">
          <label className="input-group-text" for="userName">
            @:
          </label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            placeholder="username"
            required
            maxlength="20"
          />
        </div>
        <div className="input-group mb-3" id="login-form-password">
          <label className="input-group-text" for="password">
            🔒:
          </label>
          <input
            className="form-control"
            type="password"
            label="password"
            name="password"
            placeholder="password"
            required
            maxlength="20"
          />
        </div>
        <div className="directions-text">
          password and username maxlength is 20 characters.
        </div>
        <button className="btn btn-primary" type="submit" id="login-button">
          Login
        </button>
        <button
          className="btn btn-secondary"
          type="submit"
          id="register-button"
        >
          Register
        </button>
      </form>
    </main>
  );
}
