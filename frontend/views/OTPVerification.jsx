import React from "react";
import { useState } from "react";
import sendData from "../functions/sendData.js";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);

    if (email && code) {
      const data = {
        id: userData.userId,
        code: code,
      };
      console.log(data);
      const response = await sendData(
        data,
        "http://localhost:3001/api/checkOTP"
      );
      console.log(response);

      if (response.status === "SUCCESS") {
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <h1>Please verify your email</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="">
          Enter your code{" "}
          <input type="number" onChange={(e) => setCode(e.target.value)} />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
