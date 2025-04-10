import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { Profile } from "./profile/viewProfile";
import { Browse } from "./browseReviews/Browse";
import { EditProfile } from "./profile/editProfile";
import { PublishReview } from "./publish/publishReview";
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
                    Browse
                  </NavLink>
                </li>
              )}

              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="publish">
                    Publish
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to={`profile/${username}`}>
                    {username}
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
            path="/publish"
            element={requireAuth(
              <PublishReview username={username} />,
              authState
            )}
          />
          <Route
            path="/reviews"
            element={requireAuth(<Browse username={username} />, authState)}
          />
          <Route
            path="/profile/:username"
            element={requireAuth(
              <Profile authUsername={username} />,
              authState
            )}
          />
          <Route
            path="/profile/:username/edit"
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
  const navigate = useNavigate();
  const loginPath = "/";

  return (
    <main className="container-fluid  text-center">
      401: Must be logged in to view this page. Please log in.
      <button
        className="btn btn-primary me-2"
        type="submit"
        id="login-button"
        onClick={() => navigate(loginPath)}
      >
        Login
      </button>
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
