import React from "react";
// import Home from './Home/Home';
import Login from './Login';
import SignUp from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <SignUp /> */}
    </BrowserRouter>
  );
}
