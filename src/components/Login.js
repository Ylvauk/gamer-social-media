import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (user.username !== "" && user.email !== "" && user.password !== "") {
        axios
          .post(
            "https://glacial-forest-84300.herokuapp.com/users/signin",
            user
          )
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("role", res.data.role);

            if (res.data?.token) {
              setSuccess(true);
            } else {
              setErrorMessage(res.data);
            }
          });
      }
    };

  const guest = () => {
    localStorage.clear();
  };

  return (
    <div>
      {success ? (
        <>
          <div>
            <p>logged in successfully!</p>
            <p>
              welcome <span>{user.username}!</span>
            </p>
            <Link to="/main">Enter</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <h1>Log In</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                onChange={handleChange}
                value={user.username}
                required
                className="border"
              />
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                id="email"
                onChange={handleChange}
                value={user.email}
                required
              />
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                value={user.password}
                required
              />
              <br></br>
              <button>Sign In</button>
            </form>
            <Link to="/main" onClick={guest}>
              continue as guest
            </Link>
          </div>
          <div>
            <p>
              Need an Account? <br></br>
              <span>
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
