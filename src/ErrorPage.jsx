import React from "react";
import { useNavigate } from "react-router-dom";

export function ErrorPage({ error }) {
  const navigate = useNavigate();
  const loginPath = "/";

  if (error.status === 401) {
    return (
      <main className="container-fluid text-center">
        <div className="error-text">
          Error code {error.status}: {error.message}
        </div>
        <div>Please navigate to home page.</div>
        <div className="mb-3 important-text">Then LOGOUT or RELOAD PAGE.</div>
        <button
          className="btn btn-primary me-2"
          type="submit"
          id="home-button"
          onClick={() => {
            localStorage.removeItem("username");
            navigate(loginPath);
          }}
        >
          Home
        </button>
      </main>
    );
  }

  return (
    <main className="container-fluid text-center ">
      <div className="error-text mb-3">
        Error Code {error.status}: {error.message}
      </div>
      <button
        className="btn btn-primary me-2"
        type="submit"
        id="home-button"
        onClick={() => {
          navigate(loginPath);
        }}
      >
        Home
      </button>
      <div className="mb-3"></div>
      <button
        className="btn btn-primary me-2 mb-3"
        type="submit"
        id="home-button"
        onClick={() => {
          navigate("/browseReviews");
        }}
      >
        Browse Reviews
      </button>
    </main>
  );
}
