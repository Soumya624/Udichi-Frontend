import React from "react";
import { useEffect } from "react";
import * as faceapi from "face-api.js";
import { useState } from "react";
import { useRef } from "react";

export default function Liveproc({ camera }) {
  const [initialise, setInitialise] = useState(false);
  const [multipleFace, setMultipleFace] = useState(false);
  const videoRef = useRef();

  useEffect(()=>{
    if(videoRef && videoRef.current !== undefined){
      videoRef.current.srcObject = camera.previewStream
    }
  },[camera])

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
      setMultipleFace(detections.length > 1);
    }, 500);
  };
  // console.log(camera.previewStream)
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
