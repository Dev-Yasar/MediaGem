import React, { useState, useRef, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Preview2 from "../../assets/preview2.png";
import myAudioFile1 from "../../assets/sr.wav";
import myAudioFile2 from "../../assets/str.wav";
import myAudioFile3 from "../../assets/bell.wav";
import { Link } from "react-router-dom";

import "./WebcamRecord.css";
const WebcamRecord = () => {
  const token = localStorage.getItem("token");

  if (token === null) {
    window.location.href = "/";
  }

  const startClick = new Audio(myAudioFile1);
  const stopClick = new Audio(myAudioFile2);
  const bellClick = new Audio(myAudioFile3);

  const [modalIsOpen, setIsOpen] = useState(true);
  const [permission, setPermission] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isdownload, setIsdownload] = useState(false);

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setVideoStream(stream);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setIsOpen(true);
      }
    }

    if (permission === true) {
      bellClick.play();
      initCamera();
      setIsOpen(false);
    }
  }, [permission]);

  const [recordedVideoSrc, setRecordedVideoSrc] = useState(null);

  const startWebcamRecording = () => {
    if (videoStream) {
      const recorder = new MediaRecorder(videoStream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        setVideoBlob(blob);
        const videoSrc = URL.createObjectURL(blob);
        setRecordedVideoSrc(videoSrc);
      };

      recorder.start();
      setMediaRecorder(recorder);
      startClick.play();
      setRecording(true);
    }
  };

  const stopWebcamRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      stopClick.play();
      setRecording(false);
      setIsdownload(true);
    }
  };
  const downloadVideo = () => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "video.mp4";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  function GrantPermission() {
    console.log(permission);
    setPermission(true);
    console.log(permission);
  }

  return (
    <div>
      <div>
        <div>
          {modalIsOpen && (
            <div className="Modelbackdrop">
              <div className="Modal">
                <div>
                  <button className="permissionBtn" onClick={GrantPermission}>
                    {" "}
                    <i class="fa-solid fa-camera"></i>{" "}
                    <i class="fa-solid fa-microphone-lines"></i> Grant
                    Permission
                  </button>
                </div>

                <Link to="/home">
                  <button className="denyBtn" onClick={GrantPermission}>
                    {" "}
                    <i class="fa-solid fa-ban"></i> Deny Permission
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="RecorderScreen">
          <Link to="/home">
            <button className="homeBackbtn">
              <i class="fa-solid fa-house"></i> Home{" "}
            </button>
          </Link>
          <div className="Controlers4">
            <div className="VideoPreview">
              <video
                className="RecordVideo4"
                controls
                autoPlay
                width="480"
                height="360"
                poster={Preview2}
                src={recordedVideoSrc}
              ></video>
            </div>

            <div className="BtnControls">
              {recording ? (
                <button className="recordBtn" onClick={stopWebcamRecording}>
                  Stop screen Recording <i className="fa-solid fa-stop"></i>
                </button>
              ) : (
                <button className="recordBtn" onClick={startWebcamRecording}>
                  Start screen Recording <i className="fa-solid fa-play"></i>
                </button>
              )}

              {isdownload && (
                <>
                  <button className="downloadv" onClick={downloadVideo}>
                    webcam Video <i class="fa-solid fa-download"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamRecord;
