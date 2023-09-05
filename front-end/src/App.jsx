import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import SplashScreen from "./Components/SplashScreen/SplashScreen";
import ScreenRecord from "./Pages/ScreenRecord/ScreenRecord";
import WebcamRecord from "./Pages/WebcamRecord/WebcamRecord";
import AllMedia from "./Pages/SAW/AllMedia";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import NoMatch from "./Pages/404/NoMatch";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<SplashScreen />} />
          <Route path="/allmedia" element={<AllMedia />} />
          <Route path="/screen" element={<ScreenRecord />} />
          <Route path="/webcam" element={<WebcamRecord />} />
          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
