import React from "react";
import { useState } from "react";
import sendData from "../functions/sendData";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const data = {
        email: email,
        password: password,
      };
      const response = await sendData(data, "http://localhost:3001/api/login");
      console.log(response);
      if (response.status === "SUCCESS") {
        navigate("/home");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  );
}
