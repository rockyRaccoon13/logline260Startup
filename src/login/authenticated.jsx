import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userName");
    props.onLogout();
  }

  return (
    <div
      style={{ textAlign: "center", display: "flex", flexDirection: "column" }}
    >
      <h1 onClick={() => navigate("/viewProfile")}>Hello {props.userName}!</h1>
      <Button
        className="mb-1"
        variant="primary"
        onClick={() => navigate("/reviews")}
      >
        Browse Reviews
      </Button>
      <Button
        className="mb-1"
        variant="primary"
        onClick={() => navigate("/publishReview")}
      >
        Publish Review
      </Button>

      <Button variant="secondary" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
