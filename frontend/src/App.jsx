import React, { useState } from "react";
import Home from "./Home/Home";
import Login from "./Login";
import SignUp from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [currentUser, setCurrentUser] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact></Route>
        <Route path="/signup" element={<SignUp currentUser={setCurrentUser}/>}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
