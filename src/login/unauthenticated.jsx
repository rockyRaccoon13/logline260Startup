import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { MessageDialog } from "./messageDialog";

export function Unauthenticated(props) {
  const [username, setUsername] = React.useState(props.username);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function registerOrLogin(endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response?.status === 200) {
      localStorage.setItem("username", username);
      props.onLogin(username);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  async function loginUser() {
    registerOrLogin("api/auth/login");
  }

  async function registerUser() {
    registerOrLogin("api/auth/create");
  }

  return (
    <>
      <h2>Log In / Sign Up</h2>
      <p className="directions-text">
        In order to publish reviews you must be a registered user
      </p>
      <div className="mb-3" id="login-form">
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="auth-username-input">
            @:
          </label>
          <input
            className="form-control"
            type="text"
            id="auth-username-input"
            name="username"
            placeholder="username"
            required
            maxLength="20"
            autoComplete="on"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="auth-password-input">
            🔒:
          </label>
          <input
            className="form-control"
            type="password"
            id="auth-password-input"
            name="password"
            placeholder="password"
            required
            maxLength="20"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="directions-text">
          password and username maxlength is 20 characters, no spaces allowed.
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary me-2"
            type="submit"
            id="login-button"
            onClick={() => loginUser()}
            disabled={!username || !password}
          >
            Login
          </button>
          <button
            className="btn btn-secondary"
            type="submit"
            id="register-button"
            onClick={() => registerUser()}
            disabled={!username || !password}
          >
            Register
          </button>
        </div>
      </div>

      <MessageDialog
        message={displayError}
        onHide={() => setDisplayError(null)}
      />
    </>
  );
}
