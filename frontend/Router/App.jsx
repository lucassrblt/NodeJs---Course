import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Home from "../views/Home.jsx";
import Register from "../views/Register.jsx";
import Login from "../views/Login.jsx";
import Verify from "../views/Verify.jsx";
import { AuthContextProvider } from "../context/AuthContext.jsx";
import PrivateRoute from "../views/PrivateRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/verify/:id"} element={<Verify />} />
            <Route element={<PrivateRoute />}>
              <Route path={"/home"} element={<Home />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
