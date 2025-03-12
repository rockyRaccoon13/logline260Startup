import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: "delete",
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem("username");
        props.onLogout();
      });
  }

  return (
    <div
      style={{ textAlign: "center", display: "flex", flexDirection: "column" }}
    >
      <h1 onClick={() => navigate(`/profile/${props.username}`)}>
        Hello {props.username}!
      </h1>
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
        onClick={() => navigate("/publish")}
      >
        Publish Review
      </Button>

      <Button variant="secondary" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
