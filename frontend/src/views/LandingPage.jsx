import React from "react";
import Terms from "../components/Terms";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="view-landing">
      <div className="left-part">
        <div className="text">
          <div className="tall-txt">
            <p>Manage your social presence</p>
          </div>
          <div className="small-txt">
            <p>to attract new customers</p>
          </div>
        </div>
      </div>
      <div className="right-part">
        <div className="getstarted">
          <div className="title">
            <p>Get Started</p>
          </div>
          <div className="btns">
            <div className="btn">
              <button onClick={() => navigate("/login")}>Log In</button>
            </div>
            <div className="btn">
              <button onClick={() => navigate("/register")}>Sign Up </button>
            </div>
          </div>
          <Terms />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
