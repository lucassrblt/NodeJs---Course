import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Home from "../views/Home.jsx";
import Register from "../views/Register.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
