import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import "./login.css";

export function Login({ setAuthToken, setUserName }) {
  const navigate = useNavigate();
  let userName = null;
  let password = null;

  function setUserNameText(event) {
    userName = event.target.value;
  }

  function setPassword(event) {
    password = event.target.value;
  }

  function doAuthentication() {
    if (userName && password) {
      localStorage.setItem("authToken", "testToken");
      localStorage.setItem("userName", userName);
      setAuthToken("testToken");
      setUserName(userName);
      navigate("/reviews");
    }
  }

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

      <div className="mb-3" id="login-form">
        <div className="input-group mb-3" id="login-form-username">
          <label className="input-group-text" htmlFor="userName">
            @:
          </label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            placeholder="username"
            required
            maxLength="20"
            onChange={setUserNameText}
          />
        </div>
        <div className="input-group mb-3" id="login-form-password">
          <label className="input-group-text" htmlFor="password">
            🔒:
          </label>
          <input
            className="form-control"
            type="password"
            label="password"
            name="password"
            placeholder="password"
            required
            maxLength="20"
            onChange={setPassword}
          />
        </div>
        <div className="directions-text">
          password and username maxlength is 20 characters.
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary me-2"
            type="submit"
            id="login-button"
            onClick={doAuthentication}
          >
            Login
          </button>
          <button
            className="btn btn-secondary"
            type="submit"
            id="register-button"
            onClick={doAuthentication}
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}
