import React, { useEffect, useRef } from "react";
import { Button } from "@mui/material";

export default function Camera({
  startRecording,
  setCameraBlob,
  isClicked,
  stopRecording,
  mediaBlobUrl,
}) {
  console.log(isClicked);
  useEffect(() => {
    console.log(mediaBlobUrl);
    stopRecording();
    console.log(mediaBlobUrl);
    setCameraBlob(mediaBlobUrl);
  }, [isClicked, mediaBlobUrl]);

  // const videoRef = useRef(null);
  // useEffect(() => {
  // 	if (videoRef.current && previewStream) {
  // 		videoRef.current.srcObject = previewStream;
  // 	}
  // }, [previewStream]);
  return (
    <>
      <div>
        <Button
          variant="contained"
          onClick={startRecording}
          style={{
            backgroundColor: "#07a8a0",
            margin: "2px",
          }}
        >
          Share Camera
        </Button>
        {/* <video ref={videoRef} width={500} height={500} autoPlay style={{
          position : "absolute",
          bottom : 0,
          right : 0
        }} /> */}
      </div>
    </>
  );
}
