import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
  return (
    <div className="body bg-dark text-light">
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark">
          <div className="navbar-brand">Logline</div>
          <menu className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/index.html">
                Login/Register
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reviews.html">
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/viewProfile.html">
                User's profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/editProfile.html">
                Edit user's profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/publishReview.html">
                Publish new review
              </a>
            </li>
          </menu>
        </nav>
        <hr />
      </header>

      <footer className="fixed-bottom">
        <span className="text-reset">Benson Rowley</span>
        <a href="https://github.com/rockyRaccoon13/logline260Startup">GitHub</a>
      </footer>
    </div>
  );
}
