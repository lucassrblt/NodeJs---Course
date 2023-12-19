import React, { useEffect, useRef } from "react";
import Terms from "../components/Terms";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const circle = useRef();
  const paragraphRef = useRef();

  const txt = "Manage your social presence";
  const baseline = [
    "Foster community engagement and collaboration.",
    "Establish a compelling online identity.",
    "Enhance digital visibility and influence.",
  ];

  const textTypingEffect = (element, text, i = 0, lines = baseline) => {
    // const length = text.length;
    // let l = 0;

    element.textContent = text.substring(0, i + 1);
    if (i === text.length - 1) {
      circle.current.classList.add("animated");
      paragraphRef.current.classList.add("diseapear");
      setTimeout(() => {
        paragraphRef.current.classList.remove("diseapear");
        circle.current.classList.remove("animated");
        paragraphRef.current.textContent = "";

        const nextLineIndex = (lines.indexOf(text) + 1) % lines.length;
        textTypingEffect(paragraphRef.current, lines[nextLineIndex]);
        // l++;
        // textTypingEffect(mainText, baseline[1]);
      }, 1500);
      return;
    }
    setTimeout(() => {
      textTypingEffect(element, text, i + 1);
    }, 60);
  };

  useEffect(() => {
    const mainText = paragraphRef.current;
    textTypingEffect(mainText, baseline[0]);
  }, []);
  return (
    <div className="view-landing">
      <div className="left-part">
        <div className="text">
          <div className="tall-txt">
            <p className="tall-txt-p">Manage your social presence</p>
          </div>
          <div className="small-txt">
            <p ref={paragraphRef}></p>
            <div className="hide-container" ref={circle}></div>
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
