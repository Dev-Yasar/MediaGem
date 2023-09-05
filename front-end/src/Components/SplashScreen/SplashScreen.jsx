import React from "react";
import { Link, Navigate } from "react-router-dom";

import "./SplashScreen.css";
const SplashScreen = () => {
  const token = localStorage.getItem("token");

  if (token === null) {
    window.location.href = "/";
  }

  function Logout() {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div className="screenbg">
      <button onClick={Logout} className="Logout">
        {" "}
        <i class="fa-solid fa-right-from-bracket fa-flip-horizontal"></i> Logout
      </button>
      <div className="controls">
        <div>
          <h1>
            {" "}
            <i class="fa-solid fa-gem"></i> MEDIAGEM
          </h1>
        </div>

        <div className="controlsbtns">
          <Link to="/allmedia">
            {" "}
            <button className="Fbtn">
              {" "}
              <i class="fa-solid fa-desktop"></i>{" "}
              <i class="fa-solid fa-camera"></i> Screen and webcam
            </button>
          </Link>
          <Link to="/webcam">
            <button className="Fbtn">
              {" "}
              <i class="fa-solid fa-camera"></i> Webcam Record
            </button>
          </Link>
          <Link to="/screen">
            {" "}
            <button className="Fbtn">
              {" "}
              <i class="fa-solid fa-desktop"></i> Screen Record{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
