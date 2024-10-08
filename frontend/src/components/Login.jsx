import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/login.css";

export default function Login(props) {
  const initalState = {
    userName: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initalState);

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
      console.log("start login");
      const response = await axios.post("/api/login/", loginData);
      if (response.data.message === "login data send") {
        localStorage.setItem("username", response.data.userName);
        navigate("/home");
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
          <button type="submit" className="login-button">
            Login
          </button>
          <br />
          <p className="create-account">Create Account</p>
          <Link to="/signup" className="Link">
            <button className="login-button">Sign up</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
