import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Home from "../views/Home.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
