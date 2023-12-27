import React, { useEffect } from "react";
import Terms from "../components/Terms";
import { useState } from "react";

function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.type === "LOCAL") {
      console.log(user);
      setUser({
        name: user.profile.firstName + " " + user.profile.lastName,
        picture: `http://localhost:3001/uploads/${user["profile"]["profilePicture"]}`,
      });
    } else {
      console.log("test");
      setUser({
        name: user.name,
        picture: user.picture,
      });
    }
  }, []);

  return (
    <div>
      <div className="view-home">
        <div className="nav">
          <div>
            <a href="https://github.com/lucassrblt">
              <p>coded by @lucassrblt</p>
            </a>
            <div className="svg">
              <svg
                width="59"
                height="131"
                viewBox="0 0 59 131"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5798 0.439476C9.27022 -0.0178863 8.64849 -0.13769 8.19113 0.171888L0.73798 5.21674C0.280618 5.52632 0.160814 6.14805 0.470392 6.60541C0.779969 7.06277 1.4017 7.18258 1.85906 6.873L8.48408 2.38868L12.9684 9.0137C13.278 9.47107 13.8997 9.59087 14.3571 9.28129C14.8144 8.97172 14.9342 8.34999 14.6247 7.89263L9.5798 0.439476ZM58.6511 128.591C33.4965 107.009 18.6022 89.2546 11.3104 69.9079C4.02455 50.5769 4.27573 29.5132 9.7336 1.18923L7.76973 0.810802C2.28333 29.2828 1.96265 50.777 9.43896 70.6133C16.9094 90.434 32.1114 108.456 57.3488 130.109L58.6511 128.591Z"
                  stroke="black"
                  stroke-width="3"
                  stroke-dasharray="1000"
                  stroke-dashoffset="1000"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="1000;0"
                    dur="4s"
                    keyTimes="0;1"
                    repeatCount="0"
                    fill="freeze"
                  />
                </path>
              </svg>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="pictureprof">
            <img src={user.picture} alt="" />
          </div>
          <div className="txt">
            <div className="prestxt">
              <p>
                Hi {user.name}, welcome to <span>SociaPulse</span>
              </p>
            </div>
            <div className="explication">
              <p>
                This project was implemented to create an authentication system
                using Express, MongoDB, and Google OAuth.{" "}
                <span>I hope you enjoyed it!</span>
              </p>
            </div>
          </div>
        </div>
        <Terms />
      </div>
    </div>
  );
}

export default Home;
