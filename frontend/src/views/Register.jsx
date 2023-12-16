import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sendData from "../functions/sendData.js";
import Form from "../components/Form.jsx";
import googleBtn from "../components/googleBtn.jsx";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allInputAreFilled, setAllInputAreFilled] = useState(true);
  const [passwordsDifferent, setPasswordDifferent] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [internalError, setInternalError] = useState(false);

  const navigate = useNavigate();

  const fields = [
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
    },
  ];

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

        const userData = await response;
        console.log(userData);

        if (userData.status === "PENDING") {
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate("/login");
        }

        if (userData.status === "FAILED") {
          if (userData.message === "Please fill all files") {
            setAllInputAreFilled(false);
          } else if (userData.message === "Email already exist") {
            setEmailAlreadyExists(true);
          } else if (userData.message === "Verification email failed to sent") {
            setInternalError(true);
          }
        }
      } else {
        setPasswordDifferent(true);
      }
    } else {
      setAllInputAreFilled(false);
    }
  };
  return (
    <div className="view">
      <div className="register-container">
        <div className="title-subtitle">
          <div className="title">
            <h2>Sign In</h2>
          </div>
          <div className="subtitle">
            <h6>You will fill your profile later</h6>
          </div>
        </div>
        <div className="form-container">
          <Form fields={fields} handleSubmit={handleSubmit} page={"Register"} />
          <div className="or">
            <div className="line"></div>
            <p>OR</p>
            <div className="line"></div>
          </div>
        </div>
        <googleBtn />
      </div>
      {/* <h1>Register</h1>
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
        {!allInputAreFilled && <p>Please fill all fields</p>}
        {passwordsDifferent && (
          <p>Passwords are different, please set exacts passwords</p>
        )}
        {emailAlreadyExists && <p>Email already exists</p>}
        {internalError && (
          <p>Internal error, please try again later or contact support</p>
        )}
      </form> */}
    </div>
  );
}