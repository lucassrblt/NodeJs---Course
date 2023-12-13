import React, { useEffect, useState } from "react";
import sendData from "./functions/sendData";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  var token = cookies.get("token");
  const verifyAuthent = async () => {
    try {
      const response = await sendData(
        { token: token },
        "http://localhost:3001/api/verifyAuthent"
      );
    } catch (error) {}
  };

  useEffect(() => {}, []);
  return <div></div>;
}
