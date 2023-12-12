import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Home from "../views/Home.jsx";
import Register from "../views/Register.jsx";
import OTPVerification from "../views/OTPVerification.jsx";
import Login from "../views/Login.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/home"} element={<Home />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/otp-verification"} element={<OTPVerification />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
