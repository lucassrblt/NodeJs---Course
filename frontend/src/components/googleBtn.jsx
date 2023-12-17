import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function GoogleBtn() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

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

  return (
    <>
      <div className="google-login">
        <div className="google-btn">
          <button onClick={() => login()}>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.764 5.51C2.59601 3.85324 3.87237 2.46051 5.45043 1.48747C7.02849 0.514427 8.84606 -0.000583568 10.7 4.96231e-07C13.395 4.96231e-07 15.659 0.991001 17.39 2.605L14.523 5.473C13.486 4.482 12.168 3.977 10.7 3.977C8.095 3.977 5.89 5.737 5.105 8.1C4.905 8.7 4.791 9.34 4.791 10C4.791 10.66 4.905 11.3 5.105 11.9C5.891 14.264 8.095 16.023 10.7 16.023C12.045 16.023 13.19 15.668 14.086 15.068C14.6054 14.726 15.0501 14.2822 15.3932 13.7635C15.7363 13.2448 15.9706 12.6619 16.082 12.05H10.7V8.182H20.118C20.236 8.836 20.3 9.518 20.3 10.227C20.3 13.273 19.21 15.837 17.318 17.577C15.664 19.105 13.4 20 10.7 20C9.38663 20.0005 8.08603 19.7422 6.87254 19.2399C5.65905 18.7375 4.55645 18.0009 3.62776 17.0722C2.69907 16.1435 1.96249 15.041 1.46013 13.8275C0.957771 12.614 0.699472 11.3134 0.699998 10C0.699998 8.386 1.086 6.86 1.764 5.51Z"
                fill="#DE543D"
              />
            </svg>
          </button>
        </div>
        <div className="google-text">
          <p>Google</p>
        </div>
      </div>
    </>
  );
}

export default GoogleBtn;
