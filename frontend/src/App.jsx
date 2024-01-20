import React, { useEffect, useState } from "react";
import Home from "./Home/Home";
import Login from "./Login";
import SignUp from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css"

export default function App() {
  const [currentUser, setCurrentUser] = useState("krishna");
  console.log(currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setCurrentUser={setCurrentUser} />}
          exact
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/home" element={<Home username={currentUser}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
