import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  // const [validLogin, setValidLogin] = useState(false);

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

    //TODO
    //on click Login Logic

    axios
      .post("http://localhost:5000/", loginData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
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
