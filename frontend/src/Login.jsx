import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const [validLogin, setValidLogin] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert("submit unsuccesful");

    //TODO
    //on click Login Logic  

  }

  return (
    <>
      <h1>Login page</h1>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="userName"></label>
          <br />
          <input
            type="text"
            name="userName"
            id="userName"
            onChange={handleChange}
            value={loginData.userName}
          />
          <br />
          <label htmlFor="password"></label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={loginData.password}
          />
          <br />
          <button type="submit">Login</button>
          <br />
          <p>Create Account</p>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </form>
      </div>
    </>
  );
}
