import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Home from "../views/Home.jsx";
import Register from "../views/Register.jsx";
import Login from "../views/Login.jsx";
import Verify from "../views/Verify.jsx";
import { AuthContextProvider } from "../context/AuthContext.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <AuthContextProvider>
            <Route path={"/home"} element={<Home />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/verify/:id"} element={<Verify />} />
          </AuthContextProvider>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
