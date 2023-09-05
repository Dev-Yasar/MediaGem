import React, { useState, useRef , useEffect} from 'react';
import { useReactMediaRecorder } from "react-media-recorder";

import Preview1 from "../../assets/preview1.png"

import myAudioFile1 from "../../assets/sr.wav"; // Import your audio file
import myAudioFile2 from "../../assets/str.wav";
import myAudioFile3 from "../../assets/bell.wav"; // Import your audio file
import { Link } from 'react-router-dom';


import "./ScreenRecord.css"
const ScreenRecord = () => {

  
  const token = localStorage.getItem('token')

  if (token === null) {
    window.location.href = '/'
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

  const [screenrecording, setScreenrecording] = useState(false);
  const [isdownload, setIsdownload] = useState(false);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      screen: true,
      audio: false,
      mimeType: "video/mp4",
    });

  const videoRef = useRef(null);


  const [recordedVideoSrc, setRecordedVideoSrc] = useState(null);

  const startScreenRecord = () => {
    startRecording();
    setScreenrecording(true);
    setIsdownload(false);
    startClick.play();
    setRecording(true);
  };

  const stopScreenRecord = () => {
    stopRecording();
    setScreenrecording(false);
    setIsdownload(true);
    stopClick.play();
    setRecording(false);
  };

  const handleDownload = () => {
    if (mediaBlobUrl) {
      const a = document.createElement("a");
      a.href = mediaBlobUrl;
      a.download = "recorded-video.mp4";
      a.click();
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
 
        </div>

        <div className="RecorderScreen">
        <Link to="/home">
          <button className="homeBackbtn"><i class="fa-solid fa-house"></i> Home </button>
          </Link>
          <div className="Controlers2">
            <div className="VideoPreview">
              <video
                className="RecordVideo2"
                ref={videoRef}
                src={mediaBlobUrl}
                controls
                autoPlay
                poster={Preview1}
              />
            </div>

            <div className="BtnControls">
              {screenrecording ? (
                <button className="recordBtn" onClick={stopScreenRecord}>
                  Stop screen Recording <i className="fa-solid fa-stop"></i>
                </button>
              ) : (
                <button className="recordBtn" onClick={startScreenRecord}>
                  Start screen Recording <i className="fa-solid fa-play"></i>
                </button>
              )}

              {isdownload && (
                <>
                  <button className="downloadv" onClick={handleDownload}>
                    screen Video <i class="fa-solid fa-download"></i>
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

export default ScreenRecord;
