import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState("krishna");
  const [loggedIn, setLoggedIn] = useState(true);

  console.log(loggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Login setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} />
          }
          exact
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        {loggedIn && (
          <Route path="/home" element={<Home username={currentUser} />}></Route>
        )}
        <Route path="/cart" element={<Cart username={currentUser}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
