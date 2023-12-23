import React, { useEffect } from "react";
import { useState } from "react";
import sendData from "../functions/sendData";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Verify() {
  const done = useRef();
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const verify = async () => {
    const response = await sendData(
      { id: id },
      "http://localhost:3001/api/verify"
    );
    console.log(response);
    if (response.status === "SUCCESS") {
      setIsVerified(true);
      setAnimationStarted(true);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  };
  useEffect(() => {
    verify();
  });
  return (
    <div className="view-verify">
      <div>
        {!isVerified && <h1>Verifing in progress</h1>}
        {isVerified && (
          <h1
            ref={done}
            className={`done ${animationStarted ? "animate" : ""}`}
          >
            Verifing is done, you will be redirected ✨✨
          </h1>
        )}
        {error && <h1>Something went wrong</h1>}
      </div>
    </div>
  );
}
