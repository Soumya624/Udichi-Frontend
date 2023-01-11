import React from "react";
import { useEffect } from "react";
import * as faceapi from "face-api.js";
import { useState } from "react";
import { useRef } from "react";

export default function Liveproc({ camera }) {
  const [initialise, setInitialise] = useState(false);
  const [multipleFace, setMultipleFace] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    if (camera.previewStream) {
      loadModels();
    }
  }, [camera]);

  const loadModels = async () => {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    setInitialise(true);
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    ]).then(startVideo);
  };

  const startVideo = () => {
    console.log("Start Video....");
    videoRef.current.srcObject = camera.previewStream;
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
      console.log(detections);
      setMultipleFace(detections.length() > 1);
    }, 500);
  };
  return (
    <div>
      {camera.previewStream && (
        <video
          ref={videoRef}
          autoPlay
          muted
          width={200}
          height={200}
          onPlay={handleVideoOnPlay}
        />
      )}
    </div>
  );
}
