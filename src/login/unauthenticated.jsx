import React from "react";

import Button from "react-bootstrap/Button";
// import { MessageDialog } from "./messageDialog";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  // const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem("userName", userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem("userName", userName);
    props.onLogin(userName);
  }

  return (
    <>
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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={() => loginUser()}
            disabled={!userName || !password}
          >
            Login
          </button>
          <button
            className="btn btn-secondary"
            type="submit"
            id="register-button"
            onClick={() => createUser()}
            disabled={!userName || !password}
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
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
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
//       disabled={!userName || !password}
//     >
//       Login
//     </Button>
//     <Button
//       variant="secondary"
//       onClick={() => createUser()}
//       disabled={!userName || !password}
//     >
//       Create
//     </Button>
//   </div>

//   <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
// </>;
