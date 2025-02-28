import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import Button from "react-bootstrap/Button";
import { User } from "../dataObjects/UserObject";
// import { MessageDialog } from "./messageDialog";

export function Unauthenticated(props) {
  const [username, setUsername] = React.useState(props.username);
  const [password, setPassword] = React.useState("");
  // const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.getItem("users");
    let allUsers = JSON.parse(localStorage.getItem("users"));

    let user = allUsers.find((user) => user.username === username);
    if (!user) {
      console.log("login failed - username does not exist");
      return;
    }
    if (user.password !== password) {
      console.log("login failed - incorrect password");
      return;
    }

    localStorage.setItem("username", username);
    props.onLogin(username);
  }

  async function registerUser() {
    // console.log("registering user... " + username);

    //check username, password constraints
    if (username === "null" || username === "undefined") {
      console.log("register failed - username is null or undefined");
      return;
    }
    if (username.includes(" ")) {
      console.log("register failed - username contains spaces");
      return;
    }
    if (password.includes(" ")) {
      console.log("register failed - password contains spaces");
      return;
    }

    //check if username already exists
    let allUsers = JSON.parse(localStorage.getItem("users"));
    console.log(allUsers);
    if (!allUsers) {
      allUsers = [];
    }

    let user = allUsers.find((user) => user.username === username);
    if (user) {
      console.log("register failed - username already exists");
      return;
    }

    //create new user
    let newUser = new User(username, password);
    allUsers.push(newUser);
    // console.log(newUser);

    //register user
    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.setItem("username", username);
    props.onLogin(username);
  }

  // async function createUser() {
  //   localStorage.setItem("username", username);
  //   let allUsers = JSON.parse(localStorage.getItem("users"));
  //   if (!allUsers) {
  //     allUsers = [];
  //   }
  //   allUsers.push(new User(username));
  //   localStorage.setItem("users", JSON.stringify(allUsers));
  //   props.onLogin(username);
  // }

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
    </>
  );
}

// <>
//   <div>
//     <div className="input-group mb-3">
//       <span className="input-group-text">@</span>
//       <input
//         className="form-control"
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="your@email.com"
//       />
//     </div>
//     <div className="input-group mb-3">
//       <span className="input-group-text">🔒</span>
//       <input
//         className="form-control"
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="password"
//       />
//     </div>
//     <Button
//       variant="primary"
//       onClick={() => loginUser()}
//       disabled={!username || !password}
//     >
//       Login
//     </Button>
//     <Button
//       variant="secondary"
//       onClick={() => createUser()}
//       disabled={!username || !password}
//     >
//       Create
//     </Button>
//   </div>

//   <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
// </>;
