import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "/login.css";
import "../style/login.css"

export default function Login(props) {
  const initalState = {
    userName: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initalState);

  // const [validLogin, setValidLogin] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/", loginData);
      console.log(response.data);
      if (response.data.message === "login data send") {
        navigate("/home");
        console.log(response.data.userName);
        props.setCurrentUser(response.data.userName);
        props.setLoggedIn(true);
      } else {
        alert("invalid username or password");
        setLoginData(initalState);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login-main">
      <div className="login-block">
        <h1>Login page</h1>
        <form action="" onSubmit={handleSubmit} className="login-form">
          <label htmlFor="userName" className="login-label">
            Username
          </label>
          <br />
          <input
            className="login-input"
            type="text"
            name="userName"
            id="userName"
            onChange={handleChange}
            value={loginData.userName}
          />
          <br />
          <label htmlFor="password" className="login-label">
            password
          </label>
          <br />
          <input
            className="login-input"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={loginData.password}
          />
          <br />
          <button type="submit">Login</button>
          <br />
          <p className="create-account">Create Account</p>
          <Link to="/signup" className="Link">
            <button>Sign up</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
