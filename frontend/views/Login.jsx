import React from "react";
import { useState } from "react";
import sendData from "../functions/sendData";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allInputAreFilled, setAllInputAreFilled] = useState(true);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test");
    if (email && password) {
      console.log("test2");
      const data = {
        email: email,
        password: password,
      };
      const response = await sendData(data, "http://localhost:3001/api/login");
      console.log(response);
      if (response.status === "FAILED") {
        if (response.message === "Email not found") {
          setEmailNotFound(true);
        }
        if (response.message === "Password Invalid") {
          setPasswordInvalid(true);
        }
        if (response.message === "Email not verified") {
          setIsEmailVerified(false);
        }
      }
      if (response.status === "SUCCESS") {
        navigate("/home");
      }
    } else {
      setAllInputAreFilled(false);
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
      {!allInputAreFilled && <h1>Please fill all fields</h1>}
      {emailNotFound && <h1>Email not found</h1>}
      {passwordInvalid && <h1>Password invalid</h1>}
      {!isEmailVerified && <h1>Please verify your email before login</h1>}
    </div>
  );
}
