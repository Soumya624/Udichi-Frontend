import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function TestCont() {
  const [initialise, setInitialise] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitialise(true);
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      ]).then(startVideo);
    };

    loadModels();
  }, []);

  const startVideo = () => {
    console.log("Start Video....");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        console.log(stream);
        videoRef.current.srcObject = stream;
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (initialise) {
        setInitialise(false);
      }

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );
    }, 1000);
  };

  return (
    <div>
      <span>{initialise ? "Initialise" : "Ready"}</span>
      <video
        ref={videoRef}
        autoPlay
        muted
        width={400}
        height={400}
        onPlay={handleVideoOnPlay}
      />
    </div>
  );
}
