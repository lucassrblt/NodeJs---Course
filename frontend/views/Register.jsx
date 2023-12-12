import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sendData from "../functions/sendData.js";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        // Envoyer la requete au serveur
        const data = {
          email: email,
          password: password,
        };
        const response = await sendData(
          data,
          "http://localhost:3001/api/register"
        );

        const userData = await response.data;
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log(response);
        navigate("/otp-verification");
      }
    }
  };
  return (
    <div>
      <h1>Resgitser</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input type="mail" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="confirm password">
          Confirm Password
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
