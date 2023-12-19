import React, { useContext } from "react";
import { useState } from "react";
import sendData from "../functions/sendData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import Terms from "../components/Terms";
import Form from "../components/Form";
import GoogleBtn from "../components/GoogleBtn";

export default function Login() {
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

  const handleFormSubmit = () => {
    console.log("test");
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => googleLoginSuccess(codeResponse),
    onFailure: (res) => {
      googleLoginFailure(res);
    },
  });

  const googleLoginSuccess = async (response) => {
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      });
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const googleLoginFailure = (response) => {
    console.log("Login failed res : ", response);
  };

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
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch({ type: "LOGIN", payload: response.user });
        navigate("/home");
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
    //   <div>
    //     <h1>Login</h1>

    //     <form onSubmit={handleSubmit}>
    //       <label htmlFor="">Email</label>
    //       <input type="email" onChange={(e) => setEmail(e.target.value)} />
    //       <label htmlFor="">Password</label>
    //       <input type="password" onChange={(e) => setPassword(e.target.value)} />
    //       <input type="submit" />
    //     </form>
    //     <div className="google-login">
    //       <button onClick={() => login()}>Sign in with google</button>
    //     </div>
    //     {!allInputAreFilled && <h1>Please fill all fields</h1>}
    //     {emailNotFound && <h1>Email not found</h1>}
    //     {passwordInvalid && <h1>Password invalid</h1>}
    //     {!isEmailVerified && <h1>Please verify your email before login</h1>}
    //   </div>
  );
}
