import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import { UserProfile } from "./userProfile/userProfile";
import { BrowseReviews } from "./browseReviews/browseReviews";
import { EditProfile } from "./editProfile/editProfile";
import { PublishReview } from "./publishReview/publishReview";
import { Login } from "./login/login";

import { AuthState } from "./login/authState";

export default function App() {
  const [username, setUsername] = React.useState(
    localStorage.getItem("username")
  );

  const currentAuthState = username
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
            <div className="navbar-brand">Logline</div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Login/Register
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="reviews">
                    Browse Reviews
                  </NavLink>
                </li>
              )}

              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="publish">
                    Publish Review
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to={`profile/${username}`}>
                    {username}'s profile
                  </NavLink>
                </li>
              )}
            </menu>
          </nav>
          <hr />
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Login
                username={username}
                authState={authState}
                onAuthChange={(username, authState) => {
                  setAuthState(authState), setUsername(username);
                }}
              />
            }
          />

          <Route
            path="publish"
            element={requireAuth(
              <PublishReview username={username} />,
              authState
            )}
          />
          <Route path="reviews" element={<BrowseReviews />} />
          <Route
            path="profile/:username"
            element={<UserProfile authUsername={username} />}
          />
          <Route
            path="profile/:username/edit"
            element={requireAuth(
              <EditProfile authUsername={username} />,
              authState
            )}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="fixed-bottom">
          <span className="text-reset">Benson Rowley</span>
          <a href="https://github.com/rockyRaccoon13/logline260Startup">
            GitHub
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function requireAuth(component, authState) {
  return authState === AuthState.Authenticated ? component : <Unauthorized />;
}

function Unauthorized() {
  return (
    <main className="container-fluid  text-center">
      405: Must be logged in to view this page.
    </main>
  );
}

function NotFound() {
  return (
    <main className="container-fluid  text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
