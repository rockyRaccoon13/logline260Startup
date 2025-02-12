import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import { UserProfile } from "./userProfile/userProfile";
import { BrowseReviews } from "./browseReviews/browseReviews";
import { EditProfile } from "./editProfile/editProfile";
import { PublishReview } from "./publishReview/publishReview";
import { Login } from "./login/login";

export default function App() {
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
              <li className="nav-item">
                <NavLink className="nav-link" to="reviews">
                  Reviews
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="viewProfile">
                  User's profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="editProfile">
                  Edit user's profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="publishReview">
                  Publish new review
                </NavLink>
              </li>
            </menu>
          </nav>
          <hr />
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="reviews" element={<BrowseReviews />} />
          <Route path="viewProfile" element={<UserProfile />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="publishReview" element={<PublishReview />} />
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

function NotFound() {
  return (
    <main className="container-fluid  text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
