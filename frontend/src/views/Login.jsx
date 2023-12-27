import React, { useContext } from "react";
import { useState } from "react";
import sendData from "../functions/sendData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import Terms from "../components/Terms";
import Form from "../components/Form";
import GoogleBtn from "../components/GoogleBtn";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allInputAreFilled, setAllInputAreFilled] = useState(true);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [error, setError] = useState(false);

  const { dispatch } = useContext(AuthContext);

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
  ];

  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    setAllInputAreFilled(true);
    setEmailNotFound(false);
    setPasswordInvalid(false);
    setIsEmailVerified(true);
    const { Email, Password } = data;
    if (Email && Password) {
      const data = {
        email: Email,
        password: Password,
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
        const responseUser = { ...response.user, type: "LOCAL" };
        localStorage.setItem("user", JSON.stringify(responseUser));
        dispatch({ type: "LOGIN", payload: responseUser });

        if (
          response.user.profile.firstName === null ||
          response.user.profile.firstName === ""
        ) {
          navigate(`/profile/${response.user._id}`);
        } else {
          navigate("/home");
        }
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
            <h2>Log In</h2>
          </div>
        </div>
        <div className="form-container">
          <Form
            fields={fields}
            onSubmit={handleFormSubmit}
            page={"Login"}
            setError={error}
          />
          <div className="error">
            {!allInputAreFilled && <h1>Please fill all fields</h1>}
            {emailNotFound && <h1>Email not found</h1>}
            {passwordInvalid && <h1>Password invalid</h1>}
            {!isEmailVerified && <h1>Please verify your email before login</h1>}
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

export default Login;
