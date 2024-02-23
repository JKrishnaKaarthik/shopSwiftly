import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/signup.css";

export default function SignUp(props) {
  const initalState = {
    firstName: "",
    lastName: "",
    email: "",
    DOB: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };
  const [signupData, setSignupData] = useState(initalState);
  const navigate = useNavigate;

  // const [validSignup, setValidSignup] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setSignupData((prevSignupData) => {
      return {
        ...prevSignupData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    //TODO
    //signup Validataion
    if (signupData.password !== signupData.confirmPassword) {
      alert("password does not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        signupData
      );
      console.log(response);
      setSignupData(initalState);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="signup-div">
      <div className="signup-block">
        <h2>Signup Page</h2>
        <form action="" onSubmit={handleSubmit} className="signup-form">
          {/* {validSignup.length !== 0 && <h3>{validSignup}</h3>} */}
          <label htmlFor="firstName" className="signup-label">
            Firstname
          </label>
          <br />
          <input
            required
            className="signup-input"
            type="text"
            placeholder="First Name"
            name="firstName"
            id="firstName"
            value={signupData.firstName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lastName" className="signup-label">
            Lastname
          </label>
          <br />
          <input
            required
            className="signup-input"
            type="text"
            placeholder="Last Name"
            name="lastName"
            id="lastName"
            value={signupData.lastName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email" className="signup-label">
            Email
          </label>
          <br />
          <input
            required
            className="signup-input"
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={signupData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="DOB" className="signup-label">
            Date Of Birth
          </label>
          <br />
          <input
            required
            className="signup-input"
            type="date"
            placeholder="DOB"
            name="DOB"
            id="DOB"
            value={signupData.DOB}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="userName" className="signup-label">
            Username
          </label>
          <br />
          <input
            required
            className="signup-input"
            type="text"
            placeholder="User Name"
            name="userName"
            id="userName"
            value={signupData.userName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password" className="signup-label">
            Password
          </label>
          <br />
          <input
            required
            className="signup-input"
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={signupData.password}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="confirmPassword" className="signup-label">
            Confirm Password
          </label>
          <br />
          <input
            required
            className="signup-input"
            type="password"
            placeholder="confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleChange}
          />
          <br />
          <button>submit</button>
          <p className="account-exists">Account Exists?</p>
          <Link to="/">
            <button>Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
