import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    DOB: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  console.log(signupData    );

  function handleChange(event) {
    const { name, value } = event.target;
    setSignupData((prevSignupData) => {
      return {
        ...prevSignupData,
        [name]: value,
      };
    });
  }

  return (
    <>
      <div className="signupDiv">
          <form action="">
            <label htmlFor="firstName">Firstname</label>
            <br />
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              value={signupData.firstName}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="lastName">Lastname</label>
            <br />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              value={signupData.lastName}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={signupData.email}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="DOB">Date Of Birth</label>
            <br />
            <input
              type="date"
              placeholder="DOB"
              name="DOB"
              id="DOB"
              value={signupData.DOB}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              placeholder="User Name"
              name="username"
              id="username"
              value={signupData.username}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password"
              value={signupData.password}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              type="password"
              placeholder="confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleChange}
            />
            <br />
            <button>submit</button>
            <p>Account Exists?</p>
            <Link to="/"><button>Login</button></Link>
          </form>
      </div>
    </>
  );
}
