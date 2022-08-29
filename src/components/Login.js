import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Login.css'
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
    <div className='flex flex-col items-center bg-slate-200'>
      {success ? (
        <>
          <div className='flex flex-col justify-evenly items-center w-3/4 md:w-1/4 h-1/2 mt-20 shadow-lg rounded-lg bg-white'>
            <p>logged in successfully!</p>
            <p>
              welcome <span>{user.username}!</span>
            </p>
            <Link to="/main">Enter</Link>
          </div>
        </>
      ) : (
        <>
          <div className='flex flex-col justify-center items-center mt-20 bg-slate-200 w-1/3'>
            <h1 className='block uppercase tracking-wide text-gray-700 text-lg font-bold mt-4 mb-10'>Log In</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit} className=' flex flex-col'>
              <label htmlFor="username" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4'>Username: </label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                onChange={handleChange}
                value={user.username}
                required
                className="border"
              />
              <label htmlFor="email"className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4' >Email: </label>
              <input
                type="text"
                id="email"
                onChange={handleChange}
                value={user.email}
                required
              />
              <label htmlFor="password" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4'>Password: </label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                value={user.password}
                required
              />
              <br></br>
              <button className='bg-[#ADD8E6] shadow-lg flex-shrink-0 py-2 px-8 mb-5 border rounded-lg'>Sign In</button>
            </form>
            <Link to="/main" onClick={guest} className='text-sm mt-20'>
              continue as guest
            </Link>
          </div>
          <div >
            <p className='block tracking-wide text-gray-700 text-m mt-4'>
              Need an Account? <br></br>
              <span>
                <Link to="/register" className="underline">Sign Up</Link>
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
