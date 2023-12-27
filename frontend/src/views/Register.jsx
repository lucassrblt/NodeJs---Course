import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sendData from "../functions/sendData.js";
import Form from "../components/Form.jsx";
import GoogleBtn from "../components/GoogleBtn.jsx";
import Terms from "../components/Terms.jsx";

function Register() {
  const [allInputAreFilled, setAllInputAreFilled] = useState(true);
  const [passwordsDifferent, setPasswordDifferent] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [error, setError] = useState(false);

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

  const handleFormSubmit = async (data) => {
    const email = data["Email"];
    const password = data["Password"];
    const confirmPassword = data["Confirm Password"];
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
          navigate(`/profile/${userData.data.userId}`);
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
          <Form
            fields={fields}
            onSubmit={handleFormSubmit}
            page={"Register"}
            setError={error}
          />
          <div className="error">
            {!allInputAreFilled && <p>Please fill all fields</p>}
            {passwordsDifferent && (
              <p>Passwords are different, please set exacts passwords</p>
            )}
            {emailAlreadyExists && <p>Email already exists</p>}
            {internalError && (
              <p>Internal error, please try again later or contact support</p>
            )}
          </div>

          <div className="or">
            <div className="line"></div>
            <p>OR</p>
            <div className="line"></div>
          </div>
        </div>
        <div className="google-btn-container">
          <GoogleBtn />
        </div>
      </div>
      <Terms />
    </div>
  );
}

export default Register;
